const presence = new Presence({
    clientId: "611657413350654010"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let lastPlaybackState = null,
  playback,
  browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState !== playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector(
    "#player > div.jw-media.jw-reset > video"
  );

  playback = video !== null ? true : false;

  if (!playback) {
    const presenceData: PresenceData = {
      largeImageKey: "lg",
      details: "Browsing...",
      startTimestamp: browsingStamp
    };

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
  }

  if (playback) {
    const videoTitle: HTMLElement = document.querySelector(
        "div > div.episodeInfo > div.nomeAnime"
      ),
      episode: HTMLElement = document.querySelector(
        "div > div.episodeInfo > div.epInfo"
      ),
      [startTimestamp, endTimestamp] = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      presenceData: PresenceData = {
        details: videoTitle.innerText,
        state: episode.innerText,
        largeImageKey: "lg",
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp,
        endTimestamp
      };

    presenceData.details = videoTitle.innerText;
    presenceData.state = episode.innerText;
    presenceData.startTimestamp = browsingStamp;

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    presence.setActivity(presenceData, true);
  }
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number): number[] {
  const startTime = Date.now();
  return [
    Math.floor(startTime / 1000),
    Math.floor(startTime / 1000) - videoTime + videoDuration
  ];
}
