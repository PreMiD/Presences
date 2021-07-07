const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  if (document.querySelector("video")) {
    const video: HTMLVideoElement = document.querySelector("video");
    if (video != null && !isNaN(video.duration)) {
      iframe.send({
        iFrameVideo: true,
        duration: video.duration,
        currentTime: video.currentTime,
        paused: video.paused
      });
    }
  }
});
