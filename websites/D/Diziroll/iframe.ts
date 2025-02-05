const iframe = new iFrame()

iframe.on('UpdateData', () => {
  const vidyo = document.querySelector<HTMLVideoElement>('video')
  if (vidyo && !Number.isNaN(vidyo.duration) && !Number.isNaN(vidyo.currentTime)) {
    return iframe.send({
      duration: vidyo.duration,
      currentTime: vidyo.currentTime,
      paused: vidyo.paused,
    })
  }
})
