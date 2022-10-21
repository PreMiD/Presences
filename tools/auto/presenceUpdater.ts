import "source-map-support/register.js";

import actions from "@actions/core";
import chalk from "chalk";
import { config } from "dotenv";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { Collection, MongoClient } from "mongodb";
import { resolve } from "path";
import { fileURLToPath } from "url";

import PresenceCompiler, { Metadata } from "../classes/PresenceCompiler.js";
import getDiff from "../util/getDiff.js";
import getFolderLetter from "../util/getFolderLetter.js";

interface DBdata {
	name: string;
	githubUri: string;
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

const compiler = new PresenceCompiler();

let client: MongoClient | null = null,
	collection: Collection<DBdata> | null = null,
	changedPresences = getDiff();

console.log(changedPresences);

if (!process.env.GITHUB_ACTIONS)
	console.log(
		chalk.yellowBright(
			`${chalk.bold(
				"WARNING:"
			)} This script is only meant to be run on GitHub Actions!`
		)
	);

if (!getDiff().length && !getDiff("removed").length) {
	actions.info(chalk.green("No Presence(s) changed, exiting..."));
	process.exit();
}

if (!process.env.MONGO_URL) {
	actions.setFailed(chalk.redBright("MONGO_URL is not set!"));
	process.exit();
}

try {
	client = new MongoClient(process.env.MONGO_URL!, {
		appName: "Presence Updater",
	});
	await client.connect();

	collection = client
		.db("PreMiD" + (!process.env.GITHUB_ACTIONS ? "-DEV" : ""))
		.collection("presences");

	actions.info(chalk.green("Connected to MongoDB"));
} catch (e: any) {
	actions.setFailed(
		chalk.redBright(`Failed to connect to MongoDB! ${e.message}`)
	);
	process.exit();
}

await compiler.compilePresence(changedPresences, {
	transpileOnly: true,
});

let dbPresences: DBdata[] = [];

for (const presence of changedPresences) {
	const presenceFolder = compiler.getPresenceFolder(presence);

	const metadata = JSON.parse(
		await readFile(resolve(presenceFolder, "metadata.json"), "utf-8")
	) as Metadata;

	dbPresences.push({
		name: metadata.service,
		metadata,
		githubUri: `https://github.com/PreMiD/Presences/tree/main/websites/${getFolderLetter(
			presence
		)}/${presence}`,
		folderName: presence,
		url: `https://api.premid.app/v2/presences/${encodeURIComponent(
			metadata.service
		)}/`,
		presenceJs: await readFile(resolve(presenceFolder, "presence.js"), "utf-8"),
		...(existsSync(resolve(presenceFolder, "iframe.js")) && {
			iframeJs: await readFile(resolve(presenceFolder, "iframe.js"), "utf-8"),
		}),
	});
}

await collection!.bulkWrite(
	dbPresences.map(p => ({
		updateOne: {
			filter: { name: p.name },
			update: {
				$set: { ...p },
			},
			upsert: true,
		},
	}))
);

const deletedPresences = getDiff("removed");
if (deletedPresences.length) {
	for (const presence of deletedPresences) {
		await collection!.deleteOne({ folderName: presence });
	}

	actions.info(
		chalk.redBright(`Deleted ${deletedPresences.length} Presence(s)`)
	);
}

actions.info(
	chalk.green(`Successfully updated ${dbPresences.length} Presence(s)`)
);

await client!.close();
