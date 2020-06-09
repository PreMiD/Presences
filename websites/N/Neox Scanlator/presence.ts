var presence = new Presence({
  clientId: "704585837949747330"
});
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: Math.floor(Date.now() / 1000)
  };
  const path: any = document.location.pathname;
  let PesquisaTexto: any,
    UsuarioTexto: any,
    OrdenarTexto: any,
    OrdenarTextoObra: any,
    GeneroTexto: any,
    StatusContaTexto: any,
    BlogText: any,
    opcaoLeitor: any,
    tipoObra: any,
    generoObra: any,
    spanObra: any,
    nomeObra: any,
    nomeObraLeitor: any,
    capituloLeitor: any,
    seasonLeitor: any,
    paginaLeitor: any,
    postagemData: any;
  if (path.startsWith("/newsite/") || path.startsWith("/newsite")) {
    if (path == "/newsite/" || path == "/newsite") {
      if (document.title.includes("Resultados da pesquisa por")) {
        PesquisaTexto = document.querySelector(
          "body > div.wrap > div.body-wrap > div > div.c-search-header__wrapper > div > div > form > label > input"
        );
        presenceData.details = "Pesquisando por:";
        presenceData.state = PesquisaTexto.value;
      } else {
        UsuarioTexto = document.querySelector(
          "body > div.wrap > div > header > div.c-sub-header-nav.with-border.hide-sticky-menu > div > div > div.c-modal_item > div > span"
        );
        if (UsuarioTexto != null) {
          presenceData.details =
            "Usuário: " +
            UsuarioTexto.innerText.slice(
              UsuarioTexto.innerText.search(",") + 1
            );
        }
        presenceData.state = "Página inicial";
      }
    } else if (path.includes("/projects/")) {
      presenceData.details = "Vendo a lista de projetos";
      OrdenarTexto = document.querySelector(
        "body > div.wrap > div > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.c-page__content > div.tab-wrap > div > div.c-nav-tabs > ul > li.active"
      );
      if (OrdenarTexto != null) {
        presenceData.state = "Ordenar por: " + OrdenarTexto.innerText;
      }
    } else if (path.includes("/manga-genre/")) {
      OrdenarTextoObra = document.querySelector(
        "body > div.wrap > div > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.c-page__content > div.tab-wrap > div > div.c-nav-tabs > ul > li.active"
      );
      GeneroTexto = document.querySelector(
        "body > div.wrap > div > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.entry-header > div > div > h1"
      );
      presenceData.details = "Gênero: " + GeneroTexto.innerText;
      if (
        document.querySelector(
          "body > div.wrap > div > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.c-page__content > div.tab-wrap > div > div.c-nav-tabs > ul > li.active"
        )
      ) {
        presenceData.state = "Ordenar por: " + OrdenarTextoObra.innerText;
      }
    } else if (path.includes("/user-settings/")) {
      StatusContaTexto = document.querySelector(
        "#post-11 > div.entry-content > div > div > div.col-md-3.col-sm-3 > div > ul > li.active"
      );
      presenceData.details = "Minha Conta";
      presenceData.state = StatusContaTexto.innerText;
    } else if (path.includes("/blog")) {
      BlogText = document.querySelector(
        "body > div.wrap > div > div.site-content > div > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div.c-blog__heading.style-2.font-heading.no-icon > h1"
      );
      presenceData.details = document.title.slice(
        0,
        document.title.search("-") - 15
      );
      presenceData.state =
        BlogText.innerText.slice(0, 1) +
        BlogText.innerText.slice(1).toLowerCase();
    } else if (path.includes("/manga/")) {
      if (path.split("/").length - 1 == 4) {
        tipoObra = document.querySelector(
          "body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.tab-summary > div.summary_content_wrap > div > div.post-content > div:nth-child(9) > div.summary-content"
        );
        generoObra = document.querySelector(
          "body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.c-breadcrumb-wrapper > div > ol > li:nth-child(3) > a"
        );
        presenceData.state = tipoObra.innerText + " | " + generoObra.innerText;
        nomeObra = document.querySelector(
          "body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.post-title > h1"
        );
        spanObra = document.querySelector(
          "body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.post-title > h1 > span"
        );
        if (spanObra != null) {
          presenceData.details = nomeObra.innerText.replace(
            spanObra.innerText,
            ""
          );
        } else {
          presenceData.details = nomeObra.innerText;
        }
      } else if (
        path.includes("capitulo") &&
        document.title.includes("Capítulo")
      ) {
        seasonLeitor = document.querySelector(
          "body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-header.header > div > div.select-view > div.c-selectpicker.selectpicker_volume > label > select"
        );
        paginaLeitor = document.getElementById("single-pager");
        capituloLeitor = document.querySelector(
          "body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-header.header > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li.active"
        );
        nomeObraLeitor = document.querySelector(
          "body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-header.header > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li:nth-child(3) > a"
        );
        opcaoLeitor = document.querySelector(
          "body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-header.header > div > div.select-view > div.c-selectpicker.selectpicker_load > label > select > option[selected='selected']"
        );
        if (opcaoLeitor.innerText == "Paginação") {
          if (seasonLeitor != null) {
            presenceData.details =
              nomeObraLeitor.innerText +
              " | " +
              seasonLeitor[seasonLeitor.selectedIndex].innerText;
            presenceData.state =
              capituloLeitor.innerText +
              " | " +
              (paginaLeitor.selectedIndex + 1) +
              "/" +
              paginaLeitor[0].innerText.slice(
                paginaLeitor[0].innerText.search("/") + 1,
                paginaLeitor[0].innerText.search("/") + 6
              );
          } else {
            presenceData.details = nomeObraLeitor.innerText;
            presenceData.state =
              capituloLeitor.innerText +
              " | " +
              (paginaLeitor.selectedIndex + 1) +
              "/" +
              paginaLeitor[0].innerText.slice(
                paginaLeitor[0].innerText.search("/") + 1,
                paginaLeitor[0].innerText.search("/") + 6
              );
          }
        } else if (opcaoLeitor.innerText == "Longstripe") {
          if (seasonLeitor != null) {
            presenceData.details =
              nomeObraLeitor.innerText +
              " | " +
              seasonLeitor[seasonLeitor.selectedIndex].innerText;
            presenceData.state = capituloLeitor.innerText + " | Longstripe";
          } else {
            presenceData.details = nomeObraLeitor.innerText;
            presenceData.state = capituloLeitor.innerText + " | Longstripe";
          }
        }
      }
    } else if (
      document.querySelector(
        "div.entry-header > div > div.entry-meta > div.post-on"
      ) !== null
    ) {
      postagemData = document.querySelector(
        "div.entry-header > div > div.entry-meta > div.post-on"
      );
      if (postagemData.innerText.includes("postado em")) {
        presenceData.details = "Postagem";
        presenceData.state = document.title.slice(
          0,
          document.title.search("-") - 15
        );
      }
    } else if (path.split("/").length - 1 == 3) {
      presenceData.details = document.title.slice(
        0,
        document.title.search("-") - 15
      );
    }
  } else {
    presence.setTrayTitle();
    presence.setActivity();
  }
  presence.setActivity(presenceData);
});
