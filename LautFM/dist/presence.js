var presence = new Presence({
    clientId: "640997739689279498",
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
  });
var browsingStamp = Math.floor(Date.now() / 1000);
var title, views, air, air2, title2;
var iFrameVideo, currentTime, duration, paused;
var video, videoDuration, videoCurrentTime;
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("iFrameData", (data) => {
  playback = data.iframe_video.duration !== null ? true : false;
  if (playback) {
    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.dur;
    paused = data.iframe_video.paused;
  }
});

presence.on("UpdateData", async () => {
  playing = document
    .getElementsByClassName("btn playbutton")[0]
    .getAttributeNode("data-trackingaction").value;
  var a = (presenceData = ""),
    presenceData = {
      largeImageKey: "logo",
    };

  switch (playing) {
    case "stop":
      playingnow = document.querySelector(
        "#app > div.fixed.fixed--top > div > a > div > div > span > b"
      ).innerText;
      presenceData.details = "Playing " + playingnow;
      music = document.querySelector(
        "#app > div.fixed.fixed--top > div > a > div > div > div"
      ).innerText;
      presenceData.state = music;
      break;
    case "play":
      if (document.location.pathname == "/genres") {
        presenceData.state = "Schaut nach Genres";
        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/stations/genre/")) {
        presenceData.state = "Sucht Stationen";
        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/stations/location")) {
        presenceData.state = "Sucht lokale Stationen";
        presence.setActivity(presenceData);
      } else if (document.location.pathname == "/stations/all") {
        presenceData.state = "Sucht nach Top-Sender";
        presence.setActivity(presenceData);
      } else
        station = document.querySelector(
          "#app > section > header > div.fm-station-header__col.fm-station-header__col--name > h1"
        ).innerText;
      presenceData.details = "Befindet sich bei Station";
      presenceData.state = station;
      presence.setActivity(presenceData);

    //presenceData.state = "Lurking on LautFM"; break;
    //default : presenceData.state = "ZZzzzZZ";
  }

  presence.setActivity(presenceData);
});

function getTimestamps(videoTime, videoDuration) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
function refresh(presence) {
  refresh.refresh;
}
