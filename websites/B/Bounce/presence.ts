const presence = new Presence({ clientId: "817772461109018664" }),
  timestamp = Math.floor(Date.now() / 1000),
  newStats = async () =>
    (data = await (await window.fetch("https://api.itsbounce.net")).json());

let data: {
  listeners: {
    total: string;
  };
  nowplaying: {
    artist: string;
    title: string;
  };
  presenter: {
    name: string;
  };
};

setInterval(newStats, 10000);
newStats();

presence.on("UpdateData", async () => {
  const settings = {
      details: (await presence.getSetting("details")).replace(
        "%listeners%",
        data.listeners?.total ?? "Listeners"
      ),
      state: (await presence.getSetting("state"))
        .replace("%artist%", data.nowplaying?.artist || "Artist")
        .replace(
          "%songText%",
          `${data.nowplaying?.artist} - ${data.nowplaying?.title}` || "Song"
        )
        .replace("%title%", data.nowplaying?.title || "Title"),
      timestamp: await presence.getSetting("timestamp")
    },
    presenceData: PresenceData = {
      largeImageKey: "logo",
      details: settings.details,
      state: settings.state,
      smallImageText: `${data.presenter?.name || "AutoDJ"} is live!`,
      buttons: [
        {
          label: "Tune in",
          url: "https://live.itsbounce.net"
        }
      ]
    };

  if (settings.timestamp) presenceData.startTimestamp = timestamp;
  if (data.presenter?.name !== "AutoDJ") presenceData.smallImageKey = "live";
  else delete presenceData.smallImageText;

  presence.setActivity(presenceData);
});
