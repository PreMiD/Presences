const presence = new Presence({
    clientId: "638344004085350400"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "teamtrees"
    },
    currentCount = await presence.getSetting("count"),
    count = document.getElementById("totalTrees")?.textContent;

  if (currentCount) {
    presenceData.details = `$${count}`;
    presenceData.state = "Currently Donated";
  } else {
    presenceData.details = "Helping #TeamTrees plant";
    presenceData.state = "20million trees by 2020";
  }

  presenceData.startTimestamp = browsingStamp;
  presenceData.buttons = [
    { label: "Visit #TeamSeas", url: "https://teamSeas.org" }
  ];

  presence.setActivity(presenceData);
});
