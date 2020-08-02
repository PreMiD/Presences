var iframe = new iFrame();

iframe.on("UpdateData", async () => {
  if (
    document.querySelector("#play0") != null ||
    document.querySelector("#play1_html5_api") != null ||
    document.querySelector("#video") != null ||
    document.querySelector("#video-js-video_html5_api") != null ||
    document.querySelector("video") != null ||
    document.querySelector(
      "#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
    ) != null
  ) {
    const video: HTMLVideoElement =
      document.querySelector("#play0") ||
      document.querySelector("#play1_html5_api") ||
      document.querySelector("#video") ||
      document.querySelector("#video-js-video_html5_api") ||
      document.querySelector("video") ||
      document.querySelector(
        "#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
      );
    if (video != null) {
      const played = video.duration != 0;
      iframe.send({
        currentTime: video.currentTime,
        duration: video.duration,
        played,
        paused: video.paused
      });
    }
  }
});
