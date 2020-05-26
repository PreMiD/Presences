let presence = new Presence({ clientId: "714636053235105832" });

let strings = presence.getStrings({
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

function getTimestamps(
  audioTime: string,
  audioDuration: string
): Array<number> {
  let splitAudioTime = audioTime.split(":").reverse(),
    splitAudioDuration = audioDuration.split(":").reverse(),
    parsedAudioTime = getTime(splitAudioTime),
    parsedAudioDuration = getTime(splitAudioDuration),
    startTime = Date.now(),
    endTime =
      Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
  return [Math.floor(startTime / 1000), endTime];
}

let title: string,
  author: string,
  audioTime: string,
  audioDuration: string,
  audioTimeLeft: string,
  player_button: HTMLButtonElement;

presence.on("UpdateData", async () => {
  let player = document.querySelector("#g_player");

  if (player) {
    player_button = document.querySelector(
      "#g_player > div.btns > a.ply.j-flag"
    );
    let paused = player_button.classList.contains("pas") === false;
    audioTimeLeft = document.querySelector(
      "#g_player > div.play > div.m-pbar > span"
    ).textContent;
    title = document.querySelector(
      "#g_player > div.play > div.j-flag.words > a"
    ).textContent;
    author = document.querySelector(
      "#g_player > div.play > div.j-flag.words > span > span"
    ).textContent;
    audioTime = document.querySelector(
      "#g_player > div.play > div.m-pbar > span > em"
    ).textContent;
    audioDuration = audioTimeLeft.replace(/(.*)(?=\/)/, "").replace("/ ", "");

    const timestamps = getTimestamps(audioTime, audioDuration);

    let data: PresenceData = {
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
