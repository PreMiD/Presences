const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  if (document.querySelector("#video_html5_wrapper_html5_api") !== null) {
    const video: HTMLVideoElement = document.querySelector(
      "#video_html5_wrapper_html5_api"
    );
    if (video !== null && !isNaN(video.duration)) {
      iframe.send({
        duration: video.duration,
        currentTime: video.currentTime,
        paused: video.paused
      });
    }
  }
});
