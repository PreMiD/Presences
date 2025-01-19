import applyCYLDetails from './pages/cyl'
import applyFehPassDetails from './pages/fehpass'
import applyGuideDetails from './pages/guide'
import applyMainHostDetails from './pages/main'
import applyNewGuideDetails from './pages/newguide'
import applySupportDetails from './pages/support'
import { Assets, presence, resetObservers, slideshow } from './util'

const browsingTimestamp = Math.floor(Date.now() / 1000)

let oldPath = ''

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    largeImageKey: Assets.Logo,
    startTimestamp: browsingTimestamp,
  }
  const { pathname, hostname } = document.location
  const pathList = pathname.split('/').filter(path => path)

  if (oldPath !== pathname) {
    oldPath = pathname
    resetObservers()
    slideshow.deleteAllSlides()
  }

  switch (true) {
    case hostname === 'fire-emblem-heroes.com':
      applyMainHostDetails(presenceData, pathList.slice(1))
      break
    case hostname === 'events.fire-emblem-heroes.com':
    case /vote\d+\.campaigns\.fire-emblem-heroes\.com/.test(hostname):
    case hostname === 'support.fire-emblem-heroes.com': {
      if (hostname.startsWith('support')) {
        if (pathList[0] === 'vote' || pathList[0] === 'vote2')
          await applyCYLDetails(presenceData, pathList.slice(1))
        else applySupportDetails(presenceData, pathList)
      }
      else if (hostname.startsWith('vote3')) {
        await applyCYLDetails(presenceData, pathList)
      }
      else {
        await applyCYLDetails(presenceData, pathList.slice(1))
      }
      break
    }
    case hostname === 'fehpass.fire-emblem-heroes.com': {
      applyFehPassDetails(presenceData, pathList.slice(1))
      break
    }
    case hostname === 'guide.fire-emblem-heroes.com': {
      applyGuideDetails(presenceData, pathList.slice(1))
      break
    }
    case hostname === 'new-guide.fire-emblem-heroes.com': {
      applyNewGuideDetails(presenceData)
      break
    }
  }

  if (slideshow.getSlides().length)
    presence.setActivity(slideshow)
  else if (presenceData.details)
    presence.setActivity(presenceData)
  else presence.setActivity()
})
