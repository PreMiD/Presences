/**
 * Translation Tool for PreMiD Presences.
 * @author callumok2004 <callumokane123@gmail.com>
 * @author Bas950 <me@bas950.com>
 * @author ririxidev <mail@ririxi.dev>
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { gray, green, hex, red, white, yellow } from "chalk";
import ora, { Ora } from "ora";

import axios from "axios";
import debug from "debug";
import { prompt } from "enquirer";

debug.enable("Translator:*");
let loadSpinner: Ora,
  language: string,
  files: Files,
  counter = 0;

const spinnerSettings = {
    interval: 80,
    frames: [
      hex("#bebebe")(`( ${white("●")}   )`),
      hex("#bebebe")(`(  ${white("●")}  )`),
      hex("#bebebe")(`(   ${white("●")} )`),
      hex("#bebebe")(`(    ${white("●")})`),
      hex("#bebebe")(`(   ${white("●")} )`),
      hex("#bebebe")(`(  ${white("●")}  )`),
      hex("#bebebe")(`( ${white("●")}   )`),
      hex("#bebebe")(`(${white("●")}    )`)
    ]
  },
  filesMap = new Map(),
  logger = debug("Translator"),
  success = logger.extend("success"),
  error = logger.extend("error"),
  info = logger.extend("info"),
  checkCount = async (): Promise<boolean> => {
    if (counter <= 0) {
      success(`Complete! All presences have the language: ${language}`);
      process.exit();
    } else return false;
  },
  loadFiles = async (lang: string): Promise<boolean> => {
    language = lang;
    info("Loading and caching files.");
    const src = `./websites/`;
    if (!existsSync(src))
      return (
        error("Presences folder could not be found... exiting."), process.exit()
      );

    readdirSync(src).forEach((letter) => {
      readdirSync(`${src}/${letter}/`).forEach(async (presence) => {
        const data = JSON.parse(
          readFileSync(
            `${src}/${letter}/${presence}/dist/metadata.json`,
            "utf8"
          ).toString()
        );
        data.path = `${src}/${letter}/${presence}/dist/metadata.json`;
        filesMap.set(presence, data);
      });
    });

    success(`Loading complete. ${filesMap.size} presences loaded.`);
    info(`Clearing presences with language: ${language}.`);

    for (const file of filesMap)
      if (file[1].description[language]) filesMap.delete(file[0]);

    loadSpinner.succeed(
      green(` Loaded all presences… (${filesMap.size} to translate)`)
    );

    return true;
  },
  main = async () => {
    const langLoadSpinner = ora({
      text: green(`Loading languages…`)
    });
    langLoadSpinner.spinner = spinnerSettings;
    langLoadSpinner.start();
    const langs: string[] = (
      await axios.post("https://api.premid.app/v3", {
        query: `
        query {
          langFiles(project: "website") {
            lang
          }
        }
        `
      })
    ).data.data.langFiles
      .map((c: { lang: string }) => c.lang)
      .filter((c: string) => c !== "en");
    langLoadSpinner.succeed(green(` Loaded all languages.`));
    const language: string = await prompt([
        {
          type: "autocomplete",
          message: green("Pick the language you want to translate:"),
          name: "selectedLang",
          // @ts-expect-error Limit doesn't exist in Options.
          limit: 7,
          choices: langs.sort(),
          footer() {
            return gray("(Scroll up and down to reveal more choices)");
          }
        }
      ])
        .then((answer: { selectedLang: string }) => answer.selectedLang)
        .catch(() => process.exit()),
      loadFilesSpinner = ora({
        text: green(`Loading presences... \n`)
      });

    loadSpinner = loadFilesSpinner;

    loadFilesSpinner.spinner = spinnerSettings;
    loadFilesSpinner.start();
    await loadFiles(language);

    const mode: Mode = await prompt([
      {
        type: "select",
        message: green("Pick the Translator Mode:"),
        name: "mode",
        choices: [
          {
            name: "EVERY",
            message: "Translate every Presence in order.",
            value: "EVERY"
          },
          {
            name: "CATEGORY",
            message: "Translate every Presence of category.",
            value: "CATEGORY"
          },
          {
            name: "SELECT",
            message: "Translate selected Presences.",
            value: "SELECT"
          }
        ]
      }
    ])
      .then((answer: { mode: Mode }) => answer.mode)
      .catch(() => process.exit());
    switch (mode) {
      case "EVERY":
        files = Array.from(filesMap);
        break;
      case "CATEGORY":
        {
          const category: Metadata["category"] = await prompt([
            {
              type: "select",
              message: green("Pick a category:"),
              name: "category",
              choices: [
                {
                  name: "anime",
                  message: "Anime",
                  value: "anime"
                },
                {
                  name: "games",
                  message: "Games",
                  value: "games"
                },
                {
                  name: "music",
                  message: "Music",
                  value: "music"
                },
                {
                  name: "socials",
                  message: "Socials",
                  value: "socials"
                },
                {
                  name: "videos",
                  message: "Videos & Streams",
                  value: "videos"
                },
                {
                  name: "other",
                  message: "Other",
                  value: "other"
                }
              ]
            }
          ])
            .then(
              (answer: { category: Metadata["category"] }) => answer.category
            )
            .catch(() => process.exit());
          files = (Array.from(filesMap) as Files).filter(
            (f) => f[1].category === category
          );
        }
        break;
      case "SELECT":
        {
          const selected = await prompt([
            {
              type: "autocomplete",
              message: green("Pick the Presences:"),
              name: "selected",
              // @ts-expect-error Limit doesn't exist in Options.
              limit: 7,
              multiple: true,
              choices: (Array.from(filesMap) as Files).map((f) => f[0]),
              footer() {
                const selectedPresences = this.selected.length;
                return gray(
                  `(Scroll up and down to reveal more choices)\n(You selected ${selectedPresences} presences)`
                );
              }
            }
          ])
            .then((answer: { selected: string }) => answer.selected)
            .catch(() => process.exit());
          files = (Array.from(filesMap) as Files).filter((f) =>
            selected.includes(f[0])
          );
        }
        break;
      default:
        error(red("Unknown Mode selected..."));
        process.exit();
    }

    counter = files.length;
    for await (const file of files) {
      counter--;
      const data = file[1],
        path = data.path,
        check = JSON.parse(await readFileSync(data.path).toString());

      if (check.description[language]) {
        error(`${file[0]} has already been translated to ${language}.`);
        continue;
      }

      const response: string = await prompt({
          type: "input",
          message:
            green("Please translate the following description of ") +
            yellow(file[0]) +
            green(`:\n"`) +
            hex("#bebebe")(file[1].description["en"]) +
            green(`":\n`) +
            hex("#bebebe")(`(Type "skip" to skip or "stop" to stop)`),
          name: "translatedDes"
        })
          .then((answer: { translatedDes: string }) => answer.translatedDes)
          .catch(() => process.exit()),
        ver = data.version.split(".");

      switch (response) {
        case "skip": {
          filesMap.delete(file[0]);
          await checkCount();
          continue;
        }

        case "stop":
          process.exit();
          break;

        default: {
          data.version = `${ver[0]}.${ver[1]}.${Number(ver[2]) + 1}`;
          data.description[language] = response;
          delete data.path;

          writeFileSync(path, JSON.stringify(data, null, 2));
          filesMap.delete(file[0]);
          await checkCount();

          if (!JSON.parse(readFileSync(path).toString()).description[language])
            error(
              `An error occured while saving the file. Please manually add the translation to: ${language}. The version was automatically bumped.`
            );
        }
      }
    }
  };

main();

//* Types
interface metadata extends Metadata {
  path?: string;
}

type Mode = "EVERY" | "CATEGORY" | "SELECT";
type Files = [string, metadata][];
