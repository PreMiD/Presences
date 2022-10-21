import "source-map-support/register.js";

import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { coerce, inc } from "semver";

import PresenceCompiler, { Metadata } from "./classes/PresenceCompiler.js";
import getDiff from "./util/getDiff.js";

const compiler = new PresenceCompiler(),
	changedPresences = getDiff();

for (const presence of changedPresences) {
	const presencePath = resolve(
			compiler.getPresenceFolder(presence),
			"metadata.json"
		),
		metadata = JSON.parse(await readFile(presencePath, "utf8")) as Metadata;

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
