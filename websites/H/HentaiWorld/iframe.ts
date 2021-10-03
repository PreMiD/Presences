const iframe = new iFrame();
iframe.on("UpdateData", () => {
  if (document.querySelector("#video-player") !== null) {
    const hentai: HTMLVideoElement = document.querySelector("#video-player");
    if (hentai !== undefined && !isNaN(hentai.duration)) {
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
