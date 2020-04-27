var iframe = new iFrame();

setInterval(function () {
  var video: HTMLVideoElement;
  if (
    document.location.hostname == "www.rapidvid.to" ||
    document.location.hostname == "www.mp4upload.com"
  ) {
    video = document.querySelector("video.vjs-tech");

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
  } else if (document.location.hostname == "www.novelplanet.me") {
    video = document.querySelector("video.jw-video.jw-reset");

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
  } else {
    video = document.querySelector("video.vjs-tech");

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
}, 100);
