import { readFile } from "fs/promises";
import { globby } from "globby";

export default async function getPresences() {
	const [presences, versionedPresences] = await Promise.all([
		globby("websites/*/*/metadata.json"),
		globby("websites/*/*/v*/metadata.json"),
	]);

	return (
		await Promise.all([
			...presences.map(async path => {
				const metadata = JSON.parse(await readFile(path, "utf-8"));
				return {
					metadata,
					versioned: false,
					path: path.replace("/metadata.json", ""),
				};
			}),
			...versionedPresences.map(async path => {
				const metadata = JSON.parse(await readFile(path, "utf-8"));
				return {
					metadata,
					versioned: true,
					path: path.replace("/metadata.json", ""),
				};
			}),
		])
	).sort((a, b) => {
		if (a.metadata.service === b.metadata.service)
			return a.metadata.apiVersion - b.metadata.apiVersion;
		return a.metadata.service.localeCompare(b.metadata.service);
	});
}
