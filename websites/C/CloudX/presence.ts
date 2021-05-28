const presence = new Presence({
    clientId: "743793403753660426"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let title: string, artist: string, dj: string, playbackStatus: string;

function listener(): void {
  const json = JSON.parse(this.responseText);
  title = json.song.title;
  artist = json.song.artist;
  dj = json.dj.username;
}

function getData(): void {
  const req = new XMLHttpRequest();
  req.addEventListener("load", listener);
  req.open("GET", "https://api.thisiscloudx.com/stats");
  req.send();
}

function getStatus(): string {
  const playPauseBtn = document.querySelector("#play");
  if (playPauseBtn.className === "fas fa-play") return "Paused";
  else if (playPauseBtn.className === "fas fa-pause") return "Playing";

  return "Playing";
}

getData();
setInterval(getData, 5000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };

  if (
    document.location.hostname === "www.thisiscloudx.com" ||
    document.location.hostname === "thisiscloudx.com"
  ) {
    playbackStatus = getStatus();
    if (playbackStatus === "Paused") presenceData.smallImageKey = "pause";
    else if (playbackStatus === "Playing") presenceData.smallImageKey = "play";

    presenceData.details = `🎵 | ${artist} - ${title}`;
    presenceData.state = `🎙️ | ${dj}`;
    presenceData.smallImageText = playbackStatus;
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
