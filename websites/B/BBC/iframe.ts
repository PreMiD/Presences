const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  if (document.querySelector("#p_v_player_0") !== null) {
    const video: HTMLVideoElement = document.querySelector("#p_v_player_0"),
      audio: HTMLAudioElement = document.querySelector("#p_a_player_0");

    if (
      (video && !isNaN(video.duration)) ||
      (audio && !isNaN(audio.duration))
    ) {
      iframe.send({
        iframeVideo: {
          currentTime: video.currentTime,
          duration: video.duration,
          paused: video.paused
        },
        iframeAudio: {
          currentTime: audio.currentTime,
          duration: audio.duration,
          paused: audio.paused,
          title: audio.title
        }
      });
    }
  }
});
