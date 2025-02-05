const iframe = new iFrame()

iframe.on('UpdateData', async () => {
  if (document.querySelector('video')) {
    const video = document.querySelector<HTMLVideoElement>('video')

    if (video && !Number.isNaN(video.duration)) {
      iframe.send({
        iframeVideo: {
          currentTime: video.currentTime,
          duration: video.duration,
          paused: video.paused,
        },
      })
    }
  }
})
