var presence = new Presence({
    clientId: "608065709741965327"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browse: "presence.activity.browsing"
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

var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

var iFrameVideo: any, currentTime: any, duration: any, paused: any;

presence.on("iFrameData", (data) => {
  playback = data.iframe_video !== null ? true : false;

  if (playback) {
    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.dur;
    paused = data.iframe_video.paused;
  }
});

presence.on("UpdateData", async () => {
  var presenceData: presenceData = {
    largeImageKey: "lg"
  };

  if (!playback) {
    presenceData.details = (await strings).browse;
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
  }

  if (iFrameVideo !== false && !isNaN(duration)) {
    var videoTitle: any, episod: any, episode: any, epName: any;

    videoTitle = document.querySelector(".ellipsis .text-link span");
    episod = document.querySelectorAll("#showmedia_about_media h4");
    epName = document.querySelector("h4#showmedia_about_name");
    episode = episod[1].innerText + " - " + epName.innerText;

    var timestamps = getTimestamps(
      Math.floor(currentTime),
      Math.floor(duration)
    );
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
        : "Title not found..."
    );

    presenceData.details =
      videoTitle !== null ? videoTitle.innerText : "Title not found...";
    presenceData.state = episode;

    if (paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (videoTitle !== null) {
      presence.setActivity(presenceData, !paused);
    }
  }
});
