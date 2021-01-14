const presence = new Presence({
    clientId: "620432609847148544"
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

presence.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector(
    ".vp-video-wrapper .vp-video video"
  );

  if (video && !isNaN(video.duration)) {
    var title = document.querySelector("._1fHNK").textContent;
    var uploader = document.querySelector(".js-user_link").textContent;
    var timestamps = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );

    const data: PresenceData = {
      details: title,
      state: uploader,
      largeImageKey: "vimeo-logo",
      smallImageKey: video.paused ? "pause" : "play",
      smallImageText: video.paused
        ? (await strings).pause
        : (await strings).play,
      startTimestamp: timestamps[0],
      endTimestamp: timestamps[1]
    };

    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    if (title !== null && uploader !== null) {
      presence.setActivity(data, !video.paused);
    }
  } else {
    const browsingPresence: PresenceData = {
      details: "Browsing...",
      largeImageKey: "vimeo-logo"
    };
    presence.setActivity(browsingPresence);
  }
});
