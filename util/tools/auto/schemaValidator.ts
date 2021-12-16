import "source-map-support/register";

import axios from "axios";
import { blue, green, red, yellow } from "chalk";
import { readFileSync } from "fs";
import { validate } from "jsonschema";

import ParseJSON, { ObjectNode } from "json-to-ast";

const latestMetadataSchema = async (): Promise<string[]> => {
    const versions = (
      (
        await axios.get(
          "https://api.github.com/repos/PreMiD/Schemas/contents/schemas/metadata"
        )
      ).data as { name: string }[]
    )
      .filter((c) => c.name.endsWith(".json"))
      .map((c) => c.name.match(/\d.\d/g)[0]);
    return [`https://schemas.premid.app/metadata/${versions.at(-1)}`, versions.at(-1)];
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
    console.log(yellow(`✔ ${service}`));
    console.log(warning);
    stats.validatedWithWarnings++;
  },
  failedToValidate = (service: string, errors: string[]): void => {
    console.log(red(`✖ ${service}`));
    console.log(`::group::${service}`);
    console.log(errors.join("\n"));
    console.log("::endgroup::");
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

  const [latestSchema, latestSchemaVersion] = await latestMetadataSchema(),
    schema = (await axios.get(latestSchema)).data;

  console.log(blue(`Beginning validation of ${metaFiles.length} presences...`));

  for (const metaFile of metaFiles) {
    const meta = loadMetadata(metaFile),
      folder = metaFile.split("/")[2];

    if (!meta) {
      failedToValidate(folder, [`::error file=${metaFile},title=Invalid JSON::Unable to parse the JSON file`]);
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

    if (result.valid && !invalidLangs.length && folder === service) {
      if (meta.$schema && meta.$schema !== latestSchema)
        validatedWithWarnings(
          service,
          `::warning file=${metaFile},line=${getLine(
            "$schema"
          )},title=instance.$schema::Using out of date schema, the latest version is ${latestSchemaVersion}`
        );
      else validated(service);
    } else {
      const errors: string[] = [];
      if (folder !== service)
        errors.push(
          `::error file=${metaFile},line=${getLine(
            "service"
          )},title=instance.service::does not equal to the folder name`
        );

      for (const error of result.errors) {
        let property = error.property.split(".").at(1);

        if (!property) {
          property = error.message.match(/"(.*)"/g)[0].replace(/"/g, "");
          errors.push(
            `::error file=${metaFile},line=${getLine(
              property
            )},title=instance.${property}::${error.message} @ ${error.property}`
          );
        } else {
          if (property.match(/\[([0-9]+)\]/)) {
            const index = property.match(/\[([0-9]+)\]/)![1];

            errors.push(
              `::error file=${metaFile},line=${getLine(
                property.replace(/\[([0-9]+)\]/, ""),
                parseInt(index)
              )},title=${error.property}::${error.message} @ ${error.property}`
            );
          } else {
            errors.push(
              `::error file=${metaFile},line=${getLine(property)},title=${
                error.property
              }::${error.message} @ ${error.property}`
            );
          }
        }
      }

      for (const invalidLang of invalidLangs) {
        errors.push(
          `::error file=${metaFile},line=${
            getLine("description", invalidLang)
          },title=instance.description.${invalidLang}::"${invalidLang}" is not a valid language or is a unsupported language`
        );
      }

      failedToValidate(service, errors);
    }

    function getLine(line: string, value?: string | number) {
      const AST = ParseJSON(JSON.stringify(meta, null, 2), {
        loc: true,
        source: metaFile
      }) as ObjectNode;

      if (value) {
        const node = AST.children.find((c) => c.key.value === line).value;

        switch (node.type) {
          case "Literal":
            return node.loc.start.line;
          case "Object":
            return node.children.find((c) => c.key.value === value).loc.start.line;
          case "Array": {
            if (typeof value === "number")
              return node.children[value].loc.start.line;
            else {
              return node.children.find((c) => {
                switch (c.type) {
                  case "Literal":
                    return c.value === value;
                  case "Object":
                    return c.children.find((c) => c.key.value === value);
                }
              }).loc.start.line;
            }
          }
        }
      } else return AST.children.find((c) => c.key.value === line)?.loc?.start?.line ?? 0;
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
  $schema: string;
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
