const presence = new Presence({
    clientId: "607881666836561930"
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
  playback = document.querySelector(".AT-player video") !== null ? true : false;

  const presenceData: PresenceData = {
    largeImageKey: "lg"
  };

  if (!playback) {
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingTimestamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
  }

  const video: HTMLVideoElement = document.querySelector(".AT-player video");

  if (video !== null && !isNaN(video.duration)) {
    const videoTitle = (
        document.querySelector(".series-title span") as HTMLElement
      )?.textContent,
      [startTimestamp, endTimestamp] = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );

    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = startTimestamp;
    presenceData.endTimestamp = endTimestamp;

    presence.setTrayTitle(video.paused ? "" : videoTitle);

    presenceData.details = videoTitle ?? "Title not found...";
    presenceData.state =
      (document.querySelector(".series-episode") as HTMLElement)?.textContent ??
      "Episode not found...";

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (videoTitle) presence.setActivity(presenceData);
  }
});
