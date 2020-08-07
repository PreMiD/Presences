var presence = new Presence({
    clientId: "630480553694593025"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
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
    largeImageKey: "netflix-logo"
  };

  if (document.location.pathname.includes("/watch")) {
    var video: HTMLVideoElement = document.querySelector(
      ".VideoContainer video"
    );
    if (video && !isNaN(video.duration)) {
      var showCheck = document.querySelector(
        "[class$='title'] .ellipsize-text span"
      )
        ? true
        : false;
      var timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );

      if (showCheck) {
        data.details =
          " " +
          document.querySelector("[class$='title'] .ellipsize-text h4")
            .textContent;

        if (
          document.querySelector(
            "[class$='title'] .ellipsize-text span:nth-child(3)"
          )
        ) {
          // if the episode has a title, it's added to season and episode numbers
          data.state =
            document.querySelector("[class$='title'] .ellipsize-text span")
              .textContent +
            " " +
            document.querySelector(
              "[class$='title'] .ellipsize-text span:nth-child(3)"
            ).textContent;
        } else {
          // if no episode title, it proceeds with the season and episode numbers only
          data.state = document.querySelector(
            "[class$='title'] .ellipsize-text span"
          ).textContent;
        }
      } else {
        // if not a show
        var regExp: any,
          title = document.querySelector("[class$='title'] h4.ellipsize-text")
            .textContent;
        if (/\(([^)]+)\)/.test(title.toLowerCase())) {
          // if is an extra, trailer, teaser or something else
          regExp = /\(([^)]+)\)/.exec(title);
          data.details = " " + title.replace(regExp[0], "");
          data.state = regExp[1];
        } else {
          // if it's a movie
          data.details = " " + title;
          data.state = "Movie";
        }
      }

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

      presence.setActivity(data, !video.paused);
    }
  } else {
    data.details = (await strings).browsing;
    presence.setActivity(data);
  }
});
