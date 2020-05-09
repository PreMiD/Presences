var presence = new Presence({
    clientId: "611657413350654010"
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
    document.querySelector("#player > div.jw-media.jw-reset > video") !== null
      ? true
      : false;

  if (!playback) {
    const presenceData: presenceData = {
      largeImageKey: "lg"
    };

    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
  }

  var video: HTMLVideoElement = document.querySelector(
    "#player > div.jw-media.jw-reset > video"
  );

  if (video !== null) {
    var videoTitle: any;

    videoTitle = document.querySelector(
      "div > div.episodeInfo > div.nomeAnime"
    );
    var episode: any = document.querySelector(
        "div > div.episodeInfo > div.epInfo"
      ),
      timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      presenceData: presenceData = {
        details: videoTitle.innerText,
        state: episode.innerText,
        largeImageKey: "lg",
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

    presence.setTrayTitle(videoTitle.innerText);

    presenceData.details = videoTitle.innerText;
    presenceData.state = episode.innerText;
    presenceData.startTimestamp = browsingStamp;

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    presence.setActivity(presenceData, true);
  }
});
