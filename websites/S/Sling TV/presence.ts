const presence = new Presence({
    clientId: "764916517895798796"
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

  if (path.includes("/browse/my-tv")) {
    extra = ' "My TV"';
  } else if (path.includes("/browse/guide")) {
    extra = ' "Guide"';
  } else if (path.includes("/browse/dynamic/shows")) {
    extra = ' "On Demand"';
  } else if (path.includes("/browse/dynamic/sports")) {
    extra = ' "Sports"';
  } else if (path.includes("/browse/movie-rentals")) {
    extra = ' "Rentals"';
  }

  details = `Browsing${extra}`;

  if (path.includes("/browse/search")) {
    details = `Searching...`;
  }

  state = undefined;
  startTimestamp = elapsed;

  if (path.includes("/watch")) {
    video = document.querySelector(".bitmovinplayer-container video");
    if (video) {
      title = document.querySelector("title");
      const timestamps = getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        ),
        live = timestamps[1] === Infinity;

      details = getStateText(video.paused, live);
      if (title) {
        details = title.textContent
          .replace(/^Watching\s/i, "")
          .replace("| Sling TV", "");
        state = getStateText(video.paused, live);
      }
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
    largeImageKey: "slingtv",
    smallImageKey: smallImageKey,
    smallImageText: smallImageText,
    startTimestamp: startTimestamp,
    endTimestamp: endTimestamp
  };
  presence.setActivity(data, video ? !video.paused : true);
  presence.setTrayTitle(details);
});
