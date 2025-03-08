import { Assets } from 'premid'

const presence = new Presence({
  clientId: '808749649325719562',
})
const browsingTimestamp = Math.floor(Date.now() / 1000)

enum ActivityAssets {
  Logo = 'https://manga-scantrad.io/wp-content/uploads/2021/10/cropped-logo-1.png',
}

presence.on('UpdateData', async () => {
  const presenceData = {
    largeImageKey: ActivityAssets.Logo,
    startTimestamp: browsingTimestamp,
  }
  const { pathname, href } = document.location
  const pathArr = pathname.split('/')
  const [showCover, showButtons] = await Promise.all([
    presence.getSetting<boolean>('cover'),
    presence.getSetting<boolean>('buttons'),
  ])

  switch (pathArr[1]) {
    case 'manga': {
      const titleElement = document.querySelector('.post-title h1')
      const title = titleElement ? titleElement.textContent.trim() : 'Unknown Manga'
      presenceData.details = `Reading: ${title}`
      presenceData.state = 'On Manga Scantrad'
      presenceData.buttons = [{ label: 'View Manga', url: href }]
      break
    }
    case 'chapitre': {
      const titleElement = document.querySelector('.post-title h1')
      const title = titleElement ? titleElement.textContent.trim() : 'Unknown Chapter'
      presenceData.details = `Reading Chapter: ${title}`
      presenceData.state = 'On Manga Scantrad'
      presenceData.buttons = [{ label: 'Read Chapter', url: href }]
      break
    }
    default:
      presenceData.details = 'Browsing Manga Scantrad'
  }

  if (!showCover) presenceData.largeImageKey = ActivityAssets.Logo
  if (!showButtons) delete presenceData.buttons

  if (presenceData.details) presence.setActivity(presenceData)
  else presence.setActivity()
})
