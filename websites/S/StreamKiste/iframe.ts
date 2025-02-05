const iframe = new iFrame()

iframe.on('UpdateData', async () => {
  const video = document.querySelector<HTMLVideoElement>('.jw-video.jw-reset')
    || document.querySelector<HTMLVideoElement>('.video')
    || document.querySelector<HTMLVideoElement>('.plyr__video-wrapper > video')
    || document.querySelector<HTMLVideoElement>('video')
  if (video && !Number.isNaN(video.duration)) {
    iframe.send({
      duration: video.duration,
      currentTime: video.currentTime,
      paused: video.paused,
    })
  }
  else {
    iframe.send(null)
  }
})
