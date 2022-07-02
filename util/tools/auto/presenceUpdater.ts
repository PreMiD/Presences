import "source-map-support/register";

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, normalize, resolve, sep } from "node:path";
import { transformFileAsync as transform } from "@babel/core";
import { green, yellow, red, blue } from "chalk";
import { sync as glob } from "glob";
import {
	type AnyBulkWriteOperation,
	type BulkWriteResult,
	type DeleteResult,
	type InsertManyResult,
	MongoClient,
} from "mongodb";
import { valid } from "semver";
import { minify as terser } from "terser";
import {
	type CompilerOptions,
	createProgram,
	flattenDiagnosticMessageText,
	getPreEmitDiagnostics,
} from "typescript";
import { readFile, readJson, isValidJSON, type Metadata } from "../util";

const url = process.env.MONGO_URL,
	dbName = "PreMiD",
	client = new MongoClient(url, { appName: "PreMiD-PresenceUpdater" });

let exitCode = 0,
	appCode = 0;

const writeJS = (path: string, code: string): void =>
		writeFileSync(path, code, { encoding: "utf8", flag: "w" }),
	compileFile = async (
		fileNames: string[],
		options: CompilerOptions
	): Promise<void> => {
		const program = createProgram(fileNames, options),
			emitResult = program.emit(),
			allDiagnostics = getPreEmitDiagnostics(program).concat(
				emitResult.diagnostics
			);

		for (const diagnostic of allDiagnostics) {
			if (diagnostic.file) {
				const { line, character } =
						diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!),
					message = flattenDiagnosticMessageText(diagnostic.messageText, "\n");
				console.log(
					`${diagnostic.file.fileName} (${line + 1},${
						character + 1
					}): ${message}`
				);
			} else
				console.log(flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
		}

		if (emitResult.emitSkipped) appCode = 1;
	},
	minify = async (file: string): Promise<void> => {
		const result = await terser(readFile(file), {
			ecma: 5,
			compress: {
				passes: 2,
			},
		});
		if (result?.code?.length) writeJS(file, result.code);
		else {
			console.error(red(`Error. File ${file} was not minified, skipping...`));
			appCode = 1;
		}
	},
	polyfill = async (file: string): Promise<void> => {
		const result = await transform(file, {
			presets: [["@babel/preset-env", { exclude: ["transform-regenerator"] }]],
		});
		if (result?.code?.length) {
			writeJS(file, result.code);
			await minify(file);
		} else {
			console.error(red(`Error. File ${file} was not polyfilled, skipping...`));
			appCode = 1;
		}
	},
	compile = async (filesToCompile: string[]): Promise<void> => {
		const premidTypings = join(
				__dirname,
				"../../../@types",
				"premid",
				"index.d.ts"
			),
			{ compilerOptions: baseTsConfig } = readJson<{
				compilerOptions: CompilerOptions;
			}>(resolve(__dirname, "../../../tsconfig.json"));

		for (const fileToCompile of filesToCompile) {
			const normalizedPath = normalize(fileToCompile).split(sep);
			normalizedPath.pop();

			const { compilerOptions: presenceConfig } = readJson<{
					compilerOptions: CompilerOptions;
				}>(resolve(normalizedPath.join(sep), "../../../tsconfig.json")),
				tsConfig: CompilerOptions = {
					...baseTsConfig,
					...presenceConfig,
					outDir: resolve(normalizedPath.join(sep), "dist"),
					noEmitOnError: false,
					types: ["node"],
				};

			compileFile([fileToCompile, premidTypings], tsConfig);
		}
	},
	main = async (): Promise<void> => {
		if (!process.env.GITHUB_ACTIONS) {
			console.log(
				red(
					"\nPlease note that this script is ONLY supposed to run on a CI environment"
				)
			);
		}

		console.log(blue("\nFETCHING...\n"));

		try {
			await client.connect();
		} catch (err) {
			console.error(red(err.stack || err));
			process.exit(1);
		}

		const database = client.db(dbName).collection<DBdata>("presences"),
			dbPresences = await database
				.find({}, { projection: { _id: 0, name: 1, "metadata.version": 1 } })
				.toArray(),
			presences = glob("./{websites,programs}/*/*/")
				.filter(pF => existsSync(`${pF}dist/metadata.json`))
				.map<[Metadata, string]>(pF => {
					const file = readFile(`${pF}dist/metadata.json`);
					if (isValidJSON(file)) {
						const data = JSON.parse(file);
						delete data.$schema;
						return [data, pF];
					} else {
						console.error(
							red(
								`Error. Folder ${pF} does not include a valid metadata file, skipping...`
							)
						);
						exitCode = 1;
						return null;
					}
				}),
			newPresences = presences.filter(
				([metadata]) =>
					!dbPresences.some(dbData => dbData.name === metadata.service)
			),
			deletedPresences = dbPresences.filter(
				dbData =>
					!presences.some(([metadata]) => metadata.service === dbData.name)
			),
			outdatedPresences = dbPresences
				.filter(dbData =>
					presences.some(
						([metadata]) =>
							metadata.service === dbData.name &&
							metadata.version !== dbData.metadata.version
					)
				)
				.map(dbData =>
					presences.find(([metadata]) => metadata.service === dbData.name)
				),
			dbDiff = outdatedPresences.concat(newPresences);

		console.log(green(`New additions: ${newPresences.length}`));
		console.log(yellow(`To be updated: ${outdatedPresences.length}`));
		console.log(red(`To be deleted: ${deletedPresences.length}`));

		if (dbDiff.length) console.log(blue("\nCOMPILING...\n"));
		if (dbDiff.length > 5) console.log(yellow("This will take some time..."));

		const compiledPresences = (
			await Promise.all(
				dbDiff.map(async ([metadata, path]) => {
					const sources = glob(`${path}*.ts`);

					appCode = 0;

					if (!metadata) {
						console.error(
							`Error. No metadata was found for ${path}, skipping...`
						);
						appCode = 1;
						return null;
					}

					if (!path) return null;

					if (!valid(metadata.version)) {
						const meta = metadata.service;
						console.error(
							`Error. ${meta} does not include a valid metadata file/version, skipping...`
						);
						appCode = 1;
						return null;
					}

					await compile(sources);

					const jsFiles = glob(`${path}dist/*.js`);
					for (const file of jsFiles) await polyfill(file);

					if (!existsSync(`${path}dist/presence.js`)) {
						const meta = metadata.service ?? path;
						console.error(`Error. ${meta} did not compile, skipping...`);
						appCode = 1;
						return null;
					}

					const resJson: DBdata = {
						name: metadata.service,
						url: `https://api.premid.app/v2/presences/${encodeURIComponent(
							metadata.service
						)}/`,
						metadata,
						presenceJs: readFileSync(`${path}dist/presence.js`, "utf-8"),
					};

					const existsIFrame = existsSync(`${path}dist/iframe.js`);
					if (metadata.iframe && existsIFrame)
						resJson.iframeJs = readFileSync(`${path}dist/iframe.js`, "utf-8");
					else if (metadata.iframe && !existsIFrame) {
						console.error(
							`Error. ${metadata.service} explicitly includes iframe but no such file was found, skipping...`
						);
						appCode = 1;
						return null;
					} else if (!metadata.iframe && existsIFrame) {
						console.error(
							`Error. ${metadata.service} contains an iframe file but does not include it in the metadata, skipping...`
						);
						appCode = 1;
						return null;
					}

					if (appCode === 1) {
						exitCode ||= 1;

						console.log(`❌ ${metadata.service || path}`);
					}

					return resJson;
				})
			)
		).filter(Boolean);

		console.log("\nUPDATING...\n");

		try {
			const newPresenceData = compiledPresences.filter(dbData =>
					newPresences.some(([metadata]) => metadata.service === dbData.name)
				),
				updatedPresenceData = compiledPresences.filter(dbPresence =>
					outdatedPresences.some(
						([metadata]) => metadata.service === dbPresence.name
					)
				);

			let newPresenceResult: Promise<InsertManyResult<DBdata>>,
				deletedPresenceResult: Promise<DeleteResult>,
				updatedPresenceResult: Promise<BulkWriteResult>;

			if (newPresenceData.length) {
				newPresenceResult = database.insertMany(newPresenceData);
				for (const presence of newPresenceData) {
					console.log(
						green(`ADD - "${presence.name}" @ ${presence.metadata.version}`)
					);
				}
			}

			if (deletedPresences.length) {
				deletedPresenceResult = database.deleteMany({
					name: { $in: deletedPresences.map(p => p.name) },
				});
				for (const presence of deletedPresences) {
					if (!presence?.name) continue;
					console.log(
						red(`DEL - "${presence.name}" @ ${presence.metadata.version}`)
					);
				}
			}

			if (updatedPresenceData.length) {
				updatedPresenceResult = database.bulkWrite(
					updatedPresenceData.map<AnyBulkWriteOperation<DBdata>>(newData => ({
						updateOne: {
							filter: { name: newData.name },
							update: { $set: newData },
						},
					}))
				);

				for (const presence of updatedPresenceData) {
					const [oldPresence] = outdatedPresences.find(
						([metadata]) => metadata.service === presence.name
					);

					console.log(
						yellow(
							`UPD - "${presence.name}": ${oldPresence.version} => ${presence.metadata.version}`
						)
					);
				}
			}

			//TODO: Webhook to Discord in case of failure ( exitCode 1 )
			await Promise.all([
				newPresenceResult,
				deletedPresenceResult,
				updatedPresenceResult,
			]);
			await client.close();
			process.exit(exitCode);
		} catch (err) {
			console.error(err.stack || err);
			process.exit(1);
		}
	};

main();

process.on("unhandledRejection", rejection => {
	console.error(rejection);
	process.exit(1);
});

process.on("uncaughtException", err => {
	console.error(err.stack || err);
	process.exit(1);
});

interface DBdata {
	name: string;
	url: string;
	metadata: Metadata;
	presenceJs: string;
	iframeJs?: string;
}
