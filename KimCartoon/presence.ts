var presence = new Presence({
    clientId: "640253556078673951"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

var browsingStamp = Math.floor(Date.now() / 1000);

var title: any, air: any;
var iFrameVideo: boolean, currentTime: any, duration: any, paused: any;

var lastPlaybackState = null;
var playback;

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
  var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)),
    presenceData: presenceData = {
      largeImageKey: "kim"
    };

  if (
    document.querySelector("#adsIfrme > div > div > div > h1 > strong") !== null
  ) {
    if (iFrameVideo == true && !isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      title = document.querySelector(
        "#adsIfrme > div > div > div > h1 > strong"
      );
      presenceData.details = title.innerText;

      air = document.querySelector("#selectServer");

      presenceData.state = "Server: " + air.value;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (iFrameVideo == null && isNaN(duration)) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Looking at: ";
      title = document.querySelector(
        "#adsIfrme > div > div > div > h1 > strong"
      );

      presenceData.state = title.innerText;
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname == "/") {
    presenceData.details = "Viewing main page";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/CartoonList")) {
    presenceData.details = "Viewing cartoonlist";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/Genre")) {
    presenceData.details = "Viewing genres";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/Cartoon")) {
    presenceData.details = "Viewing cartoon:";
    presenceData.state = document.querySelector(
      "#leftside > div:nth-child(1) > div.barContent.full > div > div.right_movie > h1 > a"
    ).textContent;
    presenceData.startTimestamp = browsingStamp;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
