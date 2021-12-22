const presence = new Presence({
    clientId: "808777200119316521"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

function checkLength(string: string): string {
  if (string.length > 128) return `${string.substring(0, 125)}...`;
  else return string;
}

function parseAudioTimestamps(
  audioTime: string,
  audioDuration: string
): Array<number> {
  const splitAudioTime = audioTime.split(":"),
    splitAudioDuration = audioDuration.split(":"),
    parsedAudioTime =
      parseInt(splitAudioTime[0]) * 60 + parseInt(splitAudioTime[1]),
    parsedAudioDuration =
      parseInt(splitAudioDuration[0]) * 60 + parseInt(splitAudioDuration[1]),
    startTime = Date.now(),
    endTime =
      Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
  return [Math.floor(startTime / 1000), endTime];
}

let elapsed = Math.floor(Date.now() / 1000),
  title,
  author,
  song,
  subtitle;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo"
    },
    playerCheck = !!document.querySelector('[data-test="player-container"]');
  if (playerCheck) {
    const playerText = document.querySelector('[data-test="player-text"]'),
      liveCheck = !document.querySelector('[data-test="controls-container"]')
        .children[1];
    if (liveCheck) {
      const playCheck = !!document.querySelector(
        '[data-test="controls-container"] [data-test-state="PLAYING"]'
      );
      if (playCheck) {
        title = playerText.children[0].textContent;
        song = playerText.children[1].textContent;
        author = playerText.children[2]?.textContent;
        subtitle = `${song}${author ? ` - ${author}` : ""}`;

        title = checkLength(title);
        data.details = title;
        subtitle = checkLength(subtitle);
        data.state = subtitle;

        data.smallImageKey = "live";
        data.smallImageText = (await strings).live;
        if (elapsed === null) elapsed = Math.floor(Date.now() / 1000);

        data.startTimestamp = elapsed;
        presence.setActivity(data);
      } else {
        elapsed = null;
        presence.clearActivity();
      }
    } else {
      const [, timestamp] = document.querySelector(
        '[data-test="controls-container"]'
      ).children;

      title = playerText.children[0].textContent;
      song = playerText.children[1].textContent;
      author = playerText.children[2]?.textContent;
      subtitle = `${song}${author ? ` - ${author}` : ""}`;

      const audioTime = timestamp.children[0].textContent,
        audioDuration = timestamp.children[2].textContent,
        parsedTimestamps = parseAudioTimestamps(audioTime, audioDuration),
        paused = !!document.querySelector('[data-test="play-icon"]');

      title = checkLength(title);
      data.details = title;
      subtitle = checkLength(subtitle);
      data.state = subtitle;
      (data.smallImageKey = paused ? "pause" : "play"),
        (data.smallImageText = paused
          ? (await strings).pause
          : (await strings).play),
        ([data.startTimestamp, data.endTimestamp] = presence.getTimestamps(
          parsedTimestamps[0],
          parsedTimestamps[1]
        ));

      if (paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      presence.setActivity(data);
    }
  } else {
    data.details = "Browsing...";
    presence.setActivity(data);
  }
});
