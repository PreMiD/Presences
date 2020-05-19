var presence = new Presence({
    clientId: "630857591744102461"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  }),
  tv = false,
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
  var data: PresenceData = {
    largeImageKey: "fml"
  };

  if (
    video != null &&
    !isNaN(video.duration) &&
    document.location.pathname.includes("/film")
  ) {
    tv =
      document.querySelector("#movie li:nth-child(2) span") &&
      document
        .querySelector("#movie li:nth-child(2) span")
        .textContent.includes("TV")
        ? true
        : false;

    var timestamps = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );

    if (tv) {
      const name = document
        .querySelector("#movie li.active span")
        .textContent.trim();
      const date = document.querySelector(
        "#info  div dl:nth-child(2) > dd:nth-child(4)"
      ).textContent;
      data.details =
        name.replace(/[_0-9]+$/, "") +
        " (" +
        date.slice(0, date.indexOf("-")) +
        ")";
      data.state =
        (/\d$/.test(name)
          ? "S" +
            document
              .querySelector("#movie li.active span")
              .textContent.split(" ")
              .pop() +
            ":"
          : "") +
        "E" +
        document.querySelector("#servers li a.active").textContent;
    } else {
      const date = document.querySelector(
        "#info  div dl:nth-child(2) > dd:nth-child(4)"
      ).textContent;
      data.details = document.querySelector(
        "#movie li.active span"
      ).textContent;
      data.state = date.slice(0, date.indexOf("-"));
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
  } else {
    data.details = (await strings).browsing;
    data.smallImageKey = "search";
    data.smallImageText = (await strings).browsing;
    presence.setActivity(data);
  }
});
