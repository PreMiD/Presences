const iframe = new iFrame();
let video: HTMLVideoElement;

iframe.on("UpdateData", async () => {
  if (document.querySelector("#video-player") !== null) {
    // AW Server
    video = document.querySelector("#video-player");
    if (video && !isNaN(video.duration)) {
      iframe.send({
        iframeVideo: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }

  if (document.querySelector(".jw-media > video") !== null) {
    // Alternative Player or Beta Server & AnaVids
    video = document.querySelector(".jw-media > video");
    if (video && !isNaN(video.duration)) {
      iframe.send({
        iframeVideo: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }

  if (document.querySelector("#mainvideo") !== null) {
    // Streamtape
    video = document.querySelector("#mainvideo");
    if (video && !isNaN(video.duration)) {
      iframe.send({
        iframeVideo: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }

  if (document.querySelector("#video_player_html5_api") !== null) {
    // DoodStream
    video = document.querySelector("#video_player_html5_api");
    if (video && !isNaN(video.duration)) {
      iframe.send({
        iframeVideo: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }

  if (document.querySelector("#videojs_html5_api") !== null) {
    // MixDrop
    video = document.querySelector("#videojs_html5_api");
    if (video && !isNaN(video.duration)) {
      iframe.send({
        iframeVideo: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }

  if (document.querySelector("#video_1_html5_api") !== null) {
    // Alpha Server
    video = document.querySelector("#video_1_html5_api");
    if (video && !isNaN(video.duration)) {
      iframe.send({
        iframeVideo: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }

  if (document.querySelector("#playerBurdo_html5_api") !== null) {
    // AW Server Alternative
    video = document.querySelector("#playerBurdo_html5_api");
    if (video && !isNaN(video.duration)) {
      iframe.send({
        iframeVideo: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }

  if (document.querySelector("#olvideo_html5_api") !== null) {
    // OkStream
    video = document.querySelector("#olvideo_html5_api");
    if (video && !isNaN(video.duration)) {
      iframe.send({
        iframeVideo: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }

  /* if (document.querySelector(".jw-media > video") !== null) { // AnaVids
    video = document.querySelector(".jw-media > video");
    if (video != undefined && !isNaN(video.duration)) {
      iframe.send({
        iframeVideo: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  } */

  if (document.querySelector(".html5-video-container > video") !== null) {
    // YouTube
    video = document.querySelector(".html5-video-container > video");
    if (video && !isNaN(video.duration)) {
      iframe.send({
        iframeVideo: {
          iFrameVideo: true,
          currTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        }
      });
    }
  }
});
