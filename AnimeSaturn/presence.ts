var presence = new Presence({
    clientId: "669254632400355358",
    mediaKeys: false
});

var browsingStamp = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

    let data: presenceData = {
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
var animeviewer = document.querySelector("head > title").textContent;
data.details = "Valuta se guardare:",
data.state = animeviewer.replace("AnimeSaturn - ","").replace(" Streaming SUB ITA e ITA", ""),
data.startTimestamp = browsingStamp;
presence.setActivity(data);
}
}
else if (document.location.pathname.match("/ep/")) {
var animefwt1 = document.querySelector("head > title").textContent;
var animefwt2 = animefwt1.replace("AnimeSaturn - ","").split(" Episodio")[0];
var animefwe = animefwt1.replace(animefwt2, "").replace("AnimeSaturn - ", "").replace("Episodio ", "").replace(" Streaming SUB ITA e ITA", "");
localStorage.setItem("Anime", animefwt2);
localStorage.setItem("Episode", animefwe);
data.details = "Sta per guardare: " + animefwt2,
data.state = "Episodio: " + animefwe,
data.startTimestamp = browsingStamp;
presence.setActivity(data);
} else if (document.location.pathname.match("/watch")) {
var animefwt2 = localStorage.getItem("Anime");
var animefwe = localStorage.getItem("Episode");
data.details = "Sta guardando: " + animefwt2,
data.state = "Episodio: " + animefwe,
data.startTimestamp = browsingStamp;
presence.setActivity(data);
}
}));
