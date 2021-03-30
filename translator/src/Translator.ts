import chalk from "chalk";
import debug from "debug";
import { existsSync, readdirSync, readFileSync } from "fs";
import { Ora } from "ora";

debug.enable(process.env.DEBUG);
const logger = debug("Translator");

export class Translator {
  language: string;

  success = logger.extend("success");
  error = logger.extend("error");
  info = logger.extend("info");
  file = logger.extend("file");

  files = new Map();

  loadSpinner: Ora;

  async loadFiles(language: string): Promise<boolean> {
    this.info("Loading and caching files.");

    this.language = language;

    const src = `${process.cwd()}/../websites/`;
    if (!existsSync(src))
      return (
        this.error("Presences folder could not be found... exiting.") &&
        process.exit()
      );

    await this.checkCount();
    readdirSync(src).forEach(async (letter) => {
      readdirSync(`${src}/${letter}/`).forEach(async (presence) => {
        const data = JSON.parse(
          readFileSync(
            `${src}/${letter}/${presence}/dist/metadata.json`,
            "utf8"
          ).toString()
        );
        data.path = `${src}/${letter}/${presence}/dist/metadata.json`;
        this.files.set(presence, data);
      });
    });

    this.success(`Loading... complete. ${this.files.size} presences loaded.`);
    this.info(`Clearing presences with language: ${language}.`);

    for (const file of this.files)
      if (file[1].description[language]) this.files.delete(file[0]);

    this.loadSpinner.succeed(
      chalk.green(` Loaded all presences… (${this.files.size} to translate…)`)
    );

    return true;
  }

  async checkCount(): Promise<boolean> {
    if (this.files.size <= 0)
      return (
        this.success(
          `Complete! All presences have the language: ${this.language}`
        ) && process.exit()
      );
    return false;
  }
}
