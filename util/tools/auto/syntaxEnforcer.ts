import "source-map-support/register";

import { coerce, inc } from "semver";
import { yellow } from "chalk";
import { join, normalize, resolve, sep } from "path";
import { readFileSync, writeFileSync } from "fs";

import { exec } from "child_process";

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string[]}
 * @return Promise<string>
 */
function execShellCommand(cmd: string[]) {
  return new Promise<string>((resolve) => {
    exec(cmd.join(" "), (error, stdout, stderr) => {
      if (error) console.warn(error);

      resolve(stdout ? stdout : stderr);
    });
  });
}

/**
 * Helper function to read any file as string
 * @param path Path to the file
 */
const readFile = (path: string): string =>
    readFileSync(path, { encoding: "utf8" }),
  /**
   * Helper function to read a JSON file into memory
   * @param jsonPath Path to the JSON file
   */
  readJson = <T>(jsonPath: string): T => JSON.parse(readFile(jsonPath)) as T,
  /**
   * Helper function to write a JSON file to disk
   * @param data The data to write to the JSON file
   * @param jsonPath The path to write the JSON file to
   */
  writeJson = <T>(data: T, jsonPath: string): void =>
    writeFileSync(jsonPath, JSON.stringify(data, null, 2), {
      encoding: "utf8"
    }),
  increaseSemver = async (filesToBump: string[]): Promise<void> => {
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
      const normalizedPath = resolve(normalize(path)).split(sep),
        metadataPath = join(normalizedPath.join(sep), "dist", "metadata.json"),
        metadata = readJson<Metadata>(metadataPath);

      if (metadata && metadata.version) {
        const newVersion = inc(coerce(metadata.version), "patch");
        writeJson({ ...metadata, version: newVersion }, metadataPath);
      }
    }

    console.timeEnd("semver_bump_time");
  },
  // Main function that calls the other functions above
  main = async (): Promise<void> => {
    if (!process.env.GITHUB_ACTIONS) {
      console.log(
        "\nPlease note that this script is ONLY supposed to run on a CI environment\n"
      );
    }

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

    await execShellCommand(["yarn", "lint"]);

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
    const listOfChangedFiles = await execShellCommand([
        "git",
        "--no-pager",
        "diff",
        "--name-only"
      ]),
      changedPresenceFiles = listOfChangedFiles
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
