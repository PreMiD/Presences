const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  const video = document.querySelector("video");

  if (video && !isNaN(video.duration)) {
    iframe.send({
      playback: true,
      currentTime: video.currentTime,
      duration: video.duration,
      paused: video.paused
    });
  } else {
    iframe.send({
      playback: false,
      currentTime: 0,
      duration: 0,
      paused: false
    });
  }
});
