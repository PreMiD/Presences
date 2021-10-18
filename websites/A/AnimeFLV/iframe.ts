const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  if (
    document.querySelector("video[id$='_html5_api']") !== null ||
    document.querySelector("div.jw-media.jw-reset > video") !== null
  ) {
    const video: HTMLVideoElement = document.querySelector("video");
    if (video !== null && !isNaN(video.duration)) {
      iframe.send({
        duration: video.duration,
        currentTime: video.currentTime,
        paused: video.paused
      });
    }
  }
});
