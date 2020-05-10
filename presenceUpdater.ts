import "source-map-support/register";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { connect, MongoClient } from "mongodb";
import { readFileSync as readFile } from "fs";
import { sync as glob } from "glob";

async function run(MongoClient: MongoClient): Promise<void> {
  const dbPresences = await MongoClient.db("PreMiD")
    .collection("presences")
    .find()
    .toArray();

  const presenceFolders = glob("./{websites,programs}/*/*/", {
    ignore: ["**/node_modules/**", "**/@types/**"]
  });

  const presences = presenceFolders.map((pF) => {
    const metadata = JSON.parse(readFile(`${pF}/dist/metadata.json`, "utf-8")),
      presenceJs = readFile(`${pF}/dist/presence.js`, "utf-8");

    const resJson: any = {
      name: metadata.service,
      url: `https://api.premid.app/v2/presences/${encodeURI(
        metadata.service
      )}/`,
      metadata,
      presenceJs
    };

    if (metadata.iframe)
      resJson.iframeJs = readFile(`${pF}/dist/iframe.js`, "utf-8");

    return resJson;
  });

  const newPresences = presences.filter(
      (p) => !dbPresences.some((dP) => dP.name === p.name)
    ),
    deletedPresences = dbPresences.filter(
      (dP) => !presences.some((p) => p.name === dP.name)
    ),
    outdatedPresences = dbPresences
      .filter((p) =>
        presences.find(
          (dp) =>
            p.name === dp.name && dp.metadata.version !== p.metadata.version
        )
      )
      .map((dP) => presences.find((p) => p.name === dP.name));

  let nP,
    dP = [],
    oP = [];

  if (newPresences.length > 0)
    nP = MongoClient.db("PreMiD")
      .collection("presences")
      .insertMany(newPresences);

  if (deletedPresences.length > 0)
    dP = deletedPresences.map((p) =>
      MongoClient.db("PreMiD")
        .collection("presences")
        .deleteOne({ name: p.name })
    );

  if (outdatedPresences.length > 0)
    oP = outdatedPresences.map((p) =>
      MongoClient.db("PreMiD")
        .collection("presences")
        .findOneAndUpdate({ name: p.metadata.service }, { $set: p })
    );

  Promise.all([nP, ...dP, ...oP]).then(() => MongoClient.close());
}

connect(
  `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:27017`,
  {
    appname: "PreMiD-PresenceUpdater",
    useUnifiedTopology: true
  }
).then(run);
