const presence = new Presence({
  clientId: "689131326779031563"
});

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

let strack, sartist, slisteners, slive, sDJ, sduration, selapsed;

function newStats(): void {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (): void {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(this.responseText);
      strack = data.now_playing.song.title;
      sartist = data.now_playing.song.artist;
      slisteners = data.listeners.total;
      slive = data.live.is_live;
      sDJ = data.live.streamer_name;
      sduration = data.now_playing.duration;
      selapsed = data.now_playing.elapsed;
    }
  };
  xhttp.open("GET", "https://live.highlowradio.co.uk/api/nowplaying/1", true);
  xhttp.withCredentials = true;
  xhttp.send();
}

setInterval(newStats, 1000);
newStats();

let lastTitle;
let lastTimeStart = Math.floor(Date.now() / 1000);

presence.on("UpdateData", function () {
  const presenceData: PresenceData = {
    largeImageKey: "hlr"
  };

  if (sduration == 0) {
    if (lastTitle != strack) {
      lastTitle = strack;
      lastTimeStart = Math.floor(Date.now() / 1000);
    }

    presenceData.startTimestamp = lastTimeStart;
  } else {
    const timestamps = getTimestamps(
      Math.floor(selapsed),
      Math.floor(sduration)
    );

    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];
  }

  if (slive) {
    presenceData.details = strack + " - " + sartist;
    presenceData.state = "Listening to " + sDJ;
  } else {
    presenceData.details = strack;
    presenceData.state = "by: " + sartist;
  }
  presenceData.smallImageText = "Listeners: " + slisteners;
  presenceData.smallImageKey = "play";

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
