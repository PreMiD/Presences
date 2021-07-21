const presence = new Presence({ clientId: "729087463452049559" }),
  timestamp = Math.floor(Date.now() / 1000),
  newStats = async () =>
    (data = await (
      await window.fetch("https://staff.repeatradio.net/_api/nowPlaying")
    ).json());

let data: {
  listeners: number;
  song: {
    artist: string;
    title: string;
    text: string;
  };
  onAir: {
    name: string;
  };
};

setInterval(newStats, 10000);
newStats();

presence.on("UpdateData", async () => {
  if (!data) return;

  const settings = {
      details: (await presence.getSetting("details")).replace(
        "%listeners%",
        data.listeners || "Listeners"
      ),
      state: (await presence.getSetting("state"))
        .replace("%artist%", data.song.artist || "Artist")
        .replace("%songText", data.song.text || "Song")
        .replace("%title%", data.song.title || "Title"),
      timestamp: await presence.getSetting("timestamp")
    },
    presenceData: PresenceData = {
      largeImageKey: "logo",
      details: settings.details,
      state: settings.state,
      smallImageText: `${data.onAir.name || "AutoDJ"} is live!`,
      buttons: [
        {
          label: "Tune in",
          url: "https://live.repeat.pw"
        }
      ]
    };

  if (settings.timestamp) presenceData.startTimestamp = timestamp;
  if (data.onAir.name !== "AutoDJ") presenceData.smallImageKey = "bouncelive";
  else delete presenceData.smallImageText;

  presence.setActivity(presenceData);
});
