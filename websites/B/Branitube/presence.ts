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
  playback =
    document.querySelector("#player > div.jw-media.jw-reset > video") !== null
      ? true
      : false;

  if (!playback) {
    const presenceData: PresenceData = {
      largeImageKey: "lg",
      startTimestamp: browsingStamp
    };

    presenceData.details = "Browsing...";

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
  }

  const video: HTMLVideoElement = document.querySelector(
    "#player > div.jw-media.jw-reset > video"
  );

  if (video !== null) {
    const videoTitle: HTMLElement = document.querySelector(
        "div > div.episodeInfo > div.nomeAnime"
      ),
      episode: HTMLElement = document.querySelector(
        "div > div.episodeInfo > div.epInfo"
      ),
      [, endTimestamp] = presence.getTimestamps(
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
        endTimestamp
      };

    presence.setTrayTitle(videoTitle.innerText);

    presenceData.details = videoTitle.innerText;
    presenceData.state = episode.innerText;

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    presence.setActivity(presenceData, true);
  }
});
