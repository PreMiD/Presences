const presence = new Presence({
  clientId: "751285675277680811"
});
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      startTimestamp: Math.floor(Date.now() / 1000),
      largeImageKey: "logo"
    },
    path = document.location.pathname,
    title: HTMLElement = document.querySelector("head title"),
    tituloobra: HTMLElement = document.querySelector(
      "body > div.wrap > div > div > div > div.profile-manga > div > div > div > div.post-title > h1"
    ),
    tipoobra: HTMLElement = document.querySelector(
      "body > div.wrap > div > div > div > div.profile-manga > div > div > div > div.tab-summary > div.summary_content_wrap > div > div.post-content > div:nth-child(9) > div.summary-content"
    ),
    primeirogeneroobra: HTMLElement = document.querySelector(
      "body > div.wrap > div > div > div > div.profile-manga > div > div > div > div.tab-summary > div.summary_content_wrap > div > div.post-content > div:nth-child(8) > div.summary-content > div > a:nth-child(1)"
    ),
    filtroprojetos: HTMLElement = document.querySelector(
      "body > div.wrap > div > div > div.c-page-content.style-1 > div > div > div > div > div.main-col-inner > div > div.c-page__content > div.tab-wrap > div > div.c-nav-tabs > ul > li.active"
    ),
    pesquisatexto: HTMLInputElement = document.querySelector(
      "body > div.wrap > div > div > div.c-search-header__wrapper > div > div.search-content > form > input.search-field.manga-search-field.ui-autocomplete-input"
    ),
    paginaLogin: HTMLElement = document.querySelector(
      "#post-8 > div.entry-content > div > div > div.col-md-3.col-sm-3 > div > ul > li.active"
    ),
    selecaoLeitura: HTMLSelectElement = document.querySelector(
      "#manga-reading-nav-head > div > div.select-view > div.c-selectpicker.selectpicker_load > label > select"
    ),
    paginacao: HTMLSelectElement = document.querySelector("#single-pager"),
    usuarioNome: HTMLSpanElement = document.querySelector(
      "body > div.wrap > div > header > div.c-sub-header-nav.hide-sticky-menu > div > div > div.c-modal_item > div > span"
    );

  if (usuarioNome !== null) {
    presenceData.smallImageKey = "user";
    presenceData.smallImageText = usuarioNome.innerText.slice(11);
  }

  if (path === "/") {
    if (pesquisatexto === null) presenceData.details = "Página inicial";
    else {
      presenceData.details = "Pesquisando";
      presenceData.state = pesquisatexto.value;
    }
  } else if (path.includes("/generos/")) {
    presenceData.details = `Categoria: ${title.innerText.slice(
      0,
      title.innerText.indexOf("Mark") - 2
    )}`;

    if (filtroprojetos !== null)
      presenceData.state = `Filtro: ${filtroprojetos.innerText}`;
    else presenceData.state = "Filtro: Nenhum";
  } else if (path.includes("/manga/")) {
    const opcoes = {
      0() {
        presenceData.state = `${title.innerText.slice(
          title.innerText.indexOf("- Capítulo") + 2,
          title.innerText.indexOf("- Mark") - 1
        )}`;
      },
      1() {
        presenceData.state = `${title.innerText.slice(
          title.innerText.indexOf("- Capítulo") + 2,
          title.innerText.indexOf("- Mark") - 1
        )} | ${paginacao[paginacao.selectedIndex].innerText}`;
      }
    };

    if (
      (tituloobra !== null && !tituloobra.textContent.includes("Privado:")) ||
      !title.innerText.includes("Privado:")
    ) {
      if (path.split("/").length - 1 !== 3) {
        presenceData.details = title.innerText.slice(
          0,
          title.innerText.indexOf("- Capítulo") - 1
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        opcoes[selecaoLeitura.selectedIndex]();
      } else {
        presenceData.details = tituloobra.textContent;
        presenceData.state = `${tipoobra.textContent} | ${primeirogeneroobra.textContent}`;
      }
    }
  } else if (path.includes("/mangas/"))
    presenceData.details = "Todos os projetos";
  else if (path.includes("/meu-perfil/")) {
    presenceData.details = "Meu perfil";
    presenceData.state = paginaLogin.innerText;
  } else presenceData.details = "Navegando...";

  presence.setActivity(presenceData);
});
