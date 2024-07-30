import { gql } from "@apollo/client/core/index.js";
import chalk from "chalk";
import { writeFile } from "fs/promises";
import inquirer from "inquirer";
import { getLanguage } from "language-flag-colors";
import { resolve } from "node:path";
import ora from "ora";
import prompts from "prompts";
import semver from "semver";

import fetchSchema from "../functions/fetchSchema.js";
import getFolderLetter from "../functions/getFolderLetter.js";
import getPresences from "../functions/getPresences.js";
import { apollo } from "../util/apollo.js";
import { prefix } from "../util/prefix.js";

const spinner = ora("Loading languages...").start();
const { coerce, inc, valid } = semver;

const {
	data: { langFiles },
} = await apollo.query<{ langFiles: { lang: string }[] }>({
	query: gql`
		query {
			langFiles(project: "website") {
				lang
			}
		}
	`,
});

const schema = await fetchSchema();

spinner.stop();

const { lang } = await prompts({
	name: "lang",
	message: "Select the language you want add translations for",
	type: "autocomplete",
	choices: langFiles
		.filter(l => l.lang !== "en")
		.map(l => ({
			title: getLanguage(l.lang.replace("_", "-"))?.nativeName ?? l.lang,
			description: l.lang,
			value: l.lang,
		})),
	suggest: async (input, choices) => {
		const regex = new RegExp(input, "i");
		return choices.filter(
			c =>
				regex.test(c.title) ||
				(c.description ? regex.test(c.description) : false)
		);
	},
});

if (!lang) {
	console.log(prefix, chalk.redBright("No language selected, exiting..."));
	process.exit(0);
}

let presences = await getPresences();

const { mode } = await prompts([
	{
		type: "select",
		name: "mode",
		message: "What do you want to do?",
		choices: [
			{
				title: "Translate every Presence in order",
				value: 0,
			},
			{
				title: "Translate every Presence of category",
				value: 1,
			},
			{
				title: "Translate selected Presences",
				value: 2,
			},
		],
	},
]);

const { selPresences, category } = await prompts([
	{
		type: mode === 1 ? "select" : false,
		name: "category",
		message: "Category of the service",
		choices: schema.properties.category.enum.map((c: string) => ({
			title: c,
			value: c,
		})),
	},
	{
		type: mode === 2 ? "autocompleteMultiselect" : false,
		name: "selPresences",
		message: "Select the Presences you want to translate",
		instructions: "Use arrow keys to select and space to toggle",
		choices: presences.map(p => ({
			title: p.service,
			value: p,
		})),
		min: 1,
	},
]);

if (mode === 2) {
	await translatePresences(selPresences, lang);

	process.exit(0);
}

const { filterPresences } = await prompts([
	{
		type: "confirm",
		name: "filterPresences",
		message: "Filter out already translated Presences?",
	},
]);

if (filterPresences) presences = presences.filter(p => !p.description?.[lang]);
if (category) presences = presences.filter(p => p.category === category);

await translatePresences(presences, lang);

process.exit(0);

async function translatePresences(presences: any, lang: string) {
	if (!Array.isArray(presences)) process.exit(0);
	for (const presence of presences) {
		const desc = presence.description?.[lang],
			enDesc = presence.description?.en;

		console.log(
			`${
				enDesc ? chalk.green(enDesc) + "\n\n" : ""
			}Type "skip" to skip or "stop" to stop translating.`
		);
		const { translation } = await inquirer.prompt({
			type: "input",
			name: "translation",
			message: presence.service,
			default: desc,
			validate: (input: string) =>
				!!input ||
				"You need to enter a translation, or type 'skip' to skip, or 'stop' to stop translating.",
		});

		if (translation === "skip" || translation === desc) continue;
		if (translation === "stop") break;

		const presencePath = resolve(
			`./websites/${getFolderLetter(presence.service)}/${presence.service
				.replace("!", " ")
				.trim()}`
		);

		presence.description[lang] = translation;
		if (valid(coerce(presence.version)))
			presence.version = inc(valid(coerce(presence.version)!)!, "patch");
		else
			console.warn(
				`Invalid version for ${presence.service}, skipping version bump.`
			);

		await writeFile(
			resolve(presencePath, "metadata.json"),
			JSON.stringify(presence, null, "\t")
		);
	}
}
