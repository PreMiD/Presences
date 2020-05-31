var presence = new Presence({
    clientId: "630533580119998496"
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
    largeImageKey: "comedycentral"
  };

  if (document.location.pathname.startsWith("/episodes")) {
    var player: HTMLVideoElement = document.querySelector(
      ".edge-player-content-element"
    );

    var show = document.querySelector(".header h3 a").textContent;
    var epTitle = document.querySelector(".sub-header h1").textContent;
    var epNumber: any;
    epNumber = document.querySelector(".meta span");
    if (epNumber) {
      epNumber =
        epNumber.textContent.replace("Season ", "S").replace(" Ep ", ":E") +
        " ";
    } else {
      epNumber = "";
    }
    var timestamps = getTimestamps(
      Math.floor(player.currentTime),
      Math.floor(player.duration)
    );

    data.details = show;
    data.state = epNumber + epTitle;
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
