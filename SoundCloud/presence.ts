var presence = new Presence({
  clientId: "607697998490894356",
  mediaKeys: true
});
var strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

presence.on("UpdateData", async () => {
  var player = document.querySelector(
    "#app > div.playControls.g-z-index-control-bar.m-visible.m-googleCastActive > section"
  );

  if (player) {
    var player_button = document.querySelector(
      "#app > div.playControls.g-z-index-control-bar.m-visible.m-googleCastActive > section > div > div.playControls__elements > button.playControl.sc-ir.playControls__control.playControls__play"
    );
    var player_button_aria = player_button.getAttribute("aria-label");

    var paused = player_button_aria === "Play current";

    var title = document.querySelector(
      "#app > div.playControls.g-z-index-control-bar.m-visible.m-googleCastActive > section > div > div.playControls__elements > div.playControls__soundBadge > div > div.playbackSoundBadge__titleContextContainer > div > a > span:nth-child(2)"
    ).textContent;
    var author = document.querySelector(
      "#app > div.playControls.g-z-index-control-bar.m-visible.m-googleCastActive > section > div > div.playControls__elements > div.playControls__soundBadge > div > div.playbackSoundBadge__titleContextContainer > a"
    ).textContent;
    var audioTime = document.querySelector(
      "#app > div.playControls.g-z-index-control-bar.m-visible.m-googleCastActive > section > div > div.playControls__elements > div.playControls__timeline > div > div.playbackTimeline__timePassed > span:nth-child(2)"
    ).textContent;
    var audioDuration = document.querySelector(
      "#app > div.playControls.g-z-index-control-bar.m-visible.m-googleCastActive > section > div > div.playControls__elements > div.playControls__timeline > div > div.playbackTimeline__duration > span:nth-child(2)"
    ).textContent;
    var timestamps = getTimestamps(audioTime, audioDuration);

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

presence.on("MediaKeys", (key: string) => {
  switch (key) {
    case "pause":
      var pause_button = document.querySelector(
        "#app > div.playControls.g-z-index-control-bar.m-visible.m-googleCastActive > section > div > div.playControls__elements > button.playControl.sc-ir.playControls__control.playControls__play"
      );
      pause_button.click();
      break;
    case "nextTrack":
      var next_button = document.querySelector(
        "#app > div.playControls.g-z-index-control-bar.m-visible.m-googleCastActive > section > div > div.playControls__elements > button.skipControl.sc-ir.playControls__control.playControls__next.skipControl__next"
      );
      next_button.click();
      break;
    case "previousTrack":
      var prev_button = document.querySelector(
        "#app > div.playControls.g-z-index-control-bar.m-visible.m-googleCastActive > section > div > div.playControls__elements > button.skipControl.sc-ir.playControls__control.playControls__prev.skipControl__previous"
      );
      prev_button.click();
      break;
  }
});

function getTimestamps(audioTime: string, audioDuration: string) {
  var splitAudioTime = audioTime.split(":").reverse();
  var splitAudioDuration = audioDuration.split(":").reverse();

  var parsedAudioTime = getTime(splitAudioTime);
  var parsedAudioDuration = getTime(splitAudioDuration);

  var startTime = Date.now();
  var endTime =
    Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
  return [Math.floor(startTime / 1000), endTime];
}

function getTime(list: string[]) {
  var ret = 0;
  for (let index = list.length - 1; index >= 0; index--) {
    ret += parseInt(list[index]) * 60 ** index;
  }
  return ret;
}
