const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  const video: HTMLVideoElement =
    document.querySelector("#video-player") !== null
      ? document.querySelector("#video-player")
      : document.querySelector(".jw-media > video") !== null
      ? document.querySelector(".jw-media > video")
      : document.querySelector("#mainvideo") !== null
      ? document.querySelector("#mainvideo")
      : document.querySelector("#video_player_html5_api") !== null
      ? document.querySelector("#video_player_html5_api")
      : document.querySelector("#videojs_html5_api") !== null
      ? document.querySelector("#videojs_html5_api")
      : document.querySelector("#video_1_html5_api") !== null
      ? document.querySelector("#video_1_html5_api")
      : document.querySelector("#playerBurdo_html5_api") !== null
      ? document.querySelector("#playerBurdo_html5_api")
      : document.querySelector("#olvideo_html5_api") !== null
      ? document.querySelector("#olvideo_html5_api")
      : document.querySelector(".html5-video-container > video") !== null
      ? document.querySelector(".html5-video-container > video")
      : undefined;

  if (video !== undefined && !isNaN(video.duration)) {
    iframe.send({
      iframeVideo: {
        iFrameVideo: true,
        currentTime: video.currentTime,
        duration: video.duration,
        paused: video.paused
      }
    });
  }
});
