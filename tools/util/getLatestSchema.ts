import { extname } from "node:path";

import actions from "@actions/core";
import got from "got";

export default async function getLatestSchema() {
	const schemas = await got(
		"https://api.github.com/repos/PreMiD/Schemas/contents/schemas/metadata",
		{ responseType: "json" }
	);

	if (schemas.statusCode !== 200 || !Array.isArray(schemas.body)) {
		actions.setFailed("Could not fetch latest schema");
		process.exit();
	}

	const schema = schemas.body.filter(f => f.name.endsWith(".json")).at(-1);

	if (!schema) {
		actions.setFailed("Could not find latest schema");
		process.exit();
	}

	const schemaFile = await got(schema.download_url, { responseType: "json" });

	if (schemaFile.statusCode !== 200 || !schemaFile.body) {
		actions.setFailed("Could not fetch latest schema file");
		process.exit();
	}

	try {
		return {
			url: `https://schemas.premid.app/metadata/${schema.name.replace(
				extname(schema.name),
				""
			)}`,
			schema: schemaFile.body,
		};
	} catch (e) {
		actions.setFailed("Could not parse latest schema");
		process.exit();
	}
}
