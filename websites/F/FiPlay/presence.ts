var presence = new Presence({
    clientId: "607678684010381330"
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
  playback = document.querySelector(".jw-video video") !== null ? true : false;
  var presenceData: PresenceData = {
    largeImageKey: "lg"
  };

  if (!playback) {
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;

    presence.setActivity(presenceData, true);
  }

  var video: HTMLVideoElement = document.querySelector(".jw-video video");

  if (video !== null && !isNaN(video.duration)) {
    var videoTitle: any;

    videoTitle = document.querySelector("#bread .breadcrumb .active");

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

    presence.setTrayTitle(
      video.paused
        ? ""
        : videoTitle !== null
        ? videoTitle.innerText
        : "Title not found..."
    );

    presenceData.details = "Watching";
    presenceData.state =
      videoTitle !== null ? videoTitle.innerText : "Title not found...";

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (videoTitle !== null) {
      presence.setActivity(presenceData, !video.paused);
    }
  }
});
