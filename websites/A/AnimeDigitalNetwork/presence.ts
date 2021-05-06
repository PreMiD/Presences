const presence = new Presence({
    clientId: "808758769424138252"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

presence.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector("video.vjs-tech");

  if (document.location.pathname.includes("video") && video) {
    if (video && !isNaN(video.duration)) {
      const title = document
          .querySelector(
            "#root > div > div > div.sc-pbWVv.hTvDIL > div > div:nth-child(1) > div.sc-jWJfXU.sc-kbKFCX.ibhpg > div:nth-child(1) > div > div > h1 > a"
          )
          .textContent,
        timestamps = presence.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        ),
        data: PresenceData = {
          details: title,
          largeImageKey: "logo",
          smallImageKey: video.paused ? "pause" : "play",
          smallImageText: video.paused
            ? (await strings).pause
            : (await strings).play,
          startTimestamp: timestamps[0],
          endTimestamp: timestamps[1]
        };

      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      if (title !== null) {
        presence.setActivity(data);
      }
    }
  } else if (document.location.pathname.includes("video") && !video) {
    const title = document
        .querySelector(
          "#root > div > div > div.sc-pbWVv.hTvDIL > div > div:nth-child(1) > div.sc-jWJfXU.sc-kbKFCX.ibhpg > div:nth-child(1) > div > div > h1 > a"
        )
        .textContent,
      data = {
        details: "Browsing...",
        state: title,
        largeImageKey: "logo"
      };
    presence.setActivity(data);
  } else {
    const browsingPresence: PresenceData = {
      details: "Browsing...",
      largeImageKey: "logo"
    };
    presence.setActivity(browsingPresence);
  }
});
