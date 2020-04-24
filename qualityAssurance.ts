/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { blueBright, green, red, yellow } from "chalk";
import execa = require("execa");
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { sync as glob } from "glob";
import { join, normalize, relative, resolve, sep } from "path";
import { format as prettier, resolveConfig } from "prettier";
import { coerce, inc, valid } from "semver";
import {
  CompilerOptions,
  createProgram,
  flattenDiagnosticMessageText,
  getPreEmitDiagnostics
} from "typescript";

/** Tracker to keep track of the exit code that the CI action should exit with */
let finalExitCode = 0;

/**
 * Helper function to read a JSON file into memory
 * @param jsonPath Path to the JSON file
 */
const readJson = <T>(jsonPath: string) => {
  if (isValidJSON(jsonPath)) {
    return JSON.parse(readFileSync(jsonPath, { encoding: "utf8" })) as T;
  } else {
    console.log(
      red(`Unable to parse ${jsonPath ? jsonPath : "an unknown file"}`)
    );

    finalExitCode = 1;
  }
};

/**
 * Helper function to validate JSON data
 * @param path JSON path
 */
function isValidJSON(path: string) {
  try {
    JSON.parse(readFileSync(path, { encoding: "utf8" }));
    return true;
  } catch {
    return false;
  }
}

/**
 * Helper function to write a JSON file to disk
 * @param data The data to write to the JSON file
 * @param jsonPath The path to write the JSON file to
 */
const writeJson = <T>(data: T, jsonPath: string) =>
  writeFileSync(jsonPath, JSON.stringify(data, null, 2), { encoding: "utf8" });

/**
 * Minimal TypeScript compiler
 * @see https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler
 */
const compileFile = (fileNames: string[], options: CompilerOptions): void => {
  const program = createProgram(fileNames, options);
  const emitResult = program.emit();

  const allDiagnostics = getPreEmitDiagnostics(program).concat(
    emitResult.diagnostics
  );

  allDiagnostics.forEach((diagnostic) => {
    if (diagnostic.file) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start!
      );
      const message = flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n"
      );
      console.log(
        `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
      );
    } else {
      console.log(flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    }
  });

  // If the current exit code is 0
  if (finalExitCode === 0) {
    // And the compilation failed then set exit code to 1, otherwise keep it 0
    finalExitCode = emitResult.emitSkipped ? 1 : 0;
  }
};

const prettify = async () => {
  console.time("pretty_time");
  // Grab all JS files, TS files and JSON files
  const jsFiles = glob("**/*.js", {
    ignore: ["**/node_modules/**", "**/@types/**"],
    absolute: true
  });
  const tsFiles = glob("**/*.ts", {
    ignore: ["**/node_modules/**", "**/@types/**"],
    absolute: true
  });

  // Analyze which JS files actually should receive prettification
  const jsFilesToPrettify = [];
  for (const file of jsFiles) {
    // Normalize the path and seperate it on OS specific seperator
    const normalizedPath = normalize(file).split(sep);

    // If the file is not in a dist directory, ignore it
    if (normalizedPath.indexOf("dist") === -1) continue;

    // Splice off the presence.js and dist folder
    normalizedPath.splice(-2, 2);

    // Scan the files in the Presence service folder
    const filesInDist = readdirSync(resolve(normalizedPath.join(sep)));

    // If there is a source TypeScript file then ignore this JS file
    if (filesInDist.includes("presence.ts")) continue;

    // Add the file to the queue to prettify
    jsFilesToPrettify.push(`${file}`);
  }

  // Concatenate all the files to prettify
  const filesToPrettify: string[] = [...tsFiles, ...jsFilesToPrettify];

  for (const fileToPrettify of filesToPrettify) {
    // Get the raw data from the file
    const fileContent = readFileSync(fileToPrettify, { encoding: "utf8" });

    // Format the file using Prettier
    const formatted = prettier(fileContent, {
      ...(await resolveConfig(fileToPrettify)),
      filepath: fileToPrettify
    });

    // If the file content isn't the same as the formatted content
    if (formatted !== fileContent) {
      // Write the file to the system
      writeFileSync(fileToPrettify, formatted, { encoding: "utf8" });
      // And log the name with a green colour to indicate it did change
      console.log(green(relative(__dirname, fileToPrettify)));
    }
  }

  console.timeEnd("pretty_time");
};

const compileTypeScript = async (filesToCompile: string[]) => {
  console.time("compile_time");

  // Get the path to the typings for PreMiD
  const premidTypings = join(__dirname, "@types", "premid", "index.d.ts");

  // Read the root tsconfig.json for baseTsConfig
  const { compilerOptions: baseTsConfig } = readJson<{
    compilerOptions: CompilerOptions;
  }>(resolve(__dirname, "tsconfig.json"));

  for (const fileToCompile of filesToCompile) {
    // Normalize the path and seperate it on OS specific seperator
    const normalizedPath = normalize(fileToCompile).split(sep);

    // Pop off the presence.ts
    normalizedPath.pop();

    // Resolve the Presence specific tsconfig
    const { compilerOptions: presenceConfig } = readJson<{
      compilerOptions: CompilerOptions;
    }>(resolve(normalizedPath.join(sep), "tsconfig.json"));

    // Merge baseTsConfig and presenceConfig and overwrite the outDir and types
    const tsConfig: CompilerOptions = {
      ...baseTsConfig,
      ...presenceConfig,
      outDir: resolve(normalizedPath.join(sep), "dist"),
      types: ["node"]
    };

    // Send the file off to the compiler
    compileFile([fileToCompile, premidTypings], tsConfig);
  }

  console.timeEnd("compile_time");
};

const increaseSemver = async (filesToBump: string[]) => {
  console.time("semver_bump_time");

  for (const file of filesToBump) {
    console.log(file);
    // Normalize the path and seperate it on OS specific seperator
    const normalizedPath = resolve(normalize(file)).split(sep);

    // Pop off the presence.js
    normalizedPath.pop();

    const metadataPath = join(normalizedPath.join(sep), "metadata.json");
    const metadata = readJson<Metadata>(metadataPath);

    if (metadata && metadata.version) {
      const newVersion = valid(coerce(inc(metadata.version, "patch")));

      writeJson({ ...metadata, version: newVersion }, metadataPath);
    }
  }

  console.timeEnd("semver_bump_time");
};

// Main function that calls the other functions above
const main = async () => {
  await prettify();

  // Use Git to check what files have changed after prettification
  const { stdout: listOfPrettifiedFiles } = await execa("git", [
    "--no-pager",
    "diff",
    "--name-only"
  ]);
  const changedTypeScriptFiles = listOfPrettifiedFiles
    .split("\n")
    .filter((file) => file.includes("presence.ts"));

  // A clear splitter between prettification and TypeScript compilation
  console.log(
    yellow(
      [
        "|------------------------------------|",
        "| PROCEEDING TO COMPILING TYPESCRIPT |",
        "|------------------------------------|"
      ].join("\n")
    )
  );

  await compileTypeScript(changedTypeScriptFiles);

  // A clear splitter between TypeScript compilation and semver bumps
  console.log(
    yellow(
      [
        "|----------------------------|",
        "| PROCEEDING TO SEMVER BUMPS |",
        "|----------------------------|"
      ].join("\n")
    )
  );

  // Use Git to check what files have changed after TypeScript compilation
  const { stdout: listOfChangedFiles } = await execa("git", [
    "--no-pager",
    "diff",
    "--name-only"
  ]);
  const changedPresenceFiles = listOfChangedFiles
    .split("\n")
    .filter((file) => file.includes("presence.js"));

  await increaseSemver(changedPresenceFiles);

  // Show the final result of the main process
  console.log(
    finalExitCode === 0
      ? blueBright("Process finished successfully")
      : red(`Process failed!`)
  );

  // Exit with the designated exit code to ensure the CI action fails or succeeds
  process.exit(finalExitCode);
};

// Call main
main();

/** Typings for the Metadata JSON file */
interface Metadata {
  author: { name: string; id: string };
  contributors?: Array<{ name: string; id: string }>;
  service: string;
  description: Record<string, string>;
  url: string;
  version: string;
  logo: string;
  thumbnail: string;
  color: string;
  tags: string | Array<string>;
  category: string;
  iframe?: boolean;
  regExp?: RegExp;
  iframeRegExp?: RegExp;
  button?: boolean;
  warning?: boolean;
  settings?: Array<{
    id: string;
    title: string;
    icon: string;
    if?: Record<string, string>;
    placeholder?: string;
    value?: string | number | boolean;
    values?: Array<string | number | boolean>;
  }>;
}