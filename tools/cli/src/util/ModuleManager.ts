import { exec } from "child_process";
import { resolve } from "path";
import { existsSync } from "fs";
import ora from "ora";
import { prefix } from "./prefix.js";
import chalk from "chalk";
import { readFile } from "fs/promises";

export default class ModuleManager {
	dependencies: string[] = [];
	devDependencies: string[] = [];

	constructor(public cwd: string) {}

	async isValidPackageJson() {
		if (!existsSync(resolve(this.cwd, "package.json"))) return false;

		try {
			JSON.parse(await readFile(resolve(this.cwd, "package.json"), "utf8"));
			return true;
		} catch {
			return false;
		}
	}

	async installDependencies() {
		const prevNodeEnv = process.env.NODE_ENV;
		delete process.env.NODE_ENV;

		if (!(await this.isValidPackageJson())) return;

		const spinner = ora(
			prefix + chalk.yellow(" Installing dependencies...")
		).start();

		//* Run npm install
		const job = exec("npm install --loglevel error --save-exact", {
			cwd: this.cwd,
		});

		let errorChunks: any[] = [];
		job.stderr?.on("data", data => {
			errorChunks = errorChunks.concat(data);
		});

		await new Promise<void>(r =>
			job.once("exit", code => {
				if (code === 0) {
					spinner.succeed(prefix + chalk.green(" Installed dependencies!"));

					return r();
				}

				spinner.fail(prefix + " " + chalk.red(errorChunks.join("")));

				r();
			})
		);

		process.env.NODE_ENV = prevNodeEnv;
	}
}
