const presence = new Presence({
  clientId: '751285675277680811',
})

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    startTimestamp: Math.floor(Date.now() / 1000),
    largeImageKey: 'https://cdn.rcd.gg/PreMiD/websites/M/Mark%20Scans/assets/logo.png',
  }
  const path = document.location.pathname
  const title = document.querySelector('head title')
  const tituloobra = document.querySelector(
    'body > div.wrap > div > div > div > div.profile-manga > div > div > div > div.post-title > h1',
  )
  const filtroprojetos = document.querySelector(
    'body > div.wrap > div > div > div.c-page-content.style-1 > div > div > div > div > div.main-col-inner > div > div.c-page__content > div.tab-wrap > div > div.c-nav-tabs > ul > li.active',
  )
  const pesquisatexto = document.querySelector<HTMLInputElement>(
    'body > div.wrap > div > div > div.c-search-header__wrapper > div > div.search-content > form > input.search-field.manga-search-field.ui-autocomplete-input',
  )
  const paginacao = document.querySelector<HTMLSelectElement>('#single-pager')
  const usuarioNome = document.querySelector<HTMLSpanElement>(
    'body > div.wrap > div > header > div.c-sub-header-nav.hide-sticky-menu > div > div > div.c-modal_item > div > span',
  )

  if (usuarioNome) {
    presenceData.smallImageKey = 'https://cdn.rcd.gg/PreMiD/websites/M/Mark%20Scans/assets/0.png'
    presenceData.smallImageText = usuarioNome.textContent?.slice(11)
  }

  if (path === '/') {
    if (pesquisatexto === null) {
      presenceData.details = 'Página inicial'
    }
    else {
      presenceData.details = 'Pesquisando'
      presenceData.state = pesquisatexto.value
    }
  }
  else if (path.includes('/generos/')) {
    presenceData.details = `Categoria: ${title?.textContent?.slice(
      0,
      title.textContent.indexOf('Mark') - 2,
    )}`

    if (filtroprojetos)
      presenceData.state = `Filtro: ${filtroprojetos.textContent}`
    else presenceData.state = 'Filtro: Nenhum'
  }
  else if (path.includes('/manga/')) {
    const opcoes = {
      0() {
        presenceData.state = `${title?.textContent?.slice(
          title.textContent.indexOf('- Capítulo') + 2,
          title.textContent.indexOf('- Mark') - 1,
        )}`
      },
      1() {
        presenceData.state = `${title?.textContent?.slice(
          title.textContent.indexOf('- Capítulo') + 2,
          title.textContent.indexOf('- Mark') - 1,
        )} | ${paginacao?.[paginacao.selectedIndex].textContent}`
      },
    }

    if (
      (tituloobra?.textContent && !tituloobra.textContent.includes('Privado:'))
      || !title?.textContent?.includes('Privado:')
    ) {
      if (path.split('/').length - 1 !== 3) {
        presenceData.details = title?.textContent?.slice(
          0,
          title.textContent.indexOf('- Capítulo') - 1,
        )
        opcoes[
          document.querySelector<HTMLSelectElement>(
            '#manga-reading-nav-head > div > div.select-view > div.c-selectpicker.selectpicker_load > label > select',
          )!.selectedIndex as 0
        ]()
      }
      else {
        presenceData.details = tituloobra?.textContent
        presenceData.state = `${
          document.querySelector(
            'body > div.wrap > div > div > div > div.profile-manga > div > div > div > div.tab-summary > div.summary_content_wrap > div > div.post-content > div:nth-child(9) > div.summary-content',
          )?.textContent
        } | ${
          document.querySelector(
            'body > div.wrap > div > div > div > div.profile-manga > div > div > div > div.tab-summary > div.summary_content_wrap > div > div.post-content > div:nth-child(8) > div.summary-content > div > a:nth-child(1)',
          )?.textContent
        }`
      }
    }
  }
  else if (path.includes('/mangas/')) {
    presenceData.details = 'Todos os projetos'
  }
  else if (path.includes('/meu-perfil/')) {
    presenceData.details = 'Meu perfil'
    presenceData.state = document.querySelector(
      '#post-8 > div.entry-content > div > div > div.col-md-3.col-sm-3 > div > ul > li.active',
    )?.textContent
  }
  else {
    presenceData.details = 'Navegando...'
  }

  presence.setActivity(presenceData)
})
