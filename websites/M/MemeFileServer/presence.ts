const presence = new Presence({
  clientId: "932468446422237184"
});

const browsingTimestamp: number = Math.floor(Date.now() / 1000);
let from: string, to: string;

presence.on("UpdateData", async () => {
  const showTime = await presence.getSetting<boolean>("stamp"),
    tDetail = await presence.getSetting<string>("tDetail"),
    tState = await presence.getSetting<string>("tState"),
    presenceData: PresenceData = {
      largeImageKey: "basic"
    };

  if (document.location.href.includes("upload")) {
    presenceData.details = "Uploading a meme";
  } else {
    presenceData.details = "Viewing memefileserver.ml";
  }

  presenceData.startTimestamp = showTime ? browsingTimestamp : null;
  if (presenceData.startTimestamp === null) delete presenceData.startTimestamp;
  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
