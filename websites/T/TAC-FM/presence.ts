const presence = new Presence({
  clientId: "865213883567702057"
}),
timestamp = Math.floor(Date.now() / 1000);

let title: string, artist: string, dj: string, listeners: number;

function getData(): void {
  window
    .fetch("https://panel.tac-fm.ml/api/nowplaying/1")
    .then((res) => res.json())
    .then((res) => {
      title = res.now_playing.song.title || "Loading..";
      artist = res.now_playing.song.artist || "Loading..";
      dj = res.live.streamer_name || "Auto DJ";
      listeners = res.listeners.total || 0;
    });
}

getData();
setInterval(getData, 5000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "tacfm",
    smallImageKey: "live"
  };

  if (document.location.hostname === "tac-fm.ml") {
    presenceData.startTimestamp = timestamp;
    presenceData.details = `🎵 | ${artist} - ${title}`;
    presenceData.state = `🎙️ | ${dj}`;
    presenceData.smallImageText = `Listeners: ${listeners}`;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
