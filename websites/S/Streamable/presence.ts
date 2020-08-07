var presence = new Presence({
    clientId: "630847999106482176"
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
  const data: PresenceData = {
    largeImageKey: "streamable"
  };

  var player: HTMLVideoElement = document.querySelector(".video-player-tag");

  if (player) {
    var title = document.querySelector(".metadata #title").textContent;
    var views = document.querySelector(".metadata #visits").textContent;
    var timestamps = getTimestamps(
      Math.floor(player.currentTime),
      Math.floor(player.duration)
    );

    data.details = title;
    data.state = views;
    data.startTimestamp = timestamps[0];
    data.endTimestamp = timestamps[1];
    data.smallImageKey = player.paused ? "pause" : "play";
    data.smallImageText = player.paused
      ? (await strings).pause
      : (await strings).play;

    if (player.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data);
  } else {
    data.details = "Browsing...";
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  }
});
