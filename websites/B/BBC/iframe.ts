const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  if (document.querySelector("#p_v_player_0") !== null) {
    const video: HTMLVideoElement = document.querySelector("#p_v_player_0"),
      audio: HTMLAudioElement = document.querySelector("#p_a_player_0");

    if (
      (video !== undefined && !isNaN(video?.duration)) ||
      (audio !== undefined && !isNaN(audio?.duration))
    ) {
      iframe.send({
        iframe_video: {
          currentTime: video?.currentTime,
          duration: video?.duration,
          paused: video?.paused
        },
        iframe_audio: {
          currentTime: audio?.currentTime,
          duration: audio?.duration,
          paused: audio?.paused,
          title: audio?.title
        }
      });
    }
  }
});
