import "source-map-support/register";

import { sync as glob } from "glob";
import { existsSync as exists } from "node:fs";
import { coerce, inc, valid } from "semver";

import { isValidJSON, type Metadata, readFile, writeJson } from "./util";

/*  NOTE: THIS IS A TOOL THAT IS ONLY MEANT TO BE USED
    BY THE DEVS AND REVIEWERS FOR DEPLOYMENT PURPOSES,
    PLEASE DON'T COMPILE OR RUN IT BEFORE MAKING A PULL
    REQUEST UNLESS YOU'VE BEEN EXPLICITLY INSTRUCTED BY
    A DEV TO DO SO, WHICH WILL MOST LIKELY NEVER HAPPEN.  */

const missingMetadata: string[] = glob("./{websites,programs}/*/*/").filter(
		pF => !exists(`${pF}/metadata.json`)
	),
	allmeta: Array<[Metadata, string]> = glob(
		"./{websites,programs}/*/*/*/metadata.json"
	).map(pF => {
		const file = readFile(pF);
		if (isValidJSON(file)) return [JSON.parse(file), pF];
		else {
			console.error(`Error. ${pF} is not a valid metadata file, skipping...`);
			return null;
		}
	});

function main() {
	if (missingMetadata?.length > 0) {
		console.log(
			`\nThe following presence${
				missingMetadata.length > 1 ? "s don't" : "doesn't"
			} include a metadata file :\n${missingMetadata.join(", ")}\n`
		);
	}

	for (const metadata of allmeta) {
		if (metadata) {
			const newData = metadata[0];
			if (newData.version && valid(coerce(newData.version))) {
				newData.version = inc(
					valid(coerce(newData.version)),
					"patch"
				) as Metadata["version"];
				writeJson(newData, metadata[1]);
			} else {
				console.log(
					`Error. ${
						metadata[0].service && metadata[0].service.length > 0
							? metadata[0].service
							: metadata[1]
					} does not include a valid metadata version, trying to overwrite...\n`
				);
				try {
					newData.version = "1.0.0";
					writeJson(newData, metadata[1]);
				} catch (err) {
					console.log(err);
					continue;
				}
			}
		}
	}
}

main();
