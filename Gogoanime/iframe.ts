let iframe = new iFrame();
var pattern = "video[id$='_html5_api']";
var sPattern = "div.jw-media.jw-reset > video";
iframe.on("UpdateData", async () => {
  if (
    document.querySelector(pattern) === null &&
    document.querySelector(sPattern) === null
  ) {
    return;
  }

  var videoInfos: HTMLVideoElement =
    document.querySelector(pattern) != null
      ? document.querySelector(pattern)
      : document.querySelector(sPattern);

  if (videoInfos != null && !isNaN(videoInfos.duration)) {
    iframe.send({
      duration: videoInfos.duration,
      currentTime: videoInfos.currentTime,
      paused: videoInfos.paused
    });
  }
});
