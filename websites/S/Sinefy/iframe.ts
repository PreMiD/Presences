const sinefyIframe = new iFrame();

sinefyIframe.on("UpdateData", () => {
  const video: HTMLVideoElement = document.querySelector("video");

  if (video && Number.isNaN(video.duration)) sinefyIframe.send({ video });
});
