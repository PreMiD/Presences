const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector(".jw-media video");

  if (video) {
    const { paused, currentTime, duration } = video;

    iframe.send({
      paused,
      currentTime,
      duration
    });
  }
});
