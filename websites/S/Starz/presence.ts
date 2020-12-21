const presence = new Presence({
    clientId: "768710795449335818"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
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
  return live ? "Live Broadcast" : paused ? "Paused" : "Watching";
}

let elapsed: number = undefined,
  oldUrl: string = undefined;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "starz-logo"
    },
    href = window.location.href,
    path = window.location.pathname;

  if (href !== oldUrl) {
    oldUrl = href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  const video: HTMLVideoElement = document.querySelector(
    ".bitmovinplayer-container video"
  );

  if (video) {
    const title = document.querySelector("title")?.textContent,
      timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      live = timestamps[1] === Infinity;

    (data.details = title), (data.state = getStateText(video.paused, live));
    (data.smallImageKey = live ? "live" : video.paused ? "pause" : "play"),
      (data.smallImageText = live
        ? (await strings).live
        : video.paused
        ? (await strings).pause
        : (await strings).play),
      (data.startTimestamp = live ? elapsed : timestamps[0]),
      (data.endTimestamp = live ? undefined : timestamps[1]);

    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    if (title) {
      presence.setActivity(data, !video.paused);
    }
  } else {
    data.details = "Browsing...";
    if (path.includes("/series")) {
      data.details = "Browsing Series";
    }
    if (path.includes("/movies")) {
      data.details = "Browsing Movies";
    }
    if (path.includes("/playlist")) {
      data.details = "Browsing Playlist";
    }
    if (path.includes("/schedule")) {
      data.details = "Browsing Schedule";
    }
    if (path.includes("/search")) {
      data.details = "Searching...";
    }
    data.startTimestamp = elapsed;
    presence.setActivity(data);
  }
});
