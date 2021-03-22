const iframe = new iFrame();
iframe.on("UpdateData", async () => {
  let video;
  if (
    document.querySelector("#player_container > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video") !== null
  ) {
    video = document.querySelector("#player_container > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video") as HTMLVideoElement;
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
  else if (
    document.querySelector("#player > div.jw-media.jw-reset > video") !== null
  ) {
    video = document.querySelector("#player > div.jw-media.jw-reset > video") as HTMLVideoElement;
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

// "#player > div.jw-media.jw-reset > video"