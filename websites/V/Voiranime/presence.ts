var presence = new Presence({
    clientId: "659503939573776385"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  }),
  video = {
    duration: 0,
    currentTime: 0,
    paused: true
  };

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

presence.on("iFrameData", (data) => {
  video = data;
});

presence.on("UpdateData", async () => {
  var data: presenceData = {
    largeImageKey: "va"
  };

  if (
    video != null &&
    !isNaN(video.duration) &&
    video.duration > 0 &&
    document.querySelector("#headline span.current") &&
    document.querySelector("#headline span.current").textContent.length > 5
  ) {
    var timestamps = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );

    data.details = document
      .querySelector("#headline span.current")
      .textContent.substr(
        0,
        document
          .querySelector("#headline span.current")
          .textContent.lastIndexOf(" – ")
      );
    data.state = document
      .querySelector("#headline span.current")
      .textContent.split(" – ")
      .pop();

    data.smallImageKey = video.paused ? "pause" : "play";
    data.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    data.startTimestamp = timestamps[0];
    data.endTimestamp = timestamps[1];

    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data, !video.paused);
  } else {
    data.details = (await strings).browsing;
    data.smallImageKey = "search";
    data.smallImageText = (await strings).browsing;

    switch (document.location.pathname) {
      case "/anime-films-vf/":
        data.state = "Films VF";
        break;
      case "/anime-films-vostfr/":
        data.state = "Films VOSTFR";
        break;
      case "/top-animes/":
        data.state = "Top animes";
        break;
      case "/animes-liste/":
      default:
        data.state = "Page d'accueil";
    }

    presence.setActivity(data);
  }
});
