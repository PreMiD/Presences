import axios from "axios";
import chalk from "chalk";
import { readFileSync, writeFileSync } from "fs";
import inquirer from "inquirer";
import ora from "ora";

import { Translator } from "./Translator";

const client = new Translator(),
  spinnerSettings = {
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
  };

(async () => {
  const langLoadSpinner = ora({
    text: chalk.green(`Loading languages…`),
    // @ts-expect-error Not in types.
    color: "bold"
  });
  // @ts-expect-error Not in types.
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
    .map((c) => c.lang)
    .filter((c) => c !== "en");
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
      // @ts-expect-error Not in types.
      color: "bold"
    });

  client.loadSpinner = loadFilesSpinner;

  // @ts-expect-error Not in types.
  loadFilesSpinner._spinner = spinnerSettings;
  loadFilesSpinner.start();
  await client.loadFiles(language);

  for await (const file of Array.from(client.files)) {
    const data = file[1],
      path = data.path,
      check = JSON.parse(await readFileSync(data.path).toString());

    if (check.description[language]) {
      client.error(`${file[0]} has already been translated to ${language}.`);
      continue;
    }

    delete data.path;
    const response = await inquirer.prompt([
      {
        type: "input",
        prefix: "●",
        message:
          chalk.green("Please translate the following description of ") +
          chalk.yellow(file[0]) +
          chalk.green(`:\n"`) +
          chalk.hex("#bebebe")(file[1].description["en"]) +
          chalk.green(`":`),
        name: file[0]
      }
    ]),
    ver = data.version.split(".");
    
    data.version = `${ver[0]}.${ver[1]}.${Number(ver[2]) + 1}`;
    data.description[language] = response[file[0]];

    writeFileSync(path, JSON.stringify(data, null, 2));
    client.files.delete(file[0]);
    await client.checkCount();
  }
})();