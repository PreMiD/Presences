import type { Resolver } from '../util'

function isActive(): boolean {
  return (
    document.location.pathname.includes('/shorts/')
    && document.location.hostname === 'm.youtube.com'
    && !!getTitle()
    && !!getUploader()
    && !!getChannelURL()
    && !!getVideoID()
  )
}

function getTitle(): string {
  return getShortsElement()?.querySelector(
    '.ytShortsVideoTitleViewModelShortsVideoTitle',
  )?.textContent
}

function getUploader(): string {
  return getShortsElement()
    ?.querySelector<HTMLAnchorElement>(
      '.ytReelChannelBarViewModelChannelName a',
    )
    ?.textContent
    .replace(/^@/, '')
}

function getChannelURL(): string {
  const shortsLink = getShortsElement()?.querySelector<HTMLAnchorElement>(
    '.ytReelChannelBarViewModelChannelName a',
  )
  if (shortsLink) {
    const split = shortsLink.href.split('/')
    split.pop() // remove last item
    return split.join('/').replace(/^@/, '')
  }
  return ''
}

export function getVideoID(): string {
  return document.location.pathname.split('/shorts/')[1]
}

function getShortsElement(): HTMLElement {
  return document.querySelector(
    '.ytShortsCarouselCarouselItem[aria-hidden=false] shorts-video',
  )
}

const resolver: Resolver = {
  isActive,
  getTitle,
  getUploader,
  getChannelURL,
  getVideoID,
}

export default resolver
