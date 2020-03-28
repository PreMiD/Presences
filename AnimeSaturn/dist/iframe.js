var iframe = new iFrame();
iframe.on("UpdateData", () => {
  if (document.querySelector("video") !== null) {
    var anime = document.querySelector("video");
    if (anime !== isNaN) {
      var currentTime = anime.currentTime;
      var duration = anime.duration;
      var pause = anime.paused;
      var source = anime.src;
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: currentTime,
          duration: duration,
          source: source,
          paused: pause,
        },
      });
    }
  }
});
