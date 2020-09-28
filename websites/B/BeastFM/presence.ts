const presence = new Presence({
  clientId: "753723629413335261"
});

let title: string, artist: string, dj: string, listeners: number;

function getData(): void {
  window
    .fetch("https://azura.beastfm.pw/api/nowplaying/1")
    .then((res) => res.json())
    .then((res) => {
      title = res.now_playing.song.title || "Loading..";
      artist = res.now_playing.song.artist || "Loading..";
      dj = res.live.streamer_name || "AutoDJ";
      listeners = res.listeners.unique || 0;
    });
}

getData();
setInterval(getData, 5000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    smallImageKey: "live"
  };

  if (document.location.hostname === "beastfm.pw") {
    presenceData.details = `🎵 | ${title} - ${artist}`;
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
