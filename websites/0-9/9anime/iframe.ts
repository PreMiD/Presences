const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  if (document.querySelector("video")) {
    const video: HTMLVideoElement = document.querySelector("video");
    const paused: HTMLElement = document.querySelector("#player");
    if (video != null && !isNaN(video.duration)) {
      iframe.send({
        duration: video.duration,
        currentTime: video.currentTime,
        paused: paused.textContent.includes("playing")
      });
    }
  }
});
