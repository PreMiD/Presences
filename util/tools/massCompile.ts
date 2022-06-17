import "source-map-support/register";

import { exec as processExec } from "node:child_process";
import { readFileSync as readFile, writeFileSync as writeFile } from "node:fs";
import { promisify } from "node:util";
import { green, red } from "chalk";
import { sync as glob } from "glob";

const exec = promisify(processExec);

/*  NOTE: THIS IS A TOOL THAT IS ONLY MEANT TO BE USED
    BY THE DEVS AND REVIEWERS FOR DEPLOYMENT PURPOSES,
    PLEASE DON'T COMPILE OR RUN IT BEFORE MAKING A PULL
    REQUEST UNLESS YOU'VE BEEN EXPLICITLY INSTRUCTED BY
    A DEV TO DO SO, WHICH WILL MOST LIKELY NEVER HAPPEN.  */

export const read = (path: string): string =>
		readFile(path, { encoding: "utf8" }),
	write = (path: string, code: Metadata): void =>
		writeFile(path, JSON.stringify(code, null, "\t"), {
			encoding: "utf8",
			flag: "w",
		});

export const allFolders = glob("./{websites,programs}/*/*/*")
	.filter(f => f.endsWith("dist"))
	.map(f => f.replace("/dist", ""));

async function main() {
	const errors: { [key: string]: string } = {};
	async function compileFile(i: number): Promise<void> {
		if (!allFolders[i]) return;
		return new Promise(async (resolve, reject): Promise<void> => {
			exec("tsc --noEmit", { cwd: allFolders[i] }).then(resolve).catch(reject);
		})
			.then(async () => {
				console.log(
					green(`✔ Successfully compiled ${allFolders[i].split("/").at(-1)}`)
				);
				return await compileFile(i + 1);
			})
			.catch(async err => {
				errors[allFolders[i].split("/").at(-1)] =
					err.stdout || err.stderr || "Couldn't find error";

				console.error(
					red(`✘ Error on ${allFolders[i].split("/").at(-1)}:\n`),
					err.stdout || err.stderr || "Couldn't find error"
				);
				return await compileFile(i + 1);
			});
	}
	await compileFile(0)
		.then(async () => {
			console.log(
				green(`✔ Successfully compiled ${allFolders[0].split("/").at(-1)}`)
			);
		})
		.catch(async (err: Error & { stdout: string; stderr: string }) => {
			errors[allFolders[0].split("/").at(-1)] =
				err.stdout || err.stderr || "Couldn't find error";

			console.error(
				red(`✘ Error on ${allFolders[0].split("/").at(-1)}:\n`),
				err.stdout || err.stderr || "Couldn't find error"
			);
			return await compileFile(1);
		});
	const presenceErrors = Object.keys(errors).length;
	if (presenceErrors)
		console.log(
			red(
				`You got errors in ${presenceErrors} presence${
					presenceErrors === 1 ? "" : "s"
				}! Check them out:\n`
			),
			Object.entries(errors)
				.map(([key, value]) => `${green(key)}:\n ${value}`)
				.join("\n")
		);
	else console.log(green("✔ All presences compiled successfully!"));
}

main();
