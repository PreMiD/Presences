const presence = new Presence({
    clientId: "683924512982433822"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "icon"
  };

  if (document.location.pathname === "/") {
    (presenceData.details = "Página principal"),
      (data.startTimestamp = browsingTimestamp);
  }
  // ----------- barra de opções topo ----------- //
  else if (document.location.pathname.startsWith("/lista-de-mangas")) {
    (presenceData.details = "Lista de mangás"),
      (data.state = `Ordenada por: ${
        (
          document.querySelector(
            "#menu-titulos > li.active > a > span"
          ) as HTMLElement
        ).textContent
      }`);
    data.startTimestamp = browsingTimestamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/lista-de-categorias")) {
    (presenceData.details = "Lista de Categorias"),
      (data.state = `Ordenada por: ${
        (
          document.querySelector(
            "#menu-categorias > li.active > a > span"
          ) as HTMLElement
        ).textContent
      }`);
    data.startTimestamp = browsingTimestamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/grupos")) {
    (presenceData.details = "Lista de Grupos"),
      (data.state = `Ordenada por: ${
        (
          document.querySelector(
            "#menu-grupos > li.active > a > span"
          ) as HTMLElement
        ).textContent
      }`);
    data.startTimestamp = browsingTimestamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/destaques")) {
    (presenceData.details = "Mangás em Destaque"),
      (data.startTimestamp = browsingTimestamp);
  } else if (document.location.pathname.startsWith("/mangas")) {
    // ----------- Categorias (Categoria selecionada) e página da scan ----------- //
    (presenceData.details = "Lista de Mangás"),
      (data.state = `Ordenada por: ${(
        document.querySelector("head > title") as HTMLElement
      ).textContent.replace("Mangás:", "")}`);
    data.startTimestamp = browsingTimestamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/scanlator")) {
    presenceData.details = `Scan ${
      (
        document.querySelector(
          "#wraper > div > div.content-wraper.scan-data > div > ul > li > div.series-info.touchcarousel > span.series-title"
        ) as HTMLElement
      ).textContent
    }`;
    data.state = "Visualizando Principais Mangás da Scan";
    data.startTimestamp = browsingTimestamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/manga")) {
    // ----------- Lendo mangá & Vendo Informações do Mangá ----------- //
    if (
      document.querySelector(
        "#reader-wrapper > div.reader-navigation.clear-fix > div.series-info-container > div.series-info > div.series-title > span.title"
      ) === null
    ) {
      (presenceData.details = "Visualizando Mangá"),
        (data.state = (
          document.querySelector(
            "#series-data > div.series-info.touchcarousel > span.series-title > h1"
          ) as HTMLElement
        ).textContent);
      data.startTimestamp = browsingTimestamp;
      presence.setActivity(data);
    } else {
      presenceData.details = (
        document.querySelector(
          "#reader-wrapper > div.reader-navigation.clear-fix > div.series-info-container > div.series-info > div.series-title > span.title"
        ) as HTMLElement
      ).textContent;
      data.state = `Capítulo ${
        (
          document.querySelector(
            "#reader-wrapper > div.reader-navigation.clear-fix > div.chapter-selection-container > div.chapter-selection > span.current-chapter > em"
          ) as HTMLElement
        ).textContent
      }`;
      data.startTimestamp = browsingTimestamp;
      presence.setActivity(data);
    }
    data.startTimestamp = browsingTimestamp;
    presence.setActivity(data);
  }
  presence.setActivity(data);
});
