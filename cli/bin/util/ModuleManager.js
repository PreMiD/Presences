import { exec } from "child_process";
import { resolve } from "path";
import { existsSync } from "fs";
import ora from "ora";
import { prefix } from "./prefix.js";
import chalk from "chalk";
import { readFile } from "fs/promises";
export default class ModuleManager {
    cwd;
    dependencies = [];
    devDependencies = [];
    constructor(cwd) {
        this.cwd = cwd;
    }
    async isValidPackageJson() {
        if (!existsSync(resolve(this.cwd, "package.json")))
            return false;
        try {
            JSON.parse(await readFile(resolve(this.cwd, "package.json"), "utf8"));
            return true;
        }
        catch {
            return false;
        }
    }
    async installDependencies() {
        const prevNodeEnv = process.env.NODE_ENV;
        delete process.env.NODE_ENV;
        if (!(await this.isValidPackageJson()))
            return;
        const spinner = ora(prefix + chalk.yellow(" Installing dependencies...")).start();
        const job = exec("npm install --loglevel error --save-exact", {
            cwd: this.cwd,
        });
        let errorChunks = [];
        job.stderr?.on("data", data => {
            errorChunks = errorChunks.concat(data);
        });
        await new Promise(r => job.once("exit", code => {
            if (code === 0) {
                spinner.succeed(prefix + chalk.green(" Installed dependencies!"));
                return r();
            }
            spinner.fail(prefix + " " + chalk.red(errorChunks.join("")));
            r();
        }));
        process.env.NODE_ENV = prevNodeEnv;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kdWxlTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL01vZHVsZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDaEMsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBQ3RCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDckMsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdkMsTUFBTSxDQUFDLE9BQU8sT0FBTyxhQUFhO0lBSWQ7SUFIbkIsWUFBWSxHQUFhLEVBQUUsQ0FBQztJQUM1QixlQUFlLEdBQWEsRUFBRSxDQUFDO0lBRS9CLFlBQW1CLEdBQVc7UUFBWCxRQUFHLEdBQUgsR0FBRyxDQUFRO0lBQUcsQ0FBQztJQUVsQyxLQUFLLENBQUMsa0JBQWtCO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUVqRSxJQUFJO1lBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFBQyxNQUFNO1lBQ1AsT0FBTyxLQUFLLENBQUM7U0FDYjtJQUNGLENBQUM7SUFFRCxLQUFLLENBQUMsbUJBQW1CO1FBQ3hCLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQ3pDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFFNUIsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUFFLE9BQU87UUFFL0MsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUNsQixNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxDQUNwRCxDQUFDLEtBQUssRUFBRSxDQUFDO1FBR1YsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLDJDQUEyQyxFQUFFO1lBQzdELEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztTQUNiLENBQUMsQ0FBQztRQUVILElBQUksV0FBVyxHQUFVLEVBQUUsQ0FBQztRQUM1QixHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDN0IsV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLElBQUksT0FBTyxDQUFPLENBQUMsQ0FBQyxFQUFFLENBQzNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtnQkFDZixPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztnQkFFbEUsT0FBTyxDQUFDLEVBQUUsQ0FBQzthQUNYO1lBRUQsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN0QsQ0FBQyxFQUFFLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FDRixDQUFDO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO0lBQ3BDLENBQUM7Q0FDRCJ9