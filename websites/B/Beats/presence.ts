/* eslint-disable camelcase */
const presence = new Presence({ clientId: "817772461109018664" }),
  timestamp = Math.floor(Date.now() / 1000),
  newStats = async () =>
    (data = await (
      await window.fetch("https://radio.itsbeats.net/stats")
    ).json());

let data: {
  listeners: {
    total: string;
  };
  now_playing: {
    song: {
      artist: string;
      title: string;
    };
  };
  live: {
    is_live: boolean;
    streamer_name: string;
  };
};

setInterval(newStats, 10000);
newStats();

presence.on("UpdateData", async () => {
  const settings = {
      details: (await presence.getSetting("details")).replace(
        "%listeners%",
        data.listeners.total
      ),
      state: (await presence.getSetting("state"))
        .replace("%artist%", data.now_playing.song.artist || "Artist")
        .replace(
          "%songText%",
          `${data.now_playing.song.artist} - ${data.now_playing.song.title}`
        )
        .replace("%title%", data.now_playing.song.title || "Title"),
      timestamp: await presence.getSetting("timestamp")
    },
    presenceData: PresenceData = {
      largeImageKey: "logo",
      details: settings.details,
      state: settings.state,
      smallImageText: `${
        data.live.is_live ? data.live.streamer_name : "AutoDJ"
      } is live!`
    };

  if (settings.timestamp) presenceData.startTimestamp = timestamp;
  if (data.live.is_live) presenceData.smallImageKey = "live";
  else delete presenceData.smallImageText;

  presence.setActivity(presenceData);
});
