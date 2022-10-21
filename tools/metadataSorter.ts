import "source-map-support/register.js";

import { readFile, writeFile } from "fs/promises";
import glob from "glob";

import { Metadata } from "./classes/PresenceCompiler.js";
import getLatestSchema from "./util/getLatestSchema.js";

const { url: latestSchema } = await getLatestSchema(),
	presences = glob.sync("websites/*/*/metadata.json");

for (const presence of presences) {
	const {
		altnames,
		author,
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
	} = JSON.parse(await readFile(presence, "utf8")) as Partial<Metadata>;

	await writeFile(
		presence,
		JSON.stringify(
			{
				$schema: latestSchema,
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
