const ytplrIframe = new iFrame()
ytplrIframe.on('UpdateData', async () => {
  const video = document.querySelector<HTMLVideoElement>('.video-stream')

  if (video){
    const result = {
      currentTime:video.currentTime,
      duration:video.duration,
      paused: video.paused
    }

    ytplrIframe.send(result)
  }
})
