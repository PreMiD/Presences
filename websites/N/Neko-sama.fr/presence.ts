const presence = new Presence({
  clientId: '1014298173314961481',
})

interface Video {
  currentTime: number
  duration: number
  paused: boolean
}

function timeToString(nbr: number): string {
  let nbrCopy = nbr
  let nbrString = ''
  let quotient = 0
  let remainder = 0
  if (nbrCopy >= 3600) {
    quotient = Math.floor(nbrCopy / 3600)
    if (Number.isNaN(quotient))
      quotient = 0
    remainder = nbrCopy % 3600
    if (quotient > 9)
      nbrString += `${quotient.toString()}:`
    else nbrString += `0${quotient.toString()}:`

    nbrCopy = remainder
  }
  quotient = Math.floor(nbrCopy / 60)
  if (Number.isNaN(quotient))
    quotient = 0
  remainder = nbrCopy % 60
  if (quotient > 9)
    nbrString += `${quotient.toString()}:`
  else nbrString += `0${quotient.toString()}:`

  nbrCopy = remainder
  if (Number.isNaN(nbrCopy))
    nbrCopy = 0
  if (nbrCopy > 9)
    nbrString += nbrCopy.toString()
  else nbrString += `0${nbrCopy.toString()}`

  return nbrString
}

const websiteDomain = 'https://animecat.net'

let video: Video | null = null

const enum Assets {
  Logo = 'https://cdn.rcd.gg/PreMiD/websites/N/Neko-sama.fr/assets/logo.png',
}

presence.on('iFrameData', (data: unknown) => {
  video = data as Video
})

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    largeImageKey: Assets.Logo,
    details: 'Navigue sur Neko-sama',
  }
  const { pathname } = document.location
  const pathSplit = pathname.split('/')

  switch (pathSplit[1]) {
    case 'anime':
      switch (pathSplit[2]) {
        case 'episode': {
          const episodeImage = document.querySelector<HTMLMetaElement>(
            'meta[property="og:image"]',
          )?.content
          const animeImage = document.querySelector<HTMLImageElement>('a.cover img')?.src
          const defaultThumbnail = `${websiteDomain}/images/default_thumbnail.png`
          presenceData.largeImageKey = episodeImage === defaultThumbnail
            ? animeImage === defaultThumbnail
              ? Assets.Logo
              : animeImage
            : episodeImage
          if (video === null) {
            presenceData.details = `Regarde ${
              document.querySelector<HTMLMetaElement>(
                'meta[property="og:title"]',
              )?.content
            }`

            presenceData.buttons = [
              {
                label: 'Voir Épisode',
                url: document.URL,
              },
            ]
            break
          }
          const { paused, currentTime, duration } = video
          if (!paused) {
            [presenceData.startTimestamp, presenceData.endTimestamp] = presence.getTimestamps(currentTime, duration)
          }
          presenceData.state = `${timeToString(
            Math.floor(currentTime),
          )}/${timeToString(Math.floor(duration))}`
          presenceData.details = `Regarde ${
            document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
              ?.content
          }`
          presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play
          presenceData.smallImageText = paused
            ? 'En pause'
            : 'Lecture en cours'
          presenceData.buttons = [
            {
              label: 'Voir Épisode',
              url: document.URL,
            },
          ]
          break
        }
        case 'info': {
          const animeImage = document.querySelector<HTMLMetaElement>(
            'meta[property="og:image"]',
          )?.content
          presenceData.details = 'Regarde la page d\'un animé :'
          presenceData.state = document.querySelector('h1')?.firstChild?.textContent
          presenceData.largeImageKey = animeImage === `${websiteDomain}/images/default_thumbnail.png`
            ? Assets.Logo
            : animeImage
          presenceData.buttons = [
            {
              label: 'Voir Animé',
              url: document.URL,
            },
          ]
          break
        }
        default:
          presenceData.details = 'Cherche un animé en VOSTFR'
          break
      }
      break
    case 'anime-vf':
      presenceData.details = 'Cherche un animé en VF'
      break
  }

  presence.setActivity(presenceData)
})
