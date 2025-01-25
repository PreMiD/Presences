const presence = new Presence({
  clientId: '',
})
const strings = presence.getStrings({
  play: 'general.playing',
  pause: 'general.paused',
})
const browsingTimestamp = Math.floor(Date.now() / 1000)

const enum Assets { // Other default assets can be found at index.d.ts
  Logo = '',
}

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    largeImageKey: Assets.Logo,
    startTimestamp: browsingTimestamp,
  }

  presence.setActivity(presenceData)
})
