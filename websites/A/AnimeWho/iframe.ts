const videoFrame = new iFrame();

videoFrame.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector("video");

  if (video) {
    const videoMessage: Record<string, unknown> = {
      paused: video.paused,
      duration: video.duration,
      currentTime: video.currentTime
    };

    videoFrame.send(videoMessage);
  }
});
