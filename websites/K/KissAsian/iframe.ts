const iframe = new iFrame()

iframe.on('UpdateData', async () => {
  const video = document.querySelector<HTMLVideoElement>(
    'video,[class=\'jw-video jw-reset\']',
  )

  if (video && !Number.isNaN(video.duration)) {
    iframe.send({
      iframeVideo: {
        currentTime: video.currentTime,
        duration: video.duration,
        paused: video.paused,
      },
    })
  }
})
