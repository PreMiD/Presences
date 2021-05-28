const iframe = new iFrame();
iframe.on("UpdateData", async () => {
  const video: HTMLVideoElement =
    document.querySelector("#dogevideo_html5_api") !== null
      ? document.querySelector("#dogevideo_html5_api")
      : document.querySelector("#video-player") !== null
      ? document.querySelector("#video-player")
      : document.querySelector(
          "#player_container > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
        ) !== null
      ? document.querySelector(
          "#player_container > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
        )
      : document.querySelector(
          "#vplayer > div > div.container.pointer-enabled > video"
        ) !== null
      ? document.querySelector(
          "#vplayer > div > div.container.pointer-enabled > video"
        )
      : document.querySelector(
          "#player > div > div.container.pointer-enabled > video"
        )
      ? document.querySelector(
          "#player > div > div.container.pointer-enabled > video"
        )
      : document.querySelector(
          "#mediaplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
        ) !== null
      ? document.querySelector(
          "#mediaplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
        )
      : document.querySelector("#vid_html5_api") !== null
      ? document.querySelector("#vid_html5_api")
      : document.querySelector("#myElement > div.jw-media.jw-reset > video") !==
        null
      ? document.querySelector("#myElement > div.jw-media.jw-reset > video")
      : document.querySelector("#mgvideo > div.vjs-poster") !== null
      ? document.querySelector("#mgvideo > div.vjs-poster")
      : document.querySelector("#olvideo_html5_api") !== null
      ? document.querySelector("#olvideo_html5_api")
      : document.querySelector("#vid_html5_api") !== null
      ? document.querySelector("#vid_html5_api")
      : document.querySelector("#videojs_html5_api") !== null
      ? document.querySelector("#videojs_html5_api")
      : document.querySelector(
          "#myVideo > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
        ) !== null
      ? document.querySelector(
          "#myVideo > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
        )
      : document.querySelector("#mgvideo_html5_api") !== null
      ? document.querySelector("#mgvideo_html5_api")
      : document.querySelector("#player > div.jw-media.jw-reset > video") !==
        null
      ? document.querySelector("#player > div.jw-media.jw-reset > video")
      : document.querySelector(
          "#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
        ) !== null
      ? document.querySelector(
          "#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
        )
      : document.querySelector("video") !== null
      ? document.querySelector("video")
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
