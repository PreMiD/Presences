const iframe = new iFrame();
iframe.on("UpdateData", async () => {
  let video: HTMLVideoElement;
  if (document.querySelector("#video_html5_wrapper_html5_api") !== null) {
    video = document.querySelector("#video_html5_wrapper_html5_api");

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
    document.querySelector(
      "#video_html5_wrapper_html5_api"
    ) !== null
  ) {
    video = document.querySelector(
      "#video_html5_wrapper_html5_api"
    );

    if (video != undefined && !isNaN(video.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: video.currentTime,
          dur: video.duration,
          paused: video.paused
        }
      });}}});
