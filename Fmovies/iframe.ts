const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  if (
    document.querySelector("video") != null ||
    document.querySelector("div.jw-media.jw-reset > video") != null
  ) {
    var video: HTMLVideoElement =
      document.querySelector("video") != null
        ? document.querySelector("video")
        : document.querySelector("div.jw-media.jw-reset > video");

    iframe.send({
      duration: video.duration,
      currentTime: video.currentTime,
      paused: video.paused
    });
  }
});
