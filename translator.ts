import axios from "axios";
import chalk from "chalk";
import debug from "debug";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import inquirer from "inquirer";
import ora, { Ora } from "ora";

debug.enable("Translator:*");
let loadSpinner: Ora,
    language: string,
    files: Files,
    counter = 0;

const spinnerSettings = {
    interval: 80,
    frames: [
        chalk.hex("#bebebe")(`( ${chalk.white("●")}   )`),
        chalk.hex("#bebebe")(`(  ${chalk.white("●")}  )`),
        chalk.hex("#bebebe")(`(   ${chalk.white("●")} )`),
        chalk.hex("#bebebe")(`(    ${chalk.white("●")})`),
        chalk.hex("#bebebe")(`(   ${chalk.white("●")} )`),
        chalk.hex("#bebebe")(`(  ${chalk.white("●")}  )`),
        chalk.hex("#bebebe")(`( ${chalk.white("●")}   )`),
        chalk.hex("#bebebe")(`(${chalk.white("●")}    )`)
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
        const src = `${process.cwd()}/websites/`;
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

        success(`Loading... complete. ${filesMap.size} presences loaded.`);
        info(`Clearing presences with language: ${language}.`);

        for (const file of filesMap)
            if (file[1].description[language]) filesMap.delete(file[0]);

        loadSpinner.succeed(
            chalk.green(` Loaded all presences… (${filesMap.size} to translate…)`)
        );

        return true;
    },
    main = async () => {
        const langLoadSpinner = ora({
            text: chalk.green(`Loading languages…`),
            // @ts-expect-error Not in their @types but you can set it.
            color: "bold"
        });
        // @ts-expect-error Not in their @types but you can set it.
        langLoadSpinner._spinner = spinnerSettings;
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
        langLoadSpinner.succeed(chalk.green(` Loaded all languages…`));
        const language: string = (
            await inquirer.prompt([
                {
                    type: "list",
                    prefix: "●",
                    message: chalk.green("Pick the language you want to translate:"),
                    name: "selectedLang",
                    choices: langs.sort()
                }
            ])
        ).selectedLang,
            loadFilesSpinner = ora({
                text: chalk.green(`Loading presences…`),
                // @ts-expect-error Not in their @types but you can set it.
                color: "bold"
            });

        loadSpinner = loadFilesSpinner;

        // @ts-expect-error Not in their @types but you can set it.
        loadFilesSpinner._spinner = spinnerSettings;
        loadFilesSpinner.start();
        await loadFiles(language);

        const mode: Mode = (
            await inquirer.prompt([
                {
                    type: "list",
                    prefix: "●",
                    message: chalk.green("Pick the Translator Mode:"),
                    name: "mode",
                    choices: [
                        {
                            name: "Translate every Presence in order.",
                            value: "EVERY"
                        },
                        {
                            name: "Translate every Presence of category.",
                            value: "CATEGORY"
                        },
                        {
                            name: "Translate selected Presences.",
                            value: "SELECT"
                        }
                    ]
                }
            ])
        ).mode;
        switch (mode) {
            case "EVERY":
                files = Array.from(filesMap);
                break;
            case "CATEGORY":
                {
                    const category: Metadata["category"] = (
                        await inquirer.prompt([
                            {
                                type: "list",
                                prefix: "●",
                                message: chalk.green("Pick a category:"),
                                name: "category",
                                choices: [
                                    {
                                        name: "Anime",
                                        value: "anime"
                                    },
                                    {
                                        name: "Games",
                                        value: "games"
                                    },
                                    {
                                        name: "Music",
                                        value: "music"
                                    },
                                    {
                                        name: "Socials",
                                        value: "socials"
                                    },
                                    {
                                        name: "Videos & Streams",
                                        value: "videos"
                                    },
                                    {
                                        name: "Other",
                                        value: "other"
                                    }
                                ]
                            }
                        ])
                    ).category;
                    files = (Array.from(filesMap) as Files).filter(
                        (f) => f[1].category === category
                    );
                }
                break;
            case "SELECT":
                {
                    const selected = (
                        await inquirer.prompt([
                            {
                                type: "checkbox",
                                prefix: "●",
                                message: chalk.green("Pick the Presences:"),
                                name: "selected",
                                choices: (Array.from(filesMap) as Files).map((f) => f[0])
                            }
                        ])
                    ).selected;
                    files = (Array.from(filesMap) as Files).filter((f) =>
                        selected.includes(f[0])
                    );
                }
                break;
            default:
                error(chalk.red("Unknown Mode selected…"));
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

            const response = (
                await inquirer.prompt([
                    {
                        type: "input",
                        prefix: "●",
                        message:
                            chalk.green("Please translate the following description of ") +
                            chalk.yellow(file[0]) +
                            chalk.green(`:\n"`) +
                            chalk.hex("#bebebe")(file[1].description["en"]) +
                            chalk.green(`":\n`) +
                            chalk.hex("#bebebe")(`(Type "skip" to skip)`),
                        name: "translatedDes"
                    }
                ])
            ).translatedDes,
                ver = data.version.split(".");

            if (response === "skip") {
                filesMap.delete(file[0]);
                await checkCount();
                continue;
            }
            data.version = `${ver[0]}.${ver[1]}.${Number(ver[2]) + 1}`;
            data.description[language] = response;
            delete data.path;

            writeFileSync(path, JSON.stringify(data, null, 2));
            filesMap.delete(file[0]);
            await checkCount();
        }
    };

main();

/** Typings for the Metadata JSON file */
interface Metadata {
    author: {
        name: string;
        id: string;
    };
    contributors?: Array<{
        name: string;
        id: string;
    }>;
    service: string;
    altnames?: Array<string>;
    description: Record<string, string>;
    url: string | Array<string>;
    version: string;
    logo: string;
    thumbnail: string;
    color: string;
    tags: Array<string>;
    category: "anime" | "games" | "music" | "socials" | "videos" | "other";
    iframe?: boolean;
    regExp?: RegExp;
    iframeRegExp?: RegExp;
    readLogs?: boolean;
    button?: boolean;
    warning?: boolean;
    path?: string;
    settings?: Array<{
        id: string;
        title?: string;
        icon?: string;
        if?: Record<string, string | number | boolean>;
        placeholder?: string;
        value?: string | number | boolean;
        values?: Array<string | number | boolean>;
        multiLanguage?: boolean | string | Array<string>;
    }>;
}
type Mode = "EVERY" | "CATEGORY" | "SELECT";
type Files = [string, Metadata][];
