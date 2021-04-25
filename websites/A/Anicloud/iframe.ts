const iframe = new iFrame();
iframe.on("UpdateData", async () => {
  const { hostname } = window.location;
  if (
    hostname === "voe.sx" ||
    hostname === "streamtape.com" ||
    hostname == "playtube.ws"
  ) {
    const video = document.querySelector(`video`);
    if (video != null) {
      const played = video.currentTime != 0;
      iframe.send({
        current: video.currentTime,
        duration: video.duration,
        paused: video.paused,
        played
      });
    }
  }
});
