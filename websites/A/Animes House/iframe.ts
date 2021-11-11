const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  if (document.querySelector("video.jw-video.jw-reset") !== null) {
    const video: HTMLVideoElement = document.querySelector(
      "video.jw-video.jw-reset"
    );
    if (video !== null) {
      iframe.send({
        currentTime: video.currentTime,
        duration: video.duration,
        played: video.duration !== 0,
        paused: video.paused
      });
    }
  }
});
