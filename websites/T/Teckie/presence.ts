const presence = new Presence({
  clientId: '576477712470769675',
})

enum ActivityAssets { // Other default assets can be found at index.d.ts
  Logo = 'https://i.postimg.cc/FHdK56R2/my-ONfuy-waifu2x-art-noise1-scale-waifu2x-art-noise1-scale-waifu2x-art-noise1-scale.png',
}

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    largeImageKey: ActivityAssets.Logo,
    details: 'Bezoekt Teckie',
  }

  switch (document.location.pathname.split('/')[1]) {
    case 'pages': {
      presenceData.details = 'Bekijkt een pagina'
      presenceData.state = `Pagina: ${document.title.split('– Teckie')?.[0]}`
      break
    }
    case 'products': {
      presenceData.details = 'Bekijkt een product'
presenceData.state = document.querySelector('.product__title')?.textContent?.trim()?.replace("\n     ", "") ?? ""
      break
    }
    case 'policies': {
      presenceData.details = 'Bekijkt een policy'
presenceData.state = document.querySelector('.shopify-policy__title')?.textContent ?? ""
      break
    }
    case 'blogs': {
      presenceData.details = `Bekijkt een ${document.location.pathname.split('/')[2]} blog`
      const blogTitle = document.getElementsByClassName('article-template__title')[0]
      if (blogTitle) {
        presenceData.state = `Blog: ${blogTitle.textContent}`
      }
      break
    }
  }

  presence.setActivity(presenceData)
})
