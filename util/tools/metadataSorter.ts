import "source-map-support/register";

import {
  existsSync as exists,
  readFileSync as readFile,
  writeFileSync as writeFile
} from "node:fs";
import { sync as glob } from "glob";
import { latestMetadataSchema } from "./schemaUpdater";

export function isValidJSON(text: string): boolean {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
}

export const read = (path: string): string =>
    readFile(path, { encoding: "utf8" }),
  write = (path: string, code: Metadata): void =>
    writeFile(path, JSON.stringify(code, null, 2), {
      encoding: "utf8",
      flag: "w"
    });

export const missingMetadata: string[] = glob(
    "./{websites,programs}/*/*/"
  ).filter(pF => !exists(`${pF}/dist/metadata.json`)),
  allmeta: Array<[Metadata, string]> = glob(
    "./{websites,programs}/*/*/*/metadata.json"
  ).map(pF => {
    const file = read(pF);
    if (isValidJSON(file)) return [JSON.parse(file), pF];
    else {
      console.error(`Error. ${pF} is not a valid metadata file, skipping...`);
      return null;
    }
  });

if (missingMetadata?.length > 0)
  console.log(
    `\nThe following presence${
      missingMetadata.length > 1 ? "s don't" : "doesn't"
    } include a metadata file :\n${missingMetadata.join(", ")}\n`
  );

(async function () {
  const latestSchema = await latestMetadataSchema()
  console.log(latestSchema)
  for (const metadata of allmeta) {
    if (metadata) {
      const newData: Metadata = {
        $schema: latestSchema,
        author: metadata[0].author,
        contributors: metadata[0].contributors,
        service: metadata[0].service,
        altnames: metadata[0].altnames,
        description: metadata[0].description,
        url: metadata[0].url,
        regExp: metadata[0].regExp,
        version: metadata[0].version,
        logo: metadata[0].logo,
        thumbnail: metadata[0].thumbnail,
        color: metadata[0].color,
        category: metadata[0].category,
        tags: metadata[0].tags,
        iframe: metadata[0].iframe,
        iFrameRegExp: metadata[0].iFrameRegExp,
        readLogs: metadata[0].readLogs,
        settings: metadata[0].settings
      };

      for (const key in newData) {
        if (typeof newData[key] === "undefined") delete newData[key];
      }
      write(metadata[1], newData);
    }
  }
})();

export interface Metadata extends Record<string, any> {
  $schema: `https://schemas.premid.app/metadata/${number}.${number}`;
  author: Contributor;
  contributors?: Contributor[];
  service: string;
  altnames: string[];
  description: { [lang: string]: string };
  url: `${string}.${string}`;
  regExp?: string;
  version: `${number}.${number}.${number}`;
  logo: `https://i.imgur.com/${string}.${"png" | "jpeg" | "jpg" | "gif"}`;
  thumbnail: `https://i.imgur.com/${string}.${"png" | "jpeg" | "jpg" | "gif"}`;
  color: `#${string}`;
  tags: string | string[];
  category: string;
  iframe?: boolean;
  iFrameRegExp?: string;
  readLogs?: boolean;
  settings?:
    | Setting
    | MultiLanguageSetting
    | StringSetting
    | ValueSetting
    | ValuesSetting;
}

interface Contributor {
  name: string;
  id: `${bigint}`;
}

interface BaseSetting {
  id: string;
}

interface MultiLanguageSetting extends BaseSetting {
  multiLanguage: true | string | string[];
}

interface Setting extends BaseSetting {
  title: string;
  icon: string;
  if?: {
    [key: string]: Value;
  };
}

interface StringSetting extends Setting {
  value: string;
  placeholder: string;
}

interface ValueSetting extends Setting {
  value: boolean;
}

interface ValuesSetting extends Setting {
  value: number;
  values: Value[];
}

type Value = string | number | boolean;
