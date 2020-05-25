var presence = new Presence({
    clientId: "607352899214901248"
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
  //* If user is on /view_video...
  var video: HTMLVideoElement = document.querySelector(
    ".mhp1138_videoWrapper video"
  );
  if (video[0] !== null && !isNaN(video.duration)) {
    //* Get required tags
    var title: any;
    title = document.querySelector(".video-wrapper .title-container .title");

    var uploader = document.querySelector(
        ".video-actions-container .video-info-row .usernameWrap a"
      ),
      timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      presenceData: PresenceData = {
        details: title ? title.innerText : "Title not found...",
        state: uploader ? uploader.textContent : "Uploader not found...",
        largeImageKey: "lg",
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

    presence.setTrayTitle(video.paused ? "" : title.innerText);

    //* Remove timestamps if paused
    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    //* If tags are not "null"
    if (title !== null && uploader !== null) {
      presence.setActivity(presenceData, !video.paused);
    }
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
