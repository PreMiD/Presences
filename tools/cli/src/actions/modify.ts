import chalk, { ChalkInstance } from "chalk";

import { PathLike, existsSync, readFileSync, readdirSync } from "fs";
import { cp, rm } from "fs/promises";
import { basename, dirname, extname, resolve } from "path";

import { Command } from "commander";
import prompts from "prompts";
import ts from "typescript";
import { fileURLToPath } from "url";
import webpack from "webpack";
import CopyPlugin from "copy-webpack-plugin";
import { createRequire } from "module";
import socket from "../util/socket.js";
import getFolderLetter from "../functions/getFolderLetter.js";
import getPresences from "../functions/getPresences.js";
import { prefix } from "../util/prefix.js";
import { ErrorInfo } from "ts-loader/dist/interfaces.js";
import ModuleManager from "../util/ModuleManager.js";
import { watch } from "chokidar";

const program = new Command();
program
	.allowUnknownOption()
	.option("-m, --modify [presence]")
	.parse(process.argv);

let service = program.getOptionValue("modify");

if (typeof service !== "string") {
	service = (
		await prompts({
			name: "service",
			message: "Select or search for a presence to modify",
			type: "autocomplete",
			choices: (
				await getPresences()
			).map(s => ({
				title: s.service,
				description: "v" + s.version,
				value: s.service,
			})),
		})
	).service;

	if (!service) process.exit(0);
	service = service.trim();
} else {
	//check if the requested presence (-m [presence]) exists
	service = service.trim();
	if (
		!(await getPresences())
			.map(s => ({
				title: s.service,
			}))
			.find(
				p =>
					p.title.toLowerCase() ===
					service.replace("!", " ").trim().toLowerCase()
			)
	) {
		console.log(prefix, chalk.redBright("Could not find presence:", service));
		process.exit(0);
	}
}

const require = createRequire(import.meta.url);
const presencePath = resolve(
	`./websites/${getFolderLetter(service)}/${service.replace("!", " ").trim()}`
);

const moduleManager = new ModuleManager(presencePath);

await moduleManager.installDependencies();

if (!existsSync(resolve(presencePath, "tsconfig.json")))
	await cp(
		resolve(fileURLToPath(import.meta.url), "../../../template/tsconfig.json"),
		resolve(presencePath, "tsconfig.json")
	);

console.log(prefix, chalk.greenBright("Starting TypeScript compiler..."));

class Compiler {
	private compiler: webpack.Compiler | null = null;
	private watching: webpack.Watching | null = null;
	public firstRun = true;

	constructor(private cwd: string) {}

	async watch() {
		this.compiler = webpack({
			mode: "none",
			resolveLoader: {
				modules: [
					fileURLToPath(new URL("../../node_modules", import.meta.url)),
				],
			},
			devtool: "inline-source-map",
			plugins: [
				new webpack.DynamicEntryPlugin(this.cwd, async () => {
					return new Promise(r => {
						if (existsSync(resolve(this.cwd, "iframe.ts")))
							r({
								"iframe.js": {
									filename: "iframe.js",
									baseUri: this.cwd,
									import: ["./iframe.ts"],
								},
							});
						else r({});
					});
				}),
				new CopyPlugin({
					patterns: [
						{
							from: resolve(this.cwd, "metadata.json"),
							to: "metadata.json",
						},
					],
				}),
				new webpack.WatchIgnorePlugin({
					paths: [/\.js$/, /\.d\.[cm]ts$/],
				}),
				{
					apply(compiler) {
						compiler.hooks.emit.tap("PresenceCompiler", compilation => {
							//* Add empty line after file content to prevent errors from PreMiD
							for (const file in compilation.assets) {
								//* Check if file is a .js file
								if (!file.endsWith(".js")) continue;
								//@ts-expect-error - This is defined. (ConcatSource class)
								compilation.assets[file].add("\n");
							}
						});
					},
				},
			],
			module: {
				rules: [
					{
						test: /\.ts$/,
						loader: require.resolve("ts-loader"),
						exclude: /node_modules/,
						options: {
							onlyCompileBundledFiles: true,
							errorFormatter: (error: ErrorInfo, colors: ChalkInstance) => {
								return (
									`${prefix} ${colors.cyan(
										basename(dirname(error.file!)) + "/" + basename(error.file!)
									)}` +
									":" +
									colors.yellowBright(error.line) +
									":" +
									colors.yellowBright(error.character) +
									" - " +
									colors.redBright("Error ") +
									colors.gray("TS" + error.code + ":") +
									" " +
									ts.flattenDiagnosticMessageText(error.content, "\n")
								);
							},
						},
					},
				],
			},
			resolve: {
				extensions: [".ts"],
			},
			entry: async () => {
				const output: Record<string, string> = {
					presence: resolve(this.cwd, "presence.ts"),
				};

				return output;
			},
			output: {
				path: resolve(this.cwd, "dist"),
				filename: "[name].js",
				iife: false,
				clean: true,
			},
		});

		this.compiler.hooks.compile.tap("pmd", () => {
			if (!this.firstRun)
				console.log(prefix, chalk.yellowBright("Recompiling..."));

			this.firstRun = false;
		});

		this.compiler.hooks.afterCompile.tap("pmd", async compilation => {
			compilation.errors = compilation.errors.filter(
				e => e.name !== "ModuleBuildError"
			);

			for (const error of compilation.errors) {
				if (
					error.name === "ModuleNotFoundError" &&
					error.message.includes(resolve(this.cwd, "package.json"))
				) {
					console.error(prefix, chalk.redBright("package.json not valid!"));
					continue;
				}

				console.error(error.message);
			}

			if (compilation.errors.length === 0) {
				return console.log(prefix, chalk.greenBright("Successfully compiled!"));
			} else
				return console.log(
					prefix,
					chalk.redBright(
						`Failed to compile with ${compilation.errors.length} error${
							compilation.errors.length === 1 ? "" : "s"
						}!`
					)
				);
		});

		await new Promise(r => (this.watching = this.compiler!.watch({}, r)));
	}

	async stop() {
		this.watching?.suspend();
		if (this.watching) await new Promise(r => this.watching?.close(r));
	}

	async restart() {
		this.firstRun = true;
		await this.stop();
		await this.watch();
	}
}

const compiler = new Compiler(presencePath);

watch(presencePath, { depth: 0, persistent: true, ignoreInitial: true }).on(
	"all",
	async (event, file) => {
		if (["add", "unlink"].includes(event) && basename(file) === "iframe.ts")
			return await compiler.restart();

		if (basename(file) === "package.json") {
			if (
				["add", "change"].includes(event) &&
				!(await moduleManager.isValidPackageJson())
			)
				return console.error(prefix, chalk.redBright("Invalid package.json!"));

			await compiler.stop();

			if ("change" === event) await moduleManager.installDependencies();
			else if (event === "unlink") {
				if (existsSync(resolve(presencePath, "node_modules")))
					rm(resolve(presencePath, "node_modules"), { recursive: true });
				if (existsSync(resolve(presencePath, "package-lock.json")))
					rm(resolve(presencePath, "package-lock.json"));
			}

			compiler.restart();
		}
	}
);

compiler.watch();

const path = presencePath + "/dist";
let timeout: NodeJS.Timeout;
watch(path).on("all", () => {
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		sendPresenceToExtension(path);
	}, 100);
});
let waiting = false;
async function sendPresenceToExtension(path: PathLike) {
	if (!existsSync(path) || !socket.isConnected()) {
		if (waiting) return;
		waiting = true;
		setTimeout(() => {
			waiting = false;
			sendPresenceToExtension(path);
		}, 1000);
		return;
	}
	socket?.send(
		JSON.stringify({
			type: "localPresence",
			files: await Promise.all(
				readdirSync(path).map(f => {
					if (extname(f) === ".json")
						return {
							file: f,
							contents: JSON.parse(readFileSync(`${path}/${f}`).toString()),
						};
					else if (extname(f) === ".js")
						return {
							file: f,
							contents: readFileSync(`${path}/${f}`).toString(),
						};
					else return;
				})
			),
		})
	);
}
