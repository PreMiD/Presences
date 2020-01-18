var presence = new Presence({
    clientId: "667275999288754182",
    mediaKeys: false
});

var browsingStamp = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

    let data: presenceData = {
        largeImageKey: "mwnew"
    };
		 if (document.location.pathname == ("/")) {
    data.details = "Navigando...",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
    else if (document.location.pathname.endsWith("/contact/")) {
    data.details = "Guardando i Termini e Condizioni",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/about-us/")) {
    data.details = "Guardando le Info su MangaWorld",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    }
    else if (document.location.href.endsWith("/user-settings/")) {
	data.details = "Nel suo profilo",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    }
	else if (document.location.href.endsWith("?tab=bookmark")) {
	data.details = "Nei suoi Preferiti",
	data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    }
	else if (document.location.href.endsWith("?tab=history")) {
    data.details = "Nella sua Cronologia",
	data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
	else if (document.location.href.endsWith("?tab=reader-settings")) {
    data.details = "Nelle sue Opzioni",
	data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
	else if (document.location.href.endsWith("?tab=account-settings")) {
    data.details = "Nelle sue Impostazioni",
	data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
    else if (document.location.pathname.endsWith("/listing-simple-list/")) {
    data.details = "Sfogliando le Ultime Uscite",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
    else if (document.location.pathname.startsWith("/manga-genre/")) {
	var mangaexploring = document.querySelector("head > title").textContent;
    data.details = "Naviga nel Genere:",
	data.state = mangaexploring.replace("MangaWorld","").replace(/–/g, ""),
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
    else if (document.location.pathname.startsWith("/manga-release/")) {
	var mangarelease = document.querySelector("head > title").textContent;
    data.details = "Naviga nei manga del " + mangarelease.replace("MangaWorld","").replace(/–/g, ""),
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
    else if (document.location.pathname.startsWith("/manga/")) {
	var mangauno = document.querySelector("head > title").textContent;
	var mangadue = mangauno.replace(" MangaWorld","").replace( /–/g, "");
	if (document.location.pathname.match("/capitolo")) {
	var capitolouno = document.querySelector("meta[property='og:title']").getAttribute("content");
	var capitolodue = capitolouno.replace(mangadue, "").replace(/-/g, "").replace("MangaWorld", "").replace("Capitolo", "Capitolo: ");
    data.details = "Legge il Manga: " + mangadue,
	data.state = capitolodue,
	data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
    else if (document.location.href.endsWith("/?m_orderby=trending")) {
    data.details = "Visualizza le Tendenze",
	data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
    else {
    data.details = "Visualizza il Manga:",
	data.state = mangadue,
	data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
	}
    else if (document.location.pathname.startsWith("/manga-artist/")) {
	var mangaartist = document.querySelector("head > title").textContent;
    data.details = "Visualizza l'Artista:",
	data.state = mangaartist.replace("MangaWorld","").replace(/–/g, ""),
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
    else if (document.location.pathname.startsWith("/manga-author/")) {
	var mangaauthor = document.querySelector("head > title").textContent;
    data.details = "Visualizza l'Autore:",
	data.state = mangaauthor.replace("MangaWorld","").replace(/–/g, ""),
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    };
});
