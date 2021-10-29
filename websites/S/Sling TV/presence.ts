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
 * Get the current state text
 * @param {boolean} paused Is the video paused
 * @param {boolean} live Is it a live video
 */
function getStateText(paused: boolean, live: boolean) {
  return live ? "Live" : paused ? "Paused" : "Watching";
}

let elapsed: number, oldUrl: string, title;

presence.on("UpdateData", async () => {
  let video: HTMLVideoElement = null,
    details,
    state,
    smallImageKey,
    smallImageText,
    startTimestamp,
    endTimestamp,
    extra = "...";

  const { href } = window.location,
    path = window.location.pathname,
    data: PresenceData = {
      details,
      state,
      largeImageKey: "slingtv",
      smallImageKey,
      smallImageText,
      startTimestamp,
      endTimestamp
    };

  if (href !== oldUrl) {
    oldUrl = href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  if (path.includes("/browse/my-tv")) extra = ' "My TV"';
  else if (path.includes("/browse/guide")) extra = ' "Guide"';
  else if (path.includes("/browse/dynamic/shows")) extra = ' "On Demand"';
  else if (path.includes("/browse/dynamic/sports")) extra = ' "Sports"';
  else if (path.includes("/browse/movie-rentals")) extra = ' "Rentals"';

  details = `Browsing${extra}`;

  if (path.includes("/browse/search")) details = "Searching...";

  data.startTimestamp = elapsed;

  if (path.includes("/watch")) {
    video = document.querySelector(".bitmovinplayer-container video");
    if (video) {
      title = document.querySelector("title");
      const [startTimestamp, endTimestamp] = presence.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        ),
        live = endTimestamp === Infinity;

      details = getStateText(video.paused, live);
      if (title) {
        details = title.textContent
          .replace(/^Watching\s/i, "")
          .replace("| Sling TV", "");
        data.state = getStateText(video.paused, live);
      }
      data.smallImageKey = live ? "live" : video.paused ? "pause" : "play";
      data.smallImageText = live
        ? (await strings).live
        : video.paused
        ? (await strings).pause
        : (await strings).play;
      data.startTimestamp = live ? elapsed : startTimestamp;
      if (!live) data.endTimestamp = endTimestamp;
      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }
    }
  }

  presence.setActivity(data, video ? !video.paused : true);
  presence.setTrayTitle(details);
});
