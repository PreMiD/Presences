const presence = new Presence({
  clientId: "774282335892799530"
});

let title: string, artist: string, dj: string, listeners: number;

function getData(): void {
  window
    .fetch("http://api.symphonyradio.tk/symphony")
    .then((res) => res.json())
    .then((res) => {
      title = res.song.title || "Loading..";
      dj = res.dj.name;
      listeners = res.listeners.unique || 0;
    });
}

getData();
setInterval(getData, 5000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "premid",
    smallImageKey: "live"
  };

  if (document.location.hostname === "symphonyradio.tk") {
    presenceData.details = `🎵 | ${title}`;
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
