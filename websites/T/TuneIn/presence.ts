const presence = new Presence({
    clientId: "844108776793178122"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

function getTime(list: string[]): number {
  let ret = 0;
  for (let index = list.length - 1; index >= 0; index--) {
    ret += parseInt(list[index]) * 60 ** index;
  }
  return ret;
}

function getTimestamps(
  audioTime: string,
  audioDuration: string
): Array<number> {
  const splitAudioTime = audioTime.split(":").reverse(),
   splitAudioDuration = audioDuration.split(":").reverse(),

   parsedAudioTime = getTime(splitAudioTime),
   parsedAudioDuration = getTime(splitAudioDuration),

  startTime = Date.now(),
   endTime =
    Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
  return [Math.floor(startTime / 1000), endTime];
}

let elapsed = Math.floor(Date.now() / 1000);
let title, author;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo"
  };

  const playerCheck = document.querySelector(".player__playerContainer___JEJ2U")
    ? true
    : false;
  if (playerCheck) {
    const liveCheck =
      document.querySelector("#scrubberElapsed").textContent == "LIVE"
        ? true
        : false;
    if (liveCheck) {
      const playCheck = document.querySelector(
        ".player-play-button__playerPlayButton___1Kc2Y[data-testid='player-status-playing']"
      )
        ? true
        : false;
      if (playCheck) {
        title = document.querySelector("#playerTitle").textContent;
        author = document.querySelector("#playerSubtitle").textContent;

        data.details = title;
        if (title.length > 128) {
          data.details = title.substring(0, 125) + "...";
        }

        data.state = author;
        if (author.length > 128) {
          data.state = author.substring(0, 125) + "...";
        }

        data.smallImageKey = "live";
        data.smallImageText = (await strings).live;
        if (elapsed === null) {
          elapsed = Math.floor(Date.now() / 1000);
        }
        data.startTimestamp = elapsed;
        presence.setActivity(data);
      } else {
        elapsed = null;
        presence.clearActivity();
      }
    } else {
      title = document.querySelector("#playerTitle").textContent;
      author = document.querySelector("#playerSubtitle").textContent;
      const audioTime = document.querySelector("#scrubberElapsed").textContent,
      audioDuration = document.querySelector("#scrubberDuration").textContent,
      timestamps = getTimestamps(audioTime, audioDuration),
      paused = document.querySelector(
        ".player-play-button__playerPlayButton___1Kc2Y[data-testid='player-status-paused']"
      )
        ? true
        : false;

      data.details = title;
      if (title.length > 128) {
        data.details = title.substring(0, 125) + "...";
      }

      data.state = author;
      if (author.length > 128) {
        data.state = author.substring(0, 125) + "...";
      }

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
    }
  } else {
    presence.clearActivity();
  }
});
