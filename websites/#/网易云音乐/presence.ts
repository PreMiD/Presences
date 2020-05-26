var presence = new Presence({ clientId: "714636053235105832" });
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
  var player = document.querySelector("#g_player");

  if (player) {
    var player_button: HTMLButtonElement = document.querySelector(
      "#g_player > div.btns > a.ply.j-flag"
    );
    var paused = player_button.classList.contains("pas") === false;
    var audioTimeLeft = document.querySelector(
      "#g_player > div.play > div.m-pbar > span"
    ).textContent;

    try {
      var title = document.querySelector(
        "#g_player > div.play > div.j-flag.words > a"
      ).textContent;
      var author = document.querySelector(
        "#g_player > div.play > div.j-flag.words > span > span"
      ).textContent;
      var audioTime = document.querySelector(
        "#g_player > div.play > div.m-pbar > span > em"
      ).textContent;
      var audioDuration = audioTimeLeft
        .replace(/(.*)(?=\/)/, "")
        .replace("/ ", "");
      var timestamps = getTimestamps(audioTime, audioDuration);
    } catch (err) {
      console.error(err);
    }

    var data: PresenceData = {
      details: title,
      state: author,
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

    if (title !== null && author !== null) {
      presence.setActivity(data, !paused);
    }
  } else {
    presence.clearActivity();
  }
});
