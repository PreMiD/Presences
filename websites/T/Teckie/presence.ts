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
      let productTitle = document.getElementsByClassName('product__title')[0]
      if (productTitle) {
        productTitle = productTitle.getElementsByTagName('h1')[0]
        if (productTitle) {
          presenceData.state = `Product: ${productTitle.textContent}`
        }
      }
      break
    }
    case 'policies': {
      presenceData.details = 'Bekijkt een policy'
      let policyTitle = document.getElementsByClassName('shopify-policy__title')[0]
      if (policyTitle) {
        policyTitle = policyTitle.getElementsByTagName('h1')[0]
        if (policyTitle) {
          presenceData.state = `Policy: ${policyTitle.textContent}`
        }
      }
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
