import { ActivityType, Assets } from 'premid'
import { getTimestamps } from 'premid'
const presence = new Presence({
  clientId: '1338529406905352212',
})

presence.on('UpdateData', async () => {
  const [
    privacy,
  ] = await Promise.all([
    presence.getSetting<boolean>('privacy'),
  ])

  if (privacy) {
    return presence.clearActivity()
  }

  const presenceData = await getPresenceData()

  presence.setActivity(presenceData)
})

let _video = {
  duration: 0,
  currentTime: 0,
  paused: true,
}
presence.on(
  'iFrameData',
  (data: unknown) => {
    _video = data as typeof _video
  },
)

function getTypePageInfo() {
  const title = document
    ?.querySelector<HTMLMetaElement>('[name="article:title"]')
    ?.content ?? ''
  const artist = document
    ?.querySelector<HTMLMetaElement>('[name="article:artist"]')
    ?.content ?? ''
  const image = document
    ?.querySelector<HTMLMetaElement>('[property="og:image"]')
    ?.content ?? ''

  return { title, artist, image }
}

const largeImageKey = 'https://i.imgur.com/nnZqkNo.png'
const browsingTimestamp = Math.floor(Date.now() / 1000)

async function getPresenceData() {
  const { pathname, href } = document.location
  const [
    showCurrentSong,
    showTypingState,
    showMediaState,
    showTimestamp,
    showCover,
    showButtons,
  ] = await Promise.all([
    presence.getSetting<boolean>('showCurrentSong'),
    presence.getSetting<boolean>('showTypingState'),
    presence.getSetting<boolean>('showMediaState'),
    presence.getSetting<boolean>('showTimestamp'),
    presence.getSetting<boolean>('showCover'),
    presence.getSetting<boolean>('showButtons'),
  ])

  switch (true) {
    case pathname.includes('/type'):{
      const map = getTypePageInfo()
      const isPaused = _video.paused

      const presenceData: PresenceData = {
        type: isPaused ? ActivityType.Playing : ActivityType.Listening,
        largeImageKey: showCover ? map.image : largeImageKey,
      }

      if (showMediaState) {
        presenceData.smallImageKey = isPaused ? Assets.Pause : Assets.Play
        presenceData.smallImageText = isPaused ? '停止中' : 'プレイ中'
      }

      if (showTimestamp) {
        const [startTimestamp, endTimestamp] = getTimestamps(
          Math.floor(_video.currentTime),
          Math.floor(_video.duration),
        )
        presenceData.startTimestamp = startTimestamp
        presenceData.endTimestamp = endTimestamp
      }

      if (showButtons) {
        presenceData.buttons = [{
          url: href,
          label: '譜面ページに移動',
        }]
      }

      if (showCurrentSong) {
        presenceData.details = `${map.title} - ${map.artist}`
      }

      if (showTypingState) {
        const typeCount = document.querySelector('[label=\'type\']')?.textContent ?? 0
        const kpm = document.querySelector('[label=\'kpm\']')?.textContent ?? 0
        presenceData.state = `打鍵数:${typeCount} kpm:${kpm}`
      }

      return presenceData
    }
    case pathname.includes('/edit'):{
      const iframeElement = document.querySelector('iframe')

      const videoId = iframeElement?.src.split('/embed/')[1]?.split('?')[0] || ''
      const videoThubnail = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
      const isPaused = _video.paused

      const presenceData: PresenceData = {
        largeImageKey: showCover && videoId ? videoThubnail : largeImageKey,
        type: isPaused ? ActivityType.Playing : ActivityType.Listening,
      }

      if (showTypingState) {
        presenceData.state = '譜面編集中'
      }

      if (showMediaState) {
        presenceData.smallImageKey = isPaused ? Assets.Pause : Assets.Play
        presenceData.smallImageText = isPaused ? '停止中' : 'プレイ中'
      }

      if (showTimestamp) {
        const [startTimestamp, endTimestamp] = getTimestamps(
          Math.floor(_video.currentTime),
          Math.floor(_video.duration),
        )
        presenceData.startTimestamp = startTimestamp
        presenceData.endTimestamp = endTimestamp
      }

      if (showCurrentSong) {
        presenceData.details = iframeElement?.title ?? ''
      }

      return presenceData
    }

    case pathname.includes('/timeline'):{
      const presenceData: PresenceData = {
        details: 'タイムライン',
        largeImageKey,
        type: ActivityType.Playing,
        startTimestamp: browsingTimestamp,
      }

      return presenceData
    }
    case pathname.includes('/user'):{
      const presenceData: PresenceData = {
        details: 'ユーザーページ',
        largeImageKey,
        type: ActivityType.Playing,
        startTimestamp: browsingTimestamp,
      }

      return presenceData
    }

    default: {
      const presenceData: PresenceData = {
        state: '待機中',
        startTimestamp: browsingTimestamp,
        largeImageKey,
        type: ActivityType.Playing,
      }

      return presenceData
    }
  }
}
