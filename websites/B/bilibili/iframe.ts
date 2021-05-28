const iframe = new iFrame();
iframe.on("UpdateData", async () => {
  if (document.querySelector(".bilibili-player-video video") !== null) {
    const video: HTMLVideoElement = document.querySelector(
      ".bilibili-player-video video"
    );

    if (video !== undefined && !isNaN(video.duration)) {
      iframe.send({
        iframeVideo: {
          iFrameVideo: true,
          currentTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }
});
