var presence = new Presence({
    clientId: "621808181877669904"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

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

presence.on("UpdateData", async () => {
  const data: presenceData = {
    largeImageKey: "audiomack-logo"
  };

  var playerCheck = document.querySelector(".player--active") ? true : false;
  if (playerCheck) {
    var playCheck = document.querySelector(
      ".player__controls button.play-button--playing"
    )
      ? true
      : false;
    var title = document.querySelector(".player__title").textContent;
    var author = document.querySelector(".player__artist").textContent;
    var audioTime = document.querySelector(".waveform__elapsed").textContent;
    var audioDuration = document.querySelector(".waveform__duration")
      .textContent;
    var timestamps = getTimestamps(audioTime, audioDuration);

    data.details = title;
    var featureCheck = document.querySelector(".player__featuring")
      ? true
      : false;
    if (featureCheck) {
      var feature = document.querySelector(".player__featuring").textContent;
      data.state = author + " " + feature;
    } else {
      data.state = author;
    }
    (data.smallImageKey = !playCheck ? "pause" : "play"),
      (data.smallImageText = !playCheck
        ? (await strings).pause
        : (await strings).play),
      (data.startTimestamp = timestamps[0]),
      (data.endTimestamp = timestamps[1]);

    if (!playCheck) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data);
  } else {
    presence.clearActivity();
  }
});
