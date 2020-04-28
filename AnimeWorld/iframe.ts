const iframe = new iFrame();
var video: HTMLVideoElement;
iframe.on("UpdateData", async () => {
  if (document.querySelector("#video-player") !== null) {
    video = document.querySelector("#video-player");
    if (video != undefined && !isNaN(video.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }
  if (
    document.querySelector(
      "#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
    ) !== null
  ) {
    video = document.querySelector(
      "#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
    );
    if (video != undefined && !isNaN(video.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }
  if (document.querySelector("#video_1_html5_api") !== null) {
    video = document.querySelector("#video_1_html5_api");
    if (video != undefined && !isNaN(video.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }
  if (
    document.querySelector("#player > div.jw-media.jw-reset > video") !== null
  ) {
    video = document.querySelector("#player > div.jw-media.jw-reset > video");
    if (video != undefined && !isNaN(video.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }
  if (document.querySelector("#hola_html5_api") !== null) {
    video = document.querySelector("#hola_html5_api");
    if (video != undefined && !isNaN(video.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }
  if (document.querySelector("div.html5-video-container > video") !== null) {
    video = document.querySelector("div.html5-video-container > video");
    if (video != undefined && !isNaN(video.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }
  if (document.querySelector("#videojs_html5_api") !== null) {
    video = document.querySelector("#videojs_html5_api");
    if (video != undefined && !isNaN(video.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }
  if (document.querySelector("#olvideo_html5_api") !== null) {
    video = document.querySelector("#olvideo_html5_api");
    if (video != undefined && !isNaN(video.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }
  if (
    document.querySelector("#vplayer").getElementsByTagName("video")[0] !== null
  ) {
    video = document.querySelector("#vplayer").getElementsByTagName("video")[0];
    if (video != undefined && !isNaN(video.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }
});
