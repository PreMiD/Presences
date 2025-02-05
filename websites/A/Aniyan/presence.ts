import { Assets } from 'premid'

const presence = new Presence({
  clientId: '611657413350654010',
})
const strings = presence.getStrings({
  play: 'general.playing',
  pause: 'general.paused',
})

const browsingTimestamp = Math.floor(Date.now() / 1000)

enum ActivityAssets {
  Logo = 'https://cdn.rcd.gg/PreMiD/websites/A/Aniyan/assets/logo.png',
}

presence.on('UpdateData', async () => {
  const video = document.querySelector<HTMLVideoElement>(
    '#player > div.jw-media.jw-reset > video',
  )

  const playback = video !== null

  if (!playback) {
    const presenceData: PresenceData = {
      largeImageKey: ActivityAssets.Logo,
      details: 'Browsing...',
      startTimestamp: browsingTimestamp,
    }

    delete presenceData.state
    delete presenceData.smallImageKey

    presence.setActivity(presenceData, true)
  }

  if (playback && video) {
    const videoTitle = document.querySelector<HTMLDivElement>(
      'div > div.episodeInfo > div.nomeAnime',
    )
    const episode = document.querySelector<HTMLDivElement>(
      'div > div.episodeInfo > div.epInfo',
    )
    const [startTimestamp, endTimestamp] = presence.getTimestamps(
      video.currentTime,
      video.duration,
    )
    const presenceData: PresenceData = {
      details: videoTitle?.textContent,
      state: episode?.textContent,
      largeImageKey: ActivityAssets.Logo,
      smallImageKey: video.paused ? Assets.Pause : Assets.Play,
      smallImageText: video.paused
        ? (await strings).pause
        : (await strings).play,
      startTimestamp,
      endTimestamp,
    }

    presenceData.details = videoTitle?.textContent
    presenceData.state = episode?.textContent
    presenceData.startTimestamp = browsingTimestamp

    if (video.paused) {
      delete presenceData.startTimestamp
      delete presenceData.endTimestamp
    }

    presence.setActivity(presenceData, true)
  }
})
