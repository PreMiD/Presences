const presence = new Presence({
  clientId: "774282335892799530"
});

let title: string, artist: string, dj: string, listeners: number;

function getData(): void {
  window
    .fetch("https://api.symphonyradio.tk/")
    .then((res) => res.json())
    .then((res) => {
      title = res.onair.song.title || "Loading..";
      dj = res.onair.dj.name || "Loading..";
      console.log(dj)
      console.log(title)
    });
}

getData();
setInterval(getData, 5000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "premid"
  };

  if (document.location.hostname === "symphonyradio.tk") {
    presenceData.details = `🎵 | ${title}`;
    presenceData.state = `🎙️ | ${dj}`;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
