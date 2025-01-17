import chalk from "chalk";
import { existsSync, readFileSync, readdirSync } from "fs";
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
import getPresences from "../functions/getPresences.js";
import { prefix } from "../util/prefix.js";
import ModuleManager from "../util/ModuleManager.js";
import { watch } from "chokidar";
const program = new Command();
program
    .allowUnknownOption()
    .option("-m, --modify [presence]")
    .parse(process.argv);
const serviceIncoming = program.getOptionValue("modify");
let service;
if (typeof serviceIncoming !== "string") {
    service = (await prompts({
        name: "service",
        message: "Select or search for a presence to modify",
        type: "autocomplete",
        choices: (await getPresences()).map(({ metadata: s, path, versioned }) => ({
            title: s.service,
            description: `v${s.version} ${versioned ? `(API v${s.apiVersion})` : ""}`,
            value: { service: s.service, path, versioned },
        })),
    })).service;
    if (!service)
        process.exit(0);
}
else {
    const foundPresences = (await getPresences()).filter(p => p.metadata.service.toLowerCase() ===
        serviceIncoming.replace("!", " ").trim().toLowerCase());
    if (foundPresences.length === 0) {
        console.log(prefix, chalk.redBright("Could not find presence:", serviceIncoming));
        process.exit(0);
    }
    if (foundPresences.length === 1) {
        service = {
            service: foundPresences[0].metadata.service,
            path: foundPresences[0].path,
            versioned: foundPresences[0].versioned,
        };
    }
    else {
        service = (await prompts({
            name: "service",
            message: "Select or search for a presence to modify",
            type: "autocomplete",
            choices: foundPresences.map(({ metadata: s, path, versioned }) => ({
                title: s.service,
                description: `v${s.version} (API v${s.apiVersion})`,
                value: { service: s.service, path, versioned },
            })),
        })).service;
        if (!service)
            process.exit(0);
    }
}
const require = createRequire(import.meta.url);
const presencePath = resolve(`./${service.path}`);
const moduleManager = new ModuleManager(presencePath);
await moduleManager.installDependencies();
if (!existsSync(resolve(presencePath, "tsconfig.json")))
    await cp(resolve(fileURLToPath(import.meta.url), `../../../template/tsconfig${service.versioned ? ".versioned" : ""}.json`), resolve(presencePath, "tsconfig.json"));
console.log(prefix, chalk.greenBright("Starting TypeScript compiler..."));
class Compiler {
    cwd;
    compiler = null;
    watching = null;
    firstRun = true;
    constructor(cwd) {
        this.cwd = cwd;
    }
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
                        else
                            r({});
                    });
                }),
                new CopyPlugin({
                    patterns: [
                        {
                            from: resolve(this.cwd, "metadata.json"),
                            to: "metadata.json",
                        },
                        {
                            from: resolve(this.cwd, `${service.service}.json`),
                            to: `${service.service}.json`,
                            noErrorOnMissing: true,
                        },
                    ],
                }),
                new webpack.WatchIgnorePlugin({
                    paths: [/\.js$/, /\.d\.[cm]ts$/],
                }),
                {
                    apply(compiler) {
                        compiler.hooks.emit.tap("PresenceCompiler", compilation => {
                            for (const file in compilation.assets) {
                                if (!file.endsWith(".js"))
                                    continue;
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
                            errorFormatter: (error, colors) => {
                                return (`${prefix} ${colors.cyan(basename(dirname(error.file)) + "/" + basename(error.file))}` +
                                    ":" +
                                    colors.yellowBright(error.line) +
                                    ":" +
                                    colors.yellowBright(error.character) +
                                    " - " +
                                    colors.redBright("Error ") +
                                    colors.gray("TS" + error.code + ":") +
                                    " " +
                                    ts.flattenDiagnosticMessageText(error.content, "\n"));
                            },
                        },
                    },
                ],
            },
            resolve: {
                extensions: [".ts"],
            },
            entry: async () => {
                const output = {
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
        this.compiler.hooks.afterCompile.tap("pmd", async (compilation) => {
            compilation.errors = compilation.errors.filter(e => e.name !== "ModuleBuildError");
            for (const error of compilation.errors) {
                if (error.name === "ModuleNotFoundError" &&
                    error.message.includes(resolve(this.cwd, "package.json"))) {
                    console.error(prefix, chalk.redBright("package.json not valid!"));
                    continue;
                }
                console.error(error.message);
            }
            if (compilation.errors.length === 0) {
                return console.log(prefix, chalk.greenBright("Successfully compiled!"));
            }
            else
                return console.log(prefix, chalk.redBright(`Failed to compile with ${compilation.errors.length} error${compilation.errors.length === 1 ? "" : "s"}!`));
        });
        await new Promise(r => (this.watching = this.compiler.watch({}, r)));
    }
    async stop() {
        this.watching?.suspend();
        if (this.watching)
            await new Promise(r => this.watching?.close(r));
    }
    async restart() {
        this.firstRun = true;
        await this.stop();
        await this.watch();
    }
}
const compiler = new Compiler(presencePath);
watch(presencePath, { depth: 0, persistent: true, ignoreInitial: true }).on("all", async (event, file) => {
    if (["add", "unlink"].includes(event) && basename(file) === "iframe.ts")
        return await compiler.restart();
    if (basename(file) === "package.json") {
        if (["add", "change"].includes(event) &&
            !(await moduleManager.isValidPackageJson()))
            return console.error(prefix, chalk.redBright("Invalid package.json!"));
        await compiler.stop();
        if ("change" === event)
            await moduleManager.installDependencies();
        else if (event === "unlink") {
            if (existsSync(resolve(presencePath, "node_modules")))
                rm(resolve(presencePath, "node_modules"), { recursive: true });
            if (existsSync(resolve(presencePath, "package-lock.json")))
                rm(resolve(presencePath, "package-lock.json"));
        }
        compiler.restart();
    }
});
compiler.watch();
const path = presencePath + "/dist";
let timeout;
watch(path).on("all", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        sendPresenceToExtension(path);
    }, 100);
});
let waiting = false;
async function sendPresenceToExtension(path) {
    if (!existsSync(path) || !socket.isConnected()) {
        if (waiting)
            return;
        waiting = true;
        setTimeout(() => {
            waiting = false;
            sendPresenceToExtension(path);
        }, 1000);
        return;
    }
    socket?.send(JSON.stringify({
        type: "localPresence",
        files: await Promise.all(readdirSync(path).map(f => {
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
            else
                return;
        })),
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FjdGlvbnMvbW9kaWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBd0IsTUFBTSxPQUFPLENBQUM7QUFFN0MsT0FBTyxFQUFZLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDcEMsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQzlCLE9BQU8sVUFBVSxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDdkMsT0FBTyxNQUFNLE1BQU0sbUJBQW1CLENBQUM7QUFDdkMsT0FBTyxZQUFZLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTNDLE9BQU8sYUFBYSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFakMsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQUM5QixPQUFPO0tBQ0wsa0JBQWtCLEVBQUU7S0FDcEIsTUFBTSxDQUFDLHlCQUF5QixDQUFDO0tBQ2pDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFF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