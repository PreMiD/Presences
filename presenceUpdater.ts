import "source-map-support/register";

import {
  MongoClient,
  DeleteWriteOpResultObject,
  UpdateWriteOpResult
} from "mongodb";
import { existsSync, readFileSync } from "fs";
import { sync as glob } from "glob";
import {
  CompilerOptions,
  createProgram,
  flattenDiagnosticMessageText,
  getPreEmitDiagnostics
} from "typescript";
import { valid } from "semver";
import { join, normalize, resolve, sep } from "path";

const url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:27017`,
  dbname = "PreMiD";
let extendedRun = false,
  exitCode = 0;

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
  readFileSync(path, { encoding: "utf8" });

const readJson = <T>(jsonPath: string): T =>
  JSON.parse(readFile(jsonPath)) as T;

const compileFile = async (
  fileNames: string[],
  options: CompilerOptions
): Promise<void> => {
  const program = createProgram(fileNames, options);
  const emitResult = program.emit();

  const allDiagnostics = getPreEmitDiagnostics(program).concat(
    emitResult.diagnostics
  );

  allDiagnostics.forEach((diagnostic) => {
    if (diagnostic.file) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        diagnostic.start!
      );
      const message = flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n"
      );
      console.log(
        `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
      );
    } else {
      console.log(flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    }
  });

  if (emitResult.emitSkipped) exitCode = 1;
};

const compile = async (filesToCompile: string[]): Promise<void> => {
  const premidTypings = join(__dirname, "@types", "premid", "index.d.ts");

  const { compilerOptions: baseTsConfig } = readJson<{
    compilerOptions: CompilerOptions;
  }>(resolve(__dirname, "tsconfig.json"));

  for (const fileToCompile of filesToCompile) {
    const normalizedPath = normalize(fileToCompile).split(sep);
    normalizedPath.pop();

    const { compilerOptions: presenceConfig } = readJson<{
      compilerOptions: CompilerOptions;
    }>(resolve(normalizedPath.join(sep), "tsconfig.json"));

    const tsConfig: CompilerOptions = {
      ...baseTsConfig,
      ...presenceConfig,
      outDir: resolve(normalizedPath.join(sep), "dist"),
      noEmitOnError: false,
      types: ["node"]
    };

    compileFile([fileToCompile, premidTypings], tsConfig);
  }
};

const main = async (): Promise<void> => {
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
          delete data['$schema'];
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
      let metadata = file[0];
      const path = file[1],
        sources = glob(`${file[1]}**.ts`),
        metadataFile = readJson<Metadata>(`${path}dist/metadata.json`);

      if (!metadata && !metadataFile) {
        console.error(`Error. No metadata was found for ${path}, skipping...`);
        exitCode = 1;
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
        exitCode = 1;
        return null;
      }

      await compile(sources);

      if (!existsSync(`${path}dist/presence.js`)) {
        const meta = metadataFile.service ? metadataFile.service : path;
        console.error(`Error. ${meta} did not compile, skipping...`);
        exitCode = 1;
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
        exitCode = 1;
        return null;
      } else if (!metadata.iframe && existsSync(`${path}dist/iframe.js`)) {
        console.error(
          `Error. ${metadata.service} contains an iframe file but does not include it in the metadata, skipping...`
        );
        exitCode = 1;
        return null;
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
        console.log(`ADD - "${presence.name}" @ ${presence.metadata.version}`);
      }
    }

    if (deletedPresences.length > 0) {
      dP = deletedPresences.map((p) => database.deleteOne({ name: p.name }));
      for (const presence of deletedPresences) {
        if (!presence || !presence.name) continue;
        console.log(`DEL - "${presence.name}" @ ${presence.metadata.version}`);
      }
    }

    if (bulkOp.length > 0) {
      oP = bulkOp.map((p) => database.updateOne({ name: p.name }, { $set: p }));
      for (const presence of bulkOp) {
        console.log(`UPD - "${presence.name}" => ${presence.metadata.version}`);
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

interface Metadata {
  author: { name: string; id: string };
  contributors?: Array<{ name: string; id: string }>;
  service: string;
  description: Record<string, string>;
  url: string;
  version: string;
  logo: string;
  thumbnail: string;
  color: string;
  tags: string | Array<string>;
  category: string;
  iframe?: boolean;
  regExp?: RegExp;
  iframeRegExp?: RegExp;
  button?: boolean;
  warning?: boolean;
  settings?: Array<{
    id: string;
    title: string;
    icon: string;
    if?: Record<string, string>;
    placeholder?: string;
    value?: string | number | boolean;
    values?: Array<string | number | boolean>;
  }>;
}

interface DBdata {
  name: string;
  url: string;
  metadata: Metadata;
  presenceJs: string;
  iframeJs?: string;
}
