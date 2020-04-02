import chalk from "chalk";
import { readdirSync } from "fs";
import lintStaged, { LintStagedOptions } from "lint-staged";
import { normalize, resolve, sep } from "path";

/** Configure Lint-Staged with custom matcher */
const lintConfig: LintStagedOptions["config"] = {
  /** For TypeScript files just prettify them */
  "*.ts": "prettier --write",
  "{manifest,tsconfig}.json": "prettier --write",
  /**
   * For JavaScript files check if they are in dist
   * and if the parent directory has a `presence.ts` file
   * Only if the file is in `dist` and the parent directory does **NOT**
   * have a `presence.ts` then it should be prettified.
   */
  "*.js": (jsFiles: string[]) => {
    const filesToPrettify = [];

    for (const file of jsFiles) {
      // Normalize the path and seperate it on OS specific seperator
      const normalizedPath = normalize(file).split(sep);

      // If the file is not in a dist directory, ignore it
      if (normalizedPath.indexOf("dist") === -1) continue;

      // Splice off the presence.js and dist folder
      normalizedPath.splice(-2, 2);

      // Scan the files in the Presence service folder
      const filesInDist = readdirSync(resolve(normalizedPath.join(sep)));

      // If there is a source TypeScript file then ignore this JS file
      if (filesInDist.includes("presence.ts")) continue;

      // Add the file to the queue to prettify
      filesToPrettify.push(`\"${file}\"`);
    }

    return `prettier --write ${filesToPrettify.join(" ")}`;
  }
};

/** Run lint-staged in an async function */
const lintRun = async () => {
  const success = await lintStaged({
    config: lintConfig
  });

  console.log(
    success
      ? chalk.green("Prettified files successfully")
      : chalk.red("Prettifying files failed")
  );
};

lintRun();
