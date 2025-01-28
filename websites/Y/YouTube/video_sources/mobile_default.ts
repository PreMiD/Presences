import type { Resolver } from '../util'

function isActive(): boolean {
  return (
    document.location.hostname === 'm.youtube.com'
    && !!getTitle()
    && !!getUploader()
    && !!getVideoID()
    && !!getChannelURL()
  )
}

function getTitle(): string {
  return document
    .querySelector('h2[class*=video-information-title]')
    ?.textContent
    .trim()
}

function getUploader(): string {
  return document
    .querySelector('[class*=owner-channel-name]')
    ?.textContent
    .trim()
}

export function getVideoID(): string {
  return new URLSearchParams(document.location.search).get('v')
}

export function getChannelURL(): string {
  return document.querySelector<HTMLAnchorElement>(
    'a[class*=owner-icon-and-title]',
  )?.href
}

const resolver: Resolver = {
  isActive,
  getTitle,
  getUploader,
  getChannelURL,
  getVideoID,
}

export default resolver
