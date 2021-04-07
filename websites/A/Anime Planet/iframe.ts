const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  if (document.querySelector("video") !== null) {
    const video = document.querySelector("video");

    if (video !== undefined && !isNaN(video?.duration)) {
      iframe.send({
        iframe_video: {
          currentTime: video?.currentTime,
          duration: video?.duration,
          paused: video?.paused
        }
      });
    }
  }
});
