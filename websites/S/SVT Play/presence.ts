const presence = new Presence({
    clientId: "641353660986687508"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let user: string, title: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "svt"
  };

  if (document.location.hostname === "www.svtplay.se") {
    if (document.location.pathname === "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
      presenceData.details = "Navigerar landnings sidan";
    } else if (document.location.pathname.includes("/program/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing program genres";
      presenceData.details = "Navigerar program kategorier";
    } else if (document.location.pathname.includes("/kanaler/")) {
      const video: HTMLVideoElement = document.querySelector(
        "#play_main-content > article > div.play_channels-video--show > div > div > div.play_video-player.lp_video.play_channels__active-video > div > video"
      );
      title = document.querySelector(
        "#play_main-content > article > div.play_channels-video--show > div > div > div.play_channels__active-video-info > h2"
      ).textContent;
      user = document.querySelector(
        "#play_main-content > article > div.play_channels-video--show > div > div > div.play_channels__active-video-info > p.play_channels__active-subheader"
      ).textContent;
      if (video !== null) {
        presenceData.smallImageKey = "live";
        presenceData.smallImageText = `Watching live on channel: ${
          document.querySelector("head > title").textContent.split("|")[0]
        }`;
        presenceData.smallImageText = `Kollar live på kanalen: ${
          document.querySelector("head > title").textContent.split("|")[0]
        }`;
        presenceData.startTimestamp = browsingStamp;

        presenceData.details = title;
        presenceData.state = user;
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Looing at channel:";
        presenceData.details = "Kollar på kanalen:";
        [presenceData.state] = document
          .querySelector("head > title")
          .textContent.split("|");
      }
    } else if (document.location.pathname.includes("/kanaler")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing for channels...";
      presenceData.details = "Söker efter kanaler...";
    } else if (document.location.pathname.includes("/video/")) {
      let currentTime: number,
        duration: number,
        paused: boolean,
        time: boolean,
        live: boolean,
        timestamps: number[];
      const video: HTMLVideoElement = document.querySelector(
        "#js-play_video__fullscreen-container > div > div > video"
      );
      title = document.querySelector(
        "#titel > h1 > span:nth-child(1)"
      ).textContent;
      user = document.querySelector(
        "#titel > h1 > span:nth-child(2)"
      ).textContent;
      if (video !== null) {
        if (!video.duration) {
          time = false;
          live = false;
        } else if (video.duration === 9007199254740991) live = true;
        else {
          time = true;
          live = false;
          ({ currentTime, duration, paused } = video);
          timestamps = presence.getTimestamps(
            Math.floor(currentTime),
            Math.floor(duration)
          );
        }
        if (time === true && !isNaN(duration) && live === false) {
          presenceData.smallImageKey = paused ? "pause" : "play";
          presenceData.smallImageText = paused
            ? (await strings).pause
            : (await strings).play;
          [presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

          presenceData.details = title;
          presenceData.state = user;

          if (paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
          }
        } else if (
          document.querySelector(
            "#js-play_video__fullscreen-container > div > div > div.svp_ui-error.svp_js-error > div > div.svp_ui-error__live-clock.svp_js-error--live-clock"
          ) !== null
        ) {
          presenceData.startTimestamp = browsingStamp;
          presenceData.details = "Waiting for:";
          presenceData.details = "Väntar på:";
          presenceData.state = title;
        } else if (live === true) {
          presenceData.details = title;
          presenceData.state = user;
          presenceData.smallImageKey = "live";
        } else {
          presenceData.startTimestamp = browsingStamp;
          presenceData.details = "Looing at:";
          presenceData.details = "Kollar på:";
          presenceData.state = title;
        }
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Looing at:";
        presenceData.details = "Kollar på:";
        presenceData.state = title;
      }
    } else if (document.location.pathname.includes("/sok")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Searching for:";
      presenceData.details = " Söker på:";
      presenceData.state = document.querySelector(
        "#play_main-content > section > h2.play_search-page__header.play_search-page__header--match > span"
      ).textContent;
      presenceData.smallImageKey = "search";
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
