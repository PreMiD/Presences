const iframe = new iFrame();
iframe.on("UpdateData", async () => {
  const titleElement: HTMLElement = document.querySelector(
      "div.ytp-title-text > a"
    ),
    videoElement: HTMLVideoElement = document.querySelector("#player video");
  if (!titleElement || !videoElement) return;
  const duration = videoElement.duration ? videoElement.duration : null,
    { currentTime } = videoElement,
    { paused } = videoElement;
  iframe.send({
    title: titleElement.textContent,
    currentTime,
    duration,
    paused
  });
});
