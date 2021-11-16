const presence = new Presence({
    clientId: "768710795449335818"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

/**
 * Get the current state text
 * @param {boolean} paused Is the video paused
 * @param {boolean} live Is it a live video
 */
function getStateText(paused: boolean, live: boolean) {
  return live ? "Live Broadcast" : paused ? "Paused" : "Watching";
}

let elapsed: number, oldUrl: string;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "starz-logo"
    },
    { href } = window.location,
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
      [startTimestamp, endTimestamp] = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      live = endTimestamp === Infinity;

    data.details = title;
    data.state = getStateText(video.paused, live);
    data.smallImageKey = live ? "live" : video.paused ? "pause" : "play";
    data.smallImageText = live
      ? (await strings).live
      : video.paused
      ? (await strings).pause
      : (await strings).play;
    data.startTimestamp = live ? elapsed : startTimestamp;
    if (!live) data.endTimestamp = endTimestamp;
    if (live) delete data.endTimestamp;
    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    if (title) presence.setActivity(data, !video.paused);
  } else {
    data.details = "Browsing...";
    if (path.includes("/series")) data.details = "Browsing Series";

    if (path.includes("/movies")) data.details = "Browsing Movies";

    if (path.includes("/playlist")) data.details = "Browsing Playlist";

    if (path.includes("/schedule")) data.details = "Browsing Schedule";

    if (path.includes("/search")) data.details = "Searching...";

    data.startTimestamp = elapsed;
    presence.setActivity(data);
  }
});
