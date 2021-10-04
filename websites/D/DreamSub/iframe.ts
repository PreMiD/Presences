const iframe = new iFrame();
let videos: HTMLCollectionOf<HTMLVideoElement>;

iframe.on("UpdateData", async () => {
  videos = document.getElementsByTagName("video");

  if (videos.length > 0) {
    const [video] = videos;

    if (!isNaN(video.duration)) {
      iframe.send({
        iframeVideo: {
          iFrameVideo: true,
          currTime: video.currentTime,
          paused: video.paused,
          duration: video.duration
        }
      });
    }
  }
});
