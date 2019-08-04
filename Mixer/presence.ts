var presence = new Presence({
  clientId: "607362931180699648",
  mediaKeys: true
});
var strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  live: "presence.activity.live"
});

var live, elapsed, oldUrl;

presence.on("UpdateData", async () => {
  var video: HTMLVideoElement = document.querySelector(
    "body > b-app > div > b-channel-page-wrapper > b-channel-web-page > div > section > div > b-stage > div.arrangement-container > b-stage-arrangement > div > b-player > light-player > light-player-projector > video"
  );
  if (video) {
    live = true;
  } else {
    video = document.querySelector(
      "body > b-app > div > b-channel-page-wrapper > b-channel-web-page > div > section > div > b-recording-stage > b-player > light-player > light-player-projector > video"
    );
    live = false;
  }

  if (oldUrl !== window.location.href) {
    oldUrl = window.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  if (video && !isNaN(video.duration)) {
    var title = document.querySelector(
      "body > b-app > div > b-channel-page-wrapper > b-channel-web-page > div > section > b-channel-profile > div.channel-info-container > b-channel-info-bar > div > div > div.title.layout-column > b-truncated-text > div"
    ).firstChild.textContent;
    var streamer = document.querySelector(
      "body > b-app > div > b-channel-page-wrapper > b-channel-web-page > div > section > b-channel-profile > div.layout-row.layout-align-space-between-start.profile-header > div:nth-child(1) > div > div.layout-row.layout-align-start-center > h2"
    ).firstChild.textContent;

    var timestamps = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );
    var data: presenceData = {
      details: title,
      state: streamer,
      largeImageKey: "mixer",
      smallImageKey: video.paused ? "pause" : "play",
      smallImageText: video.paused
        ? (await strings).pause
        : (await strings).play,
      startTimestamp: timestamps[0],
      endTimestamp: timestamps[1]
    };

    presence.setTrayTitle(video.paused ? "" : title);
    if (video.paused || live) {
      delete data.startTimestamp;
      delete data.endTimestamp;

      if (live) {
        data.smallImageKey = "live";
        data.smallImageText = (await strings).live;
        data.startTimestamp = elapsed;
      }
    }

    if (video && title !== null && streamer !== null) {
      presence.setActivity(data, !video.paused);
    }
  } else {
    presence.clearActivity();
    presence.setTrayTitle();
  }
});

presence.on("MediaKeys", (key: string) => {
  switch (key) {
    case "pause":
      var video: HTMLVideoElement = document.querySelector(
        "body > b-app > div > b-channel-page-wrapper > b-channel-web-page > div > section > div > b-stage > div.arrangement-container > b-stage-arrangement > div > b-player > light-player > light-player-projector > video"
      );
      video.paused ? video.play() : video.pause();
      break;
  }
});

function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
