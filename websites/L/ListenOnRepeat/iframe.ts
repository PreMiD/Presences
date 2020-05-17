var iframe = new iFrame();
iframe.on("UpdateData", async () => {
  var video: HTMLVideoElement;
  if (document.querySelector(".video") !== null) {
    video = document.querySelector(".video");
    if (video != undefined && !isNaN(video.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: video.currentTime,
          dur: video.duration,
          paused: video.paused
        }
      });
    }
  } else if (
    document.querySelector("body > div > div > div > video") !== null
  ) {
    video = document.querySelector("body > div > div > div > video");
    if (video != undefined && !isNaN(video.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: video.currentTime,
          dur: video.duration,
          paused: video.paused
        }
      });
    }
  }
});
