var iframe = new iFrame();

presence.on("UpdateData", async () => {
  if (document.querySelector("#p_v_player_0") !== null) {
    var video = document.querySelector("#p_v_player_0");
    if (video != undefined && !isNaN(video.duration)) {
      iframe.send({
        iframe_video: {
          iFrameVideo: true,
          currTime: video.currentTime,
          dur: video.duration,
          paused: video.paused,
        },
      });
    }
  }
});
