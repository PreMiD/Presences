var presence = new Presence({
  clientId: "607719679011848220",
  mediaKeys: true
});
var strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

presence.on("UpdateData", async () => {
  var video: HTMLVideoElement = document.querySelector(
    "#dash-player-container > div > div.player-container > video"
  );

  if (video && !isNaN(video.duration)) {
    var title = document.querySelector(
      "#dash-player-container > div > div.content-container > div.metadata-area > div > div.metadata-area__second-line"
    ).textContent;
    var description = document.querySelector(
      "#dash-player-container > div > div.content-container > div.metadata-area > div > div.metadata-area__third-line"
    ).textContent;
    if (description === "") {
      description = "Movie";
    }
    var timestamps = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );

    var data: presenceData = {
      details: title,
      state: description,
      largeImageKey: "hulu",
      smallImageKey: video.paused ? "pause" : "play",
      smallImageText: video.paused
        ? (await strings).pause
        : (await strings).play,
      startTimestamp: timestamps[0],
      endTimestamp: timestamps[1]
    };
    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    if (title !== null && description !== null) {
      presence.setActivity(data, !video.paused);
    }
  } else {
    hub();
  }
});

presence.on("MediaKeys", (key: string) => {
  switch (key) {
    case "pause":
      var video = document.querySelector(
        "#dash-player-container > div > div.player-container > video"
      );
      if (video) video.paused ? video.play() : video.pause();
      break;
  }
});

function hub() {
  var details = "Browsing...";
  var hub_title = document.querySelector(
    "#__next > div.LevelOne.cu-levelone > div.Hub > div.Container.Hub__navigation > div"
  );
  if (hub_title) {
    details = "Browsing " + hub_title.textContent;
  }

  presence.setActivity(
    {
      details: details,
      largeImageKey: "hulu"
    },
    true
  );
}

function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
