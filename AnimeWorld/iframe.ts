let iframe = new iFrame();
let anime;
iframe.on("UpdateData", async () => {
  if (document.querySelector("#video-player") !== null) {
    anime = <HTMLVideoElement>document.querySelector("#video-player");
    if (anime != undefined && !isNaN(anime.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: anime.currentTime,
          duration: anime.duration,
          paused: anime.paused
        }
      });
    }
  }
  if (
    document.querySelector(
      "#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
    ) !== null
  ) {
    anime = <HTMLVideoElement>(
      document.querySelector(
        "#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
      )
    );
    if (anime != undefined && !isNaN(anime.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: anime.currentTime,
          duration: anime.duration,
          paused: anime.paused
        }
      });
    }
  }
  if (document.querySelector("#video_1_html5_api") !== null) {
    anime = <HTMLVideoElement>document.querySelector("#video_1_html5_api");
    if (anime != undefined && !isNaN(anime.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: anime.currentTime,
          duration: anime.duration,
          paused: anime.paused
        }
      });
    }
  }
  if (
    document.querySelector("#player > div.jw-media.jw-reset > video") !== null
  ) {
    anime = <HTMLVideoElement>(
      document.querySelector("#player > div.jw-media.jw-reset > video")
    );
    if (anime != undefined && !isNaN(anime.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: anime.currentTime,
          duration: anime.duration,
          paused: anime.paused
        }
      });
    }
  }
  if (document.querySelector("#hola_html5_api") !== null) {
    anime = <HTMLVideoElement>document.querySelector("#hola_html5_api");
    if (anime != undefined && !isNaN(anime.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: anime.currentTime,
          duration: anime.duration,
          paused: anime.paused
        }
      });
    }
  }
  if (document.querySelector("div.html5-video-container > video") !== null) {
    anime = <HTMLVideoElement>(
      document.querySelector("div.html5-video-container > video")
    );
    if (anime != undefined && !isNaN(anime.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: anime.currentTime,
          duration: anime.duration,
          paused: anime.paused
        }
      });
    }
  }
  if (document.querySelector("#videojs_html5_api") !== null) {
    anime = <HTMLVideoElement>document.querySelector("#videojs_html5_api");
    if (anime != undefined && !isNaN(anime.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: anime.currentTime,
          duration: anime.duration,
          paused: anime.paused
        }
      });
    }
  }
  if (document.querySelector("#olvideo_html5_api") !== null) {
    anime = <HTMLVideoElement>document.querySelector("#olvideo_html5_api");
    if (anime != undefined && !isNaN(anime.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: anime.currentTime,
          duration: anime.duration,
          paused: anime.paused
        }
      });
    }
  }
  if (
    document.querySelector("#vplayer").getElementsByTagName("video")[0] !== null
  ) {
    anime = <HTMLVideoElement>(
      document.querySelector("#vplayer").getElementsByTagName("video")[0]
    );
    if (anime != undefined && !isNaN(anime.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: anime.currentTime,
          duration: anime.duration,
          paused: anime.paused
        }
      });
    }
  }
});
