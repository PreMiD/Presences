const iframe = new iFrame();
iframe.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector("video");

  if (video !== null) {
    iframe.send({
      video: {
        isPaused: video.paused
      }
    });
  }
});
