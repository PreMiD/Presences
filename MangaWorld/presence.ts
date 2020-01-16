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
    } else if (document.location.pathname.endsWith("/contact/")) {
        data.details = "Guardando i Termini e Condizioni",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    } else if (document.location.pathname.endsWith("/about-us/")) {
        data.details = "Guardando le Info su MangaWorld",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/user-settings/")) {
        data.details = "Nel suo profilo",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    } else if (document.location.pathname.endsWith("/listing-simple-list/")) {
        data.details = "Sfogliando le Novità",
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/manga/")) {
		var mangauno = document.querySelector("head > title").textContent;
		   if (document.location.pathname.match("/capitolo")) {
        data.details = "Legge il Manga:",
		data.state = mangauno.replace("MangaWorld","").replace(/–/g, ""),
		data.startTimestamp = browsingStamp;
        presence.setActivity(data);
		} else {
        data.details = "Viewing Top Chapters",
        data.startTimestamp = browsingStamp
        presence.setActivity(data);
        }
	} else if (document.location.pathname.startsWith("/manga-genre/")) {
		var mangaexploring = document.querySelector("head > title").textContent;
        data.details = "Naviga nel Genere:",
		data.state = mangaexploring.replace("MangaWorld","").replace(/–/g, ""),
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    };
});