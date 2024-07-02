#!/usr/bin/env node
import "source-map-support/register.js";

import chalk from "chalk";
import { readFile } from "fs/promises";
import inquirer from "inquirer";
import ora from "ora";
import { Command } from "commander";
import getDiscordAppUser from "./functions/getDiscordAppUser.js";
import { prefix } from "./util/prefix.js";

if (!(await inPresenceRepo())) {
	console.error(
		prefix,
		chalk.redBright("This command can only be run in the presence repository")
	);
	process.exit(1);
}

const program = new Command();
program
	.allowUnknownOption()
	.option("-c, --create", "create a new Presence")
	.option("-m, --modify", "modify an existing presence")
	.option("-t, --translate", "translate a presence")
	.parse(process.argv);

const method = Object.keys(program.opts()).find(
	key => program.opts()[key] === true
);

if (method) {
	if (method === "create")
		console.log(
			chalk.green("?"),
			chalk.bold("What do you want to do?"),
			chalk.cyan("Create a new Presence")
		);
	await import(`./actions/${method}.js`);
} else {
	const spinner = ora("Fetching Discord User...").start(),
		user = await getDiscordAppUser();
	spinner.stop();

	if (user) console.log(prefix, `Hello ${chalk.green(user.username)}!`);
	const { action } = await inquirer.prompt<{ action: string }>([
		{
			type: "list",
			name: "action",
			message: "What do you want to do?",
			choices: [
				{
					name: "Create a new Presence",
					value: "create",
				},
				{
					name: "Modify an existing Presence",
					value: "modify",
				},
				{
					name: "Translate a Presence",
					value: "translate",
				},
			],
		},
	]);
	if (action) await import(`./actions/${action}.js`);
}

async function inPresenceRepo() {
	try {
		const { name } = JSON.parse(await readFile("./package.json", "utf8"));
		return name === "presences";
	} catch {
		return false;
	}
}
