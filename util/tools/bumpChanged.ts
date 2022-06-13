import "source-map-support/register";

import { exec } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join, normalize, resolve, sep } from "node:path";
import { coerce, inc } from "semver";
import debug from "debug";
import axios from "axios";

const log = debug("BumpChanged");
debug.enable("BumpChanged*");

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string[]}
 * @return Promise<string>
 */
function execShellCommand(cmd: string[]) {
	return new Promise<string>(resolve => {
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
		writeFileSync(jsonPath, JSON.stringify(data, null, "\t"), {
			encoding: "utf8",
		}),
	increaseSemver = async (changedPresenceFiles: string[]): Promise<void> => {
		for (const path of changedPresenceFiles) {
			// Normalize the path and seperate it on OS specific seperator
			try {
				const normalizedPath = resolve(normalize(path)).split(sep),
					metadataPath = join(
						normalizedPath.join(sep),
						"dist",
						"metadata.json"
					),
					metadata = readJson<Metadata>(metadataPath),
					apiVersion = (
						await axios.post<{
							data: {
								presences: [{ metadata: { version: string } }];
							};
						}>("https://api.premid.app/v3", {
							query: `{
							presences(service: "${metadata.service}") {
								metadata {
									version
								}
							}
						}`,
						})
					).data.data.presences[0]?.metadata.version;

				if (metadata.version === apiVersion) {
					const newVersion = inc(coerce(metadata.version), "patch");
					writeJson({ ...metadata, version: newVersion }, metadataPath);
					console.log(path);
				}
			} catch (e) {
				console.error(e);
			}
		}
	},
	// Main function that calls the other functions above
	main = async (): Promise<void> => {
		log("Bumping versions...");

		// Use Git to check what files have changed after TypeScript compilation
		const changedPresenceFiles = (
			await execShellCommand(["git", "--no-pager", "diff", "--name-only"])
		)
			.split("\n")
			.filter(
				file =>
					file.includes("presence.ts") ||
					file.includes("iframe.ts") ||
					file.includes("metadata.json")
			);

		if (changedPresenceFiles.length === 0) return;

		for (const [i, dir] of changedPresenceFiles.entries()) {
			// Normalize the path and seperate it on OS specific seperator
			const normalizedPath = normalize(dir).split(sep);

			// Pop off the presence/iframe.ts/metadata.json
			normalizedPath.at(-1) === "metadata.json"
				? normalizedPath.splice(normalizedPath.length - 2, 2)
				: normalizedPath.pop();

			changedPresenceFiles[i] = normalizedPath.join(sep);
		}

		await increaseSemver([...new Set(changedPresenceFiles)]);

		log("Bumped versions in all changed files");
		// Exit with the designated exit code to ensure the CI action fails or succeeds
		process.exit();
	};

// Call main
main();
