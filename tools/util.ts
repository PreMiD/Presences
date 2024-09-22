import { execSync } from "node:child_process";
import { basename, dirname, extname } from "node:path";

import actions from "@actions/core";
import got from "got";
import semver from "semver";

export type ValidEventName = "push" | "pull_request" | "uncommitted";

export function getDiff(
	type: "addedModified" | "removed" | "all" = "addedModified"
): string[] {
	const commands: Record<ValidEventName, string> = {
			push: "HEAD^ HEAD",
			pull_request: `origin/${process.argv[3] ? process.argv[3] : "main"} HEAD`,
			uncommitted: "HEAD",
		},
		eventName = process.argv[2] ? validateArg(process.argv[2]) : "pull_request",
		changedPresenceFolders = execSync(
			`git -c core.quotePath=false --no-pager diff --name-only --diff-filter=${
				type === "addedModified"
					? "ACMRTU"
					: type === "removed"
					? "D"
					: "ACMRTUD"
			} ${commands[eventName]}`
		)
			.toString()
			.split("\n")
			.filter(file => {
				if (file.startsWith("cli/")) return false;
				if (type === "removed") return "metadata.json" === basename(file);
				else {
					return ["presence.ts", "iframe.ts", "metadata.json"].includes(
						basename(file)
					);
				}
			});

	if (!changedPresenceFolders.length) return [];
	return [...new Set(changedPresenceFolders.map(f => basename(dirname(f))))];
}

function validateArg(arg: string): ValidEventName {
	if (!["push", "pull_request", "uncommitted"].includes(arg))
		throw new Error(`CI was not called with a valid event name: ${arg}`);
	return arg as ValidEventName;
}

export function getFolderLetter(service: string) {
	const firstLetter = service.at(0)!.toUpperCase();

	if (/^[a-zA-Z]/g.test(firstLetter)) return firstLetter;
	if (/^[0-9]/g.test(firstLetter)) return "0-9";
	return "#";
}

export async function getLatestSchema() {
	const fetchedSchemas = await got(
		"https://api.github.com/repos/PreMiD/PreMiD/contents/apps/schema-server/schemas/metadata?ref=monorepo",
		{ responseType: "json" }
	);

	if (
		fetchedSchemas.statusCode !== 200 ||
		!Array.isArray(fetchedSchemas.body)
	) {
		actions.setFailed("Could not fetch latest schema");
		process.exit();
	}

	//* schema names have the format of x.x.x.json
	const latestVersion = semver.sort(
		fetchedSchemas.body
			.filter(f => f.name.endsWith(".json"))
			.map(f => {
				const version = f.name.replace(".json", "");

				//* Make it semver compatible
				if (!semver.valid(version)) return `${version}.0`;

				return version;
			})
	);

	//* Remove prefixed .0 from the version
	latestVersion[latestVersion.length - 1] = latestVersion[
		latestVersion.length - 1
	].replace(".0", "");

	const schema = fetchedSchemas.body.find(
		f => f.name === `${latestVersion.at(-1)}.json`
	);

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
