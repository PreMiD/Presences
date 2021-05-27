import "source-map-support/register";

import { blue, green, red, yellow } from "chalk";

import axios from "axios";
import { readFileSync } from "fs";
import { validate } from "jsonschema";

const latestMetadataSchema = "https://schemas.premid.app/metadata/1.4",
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
  loadMetadata = (path: string): metadata =>
    JSON.parse(readFileSync(path, "utf-8")),
  changedFiles = readFileSync("./file_changes.txt", "utf-8").trim().split("\n"),
  metaFiles = changedFiles.filter((f: string) => f.endsWith("metadata.json"));

(async (): Promise<void> => {
  console.log(blue("Getting latest schema..."));

  const schema = (await axios.get(latestMetadataSchema)).data;

  console.log(
    blue("Beginning validation of " + metaFiles.length + " presences...")
  );

  for (const metaFile of metaFiles) {
    const meta = loadMetadata(metaFile),
      service = meta.service,
      result = validate(meta, schema),
      validLangs = (await axios.get("https://api.premid.app/v2/langFile/list"))
        .data,
      invalidLangs: string[] = [];

    Object.keys(meta.description).forEach((lang) => {
      const index = validLangs.findIndex((l: string) => l == lang);
      if (index == -1) invalidLangs.push(lang);
    });

    if (result.valid && !invalidLangs.length) {
      if (meta.schema && meta.schema !== latestMetadataSchema) {
        validatedWithWarnings(service, "Using out of date schema");
      } else {
        validated(service);
      }
    } else {
      const errors: string[] = [];
      for (const error of result.errors)
        errors.push(`${error.message} @ ${error.property}`);

      for (const invalidLang of invalidLangs)
        errors.push(
          `"${invalidLang}" is not a valid language! Valid languages can be found here: https://api.premid.app/v2/langFile/list`
        );

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

  if (stats.validatedWithWarnings > 0) {
    console.log(yellow("One or more services validated, but with warnings."));
  }
})();

interface metadata extends Metadata {
  schema: string;
}
