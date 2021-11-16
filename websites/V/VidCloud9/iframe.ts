const iframe = new iFrame();
iframe.on("UpdateData", async () => {
  let video;
  if (
    document.querySelector(
      "#myVideo > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
    ) !== null
  ) {
    video = document.querySelector(
      "#myVideo > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
    ) as HTMLVideoElement;
    if (video && !isNaN(video.duration)) {
      iframe.send({
        iframeVideo: {
          iFrameVideo: true,
          currTime: video.currentTime,
          dur: video.duration,
          paused: video.paused
        }
      });
    }
  } else if (document.querySelector("#myVideo") !== null) {
    video = document.querySelector("#myVideo") as HTMLVideoElement;
    if (video && !isNaN(video.duration)) {
      iframe.send({
        iframeVideo: {
          iFrameVideo: true,
          currTime: video.currentTime,
          dur: video.duration,
          paused: video.paused
        }
      });
    }
  }
});
