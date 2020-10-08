const presence = new Presence({
  clientId: "753723629413335261"
});

let title: string, artist: string, dj: string, listeners: number;

function getData(): void {
  window
    .fetch("https://api.beastfm.pw/stats")
    .then((res) => res.json())
    .then((res) => {
      title = res.now.title || "Loading..";
      artist = res.now.artist || "Loading..";
      dj = res.live.liveDJ || "AutoDJ";
      listeners = res.listeners.current || 0;
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
    presenceData.details = `🎵 | ${title} • ${artist}`;
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
