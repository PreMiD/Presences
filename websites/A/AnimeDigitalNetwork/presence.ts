const presence = new Presence({
    clientId: "808758769424138252"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

presence.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector("video.vjs-tech"),
    presenceData: PresenceData = {
      largeImageKey: "logo"
    };

  if (document.location.pathname.includes("video") && video) {
    if (video && !isNaN(video.duration)) {
      const title = document.querySelector(
          "#root > div > div > div.sc-pbWVv.hTvDIL > div > div:nth-child(1) > div.sc-kbKFCX.sc-kgMcbC.kecmmo > div:nth-child(1) > div > div > h1 > a"
        ),
        timestamps = presence.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        );
      presenceData.details = title.textContent;
      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.endTimestamp = timestamps[1];

      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  } else if (document.location.pathname.includes("video") && !video) {
    const title = document.querySelector(
      "#root > div > div > div.sc-pbWVv.hTvDIL > div > div:nth-child(1) > div.sc-kbKFCX.sc-kgMcbC.kecmmo > div:nth-child(1) > div > div > h1 > a"
    );
    presenceData.details = "Looking at";
    presenceData.state = title.textContent;
  } else presenceData.details = "Browsing...";
  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
