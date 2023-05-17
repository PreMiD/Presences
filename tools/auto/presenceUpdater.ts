import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import actions from "@actions/core";
import chalk from "chalk";
import { config } from "dotenv";
import { MongoClient } from "mongodb";

import PresenceCompiler, { Metadata } from "../classes/PresenceCompiler.js";
import { getDiff, getFolderLetter } from "../util.js";

const require = createRequire(import.meta.url);

interface DbData {
	name: string;
	githubUrl: string;
	folderName: string;
	url: string;
	metadata: Metadata;
	presenceJs: string;
	iframeJs?: string;
}

const rootPath = resolve(
	fileURLToPath(new URL(".", import.meta.url)),
	"../../.."
);

if (!process.env.GITHUB_ACTIONS) config({ path: resolve(rootPath, ".env") });

if (!process.env.MONGO_URL) {
	actions.setFailed("MONGO_URL is not set");
	process.exit();
}

if (!getDiff().length && !getDiff("removed").length) {
	actions.info(chalk.green("No Presences changed, exiting..."));
	process.exit();
}

const compiler = new PresenceCompiler(),
	client = new MongoClient(process.env.MONGO_URL, {
		appName: "Presence Updater",
	}),
	changedPresenceFolders = getDiff();

if (!process.env.GITHUB_ACTIONS) {
	console.log(
		chalk.yellowBright(
			`${chalk.bold(
				"WARNING:"
			)} This script is only meant to be run on GitHub Actions`
		)
	);
}

try {
	await client.connect();

	actions.info(chalk.green("Connected to MongoDB"));
} catch (e) {
	actions.setFailed(`Failed to connect to MongoDB ${e.message}`);
	process.exit();
}

const collection = client
	.db("PreMiD" + (!process.env.GITHUB_ACTIONS ? "-DEV" : ""))
	.collection("presences");

await compiler.compilePresence(changedPresenceFolders);

let dbPresences: DbData[] = [];

for (const presenceFolderName of changedPresenceFolders) {
	const presenceFolder = compiler.getPresenceFolder(presenceFolderName),
		metadata = require(resolve(presenceFolder, "metadata.json")) as Metadata;

	dbPresences.push({
		name: metadata.service,
		metadata,
		githubUrl: `https://github.com/PreMiD/Presences/tree/main/websites/${getFolderLetter(
			presenceFolderName
		)}/${presenceFolderName}`,
		folderName: presenceFolderName,
		url: `https://api.premid.app/v2/presences/${encodeURIComponent(
			metadata.service
		)}/`,
		presenceJs: readFileSync(resolve(presenceFolder, "presence.js"), "utf-8"),
		...(existsSync(resolve(presenceFolder, "iframe.js")) && {
			iframeJs: readFileSync(resolve(presenceFolder, "iframe.js"), "utf-8"),
		}),
	});
}

if (dbPresences.length) {
	await collection!.bulkWrite(
		dbPresences.map(p => ({
			updateOne: {
				filter: { name: p.name },
				update: {
					$set: p,
				},
				upsert: true,
			},
		}))
	);
}

const deletedPresences = getDiff("removed");
if (deletedPresences.length) {
	for (const presence of deletedPresences)
		await collection!.deleteOne({ folderName: presence });

	actions.info(
		chalk.redBright(`Deleted ${deletedPresences.length} Presence(s)`)
	);
}

actions.info(
	chalk.green(`Successfully updated ${dbPresences.length} Presence(s)`)
);

await client!.close();
