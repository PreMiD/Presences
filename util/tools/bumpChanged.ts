import "source-map-support/register";

import { join, normalize, resolve, sep } from "node:path";
import { coerce, inc } from "semver";
import debug from "debug";
import axios from "axios";
import { getChangedFolders, readJson, writeJson } from "./util";

const log = debug("BumpChanged");
debug.enable("BumpChanged*");

/**
 * Helper function to read any file as string
 * @param path Path to the file
 */
async function increaseSemver(changedPresenceFiles: string[]): Promise<void> {
	for (const path of changedPresenceFiles) {
		// Normalize the path and seperate it on OS specific seperator
		try {
			const normalizedPath = resolve(normalize(path)).split(sep),
				metadataPath = join(normalizedPath.join(sep), "dist", "metadata.json"),
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
}

// Main function that calls the other functions above
async function main(): Promise<void> {
	log("Bumping versions...");

	const changedPresenceFiles = await getChangedFolders();

	await increaseSemver(changedPresenceFiles);

	log("Bumped versions in all changed files");
	// Exit with the designated exit code to ensure the CI action fails or succeeds
	process.exit();
}

// Call main
main();
