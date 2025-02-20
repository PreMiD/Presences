const iframe = new iFrame()

iframe.on('UpdateData', async () => {
  const title = document.querySelector('.smaller-title') === null ? document.querySelector('.small-title')?.getAttribute('title') : document.querySelector('.smaller-title')?.getAttribute('title')
  const roomOwner = document.querySelector('.room-owner-username')?.getAttribute('title')
  if (title === undefined || roomOwner === undefined) {
    return
  }
  iframe.send({
    details: title,
    state: roomOwner,
  })
})
