const iframe = new iFrame()

if (document.location.hostname === 'www.youtube.com') {
  iframe.on('UpdateData', async () => {
    const { currentTime, duration, paused } = document.querySelector<HTMLVideoElement>(
      'video.video-stream.html5-main-video',
    )!

    iframe.send({
      currentTime,
      duration,
      paused,
    })
  })
}
