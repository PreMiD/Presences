const iframe = new iFrame();
iframe.on("UpdateData", async () => {
  if (document.location.hostname.match("player.hanime.tv")) {
    const video: HTMLVideoElement = document.querySelector(
      "#primary_video_html5_api"
    );
    if (video != null && !isNaN(video.duration)) {
      iframe.send({
        duration: video.duration,
        currentTime: video.currentTime,
        paused: video.paused
      });
    } else {
      iframe.send({
        duration: null,
        currentTime: null,
        paused: null
      });
    }
  }
});
