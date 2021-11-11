const presence = new Presence({
    clientId: "842112189618978897"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

function getTime(list: string[]): number {
  let ret = 0;
  for (let index = list.length - 1; index >= 0; index--)
    ret += parseInt(list[index]) * 60 ** index;

  return ret;
}

function getTimestamps(audioDuration: string): number[] {
  const startTime = Date.now();
  return [
    Math.floor(startTime / 1000),
    Math.floor(startTime / 1000) + getTime(audioDuration.split(":").reverse())
  ];
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "applemusic-logo"
  };
  if (
    document.querySelector(
      ".web-chrome-playback-controls__playback-btn[disabled]"
    )
      ? false
      : true
  ) {
    const paused = document.querySelector(
      ".web-chrome-playback-controls__playback-btn[aria-label='Play']"
    )
      ? true
      : false;

    presenceData.details = document
      .querySelector(
        ".web-chrome-playback-lcd__song-name-scroll-inner-text-wrapper"
      )
      ?.textContent.trim();
    presenceData.state = document
      .querySelector(
        ".web-chrome-playback-lcd__sub-copy-scroll-inner-text-wrapper"
      )
      ?.textContent.split("—")[0];
    presenceData.smallImageKey = paused ? "pause" : "play";
    presenceData.smallImageText = paused
      ? (await strings).pause
      : (await strings).play;
    [presenceData.startTimestamp, presenceData.endTimestamp] = getTimestamps(
      document.querySelector(".web-chrome-playback-lcd__time-end").textContent
    );

    if (paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    presence.setActivity(presenceData);
  } else presence.clearActivity();
});
