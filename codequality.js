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
