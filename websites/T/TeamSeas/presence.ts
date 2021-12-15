const presence = new Presence({
    clientId: "904072771900948570"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "teamseas"
    },
    currentCount = await presence.getSetting("count"),
    count = document.getElementById("liveCounter")?.textContent;

  if (currentCount) {
    presenceData.details = `$${count}`;
    presenceData.state = "Currently Donated";
  } else {
    presenceData.details = "Helping #TeamSeas clean";
    presenceData.state = "30million pounds by 2022";
  }
  presenceData.startTimestamp = browsingStamp;
  presenceData.buttons = [
    { label: "Visit #TeamTrees", url: "https://teamtrees.org" }
  ];

  presence.setActivity(presenceData);
});
