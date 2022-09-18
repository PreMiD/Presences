import "source-map-support/register";

import { existsSync, readFileSync } from "node:fs";
import axios from "axios";
import { blue, green, red, yellow } from "chalk";
import ParseJSON, { ObjectNode } from "json-to-ast";
import { validate } from "jsonschema";
import { compare, diff } from "semver";
import { createAnnotation, getChangedFolders, type Metadata } from "../util";

const latestMetadataSchema = async (): Promise<string[]> => {
		const versions = (
			(
				await axios.get(
					"https://api.github.com/repos/PreMiD/Schemas/contents/schemas/metadata"
				)
			).data as { name: string }[]
		)
			.filter(c => c.name.endsWith(".json"))
			.map(c => c.name.match(/\d.\d/g)[0]);
		return [
			`https://schemas.premid.app/metadata/${versions.at(-1)}`,
			versions.at(-1),
		];
	},
	stats = {
		validated: 0,
		validatedWithWarnings: 0,
		failedToValidate: 0,
	},
	versionBumpErrors = {
		invalidVerNew: () => 'The version of a new presence must start at "1.0.0"',
		versionNotBumped: (oldVersion: string, newVersion: string) =>
			`The current version (${newVersion}) of the presence has not been bumped. The latest published version is ${oldVersion}`,
		badVersionBump: (oldVersion: string, newVersion: string) =>
			`The current version (${newVersion}) of the presence was incorrectly bumped. The latest published version is ${oldVersion}.`,
	},
	isValidVersionBump = (newVer: string, oldVer?: string) => {
		if (!oldVer) {
			if (newVer !== "1.0.0") return "invalidVerNew";
			else return true;
		} else {
			try {
				const compared = compare(newVer, oldVer),
					newVerSplit = newVer.split(".").map(Number),
					oldVerSplit = oldVer.split(".").map(Number);
				if (compared !== 1) return "versionNotBumped";
				else {
					switch (diff(newVer, oldVer)) {
						case "major":
							if (
								!newVer.endsWith(".0.0") ||
								newVerSplit[0] - oldVerSplit[0] > 1
							)
								return "badVersionBump";
							else return true;
						case "minor":
							if (!newVer.endsWith(".0") || newVerSplit[1] - oldVerSplit[1] > 1)
								return "badVersionBump";
							else return true;
						case "patch":
							if (newVerSplit[2] - oldVerSplit[2] > 1) return "badVersionBump";
							else return true;
						default:
							return true;
					}
				}
			} catch {
				return false;
			}
		}
	},
	validated = (service: string): void => {
		console.log(green(`✔ ${service}`));
		stats.validated++;
	},
	validatedWithWarnings = (service: string, warning: string): void => {
		console.log(yellow(`✔ ${service}`));
		console.log(warning);
		stats.validatedWithWarnings++;
	},
	failedToValidate = (service: string, errors: string[]): void => {
		console.log(`::group::${red(`✖ ${service}`)}`);
		console.log(errors.join("\n"));
		console.log("::endgroup::");
		stats.failedToValidate++;
	},
	loadMetadata = (path: string): [Metadata | null, string?] => {
		try {
			const metaFile = readFileSync(path, "utf8");
			return [JSON.parse(metaFile), metaFile];
		} catch {
			return [null];
		}
	};

(async (): Promise<void> => {
	console.log(blue("Getting changed files..."));

	const changedFolders = await getChangedFolders().then(f =>
			f
				//TODO: Add support for programs in the future
				.filter(p => p.includes("websites/"))
		),
		changedMetaFiles = changedFolders.map(p => (p += "/dist/metadata.json"));

	console.log(blue("Getting latest schema..."));

	const [latestSchema, latestSchemaVersion] = await latestMetadataSchema(),
		schema = (await axios.get(latestSchema)).data;

	if (!changedMetaFiles.length) {
		console.log(blue("There are no presences to validate, exiting..."));
		process.exit(0);
	}

	console.log(
		blue(`Beginning validation of ${changedMetaFiles.length} presences...`)
	);

	for (const [index, metaFile] of changedMetaFiles.entries()) {
		const [meta, rawMeta] = loadMetadata(metaFile),
			folder = metaFile.split("/")[2];

		if (!meta) {
			failedToValidate(folder, [
				createAnnotation({
					type: "error",
					file: metaFile,
					title: "Invalid JSON",
					message: "Unable to parse the JSON file",
				}),
			]);
			continue;
		}

		const { service, version: newVersion } = meta,
			result = validate(meta, schema),
			{ langFiles, presences } = (
				await axios.post<APIQuery>("https://api.premid.app/v3", {
					query: `{
              presences(service: "${service}") {
                metadata {
                  version
                }
              }
              langFiles(project: "presence") {
                lang
              }
            }`,
				})
			).data.data,
			validLangs = langFiles.map(l => l.lang),
			oldVersion = presences[0]?.metadata.version,
			invalidLangs: string[] = [],
			versionCheck = isValidVersionBump(newVersion, oldVersion),
			iFrameExists = existsSync(changedFolders[index] + "/iframe.ts");

		// Get all invalid langs
		Object.keys(meta.description).forEach(lang => {
			const index = validLangs.findIndex((l: string) => l === lang);
			if (!~index) invalidLangs.push(lang);
		});

		// Check if schema is up to date
		if (
			versionCheck === true &&
			folder === meta.service &&
			!invalidLangs.length &&
			result.valid &&
			iFrameExists === !!meta.iframe
		) {
			if (meta.$schema !== latestSchema) {
				validatedWithWarnings(
					service,
					createAnnotation({
						type: "warning",
						file: metaFile,
						line: getLine("$schema"),
						title: "instance.$schema",
						message: `Using out of date schema, the latest version is ${latestSchemaVersion}`,
					})
				);
			} else validated(service);
		} else {
			const errors: string[] = [];

			// Check if version is correct
			if (typeof versionCheck === "string") {
				errors.push(
					createAnnotation({
						type: "error",
						file: metaFile,
						line: getLine("version"),
						title: "instance.version",
						message: versionBumpErrors[versionCheck](oldVersion, newVersion),
					})
				);
			}

			// Check if service name matches folder name
			if (folder !== service) {
				errors.push(
					createAnnotation({
						type: "error",
						file: metaFile,
						line: getLine("service"),
						title: "instance.service",
						message: "does not equal to the folder name",
					})
				);
			}

			// Check if iframe is correct
			if (meta.iframe && !iFrameExists) {
				errors.push(
					createAnnotation({
						type: "error",
						file: metaFile,
						line: getLine("iframe"),
						title: "instance.iframe",
						message: "Property was set to true but no iframe.ts file was found",
					})
				);
			} else if (!meta.iframe && iFrameExists) {
				errors.push(
					createAnnotation({
						type: "error",
						file: metaFile,
						line: getLine("iframe"),
						title: "instance.iframe",
						message:
							"iframe.ts file was found but instance.iframe was not set to true",
					})
				);
			}

			// Write all schema validation errors
			for (const error of result.errors) {
				let property = error.property.split(".").at(1) as key;

				if (!property) {
					property = error.message.match(/"(.*)"/).at(1) as key;
					errors.push(
						createAnnotation({
							type: "error",
							file: metaFile,
							line: getLine(property),
							title: `instance.${property}`,
							message: `${error.message} @ ${error.property}`,
						})
					);
				} else {
					const messsage = property.match(/(.*)\[([0-9]+)\]/);

					if (messsage) {
						const [propertyName, index] = messsage.slice(1);

						errors.push(
							createAnnotation({
								type: "error",
								file: metaFile,
								line: getLine(propertyName as key, parseInt(index)),
								title: error.property,
								message: `${error.message} @ ${error.property}`,
							})
						);
					} else {
						errors.push(
							createAnnotation({
								type: "error",
								file: metaFile,
								line: getLine(property),
								title: error.property,
								message: `${error.message} @ ${error.property}`,
							})
						);
					}
				}
			}

			// Write all invalid lang errors
			for (const invalidLang of invalidLangs) {
				errors.push(
					createAnnotation({
						type: "error",
						file: metaFile,
						line: getLine("description", invalidLang),
						title: `instance.description.${invalidLang}`,
						message: `"${invalidLang}" is not a valid language or is a unsupported language`,
					})
				);
			}

			failedToValidate(service, errors);
		}

		function getLine(line: key, value?: string | number) {
			const AST = ParseJSON(rawMeta, {
				loc: true,
				source: metaFile,
			}) as ObjectNode;

			if (value) {
				const node = AST.children.find(c => c.key.value === line).value;

				switch (node.type) {
					case "Literal":
						return node.loc.start.line;
					case "Object":
						return node.children.find(c => c.key.value === value).loc.start
							.line;
					case "Array": {
						if (typeof value === "number")
							return node.children[value].loc.start.line;
						else {
							return node.children.find(c => {
								switch (c.type) {
									case "Literal":
										return c.value === value;
									case "Object":
										return c.children.find(c => c.key.value === value);
								}
							}).loc.start.line;
						}
					}
				}
			} else
				return (
					AST.children.find(c => c.key.value === line)?.loc?.start?.line ?? 0
				);
		}
	}

	console.log();
	console.log(blue("Statistics:"));
	console.log(
		green(`${stats.validated} fully validated\n`) +
			yellow(`${stats.validatedWithWarnings} validated, but with warnings\n`) +
			red(`${stats.failedToValidate} failed to validate`)
	);
	console.log();

	if (stats.failedToValidate > 0) {
		console.log(red("One or more services failed to validate."));
		process.exit(-1);
	}

	if (stats.validatedWithWarnings > 0)
		console.log(yellow("One or more services validated, but with warnings."));
})();

type key = keyof Metadata;

interface APIQuery {
	data: {
		presences: [
			{
				metadata: {
					version: string;
				};
			}
		];
		langFiles: [
			{
				lang: string;
			}
		];
	};
}
