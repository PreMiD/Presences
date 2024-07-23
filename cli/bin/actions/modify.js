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
import getFolderLetter from "../functions/getFolderLetter.js";
import getPresences from "../functions/getPresences.js";
import { prefix } from "../util/prefix.js";
import ModuleManager from "../util/ModuleManager.js";
import { watch } from "chokidar";
const program = new Command();
program
    .allowUnknownOption()
    .option("-m, --modify [presence]")
    .parse(process.argv);
let service = program.getOptionValue("modify");
if (typeof service !== "string") {
    service = (await prompts({
        name: "service",
        message: "Select or search for a presence to modify",
        type: "autocomplete",
        choices: (await getPresences()).map(s => ({
            title: s.service,
            description: "v" + s.version,
            value: s.service,
        })),
    })).service;
    if (!service)
        process.exit(0);
    service = service.trim();
}
else {
    service = service.trim();
    if (!(await getPresences())
        .map(s => ({
        title: s.service,
    }))
        .find(p => p.title.toLowerCase() ===
        service.replace("!", " ").trim().toLowerCase())) {
        console.log(prefix, chalk.redBright("Could not find presence:", service));
        process.exit(0);
    }
}
const require = createRequire(import.meta.url);
const presencePath = resolve(`./websites/${getFolderLetter(service)}/${service.replace("!", " ").trim()}`);
const moduleManager = new ModuleManager(presencePath);
await moduleManager.installDependencies();
if (!existsSync(resolve(presencePath, "tsconfig.json")))
    await cp(resolve(fileURLToPath(import.meta.url), "../../../template/tsconfig.json"), resolve(presencePath, "tsconfig.json"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FjdGlvbnMvbW9kaWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBd0IsTUFBTSxPQUFPLENBQUM7QUFFN0MsT0FBTyxFQUFZLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDcEMsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQzlCLE9BQU8sVUFBVSxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDdkMsT0FBTyxNQUFNLE1BQU0sbUJBQW1CLENBQUM7QUFDdkMsT0FBTyxlQUFlLE1BQU0saUNBQWlDLENBQUM7QUFDOUQsT0FBTyxZQUFZLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTNDLE9BQU8sYUFBYSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFakMsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQUM5QixPQUFPO0tBQ0wsa0JBQWtCLEVBQUU7S0FDcEIsTUFBTSxDQUFDLHlCQUF5QixDQUFDO0tBQ2pDLEtBQUss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