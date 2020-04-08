const presence = new Presence({
    clientId: "477937036423331872"
  }),
  strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing",
    episode: "presence.media.info.episode"
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
  const presenceData: presenceData = {
      largeImageKey: "drim_sonhos2",
      details: (await strings).browsing,
      startTimestamp: Math.floor(Date.now() / 1000)
    },
    path = window.location.pathname;
  if (path.startsWith("/online")) {
    const video = document.querySelector("video");
    const title = document.querySelector("a#anime_name").textContent;
    const episode = document.querySelector("b#epid").textContent;

    presenceData.details = title;
    presenceData.state = (await strings).episode.replace("{0}", episode);
    if (!video.paused) {
      const { duration, currentTime } = video;
      const timestamps = getTimestamps(currentTime, duration);

      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = (await strings).playing;
    } else if (video.currentTime > 0) {
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = (await strings).paused;
    }
  } else if (path.startsWith("/lancamentos")) {
    presenceData.details = "Vendo lançamentos";
  } else if (path.startsWith("/lista-completa")) {
    presenceData.details = "Vendo a lista de animes";
  } else if (path.startsWith("/temporadas")) {
    presenceData.details = "Vendo animes da temporada";
  }
  presence.setActivity(presenceData, true);
});
