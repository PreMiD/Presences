import "source-map-support/register";

import {
  connect,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

let exitCode = 0;

function isValidJSON(text: string): boolean {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
}

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

    console.log(fileToCompile);
    compileFile([fileToCompile, premidTypings], tsConfig);
  }
};

async function run(MongoClient: MongoClient): Promise<void> {
  if (!process.env.GITHUB_ACTIONS)
    console.log(
      "\nPlease note that this script is ONLY supposed to run on a CI environment"
    );

  console.log("\nFETCHING...\n");

  const presenceFolders = glob("./{websites,programs}/*/*/"),
    db = MongoClient.db("PreMiD-DEV").collection("presences"),
    dbPresences: Array<DBdata> = await db
      .find({}, { projection: { _id: 0, name: 1, "metadata.version": 1 } })
      .toArray(),
    presences: Array<[Metadata, string]> = presenceFolders
      .filter((pF) => existsSync(`${pF}/dist/metadata.json`))
      .map((pF) => {
        const file = readFile(`${pF}/dist/metadata.json`);
        if (isValidJSON(file)) {
          return [JSON.parse(file), pF];
        } else {
          console.log(
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

  console.log(`New additions: ${newPresences.length}`);
  console.log(`To be updated: ${outdatedPresences.length}`);
  console.log(`To be deleted: ${deletedPresences.length}`);

  if (dbDiff.length > 0) console.log("\nCOMPILING...\n");

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
        console.log(`Error. No metadata was found for ${path}, skipping...`);
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
        console.log(
          `Error. ${meta} does not include a valid metadata file/version, skipping...`
        );
        exitCode = 1;
        return null;
      }

      await compile(sources);

      if (!existsSync(`${path}dist/presence.js`)) {
        const meta = metadataFile.service ? metadataFile.service : path;
        console.log(`Error. ${meta} did not compile, skipping...`);
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
        console.log(
          `Error. ${metadata.service} explicitly includes iframe but no such file was found, skipping...`
        );
        exitCode = 1;
        return null;
      } else if (!metadata.iframe && existsSync(`${path}dist/iframe.js`)) {
        console.log(
          `Error. ${metadata.service} contains an iframe file but does not include it in the metadata, skipping...`
        );
        exitCode = 1;
        return null;
      }

      return resJson;
    })
  );

  console.log("\nUPDATING...\n");

  const bulkNp = compiledPresences.filter((e) =>
      newPresences.some((p) => e && e.name === p[0].service)
    ),
    bulkOp = compiledPresences.filter((e) =>
      outdatedPresences.some((p) => e && e.name === p[0].service)
    );

  if (bulkNp.length > 0) {
    nP = db.insertMany(bulkNp);
    for (const presence of bulkNp) {
      console.log(`ADD - "${presence.name}" @ ${presence.metadata.version}`);
    }
  }

  if (deletedPresences.length > 0) {
    dP = deletedPresences.map((p) => db.deleteOne({ name: p.name }));
    for (const presence of deletedPresences) {
      if (!presence || !presence.name) continue;
      console.log(`DEL - "${presence.name}" @ ${presence.metadata.version}`);
    }
  }

  if (bulkOp.length > 0) {
    oP = bulkOp.map((p) => db.updateOne({ name: p.name }, { $set: p }));
    for (const presence of bulkOp) {
      console.log(`UPD - "${presence.name}" => ${presence.metadata.version}`);
    }
  }

  //TODO: Webhook to Discord in case of failure ( exitCode 1 )
  Promise.all([nP, ...dP, ...oP]).then(() =>
    MongoClient.close().then(() => process.exit(exitCode))
  );
}

connect(
  `mongodb://engineer:46HCEdbDUZAcmAAxsnGcajEQzVFpNYYyjEgrZad4XsqW9HqCpf5Tff5Hvk5XD2Ci@premid.app:27017`,
  {
    appname: "PreMiD-PresenceUpdater",
    useUnifiedTopology: true
  }
).then(run);

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
