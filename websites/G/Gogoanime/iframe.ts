const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  const videoInfos: HTMLVideoElement =
    document.querySelector("div.jw-media.jw-reset > video") ??
    document.querySelector("div.html5-video-container > video"); // youtube embed
  if (videoInfos && !isNaN(videoInfos.duration)) {
    iframe.send({
      duration: videoInfos.duration,
      currentTime: videoInfos.currentTime,
      paused: videoInfos.paused
    });
  }
});
