const presence = new Presence({
    clientId: "633985961604415519"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on("UpdateData", async () => {
  const player = document.querySelector(
      "#audio-player_html5_api"
    ) as HTMLAudioElement,
    playing = player ? (player.paused ? false : true) : false;

  const data: { [k: string]: any } = {
    largeImageKey: "fizy-logo"
  };

  const songName = document.querySelector(
      "body > div.main-wrapper.ng-scope > ui-view > main > div > media-player > div > div.player > div.player__wrapper > div.player__metadata > div > div.player__media-name.radio__media-name > a"
    ),
    artistName = document.querySelector(
      "body > div.main-wrapper.ng-scope > ui-view > main > div > media-player > div > div.player > div.player__wrapper > div.player__metadata > div > div.player__media-artists > a"
    ),
    timestamps = player
      ? getTimestamps(
          Math.floor(player.currentTime),
          Math.floor(player.duration)
        )
      : null;

  if (
    songName &&
    songName.textContent != "" &&
    artistName &&
    artistName.textContent != ""
  ) {
    data.details = songName.textContent;
    data.state = artistName.textContent.trim();

    if (
      playing &&
      timestamps &&
      !isNaN(timestamps[0]) &&
      !isNaN(timestamps[1])
    ) {
      data.startTimestamp = timestamps[0];
      data.endTimestamp = timestamps[1];
    } else if (!playing) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    data.smallImageText = playing
      ? (await strings).play
      : (await strings).pause;
    playing ? (data.smallImageKey = "play") : (data.smallImageKey = "pause");

    presence.setTrayTitle(songName.textContent);
    presence.setActivity(data);
  }
});
