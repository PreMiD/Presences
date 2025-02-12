const sinefyIframe = new iFrame()

sinefyIframe.on('UpdateData', () => {
  const video = document.querySelector('video')

  if (video && !Number.isNaN(video.duration)) {
    sinefyIframe.send({
      duration: video.duration,
      currentTime: video.currentTime,
      paused: video.paused,
    })
  }
})
