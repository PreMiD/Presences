"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const execa_1 = __importDefault(require("execa"));
const fs_1 = require("fs");
const glob_1 = require("glob");
const path_1 = require("path");
const prettier_1 = require("prettier");
const semver_1 = require("semver");
const typescript_1 = require("typescript");
let finalExitCode = 0;
const readFile = (path) => fs_1.readFileSync(path, { encoding: "utf8" });
const writeFile = (data, path) => fs_1.writeFileSync(path, data, { encoding: "utf8" });
const readJson = (jsonPath) => JSON.parse(readFile(jsonPath));
const writeJson = (data, jsonPath) => fs_1.writeFileSync(jsonPath, JSON.stringify(data, null, 2), { encoding: "utf8" });
const compileFile = (fileNames, options) => {
    let program = typescript_1.createProgram(fileNames, options);
    let emitResult = program.emit();
    let allDiagnostics = typescript_1.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
    allDiagnostics.forEach((diagnostic) => {
        if (diagnostic.file) {
            let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
            let message = typescript_1.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        }
        else {
            console.log(typescript_1.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });
    if (finalExitCode === 0) {
        finalExitCode = emitResult.emitSkipped ? 1 : 0;
    }
};
const prettify = async () => {
    console.time("pretty_time");
    const jsFiles = glob_1.sync("**/*.js", {
        ignore: ["**/node_modules/**", "**/@types/**"],
        absolute: true
    });
    const tsFiles = glob_1.sync("**/*.ts", {
        ignore: ["**/node_modules/**", "**/@types/**"],
        absolute: true
    });
    const jsonFiles = glob_1.sync("**/{metadata,tsconfig}.json", {
        ignore: ["**/node_modules/**", "**/@types/**"],
        absolute: true
    });
    const jsFilesToPrettify = [];
    for (const file of jsFiles) {
        const normalizedPath = path_1.normalize(file).split(path_1.sep);
        if (normalizedPath.indexOf("dist") === -1)
            continue;
        normalizedPath.splice(-2, 2);
        const filesInDist = fs_1.readdirSync(path_1.resolve(normalizedPath.join(path_1.sep)));
        if (filesInDist.includes("presence.ts"))
            continue;
        jsFilesToPrettify.push(`${file}`);
    }
    const filesToPrettify = [
        ...tsFiles,
        ...jsFilesToPrettify,
        ...jsonFiles
    ];
    for (const fileToPrettify of filesToPrettify) {
        const fileContent = readFile(fileToPrettify);
        const formatted = prettier_1.format(fileContent, {
            ...(await prettier_1.resolveConfig(fileToPrettify)),
            filepath: fileToPrettify
        });
        if (formatted === fileContent) {
            console.log(chalk_1.gray(path_1.relative(__dirname, fileToPrettify)));
        }
        else {
            writeFile(fileToPrettify, formatted);
            console.log(chalk_1.green(path_1.relative(__dirname, fileToPrettify)));
        }
    }
    console.timeEnd("pretty_time");
};
const compileTypeScript = async (filesToCompile) => {
    console.time("compile_time");
    const premidTypings = path_1.join(__dirname, "@types", "premid", "index.d.ts");
    const { compilerOptions: baseTsConfig } = readJson(path_1.resolve(__dirname, "tsconfig.json"));
    for (const fileToCompile of filesToCompile) {
        const normalizedPath = path_1.normalize(fileToCompile).split(path_1.sep);
        normalizedPath.pop();
        const { compilerOptions: presenceConfig } = readJson(path_1.resolve(normalizedPath.join(path_1.sep), "tsconfig.json"));
        const tsConfig = {
            ...baseTsConfig,
            ...presenceConfig,
            outDir: path_1.resolve(normalizedPath.join(path_1.sep), "dist"),
            types: ["node"]
        };
        compileFile([fileToCompile, premidTypings], tsConfig);
    }
    console.timeEnd("compile_time");
};
const increaseSemver = async (filesToBump) => {
    console.time("semver_bump_time");
    for (const file of filesToBump) {
        const normalizedPath = path_1.resolve(path_1.normalize(file)).split(path_1.sep);
        normalizedPath.pop();
        const metadataPath = path_1.join(normalizedPath.join(path_1.sep), "metadata.json");
        const metadata = readJson(metadataPath);
        const newVersion = semver_1.valid(semver_1.coerce(semver_1.inc(metadata.version, "patch")));
        writeJson({ ...metadata, version: newVersion }, metadataPath);
    }
    console.timeEnd("semver_bump_time");
};
const main = async () => {
    await prettify();
    const { stdout: listOfPrettifiedFiles } = await execa_1.default("git", [
        "--no-pager",
        "diff",
        "--name-only"
    ]);
    const changedTypeScriptFiles = listOfPrettifiedFiles
        .split("\n")
        .filter((file) => file.includes("presence.ts"));
    console.log(chalk_1.yellow([
        "|------------------------------------|",
        "| PROCEEDING TO COMPILING TYPESCRIPT |",
        "|------------------------------------|"
    ].join("\n")));
    await compileTypeScript(changedTypeScriptFiles);
    console.log(chalk_1.yellow([
        "|----------------------------|",
        "| PROCEEDING TO SEMVER BUMPS |",
        "|----------------------------|"
    ].join("\n")));
    const { stdout: listOfChangedFiles } = await execa_1.default("git", [
        "--no-pager",
        "diff",
        "--name-only"
    ]);
    const changedPresenceFiles = listOfChangedFiles
        .split("\n")
        .filter((file) => file.includes("presence.js"));
    await increaseSemver(changedPresenceFiles);
    console.log(finalExitCode === 0
        ? chalk_1.blueBright("Process finished successfully")
        : chalk_1.red(`Process failed!`));
    process.exit(finalExitCode);
};
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZXF1YWxpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2RlcXVhbGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGlDQUE2RDtBQUM3RCxrREFBMEI7QUFDMUIsMkJBQThEO0FBQzlELCtCQUFvQztBQUNwQywrQkFBK0Q7QUFDL0QsdUNBQTZEO0FBQzdELG1DQUE0QztBQUM1QywyQ0FLb0I7QUFHcEIsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBTXRCLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxpQkFBWSxDQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBTzVFLE1BQU0sU0FBUyxHQUFHLENBQUksSUFBTyxFQUFFLElBQVksRUFBRSxFQUFFLENBQzdDLGtCQUFhLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBTWxELE1BQU0sUUFBUSxHQUFHLENBQUksUUFBZ0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQU0sQ0FBQztBQU85RSxNQUFNLFNBQVMsR0FBRyxDQUFJLElBQU8sRUFBRSxRQUFnQixFQUFFLEVBQUUsQ0FDakQsa0JBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFNL0UsTUFBTSxXQUFXLEdBQUcsQ0FBQyxTQUFtQixFQUFFLE9BQXdCLEVBQVEsRUFBRTtJQUMxRSxJQUFJLE9BQU8sR0FBRywwQkFBYSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFaEMsSUFB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