const presence = new Presence({
    clientId: "767402228825980929"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live",
    search: "presence.activity.searching"
  });

/**
 * Get timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now(),
    endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

/**
 * Get the current state text
 * @param {boolean} paused Is the video paused
 * @param {boolean} live Is it a live video
 */
function getStateText(paused: boolean, live: boolean) {
  return live ? "Live" : paused ? "Paused" : "Watching";
}

let elapsed: number = undefined,
  oldUrl: string = undefined,
  title;

presence.on("UpdateData", async () => {
  let video: HTMLVideoElement = null,
    details = undefined,
    state = undefined,
    smallImageKey = undefined,
    smallImageText = undefined,
    startTimestamp = undefined,
    endTimestamp = undefined,
    extra = "...";

  const href = window.location.href,
    path = window.location.pathname;

  if (href !== oldUrl) {
    oldUrl = href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  if (path.includes("/movies/highlights")) {
    extra = ' Movies';
  } else if (path.includes("/watch/tv/highlights")) {
    extra = ' TV Shows';
  } else if (path.includes("/watch/kids/highlights")) {
    extra = ' Kids';
  } else if (path.includes("/watch/sports/highlights")) {
    extra = ' Sports';
  } else if (path.includes("/watch/latino/highlights")) {
    extra = ' Latino';
  }

  details = `Browsing${extra}`;

  if (path.includes("/watch/search")) {
    details = `Searching...`;
  }

  state = undefined;
  startTimestamp = elapsed;

  if (path.includes("/watch/playback") || path.includes("/watch/asset")) {
    video = document.querySelector(".video-player-component video");
    if (video) {
      title = document.querySelector(".playback-header__title");
      const timestamps = getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        ),
        live = timestamps[1] === Infinity;

      var desc = document.querySelector(".playback-metadata__container-episode-metadata-info") || 
      document.querySelector(".playback-metadata__container-description");

      state = desc.textContent;
      details = title.textContent;

      smallImageKey = live ? "live" : video.paused ? "pause" : "play";
      smallImageText = live
        ? (await strings).live
        : video.paused
        ? (await strings).pause
        : (await strings).play;
      startTimestamp = live ? elapsed : timestamps[0];
      endTimestamp = live ? undefined : timestamps[1];
      if (video.paused) {
        startTimestamp = undefined;
        endTimestamp = undefined;
      }
    }
  }

  const data: PresenceData = {
    details: details,
    state: state,
    largeImageKey: "peacock",
    smallImageKey: smallImageKey,
    smallImageText: smallImageText,
    startTimestamp: startTimestamp,
    endTimestamp: endTimestamp
  };
  presence.setActivity(data, video ? !video.paused : true);
  presence.setTrayTitle(details);
});
