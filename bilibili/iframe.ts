var iframe = new iFrame();
iframe.on("UpdateData", async () => {
  if (document.querySelector(".bilibili-player-video video") !== null) {
    var video: HTMLVideoElement = document.querySelector(
      ".bilibili-player-video video"
    );

    if (video != undefined && !isNaN(video.duration)) {
      var test = video.paused;
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          test: test,
          currTime: video.currentTime,
          dur: video.duration,
          pause: test
        }
      });
    }
  }
});
