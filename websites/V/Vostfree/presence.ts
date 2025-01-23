const presence = new Presence({
  clientId: '925799512205844490',
})
const path = document.location.pathname
const browsingStamp = Math.floor(Date.now() / 1000)
const search = document.querySelector('#dle-content > h2')
function getGenreTitle(genre: string) {
  genre = genre.split('/')[2]
  return genre
}

let video = {
  duration: 0,
  currentTime: 0,
  paused: true,
}

presence.on(
  'iFrameData',
  (inc: unknown) => {
    const data = inc as { duration: number, currentTime: number, paused: boolean }
    if (data?.duration)
      video = data
  },
)

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    largeImageKey: 'https://cdn.rcd.gg/PreMiD/websites/V/Vostfree/assets/logo.png',
    startTimestamp: browsingStamp,
  }
  const [privacy, button] = await Promise.all([
    presence.getSetting<boolean>('privacy'),
    presence.getSetting<boolean>('button'),
  ])
  const title = document.querySelector(
    '#dle-content > div.watch-top > div > div > div > div.slide-middle > h1',
  )

  if (video && !Number.isNaN(video.duration) && title) {
    const episode = document.querySelector(
      '#player-tabs > div.tab-blocks > div:nth-child(1) > div > div.new_player_top > div.new_player_selector_box > div.jq-selectbox-wrapper > div > div.jq-selectbox__select > div.jq-selectbox__select-text',
    );
    [presenceData.startTimestamp, presenceData.endTimestamp] = presence.getTimestamps(video.currentTime, video.duration)
    presenceData.details = title.textContent
    presenceData.state = episode?.textContent
    presenceData.buttons = [
      {
        label: 'Regarder l\'épisode',
        url: document.location.href,
      },
    ]
    presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play
    presenceData.smallImageText = video.paused ? 'En pause' : 'En cours'

    if (!button)
      delete presenceData.buttons

    if (privacy) {
      delete presenceData.state
      delete presenceData.endTimestamp
      delete presenceData.buttons
      presenceData.startTimestamp = browsingStamp
      presenceData.details = 'Regarde un anime'
    }
  }
  else if (search) {
    presenceData.details = 'Recherche :'
    presenceData.state = document.querySelector<HTMLInputElement>('#searchinput')?.value
    presenceData.smallImageKey = Assets.Search
    presenceData.smallImageText = 'Recherche'
  }
  else if (path.includes('/anime-vf')) {
    presenceData.details = 'Navigue les animes VF'
    presenceData.smallImageKey = Assets.Search
    presenceData.smallImageText = 'Recherche'
  }
  else if (path.includes('/animes-vostfr')) {
    presenceData.details = 'Navigue les animes VOSTFR'
    presenceData.smallImageKey = Assets.Search
    presenceData.smallImageText = 'Recherche'
  }
  else if (path.includes('/films-vf-vostfr')) {
    presenceData.details = 'Navigue les films'
    presenceData.smallImageKey = Assets.Search
    presenceData.smallImageText = 'Recherche'
  }
  else if (path.includes('/newposts')) {
    presenceData.details = 'Page des nouveautés'
    presenceData.smallImageKey = Assets.Search
    presenceData.smallImageText = 'Recherche'
  }
  else if (path.includes('/info-streaming.html')) {
    presenceData.details = 'Explore la page F.A.Q'
    presenceData.smallImageKey = Assets.Search
    presenceData.smallImageText = 'Recherche'
  }
  else if (path.includes('/genre')) {
    presenceData.details = 'Navigue les animes'
    presenceData.state = `de type "${getGenreTitle(path)}"`
    presenceData.smallImageKey = Assets.Search
    presenceData.smallImageText = 'Recherche'
  }
  else {
    presenceData.details = 'Page d\'accueil'
  }

  presence.setActivity(presenceData)
})
