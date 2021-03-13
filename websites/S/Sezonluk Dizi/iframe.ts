const sezonlukDiziIframe = new iFrame();

sezonlukDiziIframe.on("UpdateData", () => {
  const video: HTMLVideoElement = document.querySelector("video");

  if (video && !isNaN(video.duration))
    sezonlukDiziIframe.send({
      duration: video.duration,
      currentTime: video.currentTime,
      paused: video.paused
    });
});
