const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  if (document.querySelector("video.jw-video.jw-reset") !== null) {
    const video: HTMLVideoElement = document.querySelector(
      "video.jw-video.jw-reset"
    );
    if (video !== null) {
      const played = video.duration !== 0;
      iframe.send({
        currentTime: video.currentTime,
        duration: video.duration,
        played,
        paused: video.paused
      });
    }
  }
});
