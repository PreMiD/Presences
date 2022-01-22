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
      .querySelectorAll('[data-testid="player"]');
  if (playerCheck) {
    const liveCheck = document.querySelector("#scrubberElapsed"),
      artwork = document.getElementById("playerArtwork").getAttribute("src");
    presenceData.largeImageKey = artwork ?? "logo";
    if (!liveCheck) return presence.setActivity();
    if (liveCheck.textContent === "LIVE") {
      const pauseCheck = document
        .querySelector("#innerAppContent")
        .querySelectorAll('[data-testid="player-status-stopped"]');
      title = document.querySelector("#playerTitle").textContent;
      author = document.querySelector("#playerSubtitle").textContent;

      presenceData.details = title;
      if (title.length > 128)
        presenceData.details = `${title.substring(0, 125)}...`;

      presenceData.state = author;
      if (author.length > 128)
        presenceData.state = `${author.substring(0, 125)}...`;
      if (pauseCheck[0]) {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = (await strings).pause;
      } else {
        presenceData.smallImageKey = "live";
        presenceData.smallImageText = (await strings).live;
      }
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
          .querySelectorAll('[data-testid="player-status-paused"]');

      presenceData.details = title;
      if (title.length > 128)
        presenceData.details = `${title.substring(0, 125)}...`;

      presenceData.state = author;
      if (author.length > 128)
        presenceData.state = `${author.substring(0, 125)}...`;

      if (paused[0]) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = (await strings).pause;
      } else {
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = (await strings).play;
      }
      presenceData.endTimestamp = timestamps.pop();
    }
    if (!presenceData.details) presence.setActivity();
    else presence.setActivity(presenceData);
  } else presence.setActivity();
});
