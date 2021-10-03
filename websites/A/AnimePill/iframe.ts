const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  const video: HTMLVideoElement =
    document.querySelector(".jw-video.jw-reset") ||
    document.querySelector(".video");
  if (video !== null && !isNaN(video.duration)) {
    iframe.send({
      video: true,
      duration: video.duration,
      currentTime: video.currentTime,
      paused: video.paused
    });
  } else iframe.send({ video: false });
});
