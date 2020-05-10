const presence = new Presence({
  clientId: "648621348322803722"
});

let sartist, strack, slisteners, sduration, selapsed, timestamps;

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

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
  xhttp.open("GET", "https://radio.radify.xyz/api/nowplaying/2", true);
  xhttp.send();
}

setInterval(newStats, 1000);
newStats();

presence.on("UpdateData", () => {
  const presenceData: presenceData = {
    largeImageKey: "proxim"
  };

  timestamps = getTimestamps(Math.floor(selapsed), Math.floor(sduration));
  presenceData.smallImageKey = "play";
  presenceData.details = sartist + " - " + strack;
  presenceData.state = slisteners + " Listeners";
  presenceData.smallImageText = "Playing";
  presenceData.startTimestamp = timestamps[0];
  presenceData.endTimestamp = timestamps[1];
  presence.setActivity(presenceData);
});
