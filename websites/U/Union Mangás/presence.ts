const presence = new Presence({
    clientId: "609791567540256780"
  }),
  startTimestamp = Math.floor(Date.now() / 1000),
  { pathname } = window.location,
  strings = presence.getStrings({
    browsing: "presence.activity.browsing"
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "union_lg",
    startTimestamp
  };

  if (pathname.startsWith("/lista-mangas")) {
    presenceData.details = "Procurando um mangá";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Procurando";
  } else if (pathname.startsWith("/manga")) {
    const mangaName = document.querySelector("div.col-md-12 > h2").textContent;
    presenceData.details = "Olhando um mangá";
    presenceData.state = mangaName;
  } else if (pathname.startsWith("/leitor")) {
    const [mangaName, mangaChapter] = document
      .querySelector(".titulo-leitura")
      .textContent.split(" - ");
    presenceData.details = mangaName;
    if (
      !document
        .querySelector("#paginas")
        .getAttribute("style")
        .match(/display:\Wnone/)
    ) {
      const mangaPage =
        (document.querySelector("#paginas") as HTMLSelectElement).options
          .selectedIndex + 1;
      presenceData.state = `${mangaChapter} - Página ${mangaPage}`;
    } else presenceData.state = mangaChapter;

    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = "Lendo";
  } else if (pathname.startsWith("/scans")) {
    presenceData.details = "Procurando uma Scan";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Procurando";
  } else presenceData.details = (await strings).browsing;

  presence.setActivity(presenceData, true);
});
