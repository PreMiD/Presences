const iframe = new iFrame()

iframe.on('UpdateData', () => {
  const video = document.querySelector<HTMLVideoElement>('video.jw-video')

  if (video && !Number.isNaN(video.duration) && !Number.isNaN(video.currentTime)) {
    return iframe.send({
      duration: video.duration,
      currentTime: video.currentTime,
      paused: video.paused,
    })
  }
})
