const presence = new Presence({
  clientId: "647535137738981376"
});
presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    startTimestamp: Math.floor(Date.now() / 1000),
    largeImageKey: "hs_icon"
  }

  if (document.location.pathname.includes("/")) {
    if (
      (document.title.includes("Você pesquisou por"))
    ) {
      let pesquisaTexto = document.querySelector(
        "body > div.wrap > div > div > div.c-search-header__wrapper > div > div.search-content > form > input.search-field.manga-search-field.ui-autocomplete-input"
        );
      presenceData.details = "Pesquisando por";
      presenceData.state = pesquisaTexto.value;
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Pesquisando";
    } else {
      presenceData.details = "Página inicial";
      presenceData.buttons = [
          {
            label: "Hachisuka Scans",
            url: document.URL
          }
        ];
    }
  } else if (
    (document.location.pathname.includes("/user-settings/"))
  ) {
    let userPageSelect = document.querySelector(
      "#post-5 > div.entry-content > div > div > div.col-md-3.col-sm-3 > div > ul > li.active"
      );
    let userName = document.querySelector(
      "body > div.wrap > div > header > div.c-sub-header-nav.with-border > div > div > div.c-modal_item > div > span"
      );
    presenceData.details = `Minha Conta ( ${userName.textContent.replace("Hi, ","")} )`;
    presenceData.state = userPageSelect.innerText;
  } else if (document.location.pathname.includes("/wp-admin/")) {
    if (
      (document.location.pathname.includes("post.php") && document.title.includes("Edit Manga"))
    ) {
      postMangaName = document.querySelector("#title");
      postMangaType = document.querySelector("#wp-manga-type");
      postMangaCap = document.querySelector("#wp-manga-chapter-name");
      postMangaURL = document.querySelector("#sample-permalink > a");

      if (postMangaCap.value === "" || postMangaCap.value === null || postMangaCap.value === undefined ) {
        presenceData.details = `Postando [ ${postMangaType.value} ]`; 
        presenceData.state = postMangaName.value;
      } else {
        presenceData.details = `Postando [ ${postMangaType.value} ] ( ${postMangaCap.value} )`; 
        presenceData.state = postMangaName.value;
      }
      presenceData.buttons = [
          {
            label: `Página do ${postMangaName.value.slice(0, 15)}...`,
            url: postMangaURL.textContent
          }
        ];
    } else {
      presenceData.details = null;
      presenceData.state = null;
    }
  } else if (document.location.pathname.includes("/obras/")) {
    let obraNum = document.querySelector(
      "body > div.wrap > div > div > div.c-page-content.style-1 > div > div > div > div > div > div > div.c-page__content > div.tab-wrap > div > div.h4"
      );
    presenceData.details = `Todas as Obras ( ${obraNum.textContent.replace(" result", "").replace("s", "")} )`;
  } else if (document.location.pathname.includes("/manga-genre/")) {
    let genrTexto = document.querySelector(
      "body > div.wrap > div > div > div.c-page-content.style-1 > div > div > div > div > div.main-col-inner > div > div.entry-header > div > div > h1"
    );
    let genrNumObra = document.querySelector(
      "body > div.wrap > div > div > div.c-page-content.style-1 > div > div > div > div > div > div > div.c-page__content > div.tab-wrap > div > div.h4"
      );
    presenceData.details = `Gênero: ${genrTexto.innerText} ( ${genrNumObra.textContent.replace(" result", "").replace("s", "")} )`;
  } else if (document.location.pathname.includes("/manga/")) {
    if (document.location.pathname.split("/").length - 1 === 3) {
      let mangaNome = document.querySelector(
        "body > div.wrap > div > div > div > div.profile-manga.summary-layout-2 > div > div > div > div.post-title > h1"
        );
      let mangaType = document.querySelector(
        "body > div.wrap > div > div > div > div.profile-manga.summary-layout-2 > div > div > div > div.tab-summary > div.summary_content_wrap > div > div > div:nth-child(9) > div.summary-content"
        ); 
      let mangaGenr = document.querySelector(
        "body > div.wrap > div > div > div > div.profile-manga.summary-layout-2 > div > div > div > div.tab-summary > div.summary_content_wrap > div > div > div:nth-child(8) > div.summary-content > div"
        );
      let teste = document.querySelector(
        "body > div.wrap > div > div > div > div.profile-manga.summary-layout-2 > div > div > div > div.tab-summary > div.summary_content_wrap > div > div > div:nth-child(9) > div.summary-content"
        );
      presenceData.buttons = [
          {
            label: `Página do ${teste.textContent}`,
            url: document.URL
          }
        ];
      presenceData.details = mangaNome.textContent;
      presenceData.state = `${mangaType.innerText}, ${mangaGenr.innerText}`;
    } else if (
        (document.location.pathname.includes("cap") && document.title.includes("Cap"))
      ) {
      let readerMangaNome = document.querySelector(
        "#manga-reading-nav-head > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li:nth-child(2) > a"
        );
      let readerMangaCap = document.querySelector(
        "#manga-reading-nav-head > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li.active"
        );
      let obraUrl = document.querySelector(
        "#manga-reading-nav-head > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li:nth-child(2) > a"
        );
      let obraCapNumTotal = document.querySelector(
        `#manga-reading-nav-head > div > div.select-view > div.chapter-selection.chapters_selectbox_holder > div > label > select > option:nth-child(1)`
        );
      presenceData.buttons = [
          {
            label: `Ler Capítulo ( ${readerMangaCap.textContent.replace("Cap. ", "")} )`,
            url: document.URL
          },
          {
            label: `Página do ${readerMangaNome.textContent.slice(0, 15)}...`,
            url: obraUrl.href
          }
        ];
      presenceData.details = readerMangaNome.textContent;
      presenceData.state = `Capítulo: ${readerMangaCap.textContent.replace("Cap. ", "")} de ${obraCapNumTotal.textContent.replace("Cap. ", "")}`;
      presenceData.smallImageText = "Lendo";
      presenceData.smallImageKey = "reading";
    }
  }
  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});
