const presence = new Presence({
    clientId: "611657413350654010"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let lastPlaybackState = null,
  playback,
  browsingTimestamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState !== playback) {
  lastPlaybackState = playback;
  browsingTimestamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  playback =
    document.querySelector("#player > div.jw-media.jw-reset > video") !== null
      ? true
      : false;

  if (!playback) {
    const presenceData: PresenceData = {
      largeImageKey: "lg",
      startTimestamp: browsingTimestamp
    };

    presenceData.details = "Browsing...";

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
  }

  const video: HTMLVideoElement = document.querySelector(
    "#player > div.jw-media.jw-reset > video"
  );

  if (video) {
    const videoTitle = document.querySelector(
        "div > div.episodeInfo > div.nomeAnime"
      ) as HTMLElement,
      episode = document.querySelector(
        "div > div.episodeInfo > div.epInfo"
      ) as HTMLElement,
      [startTimestamp, endTimestamp] = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      presenceData: PresenceData = {
        details: videoTitle.textContent,
        state: episode.textContent,
        largeImageKey: "lg",
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp,
        endTimestamp
      };

    presenceData.details = videoTitle.textContent;
    presenceData.state = episode.textContent;
    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    presence.setActivity(presenceData, true);
  }
});
