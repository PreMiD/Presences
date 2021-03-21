const iframe = new iFrame();
iframe.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector(
    ".video-stream.html5-main-video"
  );
  if (video !== null) {
    iframe.send({
      video: true,
      duration: video.duration,
      currentTime: video.currentTime,
      paused: video.paused
    });
  } else {
    iframe.send({
      video: false
    });
  }
});
