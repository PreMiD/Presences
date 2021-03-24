const iframe = new iFrame();
let videos: HTMLCollectionOf<HTMLVideoElement>;

iframe.on("UpdateData", async () => {
  videos = document.getElementsByTagName("video");

  if (videos.length > 0) {
    const video: HTMLVideoElement = videos[0];

    if (!isNaN(video.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: video.currentTime,
          paused: video.paused,
          duration: video.duration
        }
      });
    }
  }
});
