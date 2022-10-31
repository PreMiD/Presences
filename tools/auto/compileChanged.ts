import actions from "@actions/core";
import chalk from "chalk";

import PresenceCompiler from "../classes/PresenceCompiler.js";
import { getDiff } from "../util.js";

const compiler = new PresenceCompiler(),
	changedFolders = getDiff();

if (!changedFolders.length)
	actions.info(chalk.green("No Presences changed, exiting..."));
else {
	const errors = await compiler.compilePresence(changedFolders, {
		emit: false,
	});

	for (const error of errors.filter(error => !error.name.includes("TS")))
		actions.error(error);

	if (errors.length)
		actions.setFailed("Some Presences failed to compile, exiting...");
}
