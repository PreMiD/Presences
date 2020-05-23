let presence = new Presence({
    clientId: "621819308481445934"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

function getTime(list: string[]): number {
  let ret = 0;
  for (let index = list.length - 1; index >= 0; index--) {
    ret += parseInt(list[index]) * 60 ** index;
  }
  return ret;
}

function getTimestamps(audioDuration: string): Array<number> {
  let splitAudioDuration = audioDuration.split(":").reverse();

  let parsedAudioDuration = getTime(splitAudioDuration);

  let startTime = Date.now();
  let endTime = Math.floor(startTime / 1000) + parsedAudioDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "applemusic-logo"
  };

  let playerCheck = document.querySelector(
    ".web-chrome-playback-controls__playback-btn[disabled]"
  )
    ? false
    : true;
  if (playerCheck) {
    let title = document
      .querySelector(
        ".web-chrome-playback-lcd__song-name-scroll"
      )
      .textContent.trim();
    let author = document
      .querySelector(".web-chrome-playback-lcd__sub-copy-scroll-inner-text-wrapper")
      .textContent.split("—")[0];
    let audioTime = document.querySelector(
      ".web-chrome-playback-lcd__time-end"
    ).textContent;
    let timestamps = getTimestamps(audioTime);
    let paused = document.querySelector(
      ".web-chrome-playback-controls__playback-btn[aria-label='Play']"
    )
      ? true
      : false;

    data.details = title;
    data.state = author;
    (data.smallImageKey = paused ? "pause" : "play"),
      (data.smallImageText = paused
        ? (await strings).pause
        : (await strings).play),
      (data.startTimestamp = timestamps[0]),
      (data.endTimestamp = timestamps[1]);

    if (paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data);
  } else {
    presence.clearActivity();
  }
});
