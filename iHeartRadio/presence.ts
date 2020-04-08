var presence = new Presence({
    clientId: "620283906234777600"
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

function getTime(list: string[]): number {
  var ret = 0;
  for (let index = list.length - 1; index >= 0; index--) {
    ret += parseInt(list[index]) * 60 ** index;
  }
  return ret;
}

function getTimestamps(
  audioTime: string,
  audioDuration: string
): Array<number> {
  var splitAudioTime = audioTime.split(":").reverse();
  var splitAudioDuration = audioDuration.split(":").reverse();

  var parsedAudioTime = getTime(splitAudioTime);
  var parsedAudioDuration = getTime(splitAudioDuration);

  var startTime = Date.now();
  var endTime =
    Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
  return [Math.floor(startTime / 1000), endTime];
}

var elapsed = Math.floor(Date.now() / 1000);
var title, author, song, subtitle;

presence.on("UpdateData", async () => {
  const data: presenceData = {
    largeImageKey: "iheartradio-logo"
  };

  var playerCheck = document.querySelector("div.css-s6sc4j.e14pqrjs0")
    ? true
    : false;
  if (playerCheck) {
    var liveCheck = document.querySelector(
      "div.css-1gs73tw.e1ka8agw0 time[data-test='player-current-time']"
    )
      ? false
      : true;
    if (liveCheck) {
      var playCheck = document.querySelector(
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
      var audioTime = document.querySelector(".css-9dpnv0").textContent;
      var audioDuration = document.querySelector(".css-xf5pff").textContent;
      var timestamps = getTimestamps(audioTime, audioDuration);
      const paused = document.querySelector(
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
    presence.clearActivity();
  }
});
