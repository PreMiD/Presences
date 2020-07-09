import "source-map-support/register";

import { green, yellow } from "chalk";
import { readFileSync, writeFileSync } from "fs";
import { sync as glob } from "glob";
import { join, normalize, relative, resolve, sep } from "path";
import { format as prettier, resolveConfig } from "prettier";
import { coerce, inc } from "semver";
import execa = require("execa");

/**
 * Helper function to read any file as string
 * @param path Path to the file
 */
const readFile = (path: string): string =>
  readFileSync(path, { encoding: "utf8" });

/**
 * Helper function to write any data to disk
 * @param data Data to write
 * @param path Path to write the data to
 */
const writeFile = (path: string, data: string): void =>
  writeFileSync(path, data, { encoding: "utf8" });

/**
 * Helper function to read a JSON file into memory
 * @param jsonPath Path to the JSON file
 */
const readJson = <T>(jsonPath: string): T =>
  JSON.parse(readFile(jsonPath)) as T;

/**
 * Helper function to write a JSON file to disk
 * @param data The data to write to the JSON file
 * @param jsonPath The path to write the JSON file to
 */
const writeJson = <T>(data: T, jsonPath: string): void =>
  writeFileSync(jsonPath, JSON.stringify(data, null, 2), { encoding: "utf8" });

const prettify = async (): Promise<void> => {
  console.time("pretty_time");
  // Grab all TS files and JSON files
  const tsFiles = glob("./{websites,programs}/*/*/*.ts", {
    ignore: ["**/node_modules/**", "**/@types/**"],
    absolute: true
  });

  for (const fileToPrettify of tsFiles) {
    // Get the raw data from the file
    const fileContent = readFile(fileToPrettify);

    // Format the file using Prettier
    const formatted = prettier(fileContent, {
      ...(await resolveConfig(fileToPrettify)),
      filepath: fileToPrettify
    });

    // If the file content is not the same as the formatted content
    if (formatted !== fileContent) {
      // Write the file to the system
      writeFile(fileToPrettify, formatted);
      // And log the name with a green colour to indicate it did change
      console.log(green(relative(__dirname, fileToPrettify)));
    }
  }

  console.timeEnd("pretty_time");
};

const increaseSemver = async (filesToBump: string[]): Promise<void> => {
  console.time("semver_bump_time");

  if (filesToBump.length === 0) return;

  for (const [i, dir] of filesToBump.entries()) {
    // Normalize the path and seperate it on OS specific seperator
    const normalizedPath = normalize(dir).split(sep);

    // Pop off the presence/iframe.ts
    normalizedPath.pop();

    filesToBump[i] = normalizedPath.join(sep);
  }

  const directory = [...new Set(filesToBump)];

  for (const path of directory) {
    console.log(path);

    // Normalize the path and seperate it on OS specific seperator
    const normalizedPath = resolve(normalize(path)).split(sep);

    const metadataPath = join(
      normalizedPath.join(sep),
      "dist",
      "metadata.json"
    );
    const metadata = readJson<Metadata>(metadataPath);

    if (metadata && metadata.version) {
      const newVersion = inc(coerce(metadata.version), "patch");
      writeJson({ ...metadata, version: newVersion }, metadataPath);
    }
  }

  console.timeEnd("semver_bump_time");
};

// Main function that calls the other functions above
const main = async (): Promise<void> => {
  if (!process.env.GITHUB_ACTIONS)
    console.log(
      "\nPlease note that this script is ONLY supposed to run on a CI environment\n"
    );

  // A clear splitter before prettify
  console.log(
    yellow(
      [
        "|--------------------------------|",
        "| PROCEEDING TO PRETTIFY SOURCES |",
        "|--------------------------------|"
      ].join("\n")
    )
  );

  await prettify();

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
    .filter(
      (file) => file.includes("presence.ts") || file.includes("iframe.ts")
    );

  await increaseSemver(changedPresenceFiles);

  // Exit with the designated exit code to ensure the CI action fails or succeeds
  process.exit();
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
