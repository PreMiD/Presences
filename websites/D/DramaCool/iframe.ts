const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  if (document.querySelector("video")) {
    const video: HTMLVideoElement = document.querySelector("video");

    if (video && !isNaN(video.duration)) {
      iframe.send({
        iframe_video: {
          currentTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }
});
