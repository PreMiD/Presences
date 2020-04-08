var iframe = new iFrame();

iframe.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector("video");

  if (video) {
    const videoMessage: any = {
      paused: video.paused,
      duration: video.duration,
      currentTime: video.currentTime
    };

    iframe.send(videoMessage);
  }
});
