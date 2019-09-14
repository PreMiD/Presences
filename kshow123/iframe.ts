var iframe = new iFrame();
iframe.on("UpdateData", async () => {

  if (document.querySelector("#dogevideo_html5_api") !== null) {
    var video: HTMLVideoElement = document.querySelector("#dogevideo_html5_api");

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
    document.querySelector("#player > div > div.container.pointer-enabled > video") !== null) {
    var video: HTMLVideoElement = document.querySelector(
      "#player > div > div.container.pointer-enabled > video"
    );

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
  } else if (document.querySelector("#mediaplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video") !== null) {
    var video: HTMLVideoElement = document.querySelector("#mediaplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");

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
  } else if (document.querySelector("#vid_html5_api") !== null) {
    var video: HTMLVideoElement = document.querySelector("#vid_html5_api");

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
    document.querySelector("#myElement > div.jw-media.jw-reset > video") !== null) {
    var video: HTMLVideoElement = document.querySelector("#myElement > div.jw-media.jw-reset > video");

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
  } else if (document.querySelector("#mgvideo > div.vjs-poster") !== null) {
    var video: HTMLVideoElement = document.querySelector("#mgvideo > div.vjs-poster");

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
    var video: HTMLVideoElement = document.querySelector("#olvideo_html5_api");

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
  } else if (document.querySelector("#videojs_html5_api") !== null) {
    var video: HTMLVideoElement = document.querySelector("#videojs_html5_api");

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
    document.querySelector("#myVideo > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video") !== null) {
    var video: HTMLVideoElement = document.querySelector("#myVideo > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");

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
  } else if (document.querySelector("#mgvideo_html5_api") !== null) {
    var video: HTMLVideoElement = document.querySelector("#mgvideo_html5_api");

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
  } else if (document.querySelector("#player > div.jw-media.jw-reset > video") !== null) {
    var video: HTMLVideoElement = document.querySelector("#player > div.jw-media.jw-reset > video");

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
  } else if (document.querySelector("#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video") !== null) {
    var video: HTMLVideoElement = document.querySelector("#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");

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
