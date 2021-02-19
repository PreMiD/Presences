const presence = new Presence({
    clientId: "808756700022702120"
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
  const splitAudioDuration = audioDuration.split(":").reverse(),
    parsedAudioDuration = getTime(splitAudioDuration),
    startTime = Date.now(),
    endTime = Math.floor(startTime / 1000) + parsedAudioDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on("UpdateData", async () => {
  const player = document.querySelector(".playbackActive");
  if (player) {
    const title = document.querySelector(".trackTitle span").textContent,
      artist = document.querySelector(".trackArtist span").textContent,
      durationTime = document.querySelector(
        ".listViewDurationContextButton .listViewDuration"
      ).textContent,
      timestamps = getTimestamps(durationTime.replace("-", "")),
      paused = document.querySelector(".playbackControls span.playerIconPause")
        ? false
        : true,
      data: PresenceData = {
        details: title,
        state: artist,
        largeImageKey: "logo",
        smallImageKey: paused ? "pause" : "play",
        smallImageText: paused ? (await strings).pause : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

    if (paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    if (title !== null && artist !== null) {
      presence.setActivity(data, !paused);
    }
  } else {
    const data: PresenceData = {
      details: "Browsing...",
      largeImageKey: "logo"
    };
    presence.setActivity(data);
  }
});
