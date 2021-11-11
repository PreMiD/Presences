const presence = new Presence({
    clientId: "611668948131512321"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo"
  };

presence.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector("#dmp_Video");
  if (video !== null && !isNaN(video.duration)) {
    const title = document.querySelector(".VideoInfoTitle__videoTitle___3WLlw"),
      uploader = document.querySelector(".ChannelLine__channelName___3JE1B");
    presenceData.details =
      title !== null
        ? (title as HTMLElement).textContent
        : "Title not found...";
    presenceData.state =
      uploader !== null
        ? (uploader as HTMLElement).textContent
        : "Uploader not found...";
    presenceData.largeImageKey = "logo";
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    [presenceData.startTimestamp, presenceData.endTimestamp] =
      presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );

    presence.setTrayTitle(video.paused ? "" : title.textContent);

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (title !== null && uploader !== null)
      presence.setActivity(presenceData, !video.paused);
  } else {
    presence.setActivity({
      details: "Browsing..",
      largeImageKey: "logo"
    });
  }
});
