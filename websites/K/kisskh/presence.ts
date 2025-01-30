import { ActivityType, Assets } from 'premid'

const presence = new Presence({
  clientId: '1330091956101189632',
})
const startTimestamp = Math.floor(Date.now() / 1000)

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    largeImageKey: 'https://cdn.rcd.gg/PreMiD/websites/K/kisskh/assets/logo.png',
    details: 'Browsing',
    type: ActivityType.Watching,
    startTimestamp,
  }
  const { pathname } = document.location
  const [showBrowsing, useActivityName, showCover] = await Promise.all([
    presence.getSetting<boolean>('showBrowsing'),
    presence.getSetting<boolean>('useActivityName'),
    presence.getSetting<boolean>('showCover'),
  ])

  switch (pathname.split('/')[1]) {
    case 'Drama': {
      const title = document.querySelector('mat-card-title')?.textContent
      const episodeNumber = document
        .querySelector('button.mat-accent span')
        ?.firstChild
        ?.textContent
        ?.trim()
      const category = document.querySelector(
        'mat-card-subtitle mat-list-item:nth-child(5)',
      )?.textContent

      if (episodeNumber && title) {
        const video = document.querySelector('video')

        if (showCover)
          presenceData.largeImageKey = video?.poster
        if (useActivityName) {
          presenceData.name = title
          presenceData.details = category !== 'Movie' ? `Episode ${episodeNumber}` : category
          presenceData.state = `${document
            .querySelector('mat-card-subtitle')
            ?.textContent
            ?.split(', ')
            .pop()}${category !== 'Movie' ? ` • ${category}` : ''}`
        }
        else {
          presenceData.details = title
          presenceData.state = category !== 'Movie' ? `Episode ${episodeNumber}` : category
        }

        if (video && !video.paused) {
          [presenceData.startTimestamp, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video)
        }
        else {
          presenceData.smallImageKey = Assets.Pause
        }
      }
      break
    }
  }

  if (!showBrowsing && presenceData.details === 'Browsing')
    return presence.clearActivity()

  presence.setActivity(presenceData)
})
