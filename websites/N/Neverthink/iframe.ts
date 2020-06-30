const iframe = new iFrame():
iframe.on("UpdateData", () => {
  let video =
    (document.querySelector("video") as HTMLVideoElement);

  if (video && !isNaN(video.duration)) {
    iframe.send({
      success: true,
      currTime: video.currentTime,
      dur: video.duration,
      paused: video.paused
    });
  }
});