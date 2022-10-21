import "source-map-support/register.js";

import * as actions from "@actions/core";
import chalk from "chalk";

import PresenceCompiler from "../classes/PresenceCompiler.js";
import getDiff from "../util/getDiff.js";

const compiler = new PresenceCompiler(),
	changedFolders = getDiff();

if (!changedFolders.length)
	actions.info(chalk.green("No Presence(s) changed, exiting..."));
else {
	const errors = await compiler.compilePresence(changedFolders, {
		noEmit: true,
	});

	if (errors.length) {
		actions.setFailed(
			chalk.redBright("Not all Presences compiled successfully!")
		);
	}
}
