import { gql } from "@apollo/client/core/index.js";
import chalk from "chalk";
import { writeFile } from "fs/promises";
import inquirer from "inquirer";
import { getLanguage } from "language-flag-colors";
import { resolve } from "node:path";
import ora from "ora";
import prompts from "prompts";
import semver from "semver";
import fetchSchema from "../functions/fetchSchema.js";
import getPresences from "../functions/getPresences.js";
import { apollo } from "../util/apollo.js";
import { prefix } from "../util/prefix.js";
const spinner = ora("Loading languages...").start();
const { coerce, inc, valid } = semver;
const { data: { langFiles }, } = await apollo.query({
    query: gql `
		query {
			langFiles(project: "website") {
				lang
			}
		}
	`,
});
const schema = await fetchSchema();
spinner.stop();
const { lang } = await prompts({
    name: "lang",
    message: "Select the language you want add translations for",
    type: "autocomplete",
    choices: langFiles
        .filter(l => l.lang !== "en")
        .map(l => ({
        title: getLanguage(l.lang.replace("_", "-"))?.nativeName ?? l.lang,
        description: l.lang,
        value: l.lang,
    })),
    suggest: async (input, choices) => {
        const regex = new RegExp(input, "i");
        return choices.filter(c => regex.test(c.title) ||
            (c.description ? regex.test(c.description) : false));
    },
});
if (!lang) {
    console.log(prefix, chalk.redBright("No language selected, exiting..."));
    process.exit(0);
}
let presences = await getPresences();
const { mode } = await prompts([
    {
        type: "select",
        name: "mode",
        message: "What do you want to do?",
        choices: [
            {
                title: "Translate every Presence in order",
                value: 0,
            },
            {
                title: "Translate every Presence of category",
                value: 1,
            },
            {
                title: "Translate selected Presences",
                value: 2,
            },
        ],
    },
]);
const { selPresences, category } = await prompts([
    {
        type: mode === 1 ? "select" : false,
        name: "category",
        message: "Category of the service",
        choices: schema.properties.category.enum.map((c) => ({
            title: c,
            value: c,
        })),
    },
    {
        type: mode === 2 ? "autocompleteMultiselect" : false,
        name: "selPresences",
        message: "Select the Presences you want to translate",
        instructions: "Use arrow keys to select and space to toggle",
        choices: presences.map(p => ({
            title: `${p.metadata.service} ${p.versioned ? `(API v${p.metadata.apiVersion})` : ""}`,
            value: p,
        })),
        min: 1,
    },
]);
if (mode === 2) {
    await translatePresences(selPresences, lang);
    process.exit(0);
}
const { filterPresences } = await prompts([
    {
        type: "confirm",
        name: "filterPresences",
        message: "Filter out already translated Presences?",
    },
]);
if (filterPresences)
    presences = presences.filter(p => !p.metadata.description?.[lang]);
if (category)
    presences = presences.filter(p => p.metadata.category === category);
await translatePresences(presences, lang);
process.exit(0);
async function translatePresences(presences, lang) {
    if (!Array.isArray(presences))
        process.exit(0);
    for (const presence of presences) {
        const desc = presence.metadata.description?.[lang], enDesc = presence.metadata.description?.en;
        console.log(`${enDesc ? chalk.green(enDesc) + "\n\n" : ""}Type "skip" to skip or "stop" to stop translating.`);
        const { translation } = await inquirer.prompt({
            type: "input",
            name: "translation",
            message: presence.metadata.service,
            default: desc,
            validate: (input) => !!input ||
                "You need to enter a translation, or type 'skip' to skip, or 'stop' to stop translating.",
        });
        if (translation === "skip" || translation === desc)
            continue;
        if (translation === "stop")
            break;
        const presencePath = resolve(`./${presence.path}`);
        presence.metadata.description[lang] = translation;
        if (valid(coerce(presence.metadata.version)))
            presence.metadata.version = inc(valid(coerce(presence.metadata.version)), "patch");
        else
            console.warn(`Invalid version for ${presence.metadata.service}, skipping version bump.`);
        await writeFile(resolve(presencePath, "metadata.json"), JSON.stringify(presence.metadata, null, "\t"));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FjdGlvbnMvdHJhbnNsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNuRCxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBQ3RCLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM5QixPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxXQUFXLE1BQU0sNkJBQTZCLENBQUM7QUFDdEQsT0FBTyxZQUFZLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQyxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNwRCxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUM7QUFFdEMsTUFBTSxFQUNMLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUNuQixHQUFHLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBb0M7SUFDekQsS0FBSyxFQUFFLEdBQUcsQ0FBQTs7Ozs7O0VBTVQ7Q0FDRCxDQUFDLENBQUM7QUFFSCxNQUFNLE1BQU0sR0FBRyxNQUFNLFdBQVcsRUFBRSxDQUFDO0FBRW5DLE9BQU8sQ0FB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