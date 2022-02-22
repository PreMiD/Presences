const presence = new Presence({ clientId: "873514889136701450" }),
  timestamp = Math.floor(Date.now() / 1000),
  newStats = async () =>
    (data = await (
      await window.fetch("https://api.itsmelody.pw")
    ).json());

let data: {
  now_playing: {
    song: {
      artist: string;
      title: string;
      text: string;
    };
  };
  listeners: {
    current: number;
  };
  live: {
    is_live: boolean;
    streamer_name: string;
  };
};

setInterval(newStats, 10000);
newStats();

presence.on("UpdateData", async () => {
  if (!data) return;

  const settings = {
      details: (await presence.getSetting("details")).replace(
        "%listeners%",
        data.listeners.current || "Listeners"
      ),
      state: (await presence.getSetting("state"))
        .replace("%artist%", data.now_playing.song.artist || "Artist")
        .replace("%songText%", data.now_playing.song.text || "Song")
        .replace("%title%", data.now_playing.song.title || "Title"),
      timestamp: await presence.getSetting("timestamp")
    },
    presenceData: PresenceData = {
      largeImageKey: "logo",
      details: settings.details,
      state: settings.state,
      smallImageText: `${
        data.live.is_live ? data.live.streamer_name : "AutoDJ"
      } is live!`,
      buttons: [
        {
          label: "Listen Live",
          url: "https://itsmelody.pw"
        },
        {
            label: "Join the discord",
            url: "https://itsmelody.pw/discord"
        }
      ]
    };

  if (settings.timestamp) presenceData.startTimestamp = timestamp;
  if (data.live.is_live) presenceData.smallImageKey = "logo";
  else delete presenceData.smallImageText;

  presence.setActivity(presenceData);
});
