import "source-map-support/register";

import axios from "axios";
import { sync as glob } from "glob";
import { existsSync as exists } from "node:fs";

import { isValidJSON, type Metadata, readFile, writeJson } from "./util";

const missingMetadata: string[] = glob("./{websites,programs}/*/*/").filter(
		pF => !exists(`${pF}/metadata.json`)
	),
	allmeta: [Metadata, string][] = glob(
		"./{websites,programs}/*/*/metadata.json"
	).reduce((result, pF) => {
		const file = readFile(pF);
		if (isValidJSON(file)) result.push([JSON.parse(file), pF]);
		else
			console.error(`Error. ${pF} is not a valid metadata file, skipping...`);

		return result;
	}, []),
	latestMetadataSchema = async () => {
		const latestVersion = (
			(
				await axios.get(
					"https://api.github.com/repos/PreMiD/Schemas/contents/schemas/metadata"
				)
			).data as { name: string }[]
		)
			.filter(c => c.name.endsWith(".json"))
			.map(c => c.name.match(/\d.\d/g)[0])
			.pop() as `${number}.${number}`;
		return `https://schemas.premid.app/metadata/${latestVersion}` as const;
	};

if (missingMetadata?.length > 0)
	console.log(
		`\nThe following presence${
			missingMetadata.length > 1 ? "s don't" : " doesn't"
		} include a metadata file :\n${missingMetadata.join(", ")}\n`
	);

(async function () {
	const latestSchema = await latestMetadataSchema();
	for (const [file, path] of allmeta) {
		const newData: Metadata = {
			$schema: latestSchema,
			author: file.author,
			contributors: file.contributors,
			service: file.service,
			altnames: file.altnames,
			description: file.description,
			url: file.url,
			regExp: file.regExp,
			version: file.version,
			logo: file.logo,
			thumbnail: file.thumbnail,
			color: file.color,
			category: file.category,
			tags: file.tags,
			iframe: file.iframe,
			iFrameRegExp: file.iFrameRegExp,
			readLogs: file.readLogs,
			settings: file.settings,
		};

		for (const key in newData)
			if (typeof newData[key as keyof Metadata] === "undefined")
				delete newData[key as keyof Metadata];

		writeJson(newData, path);
	}
})();
