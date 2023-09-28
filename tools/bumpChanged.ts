import { createRequire } from "node:module";
import { resolve } from "node:path";
import { writeFile } from "node:fs/promises";

import { coerce, inc } from "semver";

import PresenceCompiler, { Metadata } from "./classes/PresenceCompiler.js";
import { getDiff } from "./util.js";

const require = createRequire(import.meta.url),
	compiler = new PresenceCompiler(),
	changedPresences = getDiff();

for (const presence of changedPresences) {
	const presencePath = resolve(
			compiler.getPresenceFolder(presence),
			"metadata.json"
		),
		metadata = require(presencePath) as Metadata;

	await writeFile(
		presencePath,
		JSON.stringify(
			{
				...metadata,
				version: inc(coerce(metadata.version)!, "patch"),
			},
			null,
			"\t"
		)
	);
}
