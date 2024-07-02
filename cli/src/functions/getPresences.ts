import { readFile } from "fs/promises";
import { globby } from "globby";

export default async function getPresences() {
	return await Promise.all(
		(
			await globby("websites/*/*/metadata.json")
		).map(async s => JSON.parse(await readFile(s, "utf-8")))
	);
}
