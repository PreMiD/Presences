const presence = new Presence({
    clientId: "678265146883178519"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
const browsingStamp = Math.floor(Date.now() / 1000);
let iFrameVideo, currentTime, duration, paused, playback;
presence.on("iFrameData", (data) => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.duration;
        paused = data.iframe_video.paused;
    }
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "pokemonlogo"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname == "/") {
        presenceData.smallImageKey = "home";
        presenceData.smallImageText = "Homepage";
        presenceData.details = "Nella homepage";
    }
    else if (document.location.pathname.startsWith("/contact")) {
        presenceData.smallImageKey = "info";
        presenceData.smallImageText = "Contatti";
        presenceData.details = "Sta guardando informazioni";
        presenceData.state = "su AnimeWorld";
    }
    else if (document.location.pathname.startsWith("/user/")) {
        if (document.location.pathname.startsWith("/user/settings")) {
            presenceData.smallImageKey = "settings";
            presenceData.smallImageText = "Impostazioni";
            presenceData.details = "Nelle sue impostazioni";
        }
        else if (document.location.href.includes("watchlist")) {
            presenceData.smallImageKey = "wlsettings";
            presenceData.smallImageText = "Imposta la WatchList";
            presenceData.details = "Sta modificando la";
            presenceData.state = "sua WatchList";
        }
        else if (document.location.pathname.startsWith("/user/import")) {
            presenceData.smallImageKey = "import";
            presenceData.smallImageText = "Importa la WatchList";
            presenceData.details = "Sta importando la sua";
            presenceData.state = "WatchList da MAL";
        }
        else if (document.location.pathname.startsWith("/user/notifications")) {
            presenceData.smallImageKey = "notifications";
            presenceData.smallImageText = "Notifiche";
            presenceData.details = "Sfoglia le notifiche";
        }
        else {
            presenceData.smallImageKey = "settings";
            presenceData.smallImageText = "Impostazioni";
            presenceData.details = "Nelle impostazioni";
        }
    }
    else if (document.location.pathname.startsWith("/profile")) {
        if (document.location.href.includes("watchlist")) {
            const usernamewl = document.title.split("Watchlist di ")[1];
            presenceData.smallImageKey = "userwl";
            presenceData.smallImageText = "WatchList di " + usernamewl;
            presenceData.details = "Guarda la WatchList di:";
            presenceData.state = usernamewl;
        }
        else {
            const username = document.title.split("Profilo di ")[1];
            presenceData.smallImageKey = "user";
            presenceData.smallImageText = "Profilo di " + username;
            presenceData.details = "Guarda il profilo di:";
            presenceData.state = username;
        }
    }
    else if (document.location.pathname.startsWith("/genre")) {
        if (document.location.href.includes("?page=")) {
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Genere: " + document.title.split('"')[1];
            presenceData.details = "Nel genere: " + document.title.split('"')[1];
            presenceData.state = "Pagina: " + document.location.href.split("=")[1];
        }
        else {
            presenceData.smallImageKey = "search";
            presenceData.smallImageText =
                "Nel genere: " + document.title.split('"')[1];
            presenceData.details = "Nel genere: " + document.title.split('"')[1];
            presenceData.state = "Pagina: 1";
        }
    }
    else if (document.location.pathname.startsWith("/newest")) {
        if (document.location.href.includes("newest?page=")) {
            presenceData.smallImageKey = "new";
            presenceData.smallImageText = "Nuove aggiunte";
            presenceData.details = "Sfoglia le nuove aggiunte";
            presenceData.state =
                "Pagina: " + document.location.href.split("newest?page=")[1];
        }
        else {
            presenceData.smallImageKey = "new";
            presenceData.smallImageText = "Nuove aggiunte";
            presenceData.details = "Sfoglia le nuove aggiunte";
            presenceData.state = "Pagina: 1";
        }
    }
    else if (document.location.pathname.startsWith("/updated")) {
        if (document.location.href.includes("updated?page=")) {
            presenceData.smallImageKey = "new";
            presenceData.smallImageText = "Nuovi episodi";
            presenceData.details = "Sfoglia i nuovi episodi";
            presenceData.state =
                "Pagina: " + document.location.href.split("updated?page=")[1];
        }
        else {
            presenceData.smallImageKey = "new";
            presenceData.smallImageText = "Nuovi episodi";
            presenceData.details = "Sfoglia i nuovi episodi";
            presenceData.state = "Pagina: 1";
        }
    }
    else if (document.location.pathname.startsWith("/ongoing")) {
        if (document.location.href.includes("ongoing?page=")) {
            presenceData.smallImageKey = "schedule";
            presenceData.smallImageText = "Anime in corso";
            presenceData.details = "Sfoglia gli anime in";
            presenceData.state =
                "corso. Pagina: " + document.location.href.split("ongoing?page=")[1];
        }
        else {
            presenceData.smallImageKey = "schedule";
            presenceData.smallImageText = "Anime in corso";
            presenceData.details = "Sfoglia gli anime in";
            presenceData.state = "corso. Pagina: 1";
        }
    }
    else if (document.location.pathname.startsWith("/upcoming")) {
        presenceData.smallImageKey = "clock";
        presenceData.smallImageText = "Prossime uscite";
        presenceData.details = "Sfoglia le prossime";
        presenceData.state = "uscite";
    }
    else if (document.location.pathname.startsWith("/az-list")) {
        if (document.location.href.includes("?page=")) {
            presenceData.smallImageKey = "archive";
            presenceData.smallImageText = "Archivio";
            presenceData.details = "Sfoglia tutti gli anime";
            presenceData.state = "Pagina: " + document.location.href.split("=")[1];
        }
        else {
            presenceData.smallImageKey = "archive";
            presenceData.smallImageText = "Archivio";
            presenceData.details = "Sfoglia tutti gli anime";
            presenceData.state = "Pagina: 1";
        }
    }
    else if (document.location.pathname.startsWith("/schedule")) {
        presenceData.smallImageKey = "schedule";
        presenceData.smallImageText = "Calendario";
        presenceData.details = "Consulta il calendario degli";
        presenceData.state = "anime";
    }
    else if (document.location.pathname.startsWith("/search")) {
        presenceData.smallImageKey = "search";
        presenceData.smallImageText =
            "Cerca : " + document.title.replace("AnimeWorld: ", "");
        presenceData.details = "Sta cercando:";
        presenceData.state = document.title.replace("AnimeWorld: ", "");
    }
    else if (document.location.pathname.startsWith("/news")) {
        if (document.location.pathname == "/news" ||
            document.location.pathname == "/news/") {
            if (document.location.href.includes("?page=")) {
                presenceData.smallImageKey = "paper";
                presenceData.smallImageText = "Notizie";
                presenceData.details = "Legge le notizie";
                presenceData.state = "Pagina: " + document.location.href.split("=")[1];
            }
            else {
                presenceData.smallImageKey = "paper";
                presenceData.smallImageText = "Notizie";
                presenceData.details = "Legge le notizie";
                presenceData.state = "Pagina: 1";
            }
        }
        else {
            const newsName = document.title.split("~ ")[1];
            presenceData.smallImageKey = "paper";
            presenceData.smallImageText = newsName;
            presenceData.details = "Legge la notizia:";
            presenceData.state = newsName;
        }
    }
    else if (document.location.href.includes("filter")) {
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Ricerca avanzata";
        presenceData.details = "Sta facendo una ricerca";
        presenceData.state = "avanzata";
    }
    else if (document.location.pathname.startsWith("/tv-series")) {
        if (document.location.href.includes("tv-series?page=")) {
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Categoria: Anime";
            presenceData.details = "Nella categoria: Anime";
            presenceData.state =
                "Pagina: " + document.location.href.split("tv-series?page=")[1];
        }
        else {
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Categoria: Anime";
            presenceData.details = "Nella categoria: Anime";
            presenceData.state = "Pagina: 1";
        }
    }
    else if (document.location.pathname.startsWith("/movies")) {
        if (document.location.href.includes("movies?page=")) {
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Categoria: Film";
            presenceData.details = "Nella categoria: Film";
            presenceData.state =
                "Pagina: " + document.location.href.split("movies?page=")[1];
        }
        else {
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Categoria: Film";
            presenceData.details = "Nella categoria: Film";
            presenceData.state = "Pagina: 1";
        }
    }
    else if (document.location.pathname.startsWith("/ova")) {
        if (document.location.href.includes("ova?page=")) {
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Categoria: OVA";
            presenceData.details = "Nella categoria: OVA";
            presenceData.state =
                "Pagina: " + document.location.href.split("ova?page=")[1];
        }
        else {
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Categoria: OVA";
            presenceData.details = "Nella categoria: OVA";
            presenceData.state = "Pagina: 1";
        }
    }
    else if (document.location.pathname.startsWith("/ona")) {
        if (document.location.href.includes("ona?page=")) {
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Categoria: ONA";
            presenceData.details = "Nella categoria: ONA";
            presenceData.state =
                "Pagina: " + document.location.href.split("ona?page=")[1];
        }
        else {
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Categoria: ONA";
            presenceData.details = "Nella categoria: ONA";
            presenceData.state = "Pagina: 1";
        }
    }
    else if (document.location.pathname.startsWith("/specials")) {
        if (document.location.href.includes("specials?page=")) {
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Categoria: Specials";
            presenceData.details = "Nella categoria: Specials";
            presenceData.state =
                "Pagina: " + document.location.href.split("specials?page=")[1];
        }
        else {
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Categoria: Specials";
            presenceData.details = "Nella categoria: Specials";
            presenceData.state = "Pagina: 1";
        }
    }
    else if (document.location.pathname.startsWith("/preview")) {
        if (document.location.href.includes("preview?page=")) {
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Categoria: Preview";
            presenceData.details = "Nella categoria: Preview";
            presenceData.state =
                "Pagina: " + document.location.href.split("preview?page=")[1];
        }
        else {
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Categoria: Preview";
            presenceData.details = "Nella categoria: Preview";
            presenceData.state = "Pagina: 1";
        }
    }
    else if (document.location.pathname.startsWith("/watch")) {
        const releaseDate = document.querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(4)").textContent;
        const author = document.querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(8)").textContent;
        const episode = document.querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(2) > dd:nth-child(8) > font").textContent;
        const vote = document.querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(2) > dd.rating > span:nth-child(1)").textContent;
        const visual = document.querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(2) > dd:nth-child(10)").textContent;
        if (document.querySelector("#animeId > div > img") != null) {
            let newname = document.title
                .split("AnimeWorld: ")[1]
                .split(" Streaming & ")[0];
            if (newname.includes("(ITA)")) {
                newname = newname.split(" (ITA)")[0];
            }
            presenceData.smallImageKey = "new";
            presenceData.smallImageText = newname;
            presenceData.details = "Guarda l'annunciato:\n" + newname;
            presenceData.state =
                "Per più informazioni 🎦\n" +
                    "\nUscirà il: " +
                    releaseDate +
                    "\n" +
                    "Episodi: " +
                    episode +
                    "\n" +
                    "Autore: " +
                    author +
                    "\n" +
                    "Voto: " +
                    vote +
                    "\n" +
                    "Visualizzazioni: " +
                    visual;
        }
        else {
            if (document
                .querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(2)")
                .textContent.includes("Anime")) {
                let animename = document.title
                    .replace("AnimeWorld: ", "")
                    .split(" Episodio")[0];
                if (animename.includes("(ITA)")) {
                    animename = animename.split(" (ITA)")[0];
                }
                const animenumber = document.querySelector("#episode-comment > span")
                    .textContent;
                const timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
                if (iFrameVideo == true && !isNaN(duration)) {
                    if (currentTime == duration) {
                        presenceData.smallImageKey = "pause";
                        presenceData.smallImageText =
                            animename + "｜Episodio: " + animenumber;
                        presenceData.details = "Guardando: " + animename;
                        presenceData.state = "Ep. " + animenumber + "｜Finito";
                    }
                    else if (currentTime != duration) {
                        presenceData.smallImageKey = paused ? "pause" : "play";
                        presenceData.smallImageText =
                            animename + "｜Episodio: " + animenumber;
                        presenceData.details = "Guardando: " + animename;
                        presenceData.startTimestamp = paused ? null : timestamps[0];
                        presenceData.state = paused
                            ? "Ep. " + animenumber + "｜In pausa"
                            : "Ep. " + animenumber + "｜In riproduzione";
                        presenceData.endTimestamp = paused ? null : timestamps[1];
                    }
                }
                else {
                    presenceData.smallImageKey = "watching";
                    presenceData.smallImageText =
                        animename + "｜Episodio: " + animenumber;
                    presenceData.details = "Sta per guardare:\n" + animename;
                    presenceData.state =
                        "Per più informazioni 🎦\n" +
                            "\nUscito il: " +
                            releaseDate +
                            "\n" +
                            "Episodio: " +
                            animenumber +
                            "\n" +
                            "Autore: " +
                            author +
                            "\n" +
                            "Voto: " +
                            vote +
                            "\n" +
                            "Visualizzazioni: " +
                            visual;
                }
            }
            else if (document
                .querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(2)")
                .textContent.includes("Movie")) {
                let moviename = document.title
                    .replace("AnimeWorld: ", "")
                    .split(" Episodio")[0];
                if (moviename.includes("(ITA)")) {
                    moviename = moviename.split(" (ITA)")[0];
                }
                const timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
                if (iFrameVideo == true && !isNaN(duration)) {
                    if (currentTime == duration) {
                        presenceData.smallImageKey = "pause";
                        presenceData.smallImageText = moviename;
                        presenceData.details = "Guardando: " + moviename;
                        presenceData.state = "Film ｜Finito";
                    }
                    else if (currentTime != duration) {
                        presenceData.smallImageKey = paused ? "pause" : "play";
                        presenceData.smallImageText = moviename;
                        presenceData.details = "Guardando: " + moviename;
                        presenceData.state = paused
                            ? "Film｜In pausa"
                            : "Film｜In riproduzione";
                        presenceData.startTimestamp = paused ? null : timestamps[0];
                        presenceData.endTimestamp = paused ? null : timestamps[1];
                    }
                }
                else {
                    presenceData.smallImageKey = "watching";
                    presenceData.smallImageText = moviename;
                    presenceData.details = "Sta per guardare il film:\n" + moviename;
                    presenceData.state =
                        "Per più informazioni 🎦\n" +
                            "\nUscito il: " +
                            releaseDate +
                            "\n" +
                            "Autore: " +
                            author +
                            "\n" +
                            "Voto: " +
                            vote +
                            "\n" +
                            "Visualizzazioni: " +
                            visual;
                    presenceData.startTimestamp = browsingStamp;
                }
            }
            else if (document
                .querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(2)")
                .textContent.includes("OVA")) {
                let oavname = document.title
                    .replace("AnimeWorld: ", "")
                    .split(" Episodio")[0];
                if (oavname.includes("(ITA)")) {
                    oavname = oavname.split(" (ITA)")[0];
                }
                const oavnumber = document.querySelector("#episode-comment > span")
                    .textContent;
                const timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
                if (iFrameVideo == true && !isNaN(duration)) {
                    if (currentTime == duration) {
                        presenceData.smallImageKey = "pause";
                        presenceData.smallImageText = oavname + "｜" + oavnumber + "° OAV";
                        presenceData.details = "Guardando: " + oavname;
                        presenceData.state = oavnumber + "° OAV｜Finito";
                    }
                    else if (currentTime != duration) {
                        presenceData.smallImageKey = paused ? "pause" : "play";
                        presenceData.smallImageText = oavname + "｜" + oavnumber + "° OAV";
                        presenceData.details = "Guardando: " + oavname;
                        presenceData.startTimestamp = paused ? null : timestamps[0];
                        presenceData.state = paused
                            ? oavnumber + "° OAV｜In pausa"
                            : oavnumber + "° OAV｜In riproduzione";
                        presenceData.endTimestamp = paused ? null : timestamps[1];
                    }
                }
                else {
                    presenceData.smallImageKey = "watching";
                    presenceData.smallImageText = oavname + "｜" + oavnumber + "° OAV";
                    presenceData.details = "Sta per guardare:\n" + oavname;
                    presenceData.state =
                        "Per più informazioni 🎦\n" +
                            "\nUscito il: " +
                            releaseDate +
                            "\n" +
                            oavnumber +
                            "° OAV\n" +
                            "Autore: " +
                            author +
                            "\n" +
                            "Voto: " +
                            vote +
                            "\n" +
                            "Visualizzazioni: " +
                            visual;
                }
            }
            else if (document
                .querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(2)")
                .textContent.includes("ONA")) {
                let onaname = document.title
                    .replace("AnimeWorld: ", "")
                    .split(" Episodio")[0];
                if (onaname.includes("(ITA)")) {
                    onaname = onaname.split(" (ITA)")[0];
                }
                const onanumber = document.querySelector("#episode-comment > span")
                    .textContent;
                const timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
                if (iFrameVideo == true && !isNaN(duration)) {
                    if (currentTime == duration) {
                        presenceData.smallImageKey = "pause";
                        presenceData.smallImageText = onaname + "｜" + onanumber + "° ONA";
                        presenceData.details = "Guardando: " + onaname;
                        presenceData.state = onanumber + "° ONA｜Finito";
                    }
                    else if (currentTime != duration) {
                        presenceData.smallImageKey = paused ? "pause" : "play";
                        presenceData.smallImageText = onaname + "｜" + onanumber + "° ONA";
                        presenceData.details = "Guardando: " + onaname;
                        presenceData.state = paused
                            ? onanumber + "° ONA｜In pausa"
                            : onanumber + "° ONA｜In riproduzione";
                        presenceData.startTimestamp = paused ? null : timestamps[0];
                        presenceData.endTimestamp = paused ? null : timestamps[1];
                    }
                }
                else {
                    presenceData.smallImageKey = "watching";
                    presenceData.smallImageText = onaname + "｜" + onanumber + "° ONA";
                    presenceData.details = "Sta per guardare:\n" + onaname;
                    presenceData.state =
                        "Per più informazioni 🎦\n" +
                            "\nUscito il: " +
                            releaseDate +
                            "\n" +
                            onanumber +
                            "° ONA\n" +
                            "Autore: " +
                            author +
                            "\n" +
                            "Voto: " +
                            vote +
                            "\n" +
                            "Visualizzazioni: " +
                            visual;
                }
            }
            else if (document
                .querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(2)")
                .textContent.includes("Special")) {
                let specialname = document.title
                    .replace("AnimeWorld: ", "")
                    .split(" Episodio")[0];
                if (specialname.includes("(ITA)")) {
                    specialname = specialname.split(" (ITA)")[0];
                }
                const specialnumber = document.querySelector("#episode-comment > span")
                    .textContent;
                const timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
                if (iFrameVideo == true && !isNaN(duration)) {
                    if (currentTime == duration) {
                        presenceData.smallImageKey = "pause";
                        presenceData.smallImageText =
                            specialname + "｜" + specialnumber + "° Special";
                        presenceData.details = "Guardando: " + specialname;
                        presenceData.state = specialnumber + "° Special｜Finito";
                    }
                    else if (currentTime != duration) {
                        presenceData.smallImageKey = paused ? "pause" : "play";
                        presenceData.smallImageText =
                            specialname + "｜" + specialnumber + "° Special";
                        presenceData.details = "Guardando: " + specialname;
                        presenceData.state = paused
                            ? specialnumber + "° Special｜In pausa"
                            : specialnumber + "° Special｜In riproduzione";
                        presenceData.startTimestamp = paused ? null : timestamps[0];
                        presenceData.endTimestamp = paused ? null : timestamps[1];
                    }
                }
                else {
                    presenceData.smallImageKey = "watching";
                    presenceData.smallImageText =
                        specialname + "｜" + specialnumber + "° Special";
                    presenceData.details = "Sta per guardare:\n" + specialname;
                    presenceData.state =
                        "Per più informazioni 🎦\n" +
                            "\nUscito il: " +
                            releaseDate +
                            "\n" +
                            "° Special\n" +
                            "Autore: " +
                            author +
                            "\n" +
                            "Voto: " +
                            vote +
                            "\n" +
                            "Visualizzazioni: " +
                            visual;
                }
            }
            else if (document
                .querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(2)")
                .textContent.includes("Preview")) {
                let previewname = document.title
                    .replace("AnimeWorld: ", "")
                    .split(" Episodio")[0];
                if (previewname.includes("(ITA)")) {
                    previewname = previewname.split(" (ITA)")[0];
                }
                const timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
                if (iFrameVideo == true && !isNaN(duration)) {
                    if (currentTime == duration) {
                        presenceData.smallImageKey = "pause";
                        presenceData.smallImageText = previewname;
                        presenceData.details = "Guardando: " + previewname;
                        presenceData.state = "Preview｜Finito";
                    }
                    else if (currentTime != duration) {
                        presenceData.smallImageKey = paused ? "pause" : "play";
                        presenceData.smallImageText = previewname;
                        presenceData.details = "Guardando: " + previewname;
                        presenceData.state = paused
                            ? "Preview｜In pausa"
                            : "Preview｜In riproduzione";
                        presenceData.startTimestamp = paused ? null : timestamps[0];
                        presenceData.endTimestamp = paused ? null : timestamps[1];
                    }
                }
                else {
                    presenceData.smallImageKey = "watching";
                    presenceData.smallImageText = previewname;
                    presenceData.details = "Sta per guardare la preview:\n" + previewname;
                    presenceData.state =
                        "Per più informazioni 🎦\n" +
                            "\nUscito il: " +
                            releaseDate +
                            "\n" +
                            "Autore: " +
                            author +
                            "\n" +
                            "Voto: " +
                            vote +
                            "\n" +
                            "Visualizzazioni: " +
                            visual;
                }
            }
        }
    }
    else if (document.location.pathname.startsWith("/admin")) {
        presenceData.largeImageKey = "yuriko";
        presenceData.smallImageKey = "working";
        presenceData.smallImageText = "AnimeWorld Lover";
        presenceData.details = "Sta lavorando su";
        presenceData.state = "AnimeWorld";
    }
    else {
        presenceData.largeImageKey = "pokemonlogo";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Navigando...";
        presenceData.details = "Navigando...";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQU9ILFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3BELElBQUksV0FBVyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQztBQUV6RCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQ2pDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzlELElBQUksUUFBUSxFQUFFO1FBQ1osV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO1FBQzVDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUN6QyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDdEMsTUFBTSxHQUFH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