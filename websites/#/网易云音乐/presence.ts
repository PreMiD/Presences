const presence = new Presence({ clientId: "714636053235105832" }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let title: string,
  author: string,
  audioTime: number,
  audioDuration: number,
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
    ).textContent as unknown as number;
    audioDuration = audioTimeLeft
      .replace(/(.*)(?=\/)/, "")
      .replace("/ ", "") as unknown as number;

    const timestamps = presence.getTimestamps(audioTime, audioDuration),
      data: PresenceData = {
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

    if (title !== null && author !== null) presence.setActivity(data, !paused);
  } else presence.clearActivity();
});
