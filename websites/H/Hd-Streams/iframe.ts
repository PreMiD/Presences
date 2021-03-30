const _frameInstance = new iFrame();

(function (iframe: iFrame) {
  iframe.on("UpdateData", async () => {
    const video: HTMLVideoElement =
      document.querySelector(".jw-video.jw-reset") ||
      document.querySelector(".video") ||
      document.querySelector(".plyr__video-wrapper > video") ||
      document.querySelector("video");
    if (video != null && !isNaN(video.duration)) {
      iframe.send({
        duration: video.duration,
        currentTime: video.currentTime,
        paused: video.paused
      });
    } else {
      iframe.send(null);
    }
  });
})(_frameInstance);
