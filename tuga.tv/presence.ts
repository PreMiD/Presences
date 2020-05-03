const presence = new Presence({
  clientId: "630125847134863371"
});
const { pathname } = window.location,
  startTimestamp = Math.floor(Date.now() / 1000);
let current: number, duration: number, paused: boolean, played: boolean;

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

const strings = presence.getStrings({
  playing: "presence.playback.playing",
  paused: "presence.playback.paused",
  browsing: "presence.activity.browsing"
});

presence.on("iFrameData", (data) => {
  current = data.current;
  duration = data.duration;
  paused = data.paused;
  played = data.played;
});

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "tuga_lg",
    details: (await strings).browsing,
    startTimestamp
  };
  if (pathname === `/`) {
    presenceData.state = `Home page`;
  } else if (pathname.startsWith(`/filmes`)) {
    presenceData.state = `Filmes`;
  } else if (pathname.startsWith(`/series`)) {
    presenceData.state = `Séries`;
  } else if (pathname.startsWith(`/favoritos`)) {
    presenceData.state = `Favoritos`;
  } else if (pathname.startsWith(`/filme`) || pathname.startsWith(`/serie`)) {
    presenceData.startTimestamp = undefined;
    const title = document.querySelector(`h3`).textContent;
    const episode = title.match(/((S|E)\d{1,2}){2}/);
    presenceData.details = pathname.startsWith(`/serie`)
      ? title.replace(episode[0], "")
      : title;
    presenceData.state = pathname.startsWith(`/serie`)
      ? `${episode[0]}`
      : undefined;
    if (played) {
      if (!paused) {
        const timestamps = getTimestamps(current, duration);
        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
      }
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).paused
        : (await strings).playing;
    }
  }
  presence.setActivity(presenceData, true);
});
