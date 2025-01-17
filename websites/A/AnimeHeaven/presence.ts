const presence = new Presence({
  clientId: '816042675626442783',
})
const strings = presence.getStrings({
  play: 'general.playing',
  pause: 'general.paused',
})
const browsingTimestamp = Math.floor(Date.now() / 1000)

interface VideoData {
  paused: boolean
  currentTime: number
  duration: number
}
let iFrameVideo: VideoData
presence.on('iFrameData', (data: unknown) => {
  iFrameVideo = data as typeof iFrameVideo
})

const paths = {
  '/watch': async function (presenceData: PresenceData, buttons: boolean) {
    presenceData.details = document.querySelector<HTMLAnchorElement>('.now2 .c a')?.textContent
      || 'Unknown title'
    presenceData.state = document
      .querySelector<HTMLElement>('.now2 .c')
      ?.lastChild
      ?.textContent
      ?.match(/\s*-\s*(.+)/)?.[1] || 'Unknown episode'

    if (buttons) {
      presenceData.buttons = [
        {
          label: 'Current Episode',
          url: window.location.href,
        },
      ]

      const link = document.querySelector<HTMLAnchorElement>('.now2 > div > a')?.href
      if (link) {
        presenceData.buttons.push({
          label: 'Episode List',
          url: link,
        })
      }
    }

    if (iFrameVideo) {
      const video = iFrameVideo

      presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play

      if (!video.paused) {
        [presenceData.startTimestamp, presenceData.endTimestamp] = presence.getTimestamps(video.currentTime, video.duration)
      }

      return !video.paused
    }
  },
  '/search': function (presenceData: PresenceData) {
    presenceData.state = 'Searching...'
    presenceData.smallImageKey = Assets.Search

    let searchQuery = new URLSearchParams(window.location.search).get('q')

    if (searchQuery) {
      if (searchQuery.length > 18)
        searchQuery = `${searchQuery.substring(0, 18)}…`

      presenceData.details = `"${searchQuery}"`
    }
  },
  '/detail': function (presenceData: PresenceData) {
    const title = document.querySelector<HTMLHeadingElement>(
      '.infobox .infoboxc .infodesbox .infodes h1',
    )?.textContent

    if (title) {
      presenceData.state = 'Viewing info...'
      presenceData.details = title
    }
    else {
      presenceData.state = 'Viewing info for a title...'
    }
  },
  '/animeheaven.eu': function (presenceData: PresenceData) {
    presenceData.state = 'Viewing front page...'
  },
  '/anime-list': function (presenceData: PresenceData) {
    presenceData.details = 'Latest Anime'
  },
  '/dubbed-anime': function (presenceData: PresenceData) {
    presenceData.details = 'Latest Dubbed Anime'
  },
  '/anime-series': function (presenceData: PresenceData) {
    presenceData.details = 'Anime Series'
  },
  '/anime-movies': function (presenceData: PresenceData) {
    presenceData.details = 'Anime Movies'
  },
  '/ongoing': function (presenceData: PresenceData) {
    presenceData.details = 'Ongoing Anime'
  },
  '/popular': function (presenceData: PresenceData) {
    presenceData.details = 'Popular Anime'
  },
  '/schedule': function (presenceData: PresenceData) {
    presenceData.details = 'Anime Schedule'
  },
  '/': function (presenceData: PresenceData) {
    presenceData.state = 'Viewing landing page...'
  },
}

presence.on('UpdateData', async () => {
  const buttons = await presence.getSetting<boolean>('buttons')
  const presenceData: PresenceData = {
    largeImageKey: 'https://cdn.rcd.gg/PreMiD/websites/A/AnimeHeaven/assets/logo.png',
    state: 'Browsing...',
    startTimestamp: browsingTimestamp,
  }

  let playback = true
  for (const [path, setPresence] of Object.entries(paths)) {
    if (window.location.pathname.toLowerCase().startsWith(path)) {
      const isPlaying = await setPresence(presenceData, buttons)
      if (isPlaying === false)
        playback = isPlaying
      break
    }
  }

  presence.setActivity(presenceData, playback)
})
