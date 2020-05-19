var presence = new Presence({
    clientId: "697552926876368917"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

var iFrameVideo, currentTime, duration, paused;
var video;
var lastPlaybackState = null;
var playback;
var title;

presence.on("iFrameData", (data) => {
  video = data;
  playback = data.iframe_video.duration !== null ? true : false;
  if (playback) {
    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.dur;
    paused = data.iframe_video.paused;
  }
});

function getTimestamps(videoTime, videoDuration): any {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on("UpdateData", async () => {
  const info = await presence.getSetting("sSI");
  const elapsed = await presence.getSetting("sTE");
  const videoTime = await presence.getSetting("sVT");

  if (elapsed) {
    var browsingStamp = Math.floor(Date.now() / 1000);
    console.log("Elapsed is on");
  }
  var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
  var presenceData: presenceData = {
    largeImageKey: "logo"
  };
  if (videoTime) {
    console.log("IS ON");
    if (lastPlaybackState != playback) {
      lastPlaybackState = playback;
      browsingStamp = Math.floor(Date.now() / 1000);
    }
  } else {
    lastPlaybackState = console.log("Video time is off");
  }
  if (info) {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (document.location.pathname == "/movies") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing the recently added movies";
    } else if (document.location.pathname == "/series") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing the recently added series";
    } else if (document.location.pathname == "/cinema-movies") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing the recently added cinema movies.";
    } else if (document.location.pathname == "/recommended-series") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing recommened series";
    }
    //Used for the video files (Needs some work done here)
    else if (document.location.pathname.includes("/videos/")) {
      title = document.querySelector(
        "#main_bg > div:nth-child(5) > div > div.video-info-left > h1"
      );
      if (title != null) {
        presenceData.state = title.innerText;
        if (
          iFrameVideo == true &&
          !isNaN(duration) &&
          title != null &&
          video != null
        ) {
          if (!paused) {
            presenceData.details = "Watching:";
            presenceData.smallImageKey = paused ? "pause" : "play";
            if (videoTime) {
              presenceData.smallImageText = paused
                ? (await strings).pause
                : (await strings).play;
              presenceData.startTimestamp = timestamps[0];
              presenceData.endTimestamp = timestamps[1];
            }
          } else if (paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
            presenceData.details = "Paused:";
            presenceData.smallImageKey = "pause";
          }
        } else if (iFrameVideo == null && isNaN(duration) && title != null) {
          presenceData.details = "Viewing:";
          presenceData.state = title.innerText;
          presenceData.startTimestamp = browsingStamp;
        } else {
          presenceData.details = "Error 03: Watching unknown show/movie.";
          presenceData.state = "Can't tell if playing or not.";
          presenceData.startTimestamp = browsingStamp;
          presenceData.smallImageKey = "search";
          presenceData.smallImageText = "Error 3";
        }
      } else {
        //Can't get the basic site information
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Error 02: Watching unknown show/movie.";
        presenceData.smallImageKey = "search";
      }
    } //If it can't get the page it will output an error
    else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Error 01: Can't Read Page";
      presenceData.smallImageKey = "search";
    }
  } else {
    presence.setActivity(presenceData);
    return;
  }

  if (presenceData.details == null) {
    //This will fire if you do not set presence details
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    //This will fire if you set presence details
    presence.setActivity(presenceData);
  }
});
