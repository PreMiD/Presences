var iframe = new iFrame();
iframe.on("UpdateData", async () => {
  if (document.location.hostname.match("player.hanime.tv")) {
    var video: HTMLVideoElement = document.querySelector(
      "#primary_video_html5_api"
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
    } else {
      iframe.send({
        iframe_video: {
          iFrameVideo: null,
          currTime: null,
          dur: null,
          paused: null
        }
      });
    }
  }
});
