const iframe = new iFrame();
iframe.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector("#html5player");
  if (video && video.duration && !isNaN(video.duration))
    iframe.send({
      duration: video.duration,
      currentTime: video.currentTime
    });
});
