var presence = new Presence({
  clientId: "607352899214901248",
  mediaKeys: true
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

presence.on("UpdateData", async () => {
//* If user is on /view_video...
var video: HTMLVideoElement = document.querySelector(
  ".mhp1138_videoWrapper video"
);
if (video[0] !== null && !isNaN(video.duration)) {
  //* Get required tags
  var title: any;
  title = document.querySelector(".video-wrapper .title-container .title");

  var uploader = document.querySelector(
      ".video-actions-container .video-info-row .usernameWrap a"
    ),
    timestamps = getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    ),
    presenceData: presenceData = {
      details: title.innerText,
      state: uploader.textContent,
      largeImageKey: "lg",
      smallImageKey: video.paused ? "pause" : "play",
      smallImageText: video.paused
        ? (await strings).pause
        : (await strings).play,
      startTimestamp: timestamps[0],
      endTimestamp: timestamps[1]
    };

  presence.setTrayTitle(video.paused ? "" : title.innerText);

  //* Remove timestamps if paused
  if (video.paused) {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }

  //* If tags are not "null"
  if (video && title !== null && uploader !== null) {
    presence.setActivity(presenceData, !video.paused);
  }
} else {
  presence.setActivity();
  presence.setTrayTitle();
}
});

presence.on("MediaKeys", (key: string) => {
switch (key) {
  case "pause":
    var video = document.querySelector(
      ".mhp1138_videoWrapper video"
    ) as HTMLVideoElement;
    video.paused ? video.play() : video.pause();
    break;
}
});

/**
* Get Timestamps
* @param {Number} videoTime Current video time seconds
* @param {Number} videoDuration Video duration seconds
*/
function getTimestamps(videoTime: number, videoDuration: number) {
var startTime = Date.now();
var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
return [Math.floor(startTime / 1000), endTime];
}