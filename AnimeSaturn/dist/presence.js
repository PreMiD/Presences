var presence = new Presence({
    clientId: "669254632400355358",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "asnew"
    };
		 if (document.location.pathname == ("/")) {
    data.details = "Navigando...",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/info")) {
    data.details = "Nelle Info del Sito",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
    else if (document.location.pathname.endsWith("/animelist")) {
    data.details = "Sfogliando l'Archivio",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/animeincorso")) {
    data.details = "Sfogliando gli Anime",
	data.state = "in Corso",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/toplist")) {
    data.details = "Guarda la TOP List degli",
	data.state = "Anime",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/calendario")) {
    data.details = "Consulta il Calendario",
	data.state = "delle uscite settimanali",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
    else if (document.location.pathname.startsWith("/anime/")) {
	var animev = document.querySelector("head > title").textContent;
    data.details = "Valuta se guardare:",
	data.state = animev.replace("AnimeSaturn - ","").replace(" Streaming SUB ITA e ITA", ""),
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
	else if (document.location.pathname.match("/ep/")) {
	var animeept1 = document.querySelector("head > title").textContent;
	var animeept = animeept1.replace("AnimeSaturn - ","").split(" Episodio")[0];
	var animeepe = animeept1.replace(animeept, "").replace("AnimeSaturn - ", "").replace("Episodio ", "").replace(" Streaming SUB ITA e ITA", "");
    localStorage.setItem("Anime", animeept);
    localStorage.setItem("Episode", animeepe);
    data.details = "Sta per guardare: " + animeept,
	data.state = "Episodio: " + animeepe,
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    } else if (document.location.pathname.match("/watch")) {
    var animewt = localStorage.getItem("Anime");
    var animewe = localStorage.getItem("Episode");
    data.details = "Sta guardando: " + animewt,
    data.state = "Episodio: " + animewe,
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    }
    }));
