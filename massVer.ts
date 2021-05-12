/*  NOTE: THIS IS A TOOL THAT IS ONLY MEANT TO BE USED
    BY THE DEVS AND REVIEWERS FOR DEPLOYMENT PURPOSES,
    PLEASE DON'T COMPILE OR RUN IT BEFORE MAKING A PULL
    REQUEST UNLESS YOU'VE BEEN EXPLICITLY INSTRUCTED BY
    A DEV TO DO SO, WHICH WILL MOST LIKELY NEVER HAPPEN.  */

import "source-map-support/register";

import { coerce, inc, valid } from "semver";
import {
  existsSync as exists,
  readFileSync as readFile,
  writeFileSync as writeFile
} from "fs";

import { sync as glob } from "glob";

function isValidJSON(text: string): boolean {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
}

const read = (path: string): string => readFile(path, { encoding: "utf8" }),
  write = (path: string, code: Metadata): void =>
    writeFile(path, JSON.stringify(code, null, 2), {
      encoding: "utf8",
      flag: "w"
    }),
  main = (): void => {
    const missingMetadata: string[] = glob("./{websites,programs}/*/*/").filter(
        (pF) => !exists(`${pF}/dist/metadata.json`)
      ),
      allmeta: Array<[Metadata, string]> = glob(
        "./{websites,programs}/*/*/*/metadata.json"
      ).map((pF) => {
        const file = read(pF);
        if (isValidJSON(file)) return [JSON.parse(file), pF];
        else {
          console.error(
            `Error. ${pF} is not a valid metadata file, skipping...`
          );
          return null;
        }
      });

    if (missingMetadata && missingMetadata.length > 0)
      console.log(
        `\nThe following presence${
          missingMetadata.length > 1 ? "s don't" : "doesn't"
        } include a metadata file :\n${missingMetadata.join(", ")}\n`
      );

    for (const metadata of allmeta) {
      if (metadata) {
        const newData = metadata[0];
        if (newData.version && valid(coerce(newData.version))) {
          newData.version = inc(valid(coerce(newData.version)), "patch");
          write(metadata[1], newData);
        } else {
          console.log(
            `Error. ${
              metadata[0].service && metadata[0].service.length > 0
                ? metadata[0].service
                : metadata[1]
            } does not include a valid metadata version, trying to overwrite...\n`
          );
          try {
            newData.version = "1.0.0";
            write(metadata[1], newData);
          } catch (err) {
            console.log(err);
            continue;
          }
        }
      }
    }
  };

main();

interface Metadata {
  service: string;
  version: string;
}
