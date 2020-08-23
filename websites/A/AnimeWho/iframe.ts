var i_frame = new iFrame();

i_frame.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector("video");

  if (video) {
    const videoMessage: any = {
      paused: video.paused,
      duration: video.duration,
      currentTime: video.currentTime
    };

    i_frame.send(videoMessage);
  }
});
