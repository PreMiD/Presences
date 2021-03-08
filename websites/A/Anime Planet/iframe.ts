const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  if (document.querySelector("#player_html5_api") !== null) {
    const video: HTMLVideoElement = document.querySelector("#player_html5_api");

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