const presence = new Presence({
    clientId: "605437254776651786"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

presence.on("UpdateData", async () => {
  const playback =
      document.querySelector(
        "#hbo-sdk--controller-container #hbo-sdk--controller-osd #hbo-sdk--vid #hbo-sdk--vid_Clpp_html5_mse_smooth_api"
      ) !== null &&
      document.querySelector("#hbo-sdk--player-title > div.content-title") !==
        null
        ? true
        : false,
    video: HTMLVideoElement = document.querySelector(
      "#hbo-sdk--controller-container #hbo-sdk--controller-osd #hbo-sdk--vid #hbo-sdk--vid_Clpp_html5_mse_smooth_api"
    ),
    presenceData: PresenceData = {
      largeImageKey: "lg"
    };
  if (!playback || !video) {
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);

    return presence.setActivity(presenceData);
  }

  if (!isNaN(video.duration)) {
    //* Get required tags
    const title: HTMLElement = document.querySelector(
        "#hbo-sdk--player-title > div.content-title"
      ),
      [, endTimestamp] = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );

    presenceData.details = "Watching:";
    presenceData.state = title.textContent;
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.endTimestamp = endTimestamp;

    presence.setTrayTitle(video.paused ? "" : title.textContent);

    //* Remove timestamps if paused
    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    //* If tags are not "null"
    if (title.textContent !== null)
      presence.setActivity(presenceData, !video.paused);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
