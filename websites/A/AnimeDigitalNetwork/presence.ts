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
    const episode = JSON.parse(document.querySelector("#root > div > div > div.sc-pkSvE.kPCOPp > div > div:nth-child(1) > script").textContent)
    if (video && !isNaN(video.duration)) {
        const timestamps = presence.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        );
      presenceData.details = episode.partOfSeries.name;
      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.endTimestamp = timestamps[1];

      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else {
      presenceData.details = "Looking at";
      presenceData.state = episode.partOfSeries.name;
    }
  } else if (document.location.pathname.includes("video") && !video) {
    const catalogue = document.querySelector("#root > div > div > div.sc-pkSvE.kPCOPp > div > div > div.sc-AxjAm.khAjwj.sc-psDXd.iazofB > div > h2 > span") 
    if (catalogue) {
      presenceData.details = "Browsing...";
    } else {
    const episode = JSON.parse(document.querySelector("#root > div > div > div.sc-pkSvE.kPCOPp > div > div > div.sc-psOyd.fIwdpb > script").textContent)
    presenceData.details = "Looking at";
    presenceData.state = episode.name;
    }
  } else presenceData.details = "Browsing...";
  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
