import actions from "@actions/core";
import chalk from "chalk";

import PresenceCompiler from "../classes/PresenceCompiler.js";
import getDiff from "../util/getDiff.js";

const compiler = new PresenceCompiler(),
	changedFolders = getDiff();

if (!changedFolders.length)
	actions.info(chalk.green("No Presences changed, exiting..."));
else {
	const errors = await compiler.compilePresence(changedFolders, {
		emit: false,
	});

	if (errors.length)
		actions.setFailed(
			chalk.redBright("Some Presences failed to compile, exiting...")
		);
}
