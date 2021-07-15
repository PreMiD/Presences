const presence = new Presence({
  clientId: "738809940696629270"
});

interface interfaceMapping {
  [key: string]: string;
}

const hitomiTypeMapping: interfaceMapping = {
    manga: "manga",
    doujinshi: "dj",
    cg: "acg",
    gamecg: "cg",
    anime: "anime"
  },
  pathMapping: interfaceMapping = {
    "/index-indonesian.html": "indonesian",
    "/index-catalan.html": "catalan",
    "/index-cebuano.html": "cebuano",
    "/index-czech.html": "czech",
    "/index-danish.html": "danish",
    "/index-german.html": "german",
    "/index-estonian.html": "estonian",
    "/index-english.html": "english",
    "/index-spanish.html": "spanish",
    "/index-esperanto.html": "esperanto",
    "/index-french.html": "french",
    "/index-italian.html": "italian",
    "/index-javanese.html": "javanese",
    "/index-latin.html": "latin",
    "/index-hungarian.html": "hungarian",
    "/index-dutch.html": "dutch",
    "/index-norwegian.html": "norwegian",
    "/index-polish.html": "polish",
    "/index-portuguese.html": "portuguese",
    "/index-romanian.html": "romanian",
    "/index-serbian.html": "serbian",
    "/index-albanian.html": "albanian",
    "/index-slovak.html": "slovak",
    "/index-finnish.html": "finnish",
    "/index-swedish.html": "swedish",
    "/index-tagalog.html": "tagalog",
    "/index-vietnamese.html": "vietnamese",
    "/index-turkish.html": "turkish",
    "/index-greek.html": "greek",
    "/index-bulgarian.html": "bulgarian",
    "/index-mongolian.html": "mongolian",
    "/index-russian.html": "russian",
    "/index-ukrainian.html": "ukrainian",
    "/index-hebrew.html": "hebrew",
    "/index-arabic.html": "arabic",
    "/index-persian.html": "persian",
    "/index-thai.html": "thai",
    "/index-korean.html": "korean",
    "/index-chinese.html": "chinese",
    "/index-japanese.html": "japanese"
  },
  // /(type)/(title)-(lang)-(number).html
  validateInfoUrl = /\/(.+)\/(.+)-(.+)-(\d+).html/,
  // (number)
  validateReaderUrl = /\/reader\/(\d+).html/;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "app"
  };

  presenceData.details = "Viewing recently added list";
  presenceData.state = "Home";

  if (document.location.pathname in pathMapping) {
    presenceData.details = "Viewing recently added list";
    presenceData.state = pathMapping[document.location.pathname];
  }

  if (validateInfoUrl.exec(document.location.pathname)) {
    const parsedUrl = validateInfoUrl.exec(document.location.pathname),
      type = hitomiTypeMapping[parsedUrl[1]];
    let title = document.querySelector(
      `body > div > div.content > div.gallery.${type}-gallery > h1 > a`
    ).textContent;

    if (title.length > 128) title = `${title.slice(0, 120)}...`;

    presenceData.details = title;
    presenceData.state = `${
      document.querySelector(
        `body > div > div.content > div.gallery.${type}-gallery > h2 > ul > li > a`
      ).textContent
    } (${parsedUrl[4]})`;
    presenceData.buttons = [
      { label: "View Page", url: document.location.href }
    ];
  }

  if (validateReaderUrl.exec(document.location.pathname)) {
    let title = document.title.replace(" | Hitomi.la", "");

    if (title.length > 128) title = `${title.slice(0, 120)}...`;

    const selectValue = document.querySelector(
        "#single-page-select"
      ) as HTMLSelectElement,
      totalPage = selectValue.options[selectValue.options.length - 1].value;
    presenceData.details = title;
    presenceData.state = `Reading page ${document.location.hash.replace(
      "#",
      ""
    )} of ${totalPage} (${
      validateReaderUrl.exec(document.location.pathname)[1]
    })`;
    presenceData.buttons = [
      { label: "View Page", url: document.location.href }
    ];
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
