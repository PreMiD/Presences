var presence = new Presence({
    clientId: "641428323422961705"
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

var title: any;
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
      largeImageKey: "wanflix"
    };

  if (
    document.querySelector(
      "body > div.container > div:nth-child(3) > div > div.movie-info > div > div.block-wrapper.page-single > div > div.block-movie-info.movie-info-box > div > div.col-6.movie-detail > h1 > span.title-1"
    ) !== null
  ) {
    presenceData.details = "Looking at:";
    presenceData.state = document.querySelector(
      "body > div.container > div:nth-child(3) > div > div.movie-info > div > div.block-wrapper.page-single > div > div.block-movie-info.movie-info-box > div > div.col-6.movie-detail > h1 > span.title-1"
    ).textContent;
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/video/")) {
    if (iFrameVideo == true && !isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      presenceData.details = document.querySelector(
        "#app > div > div.body > div > div.video-details > div.video-main-details > div.video-title"
      ).textContent;
      presenceData.state = document.querySelector(
        "#app > div > div.body > div > div.video-details > div.video-main-details > div.video-category"
      ).textContent;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (iFrameVideo == null && isNaN(duration)) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Looking at: ";
      title = document.querySelector(
        "#app > div > div.body > div > div.video-details > div.video-main-details > div.video-title"
      ).textContent;

      presenceData.state = title;
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname == "/") {
    presenceData.details = "Viewing home page";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("/videos")) {
    presenceData.details = "Browsing for videos...";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("/vods")) {
    presenceData.details = "Browsing for vods...";
    presenceData.startTimestamp = browsingStamp;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
