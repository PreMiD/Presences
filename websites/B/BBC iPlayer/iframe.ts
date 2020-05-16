const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  if (document.querySelector("#p_v_player_0") !== null) {
    const video: HTMLVideoElement = document.querySelector("#p_v_player_0");
    if (video != undefined && !isNaN(video.duration)) {
      iframe.send({
        iframe_video: {
          currTime: video.currentTime,
          dur: video.duration,
          paused: video.paused
        }
      });
    }
  }
});
