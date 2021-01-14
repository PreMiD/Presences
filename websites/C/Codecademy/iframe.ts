const iframe = new iFrame();
iframe.on("UpdateData", async () => {
  const titleElement: HTMLElement = document.querySelector(
      "div.ytp-title-text > a"
    ),
    videoElement: HTMLVideoElement = document.querySelector("#player video");
  if (!titleElement || !videoElement) return;
  const title = titleElement.textContent,
    duration = videoElement.duration ? videoElement.duration : null,
    currentTime = videoElement.currentTime,
    paused = videoElement.paused;
  iframe.send({
    title,
    currentTime,
    duration,
    paused
  });
});
