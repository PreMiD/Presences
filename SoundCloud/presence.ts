var presence = new Presence({
  clientId: "607697998490894356"
});
var strings = presence.getStrings({
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
  var player = document.querySelector(".playControls__elements");

  if (player) {
    var player_button: HTMLButtonElement = document.querySelector(
      ".playControls__play"
    );

    var paused = player_button.classList.contains("playing") === false;

    try {
      var title = document.querySelector(
        ".playbackSoundBadge__titleLink > span:nth-child(2)"
      ).textContent;
      var author = document.querySelector(".playbackSoundBadge__lightLink")
        .textContent;
      var audioTime = document.querySelector(
        "#app > div.playControls.g-z-index-control-bar.m-visible > section > div > div > div > div > div.playbackTimeline__timePassed > span:nth-child(2)"
      ).textContent;
      var audioDuration = document.querySelector(
        "#app > div.playControls.g-z-index-control-bar.m-visible > section > div > div > div > div > div.playbackTimeline__duration > span:nth-child(2)"
      ).textContent;
      var timestamps = getTimestamps(audioTime, audioDuration);
    } catch (err) {
      console.log("Contact dev of this presence");
    }

    var data: presenceData = {
      details: title,
      state: author,
      largeImageKey: "soundcloud",
      smallImageKey: paused ? "pause" : "play",
      smallImageText: paused ? (await strings).pause : (await strings).play,
      startTimestamp: timestamps[0],
      endTimestamp: timestamps[1]
    };

    if (paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    if (title !== null && author !== null) {
      presence.setActivity(data, !paused);
    }
  } else {
    presence.clearActivity();
  }
});
