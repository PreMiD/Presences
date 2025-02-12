import { ActivityType, Assets } from 'premid'

const presence = new Presence({
  clientId: '1337272344800002129',
})
const browsingTimestamp = Math.floor(Date.now() / 1000)

const cache = new Map<string, Record<string, unknown>>()

interface TMDBResponse {
  backdropPath?: string
  [key: string]: unknown
}

async function fetchWithCache(url: string): Promise<TMDBResponse | null> {
  if (cache.has(url))
    return cache.get(url) as TMDBResponse

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTAwMDQ5ZjNlMDYxMDlmZTNlODI4OWIwNmNmNTY4NSIsInN1YiI6IjY1ZTEyNDAyMmQ1MzFhMDE4NWMwZjJmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1J3EfnfmpJyZ4MV66eadk3h929zdeZfvjTO2JXhboWw',
      },
    })

    if (!res.ok)
      return null

    const data = (await res.json()) as Record<string, unknown>
    const formattedData: TMDBResponse = {
      backdropPath: typeof data.backdrop_path === 'string' ? data.backdrop_path : undefined,
    }

    cache.set(url, formattedData)
    return formattedData
  }
  catch {
    return null
  }
}

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    largeImageKey: 'https://i.imgur.com/vnX1akB.png',
    type: ActivityType.Watching,
    startTimestamp: browsingTimestamp,
  }

  switch (document.location.pathname) {
    case '/':
      presenceData.details = 'Browsing...'
      break
    case '/settings':
      presenceData.details = 'Configuring Settings'
      break
    case '/discover':
      presenceData.details = 'Discovering what\'s new'
      break
    case '/about':
      presenceData.details = 'Reading about P-Stream'
      break
    case '/support':
      presenceData.details = 'Getting support'
      break
    default:
      if (document.location.pathname.startsWith('/media/tmdb-tv-')) {
        const showId = document.location.href
          .replace('https://pstream.org/media/tmdb-tv-', '')
          .split('-')[0]
        if (showId) {
          const data = await fetchWithCache(
            `https://api.themoviedb.org/3/tv/${showId}`,
          )
          if (data?.backdropPath)
            presenceData.largeImageKey = `https://image.tmdb.org/t/p/original${data.backdropPath}`
        }
        presenceData.details = document.querySelector('title')?.textContent?.split(' - ')[0] ?? ''
        presenceData.state = document
          .querySelector('title')
          ?.textContent
          ?.split(' - ')
          .slice(1)
          .join(' - ') ?? ''
      }
      else if (document.location.pathname.startsWith('/media/tmdb-movie-')) {
        const movieId = document.location.href
          .replace('https://pstream.org/media/tmdb-movie-', '')
          .split('-')[0]
        if (movieId) {
          const data = await fetchWithCache(
            `https://api.themoviedb.org/3/movie/${movieId}`,
          )
          if (data?.backdropPath)
            presenceData.largeImageKey = `https://image.tmdb.org/t/p/original${data.backdropPath}`
        }
        presenceData.details = document.querySelector('title')?.textContent
      }
  }

  const video = document.querySelector('video')
  if (video) {
    if (!video.paused) {
      [presenceData.startTimestamp, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video)
      presenceData.smallImageKey = Assets.Play
    }
    else {
      presenceData.smallImageKey = Assets.Pause
    }
  }

  presence.setActivity(presenceData)
})
