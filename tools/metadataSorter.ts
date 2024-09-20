import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";

import glob from "glob";

import { Metadata } from "./classes/PresenceCompiler.js";
import { getLatestSchema } from "./util.js";

const require = createRequire(import.meta.url),
	{ url: latestSchema } = await getLatestSchema(),
	presences = glob.sync("websites/*/*/metadata.json", { absolute: true });

for (const presence of presences) {
	const {
		altnames,
		author,
		apiVersion,
		category,
		color,
		contributors,
		description,
		iframe,
		iFrameRegExp,
		logo,
		readLogs,
		regExp,
		service,
		settings,
		thumbnail,
		tags,
		url,
		version,
	} = require(presence) as Metadata;

	await writeFile(
		presence,
		JSON.stringify(
			{
				$schema: latestSchema,
				apiVersion,
				author,
				contributors,
				service,
				altnames,
				description,
				url,
				regExp,
				version,
				logo,
				thumbnail,
				color,
				category,
				tags,
				iframe,
				iFrameRegExp,
				readLogs,
				settings,
			},
			null,
			"\t"
		)
	);
}
