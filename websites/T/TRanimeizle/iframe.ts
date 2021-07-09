const TRanimeizleIframe = new iFrame();

TRanimeizleIframe.on("UpdateData", () => {
  const video: HTMLVideoElement = document.querySelector("video");

  if (video && !isNaN(video.duration))
    TRanimeizleIframe.send({
      duration: video.duration,
      currentTime: video.currentTime,
      paused: video.paused
    });
});
