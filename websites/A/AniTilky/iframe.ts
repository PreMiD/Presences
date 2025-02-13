/// <reference types="premid" />

const iframeProvider = new iFrame()

iframeProvider.on('UpdateData', async () => {
  const video: HTMLVideoElement = document.querySelector('video')

  if (video) {
    iframeProvider.send({
      current: video.currentTime,
      duration: video.duration,
      paused: video.paused,
    })
  }
})
