const presence = new Presence({
  clientId: "667275999288754182"
});

const browsingStamp = Math.floor(Date.now() / 1000);
let manganame;
let chapternumber;
let pagenumber;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "mwnew"
  };

  if (document.location.href == "https://mangaworld.cc") {
    data.smallImageKey = "search";
    data.smallImageText = "Homepage";
    data.details = "Navigando...";
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.endsWith("/about-us/")) {
    data.smallImageKey = "tec";
    data.smallImageText = "Termini e Condizioni";
    data.details = "Guardando i Termini e Condizioni";
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.endsWith("/contact/")) {
    data.smallImageKey = "info";
    data.smallImageText = "Info";
    data.details = "Guardando le Info su MangaWorld";
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.href.endsWith("/user-settings/")) {
    data.smallImageKey = "profile";
    data.smallImageText = "Profilo";
    data.details = "Nel suo profilo";
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.href.endsWith("?tab=bookmark")) {
    data.smallImageKey = "favorite";
    data.smallImageText = "Preferiti";
    data.details = "Nei suoi Preferiti";
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.href.endsWith("?tab=history")) {
    data.smallImageKey = "history";
    data.smallImageText = "Cronologia";
    data.details = "Nella sua Cronologia";
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.href.endsWith("?tab=reader-settings")) {
    data.smallImageKey = "settings";
    data.smallImageText = "Opzioni";
    data.details = "Nelle sue Opzioni";
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.href.endsWith("?tab=account-settings")) {
    data.smallImageKey = "settings";
    data.smallImageText = "Impostazioni";
    data.details = "Nelle sue Impostazioni";
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.endsWith("/listing-simple-list/")) {
    data.smallImageKey = "new";
    data.smallImageText = "Nuove Uscito";
    data.details = "Sfogliando le Ultime Uscite";
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.href.includes("/?s=")) {
    if (document.location.pathname.startsWith("/page/")) {
      data.smallImageKey = "search";
      data.smallImageText = document.title
        .split("cercato ")[1]
        .split(" - Pagina")[0];
      data.details =
        "Sta cercando: " +
        document.title.split("cercato ")[1].split(" - Pagina")[0];
      data.state = document.title
        .split(" - ")[1]
        .replace(" - MangaWorld", "")
        .split(" di")[0]
        .replace("Pagina", "Pagina:");
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    } else {
      data.smallImageKey = "search";
      data.smallImageText = document.title
        .split("cercato ")[1]
        .split(" - MangaWorld")[0];
      data.details =
        "Sta cercando: " +
        document.title.split("cercato ")[1].split(" - MangaWorld")[0];
      data.state = "Pagina: 1";
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    }
  } else if (document.location.pathname.startsWith("/manga-genre/")) {
    if (document.location.pathname.includes("/page/")) {
      data.smallImageKey = "search";
      data.smallImageText = document.title.split(" Archivi")[0];
      data.details = "Naviga nel Genere:";
      data.state =
        document.title.split(" Archivi")[0] +
        document.title
          .split(" Archivi")[1]
          .split(" - MangaWorld")[0]
          .split(" di")[0]
          .replace(" - Pagina ", "｜Pag. ");
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    } else {
      data.smallImageKey = "search";
      data.smallImageText = document.title.split(" Archivi")[0];
      data.details = "Naviga nel Genere:";
      data.state = document.title.split(" Archivi")[0] + "｜Pag. 1";
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    }
  } else if (document.location.pathname.startsWith("/manga/")) {
    if (document.location.pathname.match("/capitolo")) {
      manganame = document.title
        .replace(" - MangaWorld", "")
        .replace(" scan ITA", "");
      if (manganame.includes("- Scan ITA")) {
        manganame = manganame.replace(" - Scan ITA", "");
      }
      chapternumber = document.location.href
        .split("capitolo-")[1]
        .split("/p/")[0]
        .replace("-", ".");
      pagenumber = document.location.href.split("/p/")[1].replace("/", "");
      data.smallImageKey = "reading";
      data.smallImageText = "Legge";
      data.details = "Legge: " + manganame;
      data.state = "Capitolo: " + chapternumber + "｜Pag. " + pagenumber;
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    } else if (document.location.pathname.match("/oneshot")) {
      pagenumber = document.location.href.split("/p/")[1].replace("/", "");
      manganame = document.title
        .replace(" - MangaWorld", "")
        .replace(" scan ITA", "");
      if (manganame.includes("- Scan ITA")) {
        manganame = manganame.replace(" - Scan ITA", "");
      }
      data.smallImageKey = "reading";
      data.smallImageText = "Legge";
      data.details = "Legge: " + manganame;
      data.state = "Oneshot｜Pag. " + pagenumber;
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    } else if (document.location.href.endsWith("/?m_orderby=trending")) {
      data.smallImageKey = "trending";
      data.smallImageText = "Tendenze";
      data.details = "Visualizza le Tendenze";
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    } else {
      manganame = document.title
        .replace(" - MangaWorld", "")
        .replace(" scan ITA", "");
      if (manganame.includes("- Scan ITA")) {
        manganame = manganame.replace(" - Scan ITA", "");
      }
      data.smallImageKey = "viewing";
      data.smallImageText = "Visualizza";
      data.details = "Visualizza il Manga:";
      data.state = manganame;
      data.startTimestamp = browsingStamp;
      presence.setActivity(data);
    }
  } else if (document.location.pathname.startsWith("/manga-release/")) {
    data.smallImageKey = "search";
    data.smallImageText = document.title.split("Archivi - ")[0];
    data.details =
      "Naviga nei manga del " + document.title.split("Archivi - ")[0];
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/manga-artist/")) {
    data.smallImageKey = "search";
    data.smallImageText = document.title.split("Archivi - ")[0];
    data.details = "Visualizza l'Artista:";
    data.state = document.title.split("Archivi - ")[0];
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  } else if (document.location.pathname.startsWith("/manga-author/")) {
    data.smallImageKey = "search";
    data.smallImageText = document.title.split("Archivi - ")[0];
    data.details = "Visualizza l'Autore:";
    data.state = document.title.split("Archivi - ")[0];
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
  }
});
