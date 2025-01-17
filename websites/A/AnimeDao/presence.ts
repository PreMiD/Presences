const presence = new Presence({
  clientId: '633637979952250881',
})
const browsingTimestamp = Math.floor(Date.now() / 1000)

const enum Assets {
  Logo = 'https://cdn.rcd.gg/PreMiD/websites/A/AnimeDao/assets/logo.png',
}
async function getStrings() {
  return presence.getStrings(
    {
      browse: 'general.browsing',
      buttonWatchVideo: 'general.buttonWatchVideo',
      paused: 'general.paused',
      play: 'general.playing',
      search: 'general.searchFor',
      viewCategory: 'general.viewCategory',
      viewHome: 'general.viewHome',
      viewShow: 'general.viewShow',
    },
    await presence.getSetting<string>('lang').catch(() => 'en'),
  )
}
async function imgPath(path: string, hostname: string) {
  if (path) {
    if (path.includes(hostname))
      return `https://${path.replace('//', '')}`
    else return `https://${hostname}${path}`
  }
  else {
    return Assets.Logo
  }
}
let strings: Awaited<ReturnType<typeof getStrings>>
let oldLang: string | null = null
let current: number
let duration: number
let isVideo = false
let paused: boolean

presence.on(
  'iFrameData',
  (data: unknown) => {
    ({ current, duration, isVideo, paused } = data as {
      current: number
      duration: number
      isVideo: boolean
      paused: boolean
    })
  },
)

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    largeImageKey: Assets.Logo,
    startTimestamp: browsingTimestamp,
  }
  const { pathname, hostname, href } = document.location
  const [newLang, privacy, buttons, covers] = await Promise.all([
    presence.getSetting<string>('lang').catch(() => 'en'),
    presence.getSetting<boolean>('privacy'),
    presence.getSetting<boolean>('buttons'),
    presence.getSetting<boolean>('covers'),
  ])
  const search = document.querySelector<HTMLInputElement>('input[type="text"]')
  if (oldLang !== newLang || !strings) {
    oldLang = newLang
    strings = await getStrings()
  }

  if (privacy) {
    presenceData.details = strings.browse
    presence.setActivity(presenceData)
    return
  }
  if (search?.value || pathname.includes('search')) {
    presenceData.details = strings.search
    presenceData.state = search?.value
      || document
        .querySelector(
          'body > div.container.main-container.min-vh-100.px-3 > h3',
        )
        ?.textContent
        ?.split('"')[1]
        || 'Nothing'
    presenceData.smallImageKey = Assets.Search
    presence.setActivity(presenceData)
    return
  }
  switch (pathname.split('/')[1]) {
    case '': {
      const active = document.querySelector('[class="nav-link active"]')
      if (active?.textContent) {
        presenceData.details = `Viewing ${active.textContent
          .trim()
          .toLowerCase()} anime`
      }
      else {
        presenceData.details = strings.browse
      }
      break
    }
    case 'view': {
      delete presenceData.startTimestamp
      const title = document
        .querySelector('[class="animename"]')
        ?.textContent
        ?.split('Episode') ?? ''
      presenceData.details = title[0]
      presenceData.state = `Episode ${title[1]}`
      presenceData.largeImageKey = (await imgPath(
        document
          .querySelector('[class="lozad img-fluid"]')
          ?.getAttribute('src') ?? '',
        hostname,
      )) ?? Assets.Logo
      if (isVideo) {
        presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play
        presenceData.smallImageText = paused ? strings.paused : strings.play
        if (!Number.isNaN(duration) && !paused) {
          [presenceData.startTimestamp, presenceData.endTimestamp] = presence.getTimestamps(current, duration)
        }
        presenceData.buttons = [
          {
            label: 'Watch Video',
            url: href,
          },
        ]
      }
      else {
        presenceData.buttons = [
          {
            label: 'View Anime',
            url: href,
          },
        ]
      }
      break
    }
    case 'animelist': {
      presenceData.details = 'Viewing their anime list'
      break
    }
    case 'search': {
      presenceData.details = 'Searching'
      presenceData.smallImageKey = Assets.Search
      presenceData.smallImageText = 'Searching'
      break
    }
    case 'anime': {
      presenceData.buttons = [
        {
          label: 'View Anime',
          url: href,
        },
      ]
      presenceData.details = 'Viewing an anime'
      presenceData.state = document.querySelector('h2')?.textContent?.trim() ?? ''
      presenceData.largeImageKey = (await imgPath(
        document
          .querySelector('[class="lozad img-fluid main-poster"]')
          ?.getAttribute('src') ?? '',
        hostname,
      )) ?? Assets.Logo
      break
    }
  }
  if (!buttons && presenceData.buttons)
    delete presenceData.buttons
  if (!covers && presenceData.largeImageKey !== Assets.Logo)
    presenceData.largeImageKey = Assets.Logo

  if (presenceData.details)
    presence.setActivity(presenceData)
  else presence.setActivity()
})
