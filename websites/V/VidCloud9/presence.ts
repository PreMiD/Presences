const presence = new Presence({
  clientId: "697552926876368917"
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

let iFrameVideo: boolean, currentTime: number, duration: number, paused: boolean;
let video: {
iframe_video: {
  duration: number;
  iFrameVideo: boolean;
  currTime: number;
  dur: number;
  paused: boolean;
};
};
let playback: boolean;
let title;

presence.on("iFrameData", (data:{
  iframe_video: {
    duration: number; iFrameVideo: boolean; currTime: number; dur: number; paused: boolean;
  };
  }) => {
  video = data;
  playback = data.iframe_video.duration !== null ? true : false;
  if (playback) {
    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.dur;
    paused = data.iframe_video.paused;
  }
});

function getTimestamps(videoTime: number, videoDuration: number): Array<number> {
  const startTime = Date.now();
  const endTime = Math.floor(Math.floor(startTime / 1000) - videoTime + videoDuration);
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
var presenceData: PresenceData = {
  largeImageKey: "logo"
};
if (videoTime) {
  console.log("IS ON");
  if (playback == true) {
    // lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
  }
} else {
  console.log("Video time is off");
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
      presenceData.state = (title as HTMLTextAreaElement).innerText;
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
        presenceData.state = (title as HTMLTextAreaElement).innerText;
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
  presenceData.details = null;
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