const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector("video");
  if (video && video.duration && !isNaN(video.duration)) {
    iframe.send({
      currTime: video.currentTime,
      duration: video.duration,
      paused: video.paused
    });
  }
});
