import chalk from "chalk";
import { access, cp, mkdir, readFile, writeFile } from "fs/promises";
import inquirer from "inquirer";
import { Validator } from "jsonschema";
import ora from "ora";
import { resolve } from "path";
import { fileURLToPath } from "url";

import fetchSchema from "../functions/fetchSchema.js";
import getDiscordAppUser from "../functions/getDiscordAppUser.js";
import getDiscordUser from "../functions/getDiscordUser.js";
import getFolderLetter from "../functions/getFolderLetter.js";
import isFirstTimeAuthor from "../functions/isFirstTimeAuthor.js";
import { prefix } from "../util/prefix.js";

const v = new Validator();

const discordUser = await getDiscordAppUser();

const spinner = ora("Fetching Schema...").start();

const schema = await fetchSchema();

v.addSchema({ definitions: schema.definitions });

spinner.stop().clear();

let serviceAuthor: Awaited<ReturnType<typeof getDiscordUser>>;

const metadata = JSON.parse(
	await readFile(
		resolve(fileURLToPath(import.meta.url), "../../../template/metadata.json"),
		"utf8"
	)
);

const res = await inquirer.prompt<{
	service: string;
	description: string;
	author: string;
	iframe: boolean;
	url: string;
	logo: string;
	thumbnail: string;
	color: string;
	tags: string;
	category: string;
}>([
	{
		name: "service",
		message: "Presence name",
		validate: async (input: string) => {
			if (!input) return "Presence name cannot be empty!";

			const schemaRes = v.validate(input, schema.properties.service);

			if (!schemaRes.valid) return schemaRes.errors[0].message;

			if (await serviceExists(input)) return "Presence already exists!";

			return true;
		},
	},
	{
		name: "description",
		message: "English description of the Presence",
		validate: (input: string) => {
			if (!input) return "Description cannot be empty!";
			const schemaRes = v.validate(
				{ en: input },
				schema.properties.description
			);

			if (!schemaRes.valid) return schemaRes.errors[0].message;

			return true;
		},
	},
	{
		name: "author",
		message: "Discord ID of the author",
		default: discordUser?.id,
		validate: async (input: string) => {
			if (!input) return "Author cannot be empty!";

			const schemaRes = v.validate(
				{ id: input, name: "" },
				schema.properties.author
			);

			if (!schemaRes.valid) return schemaRes.errors[0].message;

			serviceAuthor = discordUser ?? (await getDiscordUser(input));

			if (!serviceAuthor) return "User not found.";

			metadata.author = {
				id: input,
				name: serviceAuthor.username,
			};

			return true;
		},
		transformer: (input: string) => {
			return serviceAuthor ? serviceAuthor.username : input;
		},
	},
	{
		name: "url",
		message: "URL of the website (separate multiple URLs with a comma)",
		validate: (input: string) => {
			if (!input) return "URL cannot be empty!";

			let urls: string[] | string;

			if (input.split(",").length > 1) urls = input.split(",");
			else urls = input;

			const schemaRes = v.validate(urls, schema.properties.url);

			if (!schemaRes.valid) return schemaRes.errors[0].message;
			return true;
		},
	},
	{
		name: "logo",
		message: "Image URL of the logo",
		validate: (input: string) => {
			if (!input) return "Logo cannot be empty!";

			const schemaRes = v.validate(input, schema.properties.logo);

			if (!schemaRes.valid) return schemaRes.errors[0].message;
			return true;
		},
	},
	{
		name: "thumbnail",
		message: "Image URL of the thumbnail",
		validate: (input: string) => {
			if (!input) return "Thumbnail cannot be empty!";

			const schemaRes = v.validate(input, schema.properties.thumbnail);

			if (!schemaRes.valid) return schemaRes.errors[0].message;
			return true;
		},
	},
	{
		name: "color",
		message: "Theme color of the Presence",
		validate: (input: string) => {
			if (!input) return "Color cannot be empty!";

			const schemaRes = v.validate(input, schema.properties.color);

			if (!schemaRes.valid) return schemaRes.errors[0].message;
			return true;
		},
	},
	{
		name: "tags",
		message: "Tags of the Presence (separate multiple tags with a comma)",
		validate: (input: string) => {
			if (!input) return "Tags cannot be empty!";

			const schemaRes = v.validate(input.split(","), schema.properties.tags);

			if (!schemaRes.valid) return schemaRes.errors[0].message;
			return true;
		},
	},
	{
		name: "category",
		message: "Category of the service",
		type: "list",
		choices: schema.properties.category.enum,
	},
]);

const presencePath = resolve(
	`./websites/${getFolderLetter(res.service)}/${res.service
		.replace("!", " ")
		.trim()}`
);

await mkdir(resolve(presencePath, "dist"), {
	recursive: true,
});

metadata.service = res.service;
metadata.description = { en: res.description };
metadata.author = {
	id: res.author,
	name: serviceAuthor!.username,
};
metadata.url = res.url.split(",").length > 1 ? res.url.split(",") : res.url;
metadata.logo = res.logo;
metadata.thumbnail = res.thumbnail;
metadata.color = res.color;
metadata.tags = res.tags.split(",");
metadata.category = res.category;
metadata.version = "1.0.0";

await writeFile(
	resolve(presencePath, "metadata.json"),
	JSON.stringify(metadata, null, "\t")
);

await cp(
	resolve(fileURLToPath(import.meta.url), "../../../template/tsconfig.json"),
	resolve(presencePath, "tsconfig.json")
);

const presenceFileToCopy = (await isFirstTimeAuthor(res.author))
	? "presence.ts"
	: "presence.min.ts";
await cp(
	resolve(
		fileURLToPath(import.meta.url),
		`../../../template/${presenceFileToCopy}`
	),
	resolve(presencePath, "presence.ts")
);

console.log(prefix, chalk.green("Presence created! You can now start coding!"));

async function serviceExists(service: string) {
	try {
		await access(`./websites/${getFolderLetter(service)}/${service}`);
		return true;
	} catch {
		return false;
	}
}
