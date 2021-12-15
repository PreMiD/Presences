const presence = new Presence({
    clientId: "605861238852943988"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

presence.on("UpdateData", async () => {
  const video = document.querySelector<HTMLVideoElement>(
    ".mhp1138_videoWrapper video"
  );
  if (video && !isNaN(video.duration)) {
    //* Get required tags
    const title = document.querySelector<HTMLHeadingElement>(".video_title"),
      uploader = document.querySelector(".video-infobox-link"),
      timestamps = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      presenceData: PresenceData = {
        details: title ? title.innerText : "Title not found...",
        state: uploader ? uploader.textContent : "Uploader not found...",
        largeImageKey: "lg",
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

    presence.setTrayTitle(video.paused ? "" : title.innerText);

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
