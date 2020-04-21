const iframe = new iFrame();
const pattern = "video[id$='_html5_api']";
const secondPattern = "div.jw-media.jw-reset > video";
iframe.on("UpdateData", async () => {
  if (
    document.querySelector(pattern) === null &&
    document.querySelector(secondPattern) === null
  ) {
    return;
  }

  const videoInfos: HTMLVideoElement =
    document.querySelector(pattern) != null
      ? document.querySelector(pattern)
      : document.querySelector(secondPattern);

  if (videoInfos != null && !isNaN(videoInfos.duration)) {
    iframe.send({
      duration: videoInfos.duration,
      currentTime: videoInfos.currentTime,
      paused: videoInfos.paused
    });
  }
});
