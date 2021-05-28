const presence = new Presence({ clientId: "714636053235105832" }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let title: string,
  author: string,
  audioTime: string,
  audioDuration: string,
  audioTimeLeft: string,
  playerButton: HTMLButtonElement;

presence.on("UpdateData", async () => {
  const player = document.querySelector("#g_player");

  if (player) {
    playerButton = document.querySelector(
      "#g_player > div.btns > a.ply.j-flag"
    );
    const paused = playerButton.classList.contains("pas") === false;
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

    const [, endTimestamp] = presence.getTimestamps(
        presence.timestampFromFormat(audioTime),
        presence.timestampFromFormat(audioDuration)
      ),
      data: PresenceData = {
        details: title,
        state: author,
        largeImageKey: "logo",
        smallImageKey: paused ? "pause" : "play",
        smallImageText: paused ? (await strings).pause : (await strings).play,
        endTimestamp
      };

    if (paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    if (title !== null && author !== null) presence.setActivity(data, !paused);
  } else presence.clearActivity();
});
