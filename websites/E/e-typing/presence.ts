import { ActivityType, Assets } from 'premid'

const presence = new Presence({
  clientId: '1343107487477399592',
})

const romaLargeImageKey = 'https://i.imgur.com/gvzttMh.png'
const englishLargeImageKey = 'https://i.imgur.com/gUcYoFW.png'
const kanaLargeImageKey = 'https://i.imgur.com/Ulg95rP.png'
const browsingTimestamp = Math.floor(Date.now() / 1000)

presence.on('UpdateData', async () => {
  const privacy = await presence.getSetting<boolean>('privacy')
  if (privacy) {
    return presence.clearActivity()
  }

  const presenceData = generatePresenceData()

  presence.setActivity(presenceData)
})

function getMode() {
  const headerImgSrc = document.querySelector<HTMLImageElement>('#etyping img')?.src ?? ''
  const paths = headerImgSrc.split('/').filter(i => i !== '')
  const mode = paths[3]

  if (mode === 'eng') {
    return 'english'
  }
  else if (mode === 'kana') {
    return 'kana'
  }
  else {
    return 'roma'
  }
}

function getTypingContentWindowInfo() {
  const iframeWindowTitle = document.evaluate(
    '//p[contains(@class, \'pp_description\')]',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  ).singleNodeValue?.textContent ?? ''

  const wordTitle = document.querySelector<HTMLIFrameElement>('#typing_content')?.contentDocument?.querySelector('.title')?.textContent ?? ''

  return { iframeWindowTitle: iframeWindowTitle.replace(wordTitle, ''), wordTitle }
}

function generatePresenceData() {
  const mode = getMode()

  const { iframeWindowTitle, wordTitle } = getTypingContentWindowInfo()

  const presenceData: PresenceData = {
    details: iframeWindowTitle,
    state: wordTitle,
    startTimestamp: browsingTimestamp,
    largeImageKey: romaLargeImageKey,
    smallImageKey: Assets.Play,
    type: ActivityType.Playing,
    buttons: [
      {
        url: 'https://www.e-typing.ne.jp',
        label: 'e-typingを開く',
      },
    ],
  }

  if (mode === 'english') {
    presenceData.largeImageKey = englishLargeImageKey
    presenceData.smallImageText = '英語タイピング'
  }
  else if (mode === 'kana') {
    presenceData.largeImageKey = kanaLargeImageKey
    presenceData.smallImageText = 'かな入力タイピング'
  }
  else {
    presenceData.largeImageKey = romaLargeImageKey
    presenceData.smallImageText = 'ローマ字タイピング'
  }

  return presenceData
}
