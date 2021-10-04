const presence = new Presence({ clientId: "729087463452049559" }),
  timestamp = Math.floor(Date.now() / 1000),
  newStats = async () =>
    (data = await (
      await window.fetch("https://uk2.radio01.xonos.gg/api/nowplaying/17")
    ).json());

let data: {
  nowplaying: {
    song: {
      artist: string;
      title: string;
      text: string;
    };
  };
  listeners: {
    unique: number;
  };
  live: {
    islive: boolean;
    streamername: string;
  };
};

setInterval(newStats, 10000);
newStats();

presence.on("UpdateData", async () => {
  if (!data) return;

  const settings = {
      details: (await presence.getSetting("details")).replace(
        "%listeners%",
        data.listeners.unique || "Listeners"
      ),
      state: (await presence.getSetting("state"))
        .replace("%artist%", data.nowplaying.song.artist || "Artist")
        .replace("%songText%", data.nowplaying.song.text || "Song")
        .replace("%title%", data.nowplaying.song.title || "Title"),
      timestamp: await presence.getSetting("timestamp")
    },
    presenceData: PresenceData = {
      largeImageKey: "logo",
      details: settings.details,
      state: settings.state,
      smallImageText: `${
        data.live.islive ? data.live.streamername : "AutoDJ"
      } is live!`,
      buttons: [
        {
          label: "Tune in",
          url: "https://radio.itsrepeat.net"
        }
      ]
    };

  if (settings.timestamp) presenceData.startTimestamp = timestamp;
  if (data.live.islive) presenceData.smallImageKey = "bouncelive";
  else delete presenceData.smallImageText;

  presence.setActivity(presenceData);
});
