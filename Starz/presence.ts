var presence = new Presence({
    clientId: "621854422737354763"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
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

var elapsed = Math.floor(Date.now() / 1000);
var subtitle;

presence.on("UpdateData", async () => {
  const data: presenceData = {
    largeImageKey: "starz-logo"
  };

  var video: HTMLVideoElement = document.querySelector(".player-object  video");
  if (document.location.pathname.startsWith("/livetv")) {
    data.details = "Watching LiveTV";
    (data.smallImageKey = "live"), (data.smallImageText = (await strings).live);
    if (elapsed == null) {
      elapsed = Math.floor(Date.now() / 1000);
    }
    data.startTimestamp = elapsed;
    presence.setActivity(data);
  } else if (video && !isNaN(video.duration)) {
    var title = document.querySelector(".wrapper h2").textContent;
    var timestamps = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );
    var subtitleCheck = document.querySelector("h3.slide-title") ? false : true;

    if (subtitleCheck) {
      subtitle = "Movie";
    } else {
      subtitle = document.querySelector("h3.slide-title").textContent;
    }

    (data.details = title), (data.state = subtitle);
    (data.smallImageKey = video.paused ? "pause" : "play"),
      (data.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play),
      (data.startTimestamp = timestamps[0]),
      (data.endTimestamp = timestamps[1]);

    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    if (title !== null && subtitle !== null) {
      presence.setActivity(data, !video.paused);
    }
    elapsed = null;
  } else {
    data.details = "Browsing...";
    presence.setActivity(data);
    elapsed = null;
  }
});
