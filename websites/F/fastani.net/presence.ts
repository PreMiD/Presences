var presence = new Presence({
    clientId: "788064233882910750"
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
  playback = document.querySelector("div.plyr__video-wrapper > video") !== null ? true : false;

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

  var video: HTMLVideoElement = document.querySelector("div.plyr__video-wrapper > video");

  if (video !== null && !isNaN(video.duration)) {
    var videoTitle: any;

    videoTitle = document.querySelector("div#watch-page-main")

    var urlRegex = /watch\/.*?\/(\d+)\/(\d+)/;
    var matched = location.href.match(urlRegex);
    var seasonNumber = matched ? matched[1] : null;
    var episodeNumber = matched ? matched[2] : null;

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

    presence.setTrayTitle(video.paused ? "" : videoTitle.innerText);

    presenceData.details =
      videoTitle !== null ? videoTitle.dataset.fastaniTitle : "Title not found...";
    presenceData.state =
      matched !== null ? `Episode ${episodeNumber} · Season ${seasonNumber}` : "Episode not found...";

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (videoTitle !== null) {
      presence.setActivity(presenceData, !video.paused);
    }
  }
});
