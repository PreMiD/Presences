var presence = new Presence({
    clientId: "463097721130188830",
    mediaKeys: true
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

presence.on("UpdateData", async () => {
  //* If user is on /watch?v=...
  var video: HTMLVideoElement = document.querySelector(".video-stream");
  if (video !== null && !isNaN(video.duration)) {
    //* Get required tags
    var oldYouTube: boolean = null;
    var title;

    //* Checking if user has old YT layout.
    document.querySelector(".watch-title") !== null
      ? (oldYouTube = true)
      : (oldYouTube = false);

    //* Due to differences between old and new YouTube, we should add different selectors.
    if (!oldYouTube) {
      title =
        document.location.pathname !== "/watch"
          ? document.querySelector(".ytd-miniplayer .title")
          : document.querySelector(".title.ytd-video-primary-info-renderer");
    } else {
      if (document.location.pathname == "/watch")
        title = document.querySelector(".watch-title");
    }

    //TODO Find solution for uploader in miniplayer
    var uploader =
        document.querySelector("#owner-name a") !== null
          ? document.querySelector("#owner-name a")
          : document.querySelector(".yt-user-info a"),
      timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      live = Boolean(document.querySelector(".ytp-live")),
      presenceData: presenceData = {
        details: title.innerText,
        state: uploader.textContent,
        largeImageKey: "yt_lg",
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

    presence.setTrayTitle(video.paused ? "" : title.innerText);

    //* Remove timestamps if paused
    if (video.paused || live) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;

      if (live) {
        presenceData.smallImageKey = "live";
        presenceData.smallImageText = (await strings).live;
      }
    }

    //* If tags are not "null"
    if (video && title !== null && uploader !== null) {
      presence.setActivity(presenceData, !video.paused);
    }
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});

presence.on("MediaKeys", (key: string) => {
  switch (key) {
    case "pause":
      var video = document.querySelector(".video-stream") as HTMLVideoElement;
      video.paused ? video.play() : video.pause();
      break;
    case "nextTrack":
      (document.querySelector(".ytp-next-button") as HTMLAnchorElement).click();
      break;
    case "previousTrack":
      (document.querySelector(".ytp-prev-button") as HTMLAnchorElement).click();
      break;
  }
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
