const presence = new Presence({
    clientId: "808777200119316521"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

function checkLength(string: string): string {
  if (string.length > 128) {
    return string.substring(0, 125) + "...";
  } else {
    return string;
  }
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
    playerCheck = document.querySelector("div.css-s6sc4j.e14pqrjs0")
      ? true
      : false;
  if (playerCheck) {
    const liveCheck = document.querySelector(
      "div.css-1gs73tw.e1ka8agw0 time[data-test='player-current-time']"
    )
      ? false
      : true;
    if (liveCheck) {
      const playCheck = document.querySelector(
        "button.ekca8d00 span[aria-labelledby='Stop']"
      )
        ? true
        : false;
      if (playCheck) {
        title = document.querySelector(".css-19ebljp").textContent;
        author = document.querySelector(".css-zzaxa6").textContent;
        song = document.querySelector(".css-9be0f7").textContent;
        subtitle = author + " - " + song;

        title = checkLength(title);
        data.details = title;
        subtitle = checkLength(subtitle);
        data.state = subtitle;

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
      title = document.querySelector(".css-19ebljp").textContent;
      try {
        author = document.querySelector(".css-x5q5qs").textContent;
        song = document.querySelector(".css-9be0f7").textContent;
        subtitle = author + " - " + song;
      } catch {
        author = document.querySelector(".css-x5q5qs").textContent;
        song = document.querySelector(".css-1uhpu6r").textContent;
        subtitle = song + " - " + author;
      }
      const audioTime = document.querySelector(".css-9dpnv0").textContent,
        audioDuration = document.querySelector(".css-xf5pff").textContent,
        parsedTimestamps = parseAudioTimestamps(audioTime, audioDuration),
        timestamps = presence.getTimestamps(
          parsedTimestamps[0],
          parsedTimestamps[1]
        ),
        paused = document.querySelector(
          "button.ekca8d00 span[aria-labelledby='Play']"
        )
          ? true
          : false;

      title = checkLength(title);
      data.details = title;
      subtitle = checkLength(subtitle);
      data.state = subtitle;
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
    data.details = "Browsing...";
    presence.setActivity(data);
  }
});
