import "source-map-support/register";

import axios from "axios";
import { blue, green, red, yellow } from "chalk";
import { readFileSync } from "fs";
import { validate } from "jsonschema";

const latestMetadataSchema = async (): Promise<string> => {
    const versions = (
      (
        await axios.get(
          "https://api.github.com/repos/PreMiD/Schemas/contents/schemas/metadata"
        )
      ).data as { name: string }[]
    )
      .filter((c) => c.name.endsWith(".json"))
      .map((c) => c.name.match(/\d.\d/g)[0]);
    return `https://schemas.premid.app/metadata/${versions.pop()}`;
  },
  stats = {
    validated: 0,
    validatedWithWarnings: 0,
    failedToValidate: 0
  },
  validated = (service: string): void => {
    console.log(green(`✔ ${service}`));
    stats.validated++;
  },
  validatedWithWarnings = (service: string, warning: string): void => {
    console.log(yellow(`✔ ${service} (${warning})`));
    stats.validatedWithWarnings++;
  },
  failedToValidate = (service: string, errors: string[]): void => {
    console.log(
      red(`✘ ${service}\n${errors.map((e) => `  -> ${e}`).join("\n")}`)
    );
    stats.failedToValidate++;
  },
  loadMetadata = (path: string): metadata => {
    try {
      return JSON.parse(readFileSync(path, "utf-8"));
    } catch {
      return null;
    }
  },
  changedFiles = readFileSync("./file_changes.txt", "utf-8").trim().split("\n"),
  metaFiles = changedFiles.filter((f: string) => f.endsWith("metadata.json"));

(async (): Promise<void> => {
  console.log(blue("Getting latest schema..."));

  const latestSchema = await latestMetadataSchema(),
    schema = (await axios.get(latestSchema)).data;

  console.log(blue(`Beginning validation of ${metaFiles.length} presences...`));

  for (const metaFile of metaFiles) {
    const meta = loadMetadata(metaFile),
      folder = metaFile.split("/")[2];

    if (!meta) {
      failedToValidate(folder, ["Invalid JSON"]);
      continue;
    }

    const { service } = meta,
      result = validate(meta, schema),
      validLangs: string[] = (
        await axios.post<LanguageFiles>("https://api.premid.app/v3", {
          query: `{
              langFiles(project: "presence") {
                lang
              }
            }`
        })
      ).data.data.langFiles.map((l) => l.lang),
      invalidLangs: string[] = [];

    Object.keys(meta.description).forEach((lang) => {
      const index = validLangs.findIndex((l: string) => l === lang);
      if (index === -1) invalidLangs.push(lang);
    });

    if (result.valid && !invalidLangs.length && folder === meta.service) {
      if (meta.schema && meta.schema !== latestSchema)
        validatedWithWarnings(service, "Using out of date schema");
      else validated(service);
    } else {
      const errors: string[] = [];

      if (folder !== meta.service)
        errors.push("service name does not equal to the name of the folder!");

      for (const error of result.errors)
        errors.push(`${error.message} @ ${error.property}`);

      for (const invalidLang of invalidLangs) {
        errors.push(
          `"${invalidLang}" is not a valid language! Valid languages can be found here: https://api.premid.app/v2/langFile/list`
        );
      }

      failedToValidate(service, errors);
    }
  }

  console.log();
  console.log(blue("Statistics:"));
  console.log(
    green(`${stats.validated} fully validated\n`) +
      yellow(`${stats.validatedWithWarnings} validated, but with warnings\n`) +
      red(`${stats.failedToValidate} failed to validate`)
  );
  console.log();

  if (stats.failedToValidate > 0) {
    console.log(red("One or more services failed to validate."));
    process.exit(-1);
  }

  if (stats.validatedWithWarnings > 0)
    console.log(yellow("One or more services validated, but with warnings."));
})();

interface metadata extends Metadata {
  schema: string;
}

interface LanguageFiles {
  data: {
    langFiles: [
      {
        lang: string;
      }
    ];
  };
}
