"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
const lint_staged_1 = __importDefault(require("lint-staged"));
const path_1 = require("path");
/** Configure Lint-Staged with custom matcher */
const lintConfig = {
    /** For TypeScript files just prettify them */
    "*.ts": "prettier --write",
    "{manifest,tsconfig}.json": "prettier --write",
    /**
     * For JavaScript files check if they are in dist
     * and if the parent directory has a `presence.ts` file
     * Only if the file is in `dist` and the parent directory does **NOT**
     * have a `presence.ts` then it should be prettified.
     */
    "*.js": (jsFiles) => {
        const filesToPrettify = [];
        for (const file of jsFiles) {
            // Normalize the path and seperate it on OS specific seperator
            const normalizedPath = path_1.normalize(file).split(path_1.sep);
            // If the file is not in a dist directory, ignore it
            if (normalizedPath.indexOf("dist") === -1)
                continue;
            // Splice off the presence.js and dist folder
            normalizedPath.splice(-2, 2);
            // Scan the files in the Presence service folder
            const filesInDist = fs_1.readdirSync(path_1.resolve(normalizedPath.join(path_1.sep)));
            // If there is a source TypeScript file then ignore this JS file
            if (filesInDist.includes("presence.ts"))
                continue;
            // Add the file to the queue to prettify
            filesToPrettify.push(`\"${file}\"`);
        }
        return `prettier --write ${filesToPrettify.join(" ")}`;
    }
};
/** Run lint-staged in an async function */
const lintRun = async () => {
    const success = await lint_staged_1.default({
        config: lintConfig
    });
    console.log(success
        ? chalk_1.default.green("Prettified files successfully")
        : chalk_1.default.red("Prettifying files failed"));
};
lintRun();
