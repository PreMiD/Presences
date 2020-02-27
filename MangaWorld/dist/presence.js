var presence = new Presence({
    clientId: "667275999288754182",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    let data = {
        largeImageKey: "mwnew"
    };
    if (document.location.href == ("https://mangaworld.biz/")) {
        data.smallImageKey = "search",
            data.details = "Navigando...",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/about-us/")) {
        data.smallImageKey = "tec",
            data.details = "Guardando i Termini e Condizioni",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/contact/")) {
        data.smallImageKey = "info",
            data.details = "Guardando le Info su MangaWorld",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.endsWith("/user-settings/")) {
        data.smallImageKey = "profile",
            data.details = "Nel suo profilo",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.endsWith("?tab=bookmark")) {
        data.smallImageKey = "favorite",
            data.details = "Nei suoi Preferiti",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.endsWith("?tab=history")) {
        data.smallImageKey = "history",
            data.details = "Nella sua Cronologia",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.endsWith("?tab=reader-settings")) {
        data.smallImageKey = "settings",
            data.details = "Nelle sue Opzioni",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.endsWith("?tab=account-settings")) {
        data.smallImageKey = "settings",
            data.details = "Nelle sue Impostazioni",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/listing-simple-list/")) {
        data.smallImageKey = "new",
            data.details = "Sfogliando le Ultime Uscite",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.includes("/?s=")) {
        if (document.location.pathname.startsWith("/page/")) {
            data.smallImageKey = "search",
                data.details = "Sta cercando: " + document.title.replace("Risultati della ricerca per “", "").split("” – ")[0],
                data.state = document.title.split("” – ")[1].replace(" – MangaWorld", "").replace("Pagina", "Pagina:")
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        } else {
            data.smallImageKey = "search",
                data.details = "Sta cercando: " + document.title.replace("Risultati della ricerca per “", "").split("” – ")[0],
                data.state = "Pagina: 1",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
    }
    else if (document.location.pathname.startsWith("/manga-genre/")) {
        if (document.location.pathname.startsWith("/manga-genre/drama/page/")) {
            data.smallImageKey = "search",
                data.details = "Naviga nel Genere:",
                data.state = document.title.replace(" – MangaWorld", "").replace(" – Pagina", "｜Pag. "),
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        } else {
            data.smallImageKey = "search",
                data.details = "Naviga nel Genere:",
                data.state = document.title.replace(" – MangaWorld", ""),
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
    }
    else if (document.location.pathname.startsWith("/manga/")) {
        if (document.location.pathname.match("/capitolo")) {
            var chapternumber = document.location.href.split("capitolo-")[1].split("/p/")[0].replace("-", ".");
            var pagenumber = document.location.href.split("/p/")[1].replace("/", "");
            data.smallImageKey = "reading",
                data.details = "Legge: " + document.title.replace(" – MangaWorld", ""),
                data.state = "Capitolo: " + chapternumber + "｜Pag. " + pagenumber,
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        } else if (document.location.pathname.match("/oneshot")) {
            var pagenumber = document.location.href.split("/p/")[1].replace("/", "");
            data.smallImageKey = "reading",
                data.details = "Legge: " + document.title.replace(" – MangaWorld", ""),
                data.state = "Oneshot｜Pag. " + pagenumber,
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.href.endsWith("/?m_orderby=trending")) {
            data.smallImageKey = "trending",
                data.details = "Visualizza le Tendenze",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            data.smallImageKey = "viewing",
                data.details = "Visualizza il Manga:",
                data.state = document.title.replace(" – MangaWorld", ""),
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
    }
    else if (document.location.pathname.startsWith("/manga-release/")) {
        data.smallImageKey = "search",
            data.details = "Naviga nei manga del " + document.title.replace(" – MangaWorld", ""),
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/manga-artist/")) {
        data.smallImageKey = "search",
            data.details = "Visualizza l'Artista:",
            data.state = document.title.replace(" – MangaWorld", ""),
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/manga-author/")) {
        data.smallImageKey = "search",
            data.details = "Visualizza l'Autore:",
            data.state = document.title.replace(" – MangaWorld", ""),
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    };
});
