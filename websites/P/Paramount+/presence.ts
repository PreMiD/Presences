import { ActivityType, Assets } from 'premid'

const presence = new Presence({
  clientId: '821433038335377418',
})

function pathIncludes(path: string, str: string) {
  return path.includes(str)
}

enum Logos {
  Paramount = 'https://i.imgur.com/4Z2Dwvc.jpg',
  CBS = 'https://i.imgur.com/EhhoDIU.png',
  BET = 'https://i.imgur.com/w5Z4KgD.png',
  ComedyCentral = 'https://i.imgur.com/Meq43i5.png',
  MTV = 'https://i.imgur.com/GfVqh8i.png',
  Nickelodeon = 'https://i.imgur.com/2m75sAU.jpg',
  Smithsonian = 'https://i.imgur.com/8xy0AaS.png',
}

presence.on('UpdateData', async () => {
  const strings = await presence.getStrings({
    play: 'general.playing',
    pause: 'general.paused',
    live: 'general.live',
  })
  let video: HTMLVideoElement | null = null
  let presenceData: PresenceData = {
    name: 'Paramount+',
    largeImageKey: Logos.Paramount,
    type: ActivityType.Watching,
  }
  const { pathname } = document.location
  const vidArea = document.querySelector('.video__player-area')

  switch (true) {
    case pathIncludes(pathname, '/home'):
      presenceData.details = 'Browsing'
      presenceData.state = 'Viewing home page'
      break

    case pathIncludes(pathname, '/search'):
      presenceData.details = 'Searching'
      presenceData.smallImageKey = Assets.Search
      presenceData.smallImageText = 'Searching'
      break

    case pathIncludes(pathname, '/shows'): {
      const showData = JSON.parse(
        document.querySelector('[type="application/ld+json"]')?.textContent ?? '{}',
      )

      if (vidArea && pathIncludes(pathname, '/video')) {
        video = document.querySelector('video')

        presenceData = {
          ...presenceData,
          name: showData.partOfSeries.name,
          details: showData.partOfSeries.name,
          state: `S${showData.partOfSeason.seasonNumber}:E${showData.episodeNumber} - ${showData.name}`,
          smallImageKey: video && video.paused ? Assets.Pause : Assets.Play,
          smallImageText: video && video.paused ? strings.pause : strings.play,
          largeImageKey: showData.image || Logos.Paramount,
        }

        if (video) {
          [presenceData.startTimestamp, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video)
        }
        if (video && video.paused) {
          delete presenceData.startTimestamp
          delete presenceData.endTimestamp
        }
      }
      else if (
        !vidArea
        && document.querySelector('[type="application/ld+json"]') !== null
      ) {
        const showThumb = document.querySelector<HTMLImageElement>(
          '#hero-slider > div > li > div > picture > img',
        )?.src ?? Logos.Paramount

        presenceData = {
          ...presenceData,
          name: showData.name,
          largeImageKey: showThumb,
          largeImageText: showData.name,
          details: 'Viewing series details',
          buttons: [
            {
              label: 'View Series',
              url: showData.url,
            },
          ],
          state: showData.name,
        }
      }
      else {
        presenceData.details = 'Browsing'
        presenceData.state = 'Viewing Shows'
      }
      break
    }

    case pathIncludes(pathname, '/movies'):
      if (
        vidArea
        && document.querySelector('video.marqueeVideo')
        && !vidArea.querySelector('video')
      ) {
        const movieData = JSON.parse(
          document.querySelector('[type="application/ld+json"]')?.textContent ?? '{}',
        )
        presenceData = {
          ...presenceData,
          largeImageKey: movieData.image,
          largeImageText: movieData.name,
          details: 'Viewing movie details',
          state: movieData.name,
          name: movieData.name,
        }
      }
      else if (vidArea && vidArea.querySelector('video')) {
        video = vidArea.querySelector('video')!
        const movieData = JSON.parse(
          document.querySelector('[type="application/ld+json"]')?.textContent ?? '{}',
        )
        const timestamps = presence.getTimestampsfromMedia(video)

        presenceData = {
          ...presenceData,
          largeImageKey: movieData.image,
          largeImageText: movieData.name,
          smallImageKey: video.paused ? Assets.Pause : Assets.Play,
          smallImageText: video.paused ? strings.pause : strings.play,
          startTimestamp: timestamps[0],
          endTimestamp: timestamps[1],
          name: movieData.name,
        }

        if (video.paused) {
          delete presenceData.startTimestamp
          delete presenceData.endTimestamp
        }
      }
      else {
        presenceData.details = 'Browsing'
        presenceData.state = 'Viewing Movies'
      }
      break

    case pathIncludes(pathname, '/live'): {
      const liveTitle = document.querySelector(
        '.video__metadata.padded-container > p',
      )?.textContent

      presenceData.details = 'Watching Live TV'
      presenceData.state = liveTitle
      presenceData.smallImageKey = Assets.Live
      presenceData.smallImageText = strings.live
      break
    }

    case pathIncludes(pathname, '/brands'):
      presenceData.details = 'Browsing Brands'
      presenceData.state = 'Viewing Brands'

      if (pathIncludes(pathname, '/cbs/')) {
        presenceData.details = 'Browsing Brand'
        presenceData.state = 'CBS'
        presenceData.largeImageKey = Logos.CBS
      }
      else if (pathIncludes(pathname, '/bet/')) {
        presenceData.details = 'Browsing Brand'
        presenceData.state = 'BET'
        presenceData.largeImageKey = Logos.BET
      }
      else if (pathIncludes(pathname, '/comedy-central/')) {
        presenceData.details = 'Browsing Brand'
        presenceData.state = 'Comedy Central'
        presenceData.largeImageKey = Logos.ComedyCentral
      }
      else if (pathIncludes(pathname, '/mtv/')) {
        presenceData.details = 'Browsing Brand'
        presenceData.state = 'MTV'
        presenceData.largeImageKey = Logos.MTV
      }
      else if (pathIncludes(pathname, '/nickelodeon/')) {
        presenceData.details = 'Browsing Brand'
        presenceData.state = 'Nickelodeon'
        presenceData.largeImageKey = Logos.Nickelodeon
      }
      else if (pathIncludes(pathname, '/smithsonian-channel/')) {
        presenceData.details = 'Browsing Brand'
        presenceData.state = 'Smithsonian Channel'
        presenceData.largeImageKey = Logos.Smithsonian
      }

      break

    case pathIncludes(pathname, '/my-list'):
      presenceData.details = 'Browsing My List'
      break

    case pathIncludes(pathname, '/news'):
      presenceData.details = 'Browsing News'
      break

    case pathIncludes(pathname, '/collections/sports-hub/'):
      presenceData.details = 'Browsing Sports Hub'
      break
  }

  presence.setActivity(presenceData)
})
