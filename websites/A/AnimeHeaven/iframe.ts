const iframe = new iFrame()

iframe.on('UpdateData', async () => {
  const video = document.querySelector<HTMLVideoElement>('.jw-media video')

  if (video) {
    iframe.send({
      paused: video.paused,
      currentTime: video.currentTime,
      duration: video.duration,
    })
  }
})
