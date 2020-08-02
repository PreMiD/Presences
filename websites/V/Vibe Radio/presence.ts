const presence = new Presence({
  clientId: "647803677284761619"
});

const browsingStamp = Math.floor(Date.now() / 1000);
let sartist, strack, slisteners, sduration, selapsed, timestamps;

function newStats(): void {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (): void {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(this.responseText);
      strack = data.now_playing.song.title;
      sartist = data.now_playing.song.artist;
      slisteners = data.listeners.total;
      sduration = data.now_playing.duration;
      selapsed = data.now_playing.elapsed;
    }
  };
  xhttp.open("GET", "https://radio.theviberadio.com/api/nowplaying/1", true);
  xhttp.send();
}

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

setInterval(newStats, 1000);
newStats();

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "vibe"
  };

  timestamps = getTimestamps(Math.floor(selapsed), Math.floor(sduration));
  presenceData.smallImageKey = "play";
  presenceData.details = sartist + " - " + strack;
  presenceData.state = slisteners + " Listeners";
  presenceData.smallImageText = "Playing";
  presenceData.startTimestamp = timestamps[0];
  presenceData.endTimestamp = timestamps[1];
  if (sduration == 0) {
    delete presenceData.endTimestamp;
    presenceData.startTimestamp = browsingStamp;
  }
  presence.setActivity(presenceData);
});
