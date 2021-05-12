const iframe = new iFrame();
function sendIFrame(video: HTMLVideoElement) {
  iframe.send({
    iframe_video: {
      iFrameVideo: true,
      currTime: video.currentTime,
      duration: video.duration,
      paused: video.paused
    }
  });
}
iframe.on("UpdateData", async () => {
  let video: HTMLVideoElement;
  if (document.querySelector("#dogevideo_html5_api") !== null) {
    video = document.querySelector("#dogevideo_html5_api");
    if (video != undefined && !isNaN(video.duration)) {
      sendIFrame(video);
    }
  } else if (
    document.querySelector(
      "#player > div > div.container.pointer-enabled > video"
    ) !== null
  ) {
    video = document.querySelector(
      "#player > div > div.container.pointer-enabled > video"
    );

    if (video != undefined && !isNaN(video.duration)) {
      sendIFrame(video);
    }
  } else if (
    document.querySelector(
      "#mediaplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
    ) !== null
  ) {
    video = document.querySelector(
      "#mediaplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
    );

    if (video != undefined && !isNaN(video.duration)) {
      sendIFrame(video);
    }
  } else if (document.querySelector("#vid_html5_api") !== null) {
    video = document.querySelector("#vid_html5_api");

    if (video != undefined && !isNaN(video.duration)) {
      sendIFrame(video);
    }
  } else if (
    document.querySelector("#myElement > div.jw-media.jw-reset > video") !==
    null
  ) {
    video = document.querySelector(
      "#myElement > div.jw-media.jw-reset > video"
    );

    if (video != undefined && !isNaN(video.duration)) {
      sendIFrame(video);
    }
  } else if (document.querySelector("#mgvideo > div.vjs-poster") !== null) {
    video = document.querySelector("#mgvideo > div.vjs-poster");

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
  } else if (document.querySelector("#olvideo_html5_api") !== null) {
    video = document.querySelector("#olvideo_html5_api");

    if (video != undefined && !isNaN(video.duration)) {
      sendIFrame(video);
    }
  } else if (document.querySelector("#videojs_html5_api") !== null) {
    video = document.querySelector("#videojs_html5_api");

    if (video != undefined && !isNaN(video.duration)) {
      sendIFrame(video);
    }
  } else if (
    document.querySelector(
      "#myVideo > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
    ) !== null
  ) {
    video = document.querySelector(
      "#myVideo > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
    );

    if (video != undefined && !isNaN(video.duration)) {
      sendIFrame(video);
    }
  } else if (document.querySelector("#mgvideo_html5_api") !== null) {
    video = document.querySelector("#mgvideo_html5_api");

    if (video != undefined && !isNaN(video.duration)) {
      sendIFrame(video);
    }
  } else if (
    document.querySelector("#player > div.jw-media.jw-reset > video") !== null
  ) {
    video = document.querySelector("#player > div.jw-media.jw-reset > video");

    if (video != undefined && !isNaN(video.duration)) {
      sendIFrame(video);
    }
  } else if (
    document.querySelector(
      "#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
    ) !== null
  ) {
    video = document.querySelector(
      "#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
    );

    if (video != undefined && !isNaN(video.duration)) {
      sendIFrame(video);
    }
  } else if (
    document.querySelector(
      "#player > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
    ) !== null
  ) {
    video = document.querySelector(
      "#player > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
    );

    if (video != undefined && !isNaN(video.duration)) {
      sendIFrame(video);
    }
  } else if (document.querySelector("video") !== null) {
    video = document.querySelector("video");

    if (video != undefined && !isNaN(video.duration)) {
      sendIFrame(video);
    }
  }
});
