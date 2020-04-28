var presence = new Presence({
    clientId: "622375113702113281"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  presenceData: presenceData = {
    largeImageKey: "logo"
  };

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

var playback;
var iFrameVideo: any, currentTime: any, duration: any, paused: any;

presence.on("iFrameData", (data) => {
  playback = data.iframe_video.dur !== null ? true : false;

  if (playback) {
    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.dur;
    paused = data.iframe_video.paused;
  }
});

presence.on("UpdateData", async () => {
  if (iFrameVideo != false && !isNaN(duration)) {
    var videoTitle: any, timestamps: any, brand: any;

    videoTitle = document.querySelector(
      "div > div.title-views.flex.column > h1"
    );
    brand = document.querySelector(
      "div.hvpi-main.flex.column > div > div > div:nth-child(1) > a"
    );
    timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
    presenceData.details =
      videoTitle !== null ? videoTitle.innerText : "Title not found";
    presenceData.state = brand.innerText;
    presenceData.largeImageKey = "logo";
    presenceData.smallImageKey = paused ? "pause" : "play";
    presenceData.smallImageText = paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    presence.setTrayTitle(
      paused
        ? ""
        : videoTitle !== null
        ? videoTitle.innerText
        : "Title not found"
    );

    if (paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (iFrameVideo && videoTitle !== null) {
      presence.setActivity(presenceData, !paused);
    }
  } else {
    var pageData: presenceData = {
      details: "Browsing..",
      largeImageKey: "logo"
    };
    presence.setActivity(pageData);
  }
});
