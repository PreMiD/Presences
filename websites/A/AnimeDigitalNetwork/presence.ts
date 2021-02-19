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
      const title = document.querySelector(".adn-player-header a").textContent,
        subtitle = document.querySelector(".adn-player-header span")
          .textContent,
        timestamps = presence.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        ),
        data: PresenceData = {
          details: title,
          state: subtitle,
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

      if (title !== null && subtitle !== null) {
        presence.setActivity(data, !video.paused);
      }
    }
  } else if (document.location.pathname.includes("video") && !video) {
    const title = document.querySelector("h1.sc-pzMyG.sc-jHngDS.efMrJJ")
        .textContent,
      data: PresenceData = {
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
