const presence = new Presence({
  clientId: '576477712470769675',
})

enum ActivityAssets { // Other default assets can be found at index.d.ts
  Logo = 'https://i.imgur.com/KKFlQ9m.png',
}

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    largeImageKey: ActivityAssets.Logo,
    details: 'Bezoekt Teckie',
  }
  const { pathname } = document.location

  let path = 0

  switch (pathname.split('/')[1]) {
    case 'pages': {
      presenceData.details = 'Bekijkt een pagina'
      path = 1
      break
    }
    case 'products': {
      presenceData.details = 'Bekijkt een product'
      path = 2
      break
    }
    case 'policies': {
      presenceData.details = 'Bekijkt een policy'
      path = 2
      break
    }
    case 'blogs': {
      presenceData.details = `Bekijkt een ${pathname.split('/')[2]} blog`
      path = 2
      break
    }
  }

  if (path !== 0) {
    presenceData.state = `${path === 1 ? 'Pagina: ' : ''}${document.title.split('– Teckie')?.[0]}`
  }

  presence.setActivity(presenceData)
})
