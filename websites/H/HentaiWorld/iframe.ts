const iframe = new iFrame();
iframe.on("UpdateData", () => {
  if (document.querySelector("#video-player") !== null) {
    const hentai: HTMLVideoElement = document.querySelector("#video-player");
    if (hentai !== null && !isNaN(hentai.duration)) {
      iframe.send({
        iframeVideo: {
          iFrameVideo: true,
          currTime: hentai.currentTime,
          duration: hentai.duration,
          paused: hentai.paused
        }
      });
    }
  }
});
