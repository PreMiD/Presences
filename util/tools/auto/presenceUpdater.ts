import "source-map-support/register";

import {
  CompilerOptions,
  createProgram,
  flattenDiagnosticMessageText,
  getPreEmitDiagnostics
} from "typescript";
import {
  DeleteWriteOpResultObject,
  MongoClient,
  UpdateWriteOpResult
} from "mongodb";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join, normalize, resolve as rslv, sep } from "path";

import { sync as glob } from "glob";
import { minify as terser } from "terser";
import { transformFileAsync as transform } from "@babel/core";
import { valid } from "semver";

const url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:27017`,
  dbname = "PreMiD";
let extendedRun = false,
  exitCode = 0,
  appCode = 0;

function isValidJSON(text: string): boolean {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
}

let client = new MongoClient(url, {
  appname: "PreMiD-PresenceUpdater",
  useUnifiedTopology: true
});

const readFile = (path: string): string =>
    readFileSync(path, { encoding: "utf8" }),
  writeJS = (path: string, code: string): void =>
    writeFileSync(path, code, { encoding: "utf8", flag: "w" }),
  readJson = <T>(jsonPath: string): T => JSON.parse(readFile(jsonPath)) as T,
  compileFile = async (
    fileNames: string[],
    options: CompilerOptions
  ): Promise<void> => {
    const program = createProgram(fileNames, options),
      emitResult = program.emit(),
      allDiagnostics = getPreEmitDiagnostics(program).concat(
        emitResult.diagnostics
      );

    allDiagnostics.forEach((diagnostic) => {
      if (diagnostic.file) {
        const {
            line,
            character
          } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!),
          message = flattenDiagnosticMessageText(diagnostic.messageText, "\n");
        console.log(
          `${diagnostic.file.fileName} (${line + 1},${
            character + 1
          }): ${message}`
        );
      } else {
        console.log(flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
      }
    });

    if (emitResult.emitSkipped) appCode = 1;
  },
  minify = async (file: string): Promise<void> => {
    const result = await terser(readFile(file), {
      ecma: 5,
      compress: {
        passes: 2
      }
    });
    if (result && result.code && result.code.length > 0)
      writeJS(file, result.code);
    else {
      console.error(`Error. File ${file} was not minified, skipping...`);
      appCode = 1;
    }
  },
  polyfill = async (file: string): Promise<void> => {
    const result = await transform(file, {
      presets: [["@babel/preset-env", { exclude: ["transform-regenerator"] }]]
    });
    if (result && result.code && result.code.length > 0) {
      writeJS(file, result.code);
      await minify(file);
    } else {
      console.error(`Error. File ${file} was not polyfilled, skipping...`);
      appCode = 1;
    }
  },
  compile = async (filesToCompile: string[]): Promise<void> => {
    const premidTypings = join(__dirname, "../../../@types", "premid", "index.d.ts"),
      { compilerOptions: baseTsConfig } = readJson<{
        compilerOptions: CompilerOptions;
      }>(rslv(__dirname, "../../../tsconfig.json"));

    for (const fileToCompile of filesToCompile) {
      const normalizedPath = normalize(fileToCompile).split(sep);
      normalizedPath.pop();

      const { compilerOptions: presenceConfig } = readJson<{
          compilerOptions: CompilerOptions;
        }>(rslv(normalizedPath.join(sep), "../../../tsconfig.json")),
        tsConfig: CompilerOptions = {
          ...baseTsConfig,
          ...presenceConfig,
          outDir: rslv(normalizedPath.join(sep), "dist"),
          noEmitOnError: false,
          types: ["node"]
        };

      compileFile([fileToCompile, premidTypings], tsConfig);
    }
  },
  main = async (): Promise<void> => {
    if (!process.env.GITHUB_ACTIONS)
      console.log(
        "\nPlease note that this script is ONLY supposed to run on a CI environment"
      );

    console.log("\nFETCHING...\n");

    try {
      await client.connect();
    } catch (err) {
      console.error(err.stack || err);
      process.exit(1);
    }

    let database = client.db(dbname).collection("presences");
    const dbPresences: Array<DBdata> = await database
        .find({}, { projection: { _id: 0, name: 1, "metadata.version": 1 } })
        .toArray(),
      presences: Array<[Metadata, string]> = glob("./{websites,programs}/*/*/")
        .filter((pF) => existsSync(`${pF}/dist/metadata.json`))
        .map((pF) => {
          const file = readFile(`${pF}/dist/metadata.json`);
          if (isValidJSON(file)) {
            const data = JSON.parse(file);
            delete data["$schema"];
            return [data, pF];
          } else {
            console.error(
              `Error. Folder ${pF} does not include a valid metadata file, skipping...`
            );
            exitCode = 1;
            return null;
          }
        }),
      newPresences = presences.filter(
        (p) => !dbPresences.some((dP) => dP.name === p[0].service)
      ),
      deletedPresences = dbPresences.filter(
        (dP) => !presences.some((p) => p[0].service === dP.name)
      ),
      outdatedPresences = dbPresences
        .filter((dP) =>
          presences.some(
            (p) =>
              dP.name === p[0].service && p[0].version !== dP.metadata.version
          )
        )
        .map((dP) => presences.find((p) => p[0].service === dP.name)),
      dbDiff = outdatedPresences.concat(newPresences);

    if (dbDiff.length > 5) {
      extendedRun = true;
      await client.close();
    }

    console.log(`New additions: ${newPresences.length}`);
    console.log(`To be updated: ${outdatedPresences.length}`);
    console.log(`To be deleted: ${deletedPresences.length}`);

    if (dbDiff.length > 0) console.log("\nCOMPILING...\n");
    if (extendedRun) console.log("This will take some time...");

    let nP,
      dP: Promise<DeleteWriteOpResultObject>[] = [],
      oP: Promise<UpdateWriteOpResult>[] = [];

    const compiledPresences = await Promise.all(
      dbDiff.map(async (file) => {
        let metadata: customMetadata = file[0];
        const path = file[1],
          sources = glob(`${path}*.ts`),
          metadataFile = readJson<Metadata>(`${path}dist/metadata.json`);

        appCode = 0;

        if (!metadata && !metadataFile) {
          console.error(
            `Error. No metadata was found for ${path}, skipping...`
          );
          appCode = 1;
          return null;
        } else if (!metadata && metadataFile) metadata = metadataFile;

        if (!path) return null;

        if (
          !metadataFile ||
          (metadataFile && valid(metadataFile.version) == null)
        ) {
          const meta =
            metadataFile && metadataFile.service
              ? metadataFile.service
              : metadata && metadata.service
              ? metadata.service
              : path;
          console.error(
            `Error. ${meta} does not include a valid metadata file/version, skipping...`
          );
          appCode = 1;
          return null;
        }

        await compile(sources);

        const jsFiles = glob(`${path}dist/*.js`);
        for (const file of jsFiles) {
          await polyfill(file);
        }

        if (!existsSync(`${path}dist/presence.js`)) {
          const meta = metadataFile.service ? metadataFile.service : path;
          console.error(`Error. ${meta} did not compile, skipping...`);
          appCode = 1;
          return null;
        }

        const resJson: DBdata = {
          name: metadata.service,
          url: `https://api.premid.app/v2/presences/${encodeURIComponent(
            metadata.service
          )}/`,
          metadata,
          presenceJs: readFileSync(`${path}dist/presence.js`, "utf-8")
        };

        if (metadata.iframe && existsSync(`${path}dist/iframe.js`))
          resJson.iframeJs = readFileSync(`${path}dist/iframe.js`, "utf-8");
        else if (metadata.iframe && !existsSync(`${path}dist/iframe.js`)) {
          console.error(
            `Error. ${metadata.service} explicitly includes iframe but no such file was found, skipping...`
          );
          appCode = 1;
          return null;
        } else if (!metadata.iframe && existsSync(`${path}dist/iframe.js`)) {
          console.error(
            `Error. ${metadata.service} contains an iframe file but does not include it in the metadata, skipping...`
          );
          appCode = 1;
          return null;
        }

        if (appCode === 1) {
          if (exitCode === 0) exitCode = 1;
          metadata.service && metadata.service.length > 0
            ? console.log(`❌ ${metadata.service}`)
            : console.log(`❌ ${path}`);
        }

        return resJson;
      })
    );

    console.log("\nUPDATING...\n");

    try {
      if (extendedRun || !client.isConnected) {
        client = new MongoClient(url, {
          appname: "PreMiD-PresenceUpdater",
          useUnifiedTopology: true
        });
        await client.connect();
        database = client.db(dbname).collection("presences");
      }

      const bulkNp = compiledPresences.filter((e) =>
          newPresences.some((p) => e && e.name === p[0].service)
        ),
        bulkOp = compiledPresences.filter((e) =>
          outdatedPresences.some((p) => e && e.name === p[0].service)
        );

      if (bulkNp.length > 0) {
        nP = database.insertMany(bulkNp);
        for (const presence of bulkNp) {
          console.log(
            `ADD - "${presence.name}" @ ${presence.metadata.version}`
          );
        }
      }

      if (deletedPresences.length > 0) {
        dP = deletedPresences.map((p) => database.deleteOne({ name: p.name }));
        for (const presence of deletedPresences) {
          if (!presence || !presence.name) continue;
          console.log(
            `DEL - "${presence.name}" @ ${presence.metadata.version}`
          );
        }
      }

      if (bulkOp.length > 0) {
        oP = bulkOp.map((p) =>
          database.updateOne({ name: p.name }, { $set: p })
        );
        for (const presence of bulkOp) {
          console.log(
            `UPD - "${presence.name}" => ${presence.metadata.version}`
          );
        }
      }

      //TODO: Webhook to Discord in case of failure ( exitCode 1 )
      Promise.all([nP, ...dP, ...oP]).then(() =>
        client.close().then(() => process.exit(exitCode))
      );
    } catch (err) {
      console.error(err.stack || err);
      process.exit(1);
    }
  };

main();

process.on("unhandledRejection", (rejection) => {
  console.error(rejection);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error(err.stack || err);
  process.exit(1);
});

interface customMetadata extends Metadata {
  schema?: string;
}

interface DBdata {
  name: string;
  url: string;
  metadata: customMetadata;
  presenceJs: string;
  iframeJs?: string;
}
