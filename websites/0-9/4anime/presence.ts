var presence = new Presence({
    clientId: "640644330666852382"
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

var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("UpdateData", async () => {
  playback =
    (document.querySelector(".vjs-current-time-display") ||
      document.querySelector(".jw-text-elapsed")) !== null
      ? true
      : false;
  var presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  if (!playback) {
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
  }

  var video: HTMLVideoElement =
    document.querySelector("#video1_html5_api") ||
    document.querySelector(".jw-video");

  if (video !== null && !isNaN(video.duration)) {
    var videoTitle: any;
    var seasonepisode;

    videoTitle =
      document.querySelector("a#titleleft") !== null
        ? document.querySelector("a#titleleft").textContent
        : "Title not found...";
    seasonepisode = document.querySelector("span#titleleft");

    var timestamps = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    presence.setTrayTitle(video.paused ? "" : videoTitle);

    presenceData.details = videoTitle;
    presenceData.state = seasonepisode.innerText;

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (videoTitle !== "Title not found...") {
      presence.setActivity(presenceData, !video.paused);
    }
  }
});
