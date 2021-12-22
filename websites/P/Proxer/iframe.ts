const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  // Exclude proxer
  if (document.getElementById("proxerToken")) return;

  const videos = document.getElementsByTagName("video"),
    [video] = videos;
  if (videos.length === 0) return;

  if (video) {
    // Exclude proxer ads
    if (video.className.includes("ads")) return;
    iframe.send({
      time: video.currentTime,
      duration: video.duration,
      paused: video.paused
    });
  } else iframe.send(null);
});
