const presence = new Presence({
    clientId: "605119835751579649"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

presence.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector(".video-bg-pic video");
  if (video !== null && !isNaN(video.duration)) {
    const title = (
        document.querySelector(".video-page #main .page-title") as HTMLElement
      )?.innerText,
      uploader = document.querySelector(
        ".video-page #main .video-metadata .uploader-tag .name"
      ),
      [startTimestamp, endTimestamp] = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      presenceData: PresenceData = {
        details: title ?? "Title not found...",
        state:
          uploader !== null ? uploader.textContent : "Uploader not found...",
        largeImageKey: "lg",
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp,
        endTimestamp
      };

    presence.setTrayTitle(video.paused ? "" : title);

    //* Remove timestamps if paused
    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    //* If tags are not "null"
    if (title !== null && uploader !== null)
      presence.setActivity(presenceData, !video.paused);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
