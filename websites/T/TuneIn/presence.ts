const presence = new Presence({
    clientId: "844108776793178122"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

let title, author;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: Math.floor(Date.now() / 1000)
  };
  if (
    document.querySelector(
      "#innerAppContent > div.player__playerContainer___JEJ2U > div > div.player__leftSection___flqSC > div.player__leftErrorMessageContainer___10rm9 > div > div > div.player__errorMessageContainer___1dw8a"
    )
  )
    presence.clearActivity();
  else if (
    document.querySelector(".player__playerContainer___JEJ2U") ? true : false
  ) {
    if (
      document.querySelector("#scrubberElapsed").textContent === "LIVE"
        ? true
        : false
    ) {
      if (
        document.querySelector(
          ".player-play-button__playerPlayButton___1Kc2Y[data-testid='player-status-playing']"
        )
          ? true
          : false
      ) {
        title = document.querySelector("#playerTitle").textContent;
        author = document.querySelector("#playerSubtitle").textContent;

        presenceData.details = title;
        if (title.length > 128)
          presenceData.details = `${title.substring(0, 125)}...`;

        data.state = author;
        if (author.length > 128) data.state = `${author.substring(0, 125)}...`;

        data.smallImageKey = "live";
        data.smallImageText = (await strings).live;
      } else {
        title = document.querySelector("#playerTitle").textContent;
        author = document.querySelector("#playerSubtitle").textContent;
        const paused = document.querySelector(
          ".player-play-button__playerPlayButton___1Kc2Y[data-testid='player-status-stopped']"
        )
          ? true
          : false;

        presenceData.details = title;
        if (title.length > 128)
          presenceData.details = `${title.substring(0, 125)}...`;

        data.state = author;
        if (author.length > 128) data.state = `${author.substring(0, 125)}...`;

        data.smallImageKey = paused ? "pause" : "play";
        data.smallImageText = paused
          ? (await strings).pause
          : (await strings).play;
        data.endTimestamp = presence
          .getTimestamps(
            presence.timestampFromFormat(
              document.querySelector("#scrubberElapsed").textContent
            ),
            presence.timestampFromFormat(
              document.querySelector("#scrubberElapsed").innerHTML
            )
          )
          .pop();

        if (paused) {
          delete data.startTimestamp;
          delete data.endTimestamp;
        }

        if (!presenceData.details) {
          presence.setActivity();
        } else presence.setActivity(data);
      }
    }
  } else presence.clearActivity();
});
