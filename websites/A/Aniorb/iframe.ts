const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  const video: HTMLVideoElement =
    document.querySelector("#__next > div > div.flex.justify-between > div.w-full.justify-center.items-center.min-h-screen.lg\\:h-full.lg\\:w-10\\/12 > div > div.flex.w-full.justify-center.items-center.flex-col-reverse.lg\\:flex-row > div.video-react-controls-enabled.video-react-has-started.video-react-playing.video-react-fluid.video-react-user-inactive.video-react-workinghover.video-react > video") ||
    document.querySelector("video-react > video");

  if (video != null && !isNaN(video.duration)) {
    iframe.send({
      video: true,
      duration: video.duration,
      currentTime: video.currentTime,
      paused: video.paused
    });
  } else {
    iframe.send({ video: false });
  }
});
