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
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: Math.floor(Date.now() / 1000)
    },
    playerCheck = document
      .querySelector("#innerAppContent")
      .querySelectorAll('[data-testid="player"]')
      ? true
      : false;
  if (playerCheck) {
    const liveCheck = document.querySelector("#scrubberElapsed");
    if (!liveCheck) return presence.setActivity();
    if (liveCheck.textContent === "LIVE") {
      const pauseCheck = document
        .querySelector("#innerAppContent")
        .querySelectorAll('[data-testid="player-status-stopped"]')[0]
        ? true
        : false;
      title = document.querySelector("#playerTitle").textContent;
      author = document.querySelector("#playerSubtitle").textContent;

      presenceData.details = title;
      if (title.length > 128)
        presenceData.details = `${title.substring(0, 125)}...`;

      presenceData.state = author;
      if (author.length > 128)
        presenceData.state = `${author.substring(0, 125)}...`;

      presenceData.smallImageKey = pauseCheck ? "pause" : "live";
      presenceData.smallImageText = pauseCheck
        ? (await strings).pause
        : (await strings).live;
    } else {
      title = document.querySelector("#playerTitle").textContent;
      author = document.querySelector("#playerSubtitle").textContent;
      const audioTime = document.querySelector("#scrubberElapsed").textContent,
        audioDuration = document.querySelector("#scrubberDuration").textContent,
        timestamp1 = presence.timestampFromFormat(audioTime),
        timestamp2 = presence.timestampFromFormat(audioDuration),
        timestamps = presence.getTimestamps(timestamp1, timestamp2),
        paused = document
          .querySelector("#innerAppContent")
          .querySelectorAll('[data-testid="player-status-paused"]')[0]
          ? true
          : false;

      presenceData.details = title;
      if (title.length > 128)
        presenceData.details = `${title.substring(0, 125)}...`;

      presenceData.state = author;
      if (author.length > 128)
        presenceData.state = `${author.substring(0, 125)}...`;

      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.endTimestamp = timestamps.pop();

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
    if (!presenceData.details) presence.setActivity();
    else presence.setActivity(presenceData);
  } else presence.setActivity();
});
