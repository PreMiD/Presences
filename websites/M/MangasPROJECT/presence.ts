var presence = new Presence({
  clientId: "683924512982433822"
});

var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "icon"
  };

  if (document.location.pathname == "/") {
    (data.details = "Página principal"), (data.startTimestamp = browsingStamp);
    presence.setActivity(data);
  }

  // ----------- barra de opções topo ----------- //
  else if (document.location.pathname.startsWith("/lista-de-mangas")) {
    (data.details = "Lista de mangás"),
      (data.state =
        "Ordenada por: " +
        (
          document.querySelector(
            "#menu-titulos > li.active > a > span"
          ) as HTMLElement
        ).innerText);
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/lista-de-categorias")) {
    (data.details = "Lista de Categorias"),
      (data.state =
        "Ordenada por: " +
        (
          document.querySelector(
            "#menu-categorias > li.active > a > span"
          ) as HTMLElement
        ).innerText);
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/grupos")) {
    (data.details = "Lista de Grupos"),
      (data.state =
        "Ordenada por: " +
        (
          document.querySelector(
            "#menu-grupos > li.active > a > span"
          ) as HTMLElement
        ).innerText);
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/destaques")) {
    (data.details = "Mangás em Destaque"),
      (data.startTimestamp = browsingStamp);
    presence.setActivity(data);
  }

  // ----------- Categorias (Categoria selecionada) e página da scan ----------- //
  else if (document.location.pathname.startsWith("/mangas")) {
    (data.details = "Lista de Mangás"),
      (data.state =
        "Ordenada por: " +
        (
          document.querySelector("head > title") as HTMLElement
        ).innerText.replace("Mangás:", ""));
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/scanlator")) {
    data.details =
      "Scan " +
      (
        document.querySelector(
          "#wraper > div > div.content-wraper.scan-data > div > ul > li > div.series-info.touchcarousel > span.series-title"
        ) as HTMLElement
      ).innerText;
    data.state = "Visualizando Principais Mangás da Scan";
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  }

  // ----------- Lendo mangá & Vendo Informações do Mangá ----------- //
  else if (document.location.pathname.startsWith("/manga")) {
    if (
      document.querySelector(
        "#reader-wrapper > div.reader-navigation.clear-fix > div.series-info-container > div.series-info > div.series-title > span.title"
      ) === null
    ) {
      (data.details = "Visualizando Mangá"),
        (data.state = (
          document.querySelector(
            "#series-data > div.series-info.touchcarousel > span.series-title > h1"
          ) as HTMLElement
        ).innerText);
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    } else {
      data.details = (
        document.querySelector(
          "#reader-wrapper > div.reader-navigation.clear-fix > div.series-info-container > div.series-info > div.series-title > span.title"
        ) as HTMLElement
      ).innerText;
      data.state =
        "Capítulo " +
        (
          document.querySelector(
            "#reader-wrapper > div.reader-navigation.clear-fix > div.chapter-selection-container > div.chapter-selection > span.current-chapter > em"
          ) as HTMLElement
        ).innerText;
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    }
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  }
});
