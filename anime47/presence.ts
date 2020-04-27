var presence = new Presence({
    clientId: "640990409224486971"
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
      largeImageKey: "anime47"
    };

  if (
    document.querySelector(
      "body > div.container > div:nth-child(3) > div > div.movie-info > div > div.block-wrapper.page-single > div > div.block-movie-info.movie-info-box > div > div.col-6.movie-detail > h1 > span.title-1"
    ) !== null
  ) {
    presenceData.details = "Đang xem:";
    presenceData.state = document.querySelector(
      "body > div.container > div:nth-child(3) > div > div.movie-info > div > div.block-wrapper.page-single > div > div.block-movie-info.movie-info-box > div > div.col-6.movie-detail > h1 > span.title-1"
    ).textContent;
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
  } else if (
    document.querySelector(
      "body > div.container > ol > li:nth-child(5) > a > span"
    ) !== null
  ) {
    if (iFrameVideo == true && !isNaN(duration)) {
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      presenceData.details = document
        .querySelector("head > title")
        .textContent.split("- ")[0];
      presenceData.state = document
        .querySelector("head > title")
        .textContent.split("- ")[1];

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else if (iFrameVideo == null && isNaN(duration)) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Đang xem: ";
      title = document.querySelector("head > title").textContent;

      presenceData.state = title;
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname == "/") {
    presenceData.details = "Đang xem trang chủ";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.URL.includes("/the-loai/")) {
    presenceData.details = "Đang xem danh mục:";
    presenceData.state = document
      .querySelector(
        "body > div.container > div:nth-child(5) > div > div.movie-list-index.home-v2 > h1 > span"
      )
      .textContent.split(":")[1]
      .replace(" - Anime Vietsub Online", "");
    presenceData.startTimestamp = browsingStamp;
  } else {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Đang xem:";
    presenceData.state = document.querySelector("head > title").textContent;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
