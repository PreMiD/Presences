const presence = new Presence({
  clientId: "764916517895798796"
});
const strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  live: "presence.activity.live",
  search: "presence.activity.searching"
});

function capitalize(text: string): string {
  text = text.toLowerCase();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

let elapsed: number = undefined,
  oldUrl: string = undefined,
  header,
  title,
  item;

presence.on("UpdateData", async () => {
  let video: HTMLVideoElement = null,
    details = undefined,
    state = undefined,
    smallImageKey = undefined,
    smallImageText = undefined,
    startTimestamp = undefined,
    endTimestamp = undefined;

  const href = window.location.href;
  const path = window.location.pathname;

  if (href !== oldUrl) {
    oldUrl = href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  details = "Browsing...";
  state = undefined;
  startTimestamp = elapsed;

  if (path.includes("/watch")) {
    video = document.querySelector(".bitmovinplayer-container video");
    if (video) {
      title = document.querySelector("title");
      const timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      const live = timestamps[1] === Infinity;
      details = "Watching";
      if (title) {
        details = title.textContent;
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