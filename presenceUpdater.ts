import * as Octokit from "@octokit/rest";
import axios from "axios";
import { connect, MongoClient } from "mongodb";

const octokit = new Octokit({
    auth: process.env.GHTOKEN
  }),
  base = axios.create({
    baseURL: `https://raw.githubusercontent.com/PreMiD/Presences/master/`
  });

connect(
  `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:27017`,
  {
    appname: "PreMiD-PresenceUpdater",
    useUnifiedTopology: true
  }
).then(run);

async function run(MongoClient: MongoClient) {
  const dbPresences = (await MongoClient.db("PreMiD")
    .collection("presences")
    .find({}, { projection: { _id: false, metadata: true } })
    .toArray()).map(p => {
    return { service: p.metadata.service, version: p.metadata.version };
  });

  const repoPresences = await octokit.repos
    .getContents({ owner: "PreMiD", repo: "Presences", path: "/" })
    .then((res: any) => {
      let presences: Octokit.ReposGetContentsResponseItem[] = res.data.filter(
        (f: Octokit.ReposGetContentsResponseItem) =>
          f.type === "dir" && !f.name.startsWith(".") && f.name !== "@types"
      );

      return Promise.all(
        presences.map(async f => {
          const json = (await base(`${encodeURI(f.name)}/dist/metadata.json`))
            .data;

          let res: any = {
            path: encodeURI(f.name),
            service: json.service,
            version: json.version,
            metadata: json
          };

          return res;
        })
      );
    });

  const newPresences = repoPresences.filter(
      p => !dbPresences.some(dP => dP.service === p.service)
    ),
    deletedPresences = dbPresences.filter(
      dP => !repoPresences.some(p => p.service === dP.service)
    ),
    outdatedPresences = dbPresences
      .filter(p =>
        repoPresences.find(
          dp => p.service === dp.service && dp.version !== p.version
        )
      )
      .map(dP => repoPresences.find(p => p.service === dP.service));

  const aPP = Promise.all(
    newPresences.map(async p => {
      let iframeJs = null;

      try {
        const presenceJs = (await base(`${p.path}/dist/presence.js`)).data;
        if (p.metadata.iframe)
          iframeJs = (await base(`${p.path}/dist/iframe.js`)).data;

        let res: any = {
          metadata: p.metadata,
          name: p.metadata.service,
          presenceJs: presenceJs,
          url: `https://api.premid.app/v2/presences/${p.metadata.service}/`
        };

        if (p.metadata.iframe) res.iframeJs = iframeJs;

        return res;
      } catch (e) {
        //TODO SEND MESSAGE TO DISCORD

        return false;
      }
    })
  ).then(pTA => {
    if (pTA.length > 0)
      return MongoClient.db("PreMiD")
        .collection("presences")
        .insertMany(pTA.filter(p => p));
  });

  const dPP = Promise.all(
    deletedPresences.map(p => {
      MongoClient.db("PreMiD")
        .collection("presences")
        .deleteOne({ name: p.service });
    })
  );

  const uPP = Promise.all(
    outdatedPresences.map(async p => {
      let iframeJs = null;

      try {
        const presenceJs = (await base(`${p.path}/dist/presence.js`)).data;
        if (p.metadata.iframe)
          iframeJs = (await base(`${p.path}/dist/iframe.js`)).data;

        let res: any = {
          metadata: p.metadata,
          name: p.metadata.service,
          presenceJs: presenceJs,
          url: `https://api.premid.app/v2/presences/${p.metadata.service}/`
        };

        if (p.metadata.iframe) res.iframeJs = iframeJs;

        await MongoClient.db("PreMiD")
          .collection("presences")
          .findOneAndReplace({ name: p.metadata.service }, res);
      } catch (e) {
        //TODO SEND MESSAGE TO DISCORD
      }
    })
  );

  Promise.all([aPP, uPP, dPP]).then(() => MongoClient.close());
}
