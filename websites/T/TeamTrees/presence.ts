var presence = new Presence({
  clientId: "638344004085350400"
});

var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "teamtrees"
  };

  presenceData.startTimestamp = browsingStamp;
  presenceData.details = "Helping #TeamTrees plant";
  presenceData.state = "20million trees by 2020";
  presence.setActivity(presenceData);
});
