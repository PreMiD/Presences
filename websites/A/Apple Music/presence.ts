const presence = new Presence({
    clientId: "842112189618978897"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

const calculateEndTime = (elapsedTime: number) => {
  const startTime = Date.now(),
    endTime = Math.floor(startTime / 1000) + elapsedTime;

  return endTime;
};

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "applemusic-logo"
  };

  const playerCheck = document.querySelector(
    ".web-chrome-playback-controls__playback-btn[disabled]"
  )
    ? false
    : true;
  if (playerCheck) {
    const title = document
        .querySelector(
          ".web-chrome-playback-lcd__song-name-scroll-inner-text-wrapper"
        )
        ?.textContent.trim(),
      author = document
        .querySelector(
          ".web-chrome-playback-lcd__sub-copy-scroll-inner-text-wrapper"
        )
        ?.textContent.split("—")[0],
      endTime = presence.timestampFromFormat(
        document.querySelector(".web-chrome-playback-lcd__time-end")
          ?.textContent
      ),
      timestamps = presence.getTimestamps(
        Math.floor(Date.now() / 1000),
        calculateEndTime(endTime)
      ),
      paused = document.querySelector(
        ".web-chrome-playback-controls__playback-btn[aria-label='Play']"
      )
        ? true
        : false;

    data.details = title;
    data.state = author;
    data.smallImageKey = paused ? "pause" : "play";
    data.smallImageText = paused ? (await strings).pause : (await strings).play;
    data.endTimestamp = timestamps[1];

    if (paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data);
  } else presence.clearActivity();
});
