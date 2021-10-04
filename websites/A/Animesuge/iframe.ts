const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  if (document.querySelector("video") !== null) {
    const video = document.querySelector("video");
    if (video && !isNaN(video.duration)) {
      iframe.send({
        currentTime: video.currentTime,
        timeEnd: video.duration,
        paused: video.paused
      });
    }
  }
});
