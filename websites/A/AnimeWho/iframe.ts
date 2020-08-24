const video_frame = new iFrame();

video_frame.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector("video");

  if (video) {
    const videoMessage: any = {
      paused: video.paused,
      duration: video.duration,
      currentTime: video.currentTime
    };

    video_frame.send(videoMessage);
  }
});
