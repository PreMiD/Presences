let presence = new Presence({
  clientId: "456601190671843328"
});

function getTimestamps(videoTime, videoDuration) {
  let startTime = Date.now();
  let endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

let strack, sartist, slisteners, slive, sdj, sduration, selepased;

setInterval(newStats, 1000);
newStats();

function newStats() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      strack = data.now_playing.song.title;
      sartist = data.now_playing.song.artist;
      slisteners = data.listeners.total;
      slive = data.live.is_live;
      sDJ = data.live.streamer_name;
      sduration = data.now_playing.duration;
      selapsed = data.now_playing.elapsed;
    }
  };
  xhttp.open("GET", "http://live.madnessfm.com/api/live/nowplaying/madness_fm", true);
  xhttp.withCredentials = true;
  xhttp.send();
}

let browsingStamp = Math.floor(Date.now() / 1000);
let lastTitle;
let lastTimeStart = Math.floor(Date.now() / 1000);
let lastDetails;
let lastDetailsTimeStart = Math.floor(Date.now() / 1000);

presence.on("UpdateData", function () {
  let presenceData = {
    largeImageKey: "hlr"
  };

  if (sduration == 0) {
    if (lastTitle != strack) {
      lastTitle = strack;
      lastTimeStart = Math.floor(Date.now() / 1000);
    }

    presenceData.startTimestamp = lastTimeStart;
  } else {
    let timestamps = getTimestamps(Math.floor(selapsed), Math.floor(sduration));

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