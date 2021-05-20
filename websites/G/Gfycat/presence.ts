var presence = new Presence({
    clientId: "630874255990587402"
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
    largeImageKey: "gfycat"
  };

  if (document.location.pathname.startsWith("/discover")) {
    var section = document.querySelector(".multiple-view__title").textContent;
    if (section) {
      data.state = section;
    }

    data.details = "Browsing...";
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/gifs/search")) {
    var searchText = document.querySelector(
      ".feed-with-player__title"
    ).textContent;

    data.details = "Searching...";
    if (searchText) {
      data.state = searchText;
    }
    data.startTimestamp = Date.now();
    data.smallImageKey = "search";
    data.smallImageText = "Searching";

    presence.setActivity(data);
  } else if (
    document.location.pathname.startsWith("/upload") ||
    document.location.pathname.startsWith("/create")
  ) {
    data.details = "Uploading...";
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/@")) {
    var profile = document.querySelector(
      ".profile-container .profile-info-container .name"
    ).textContent;

    data.details = "Viewing profile";
    data.state = profile;
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/jobs")) {
    data.details = "Browsing jobs";
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  } else {
    var player: HTMLVideoElement = document.querySelector(
      ".video-player-wrapper video"
    );

    if (player) {
      var title = document.querySelector(".gif-info .title").textContent;
      var views = document.querySelector(".gif-info .gif-views").textContent;
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
  }
});
