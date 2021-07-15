const presence = new Presence({
    clientId: "844107447933075498"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

presence.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector(
    "#main-container > div > video"
  );

  let description;

  if (video && !isNaN(video.duration)) {
    const title = document.querySelector(
      "#player-video-overlay .player-title .player-title-name"
    ).textContent;
    if (document.location.pathname.includes("/live")) {
      description = document.querySelector(
        "#player-video-overlay .player-title div span"
      ).textContent;
    } else {
      description = document.querySelector(
        "#player-video-overlay .player-title div"
      ).textContent;
    }

    if (description == null || description.trim() == title) {
      description = "Movie";
    }

    const [, endTimestamp] = presence.getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );

    let currentState: string, smallImageKey: string, smallImageText: string;
    if (description.includes("ON NOW")) {
      currentState = "Live TV";
      timestamps[0] = 0;
      timestamps[1] = 0;
      smallImageKey = "live";
      smallImageText = (await strings).live;
    } else {
      currentState = description.substring(description.lastIndexOf("  ") + 1);
      smallImageKey = video.paused ? "pause" : "play";
      smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
    }

    const data: PresenceData = {
      details: title,
      state: currentState,
      largeImageKey: "logo",
      smallImageKey: smallImageKey,
      smallImageText: smallImageText,
      endTimestamp: endTimestamp
    };

    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    if (title !== null) {
      presence.setActivity(data, !video.paused);
    }
  } else {
    const browsingPresence: PresenceData = {
      details: "Browsing...",
      largeImageKey: "logo"
    };
    presence.setActivity(browsingPresence);
  }
});
