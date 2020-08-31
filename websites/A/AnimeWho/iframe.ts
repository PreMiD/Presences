const video_frame = new iFrame();

video_frame.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector("video");

  if (video) {
    const videoMessage: Record<string, unknown> = {
      paused: video.paused,
      duration: video.duration,
      currentTime: video.currentTime
    };

    video_frame.send(videoMessage);
  }
});
