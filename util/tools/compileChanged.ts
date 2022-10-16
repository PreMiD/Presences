import "source-map-support/register.js";

import chalk from "chalk";
import { createAnnotation, execShellCommand, getChangedFolders } from "./util.js";
import { rm, writeFile } from "fs/promises";
import { resolve } from "path";

async function main() {
	const errors: string[] = [],
		changedFolders = await getChangedFolders();
	if (!changedFolders.length) return;

	await compileFile(0);
	const presenceErrors = Object.keys(errors).length;
	if (presenceErrors) console.log(errors.join("\n"));
	else console.log(chalk.green("✔ All presences compiled successfully!"));

	async function compileFile(i: number): Promise<void> {
		if (!changedFolders[i]) return;
		try {
			await writeFile(
				resolve(changedFolders[i], "tsconfig.json"),
				JSON.stringify({
					extends: "../../../tsconfig.json",
					compilerOptions: {
						outDir: "./dist/",
					},
				})
			);
			await execShellCommand("tsc --noEmit", { cwd: changedFolders[i] });
			await rm(resolve(changedFolders[i], "tsconfig.json"));

			console.log(
				chalk.green(
					`✔ Successfully compiled ${changedFolders[i].split("/").at(-1)}`
				)
			);
		} catch (err) {
			const error = (err.stderr || err.stdout || "Couldn't find error")
				.replaceAll("\r", "")
				.trim() as string;

			error
				.split("\n")
				.filter(Boolean)
				.forEach(e => {
					const regexResult = e.match(/\w+\.\w+\((\d+),\d+\): (.+)/);

					if (regexResult)
						errors.push(
							createAnnotation({
								type: "error",
								file: changedFolders[i] + "/presence.ts",
								title: "Failed to compile",
								line: regexResult[1],
								message: regexResult[2],
							})
						);
					else
						errors.push(
							createAnnotation({
								type: "error",
								file: changedFolders[i] + "/presence.ts",
								title: "Failed to compile",
								message: e,
							})
						);
				});

			console.error(
				chalk.red(`✘ Error on ${changedFolders[i].split("/").at(-1)}:\n`),
				error
			);
		} finally {
			return await compileFile(i + 1);
		}
	}
	process.exit(errors.length ? 1 : 0);
}

main();
