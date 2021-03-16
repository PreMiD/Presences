const presence = new Presence({
    clientId: "622375113702113281"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let playback = true,
  currentTime: number,
  duration: number,
  paused: boolean;

presence.on(
  "iFrameData",
  (data: {
    dur: number;
    currTime: number;
    paused: boolean;
    iFrameVideo: boolean;
  }) => {
    playback = data.dur !== null ? true : false;

    if (playback) {
      currentTime = data.currTime;
      duration = data.dur;
      paused = data.paused;
    }
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  if (document.location.pathname.includes("/videos")) {
    if (playback == true && !isNaN(duration)) {
      const videoTitle = document.querySelector(
          "div > div.title-views.flex.column > h1"
        ),
        brand = document.querySelector(
          "div.hvpi-main.flex.column > div > div > div:nth-child(1) > a"
        ),
        timestamps = presence.getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        );
      presenceData.details =
        videoTitle !== null ? videoTitle.textContent : "Title not found";
      presenceData.state = brand.textContent;
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else {
      const videoTitle = document.querySelector(
          "div > div.title-views.flex.column > h1"
        ),
        brand = document.querySelector(
          "div.hvpi-main.flex.column > div > div > div:nth-child(1) > a"
        );
      presenceData.details =
        videoTitle !== null ? videoTitle.textContent : "Title not found";
      presenceData.state = brand.textContent;
    }
  } else {
    presenceData.details = "Browsing..";
  }
  presence.setActivity(presenceData);
});
