import { ActivityType, Assets, getTimestamps } from 'premid'

const presence = new Presence({
  clientId: '607719679011848220',
})
const strings = presence.getStrings({
  play: 'general.playing',
  pause: 'general.paused',
  live: 'general.live',
  search: 'general.searching',
  viewMovie: 'general.viewMovie',
  viewCategory: 'general.viewCategory',
  viewGenre: 'general.viewGenre',
  viewSeries: 'general.viewSeries',
  watchingLive: 'general.watchingLive',
  watching: 'general.watching',
  browsing: 'general.browsing',
  viewNetwork: 'Hulu.viewNetwork',
  viewSportEpisode: 'Hulu.viewSportEpisode',
  viewSportTeam: 'Hulu.viewSportTeam',
  viewMyStuff: 'Hulu.viewMyStuff',
  viewMyDVR: 'Hulu.viewMyDVR',
  onHulu: 'Hulu.onHulu',
  viewWatchHistory: 'Hulu.viewWatchHistory',
})

function capitalize(text: string): string {
  text = text.toLowerCase()
  return text.charAt(0).toUpperCase() + text.slice(1)
}

let elapsed: number, oldUrl: string, header, title, item

presence.on('UpdateData', async () => {
  let video: HTMLVideoElement | null = null
  let details
  let state
  let name: string | undefined;
  let smallImageKey
  let smallImageText
  let startTimestamp
  let endTimestamp

  const { href, pathname: path } = window.location
  if (href !== oldUrl) {
    oldUrl = href
    elapsed = Math.floor(Date.now() / 1000)
  }

  details = (await strings).browsing
  startTimestamp = elapsed

  if (path.includes('/hub')) {
    header = document.querySelector('.Hub__title')
    title = document.querySelector('.SimpleModalNav__title')
    details = (await strings).viewCategory
    if (header) {
      state = header.textContent
      if (title)
        state = `${state} (${title.textContent})`
    }
  }
  else if (path.includes('/genre')) {
    header = document.querySelector('.Hub__title')
    title = document.querySelector('.SimpleModalNav__title')
    details = (await strings).viewGenre
    if (header) {
      state = header.textContent
      if (title)
        state = `${state} (${title.textContent})`
    }
  }
  else if (path.includes('/series')) {
    title = document.querySelector('.Masthead__title')
    item = document.querySelector('.Subnav__item.active')
    details = (await strings).viewSeries
    if (title) {
      state = title.textContent
      if (item)
        state = `${state}'s ${item.textContent}`
    }
  }
  else if (path.includes('/movie')) {
    title = document.querySelector('.Masthead__title')
    item = document.querySelector('.Subnav__item.active')
    details = (await strings).viewMovie
    if (title) {
      state = title.textContent
      if (item)
        state = `${state}'s ${item.textContent}`
    }
  }
  else if (path.includes('/network')) {
    const brand = document.querySelector<HTMLImageElement>(
      '.SimpleModalNav__brandImage',
    )
    item = document.querySelector('.Subnav__item.active')
    details = (await strings).viewNetwork
    if (brand) {
      state = brand.alt
      if (item)
        state = `${state}'s ${item.textContent}`
    }
  }
  else if (path.includes('/sports_episode')) {
    title = document.querySelector('.Masthead__title')
    item = document.querySelector('.Subnav__item.active')
    details = (await strings).viewSportEpisode
    if (title) {
      state = title.textContent
      if (item)
        state = `${state}'s ${item.textContent}`
    }
  }
  else if (path.includes('/sports_team')) {
    title = document.querySelector('.Masthead__title')
    item = document.querySelector('.Subnav__item.active')
    details = (await strings).viewSportTeam
    if (title) {
      state = title.textContent
      if (item)
        state = `${state}'s ${item.textContent}`
    }
  }
  else if (path.includes('/search')) {
    const input = document.querySelector<HTMLInputElement>('.cu-search-input')
    details = (await strings).search
    smallImageKey = Assets.Search
    smallImageText = (await strings).search
    if (input && input.value.length > 0)
      state = input.value
  }
  else if (path.includes('/live')) {
    const category = document.querySelector(
      '.LiveGuide__filter-item--selected',
    )
    title = document.querySelector('.ModalHeader__showname')
    details = (await strings).watchingLive
    if (category) {
      state = capitalize(category.textContent!)
      if (title)
        state = `${state} (${title.textContent})`
    }
  }
  else if (path.includes('/my-stuff')) {
    details = (await strings).viewMyStuff
  }
  else if (path.includes('/manage-dvr')) {
    item = document.querySelector('.Subnav__item.active')
    details = (await strings).viewMyDVR
    if (item)
      state = capitalize(item.textContent!)
  }
  else if (path.includes('/watch')) {
    video = document.querySelector('.content-video-player')
    if (video) {
      title = document.querySelector('.metadata-area__second-line')
      const content = document.querySelector('.metadata-area__third-line')
      const timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration),
      )
      const live = timestamps[1] === Infinity
      details = (await strings).watching
      if (title) {
        details = (await strings).onHulu
        name = title.textContent
      }

      if (content?.textContent && content.textContent.length > 0)
        state = content.textContent

      smallImageKey = live
        ? Assets.Live
        : video.paused
          ? Assets.Pause
          : Assets.Play
      smallImageText = live
        ? (await strings).live
        : video.paused
          ? (await strings).pause
          : (await strings).play
      if (!video.paused) {
        if (!live)
          [startTimestamp, endTimestamp] = timestamps
        else startTimestamp = elapsed
      }
    }
    else {
      video = document.querySelector('video#content-video-player')
      details = (await strings).viewWatchHistory
      if (video) {
        title = document.querySelector(
          '#web-player-app div.PlayerMetadata__titleText',
        )
        const content = document.querySelector(
          '#web-player-app div.PlayerMetadata__subTitle',
        )
        const timestamps = getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration),
        )
        const live = timestamps[1] === Infinity
        details = (await strings).watching
        if (title) {
          details = (await strings).onHulu
          name = title.textContent
        }

        if (content?.textContent && content.textContent.length > 0)
          state = content.textContent

        smallImageKey = live
          ? Assets.Live
          : video.paused
            ? Assets.Pause
            : Assets.Play
        smallImageText = live
          ? (await strings).live
          : video.paused
            ? (await strings).pause
            : (await strings).play
        if (!video.paused) {
          if (!live)
            [startTimestamp, endTimestamp] = timestamps
          else startTimestamp = elapsed
        }
      }
    }
  }

  presence.setActivity(
    {
      type: ActivityType.Watching,
      details,
      name,
      state,
      largeImageKey: 'https://cdn.rcd.gg/PreMiD/websites/H/Hulu/assets/logo.png',
      smallImageKey,
      smallImageText,
      startTimestamp,
      endTimestamp,
    },
  )
})
