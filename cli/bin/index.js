#!/usr/bin/env node
import "source-map-support/register.js";
import chalk from "chalk";
import { readFile } from "fs/promises";
import inquirer from "inquirer";
import ora from "ora";
import { Command } from "commander";
import getDiscordAppUser from "./functions/getDiscordAppUser.js";
import { prefix } from "./util/prefix.js";
if (!(await inPresenceRepo())) {
    console.error(prefix, chalk.redBright("This command can only be run in the presence repository"));
    process.exit(1);
}
const program = new Command();
program
    .allowUnknownOption()
    .option("-c, --create", "create a new Presence")
    .option("-m, --modify", "modify an existing presence")
    .option("-t, --translate", "translate a presence")
    .parse(process.argv);
const method = Object.keys(program.opts()).find(key => program.opts()[key] === true);
if (method) {
    if (method === "create")
        console.log(chalk.green("?"), chalk.bold("What do you want to do?"), chalk.cyan("Create a new Presence"));
    await import(`./actions/${method}.js`);
}
else {
    const spinner = ora("Fetching Discord User...").start(), user = await getDiscordAppUser();
    spinner.stop();
    if (user)
        console.log(prefix, `Hello ${chalk.green(user.username)}!`);
    const { action } = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What do you want to do?",
            choices: [
                {
                    name: "Create a new Presence",
                    value: "create",
                },
                {
                    name: "Modify an existing Presence",
                    value: "modify",
                },
                {
                    name: "Translate a Presence",
                    value: "translate",
                },
            ],
        },
    ]);
    if (action)
        await import(`./actions/${action}.js`);
}
async function inPresenceRepo() {
    try {
        const { name } = JSON.parse(await readFile("./package.json", "utf8"));
        return name === "presences";
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sZ0NBQWdDLENBQUM7QUFFeEMsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sR0FBRyxNQUFNLEtBQUssQ0FBQztBQUN0QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8saUJBQWlCLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTFDLElBQUksQ0FBQyxDQUFDLE1BQU0sY0FBYyxFQUFFLENBQUMsRUFBRTtJQUM5QixPQUFPLENBQUMsS0FBSyxDQUNaLE1BQU0sRUFDTixLQUFLLENBQUMsU0FBUyxDQUFDLHlEQUF5RCxDQUFDLENBQzFFLENBQUM7SUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2hCO0FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQUM5QixPQUFPO0tBQ0wsa0JBQWtCLEVBQUU7S0FDcEIsTUFBTSxDQUFDLGNBQWMsRUFBRSx1QkFBdUIsQ0FBQztLQUMvQyxNQUFNLENBQUMsY0FBYyxFQUFFLDZCQUE2QixDQUFDO0tBQ3JELE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxzQkFBc0IsQ0FBQztLQUNqRCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXRCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUM5QyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQ25DLENBQUM7QUFFRixJQUFJLE1BQU0sRUFBRTtJQUNYLElBQUksTUFBTSxLQUFLLFFBQVE7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FDVixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUNoQixLQUFLLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEVBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FDbkMsQ0FBQztJQUNILE1BQU0sTUFBTSxDQUFDLGFBQWEsTUFBTSxLQUFLLENBQUMsQ0FBQztDQUN2QztLQUFNO0lBQ04sTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUMsS0FBSyxFQUFFLEVBQ3RELElBQUksR0FBRyxNQUFNLGlCQUFpQixFQUFFLENBQUM7SUFDbEMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRWYsSUFBSSxJQUFJO1FBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBcUI7UUFDNUQ7WUFDQyxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLHlCQUF5QjtZQUNsQyxPQUFPLEVBQUU7Z0JBQ1I7b0JBQ0MsSUFBSSxFQUFFLHVCQUF1QjtvQkFDN0IsS0FBSyxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0Q7b0JBQ0MsSUFBSSxFQUFFLDZCQUE2QjtvQkFDbkMsS0FBSyxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0Q7b0JBQ0MsSUFBSSxFQUFFLHNCQUFzQjtvQkFDNUIsS0FBSyxFQUFFLFdBQVc7aUJBQ2xCO2FBQ0Q7U0FDRDtLQUNELENBQUMsQ0FBQztJQUNILElBQUksTUFBTTtRQUFFLE1BQU0sTUFBTSxDQUFDLGFBQWEsTUFBTSxLQUFLLENBQUMsQ0FBQztDQUNuRDtBQUVELEtBQUssVUFBVSxjQUFjO0lBQzVCLElBQUk7UUFDSCxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sSUFBSSxLQUFLLFdBQVcsQ0FBQztLQUM1QjtJQUFDLE1BQU07UUFDUCxPQUFPLEtBQUssQ0FBQztLQUNiO0FBQ0YsQ0FBQyJ9