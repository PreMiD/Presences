let presence = new Presence({
    clientId: "678265146883178519"
});
let browsingStamp = Math.floor(Date.now() / 1000);
let iFrameVideo, currentTime, duration, paused, playback;
presence.on("iFrameData", data => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.duration;
        paused = data.iframe_video.paused;
    }
});
presence.on("UpdateData", async () => {
    let presenceData = {
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
            let usernamewl = document.title.split("Watchlist di ")[1];
            presenceData.smallImageKey = "userwl";
            presenceData.smallImageText = "WatchList di " + usernamewl;
            presenceData.details = "Guarda la WatchList di:";
            presenceData.state = usernamewl;
        }
        else {
            let username = document.title.split("Profilo di ")[1];
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
            let newsName = document.title.split("~ ")[1];
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
        let releaseDate = document.querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(4)").textContent;
        let author = document.querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(8)").textContent;
        let episode = document.querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(2) > dd:nth-child(8) > font").textContent;
        let vote = document.querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(2) > dd.rating > span:nth-child(1)").textContent;
        let visual = document.querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(2) > dd:nth-child(10)").textContent;
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
                    "Uscirà il: " +
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
                let animenumber = document
                    .querySelector("#episode-comment")
                    .textContent.replace("Episodio ", "");
                let timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
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
                let timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
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
                        "Per più informazioni 🎦\n\n" +
                            "Uscito il: " +
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
                let oavnumber = document
                    .querySelector("#episode-comment")
                    .textContent.replace("Episodio ", "");
                let timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
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
                        "Per più informazioni 🎦\n\n" +
                            "Uscito il: " +
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
                let onanumber = document
                    .querySelector("#episode-comment")
                    .textContent.replace("Episodio ", "");
                let timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
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
                        "Per più informazioni 🎦\n\n" +
                            "Uscito il: " +
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
                let specialnumber = document
                    .querySelector("#episode-comment")
                    .textContent.replace("Episodio ", "");
                let timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
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
                        "Per più informazioni 🎦\n\n" +
                            "Uscito il: " +
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
                let timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
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
                        "Per più informazioni 🎦\n\n" +
                            "Uscito il: " +
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
function getTimestamps(videoTime, videoDuration) {
    let startTime = Date.now();
    let endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksV0FBVyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQztBQUV6RCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRTtJQUNoQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM5RCxJQUFJLFFBQVEsRUFBRTtRQUNiLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQztRQUM1QyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDekMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQ3RDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztLQUNsQztBQUNGLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxZQUFZLEdBQWlCO1FBQ2hDLGFBQWEsRUFBRSxhQUFhO0tBQzVCLENBQUM7SUFFRixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUU1QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUV0QyxZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUNwQyxZQUFZLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQztRQUN6QyxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO0tBQ3hDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFFN0QsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7UUFDcEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUM7UUFDekMsWUFBWSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQztRQUNwRCxZQUFZLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztLQUNyQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBRTNELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFFNUQsWUFBWSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7WUFDeEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7WUFDN0MsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztTQUNoRDthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBRXhELFlBQVksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1lBQzFDLFlBQVksQ0FBQyxjQUFjLEdBQUcsc0JBQXNCLENBQUM7WUFDckQsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztZQUM1QyxZQUFZLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztTQUNyQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBRWpFLFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQ3RDLFlBQVksQ0FBQyxjQUFjLEdBQUcsc0JBQXNCLENBQUM7WUFDckQsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztZQUMvQyxZQUFZLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDO1NBQ3hDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUV4RSxZQUFZLENBQUMsYUFBYSxHQUFHLGVBQWUsQ0FBQztZQUM3QyxZQUFZLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQztZQUMxQyxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1NBQzlDO2FBQU07WUFDTixZQUFZLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztZQUN4QyxZQUFZLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztZQUM3QyxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1NBQzVDO0tBQ0Q7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUU3RCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNqRCxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRCxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztZQUN0QyxZQUFZLENBQUMsY0FBYyxHQUFHLGVBQWUsR0FBRyxVQUFVLENBQUM7WUFDM0QsWUFBWSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztZQUNqRCxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztTQUNoQzthQUFNO1lBQ04sSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDcEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQ3ZELFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7WUFDL0MsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7U0FDOUI7S0FDRDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBRTNELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzlDLFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQ3RDLFlBQVksQ0FBQyxjQUFjLEdBQUcsVUFBVSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLFlBQVksQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2RTthQUFNO1lBQ04sWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7WUFDdEMsWUFBWSxDQUFDLGNBQWM7Z0JBQzFCLGNBQWMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxZQUFZLENBQUMsT0FBTyxHQUFHLGNBQWMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRSxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztTQUNqQztLQUNEO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFFNUQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDcEQsWUFBWSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDbkMsWUFBWSxDQUFDLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztZQUMvQyxZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO1lBQ25ELFlBQVksQ0FBQyxLQUFLO2dCQUNqQixVQUFVLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzlEO2FBQU07WUFDTixZQUFZLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUNuQyxZQUFZLENBQUMsY0FBYyxHQUFHLGdCQUFnQixDQUFDO1lBQy9DLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7WUFDbkQsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7U0FDakM7S0FDRDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBRTdELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ3JELFlBQVksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQ25DLFlBQVksQ0FBQyxjQUFjLEdBQUcsZUFBZSxDQUFDO1lBQzlDLFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7WUFDakQsWUFBWSxDQUFDLEtBQUs7Z0JBQ2pCLFVBQVUsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0Q7YUFBTTtZQUNOLFlBQVksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQ25DLFlBQVksQ0FBQyxjQUFjLEdBQUcsZUFBZSxDQUFDO1lBQzlDLFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7WUFDakQsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7U0FDakM7S0FDRDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBRTdELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ3JELFlBQVksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1lBQ3hDLFlBQVksQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUM7WUFDL0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztZQUM5QyxZQUFZLENBQUMsS0FBSztnQkFDakIsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO2FBQU07WUFDTixZQUFZLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztZQUN4QyxZQUFZLENBQUMsY0FBYyxHQUFHLGdCQUFnQixDQUFDO1lBQy9DLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7WUFDOUMsWUFBWSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztTQUN4QztLQUNEO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFFOUQsWUFBWSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7UUFDckMsWUFBWSxDQUFDLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQztRQUNoRCxZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO1FBQzdDLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO0tBQzlCO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFFN0QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDOUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7WUFDdkMsWUFBWSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUM7WUFDekMsWUFBWSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztZQUNqRCxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkU7YUFBTTtZQUNOLFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1lBQ3ZDLFlBQVksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDO1lBQ3pDLFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7WUFDakQsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7U0FDakM7S0FDRDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBRTlELFlBQVksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1FBQ3hDLFlBQVksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO1FBQzNDLFlBQVksQ0FBQyxPQUFPLEdBQUcsOEJBQThCLENBQUM7UUFDdEQsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7S0FDN0I7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUU1RCxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUN0QyxZQUFZLENBQUMsY0FBYztZQUMxQixVQUFVLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ2hFO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFFMUQsSUFDQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxPQUFPO1lBQ3JDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFFBQVEsRUFDckM7WUFDRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDOUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7Z0JBQ3JDLFlBQVksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO2dCQUN4QyxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO2dCQUMxQyxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkU7aUJBQU07Z0JBQ04sWUFBWSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7Z0JBQ3JDLFlBQVksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO2dCQUN4QyxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO2dCQUMxQyxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQzthQUNqQztTQUNEO2FBQU07WUFDTixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxZQUFZLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztZQUNyQyxZQUFZLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztZQUN2QyxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1lBQzNDLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1NBQzlCO0tBQ0Q7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUVyRCxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUN0QyxZQUFZLENBQUMsY0FBYyxHQUFHLGtCQUFrQixDQUFDO1FBQ2pELFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7UUFDakQsWUFBWSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7S0FDaEM7U0FDSSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUU3RCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQ3ZELFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQ3RDLFlBQVksQ0FBQyxjQUFjLEdBQUcsa0JBQWtCLENBQUM7WUFDakQsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztZQUNoRCxZQUFZLENBQUMsS0FBSztnQkFDakIsVUFBVSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO2FBQU07WUFDTixZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztZQUN0QyxZQUFZLENBQUMsY0FBYyxHQUFHLGtCQUFrQixDQUFDO1lBQ2pELFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7WUFDaEQsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7U0FDakM7S0FDRDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBRTVELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ3BELFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQ3RDLFlBQVksQ0FBQyxjQUFjLEdBQUcsaUJBQWlCLENBQUM7WUFDaEQsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztZQUMvQyxZQUFZLENBQUMsS0FBSztnQkFDakIsVUFBVSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5RDthQUFNO1lBQ04sWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7WUFDdEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQztZQUNoRCxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO1lBQy9DLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1NBQ2pDO0tBQ0Q7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUV6RCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNqRCxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztZQUN0QyxZQUFZLENBQUMsY0FBYyxHQUFHLGdCQUFnQixDQUFDO1lBQy9DLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7WUFDOUMsWUFBWSxDQUFDLEtBQUs7Z0JBQ2pCLFVBQVUsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0Q7YUFBTTtZQUNOLFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQ3RDLFlBQVksQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUM7WUFDL0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztZQUM5QyxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztTQUNqQztLQUNEO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFFekQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDakQsWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7WUFDdEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztZQUMvQyxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1lBQzlDLFlBQVksQ0FBQyxLQUFLO2dCQUNqQixVQUFVLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNEO2FBQU07WUFDTixZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztZQUN0QyxZQUFZLENBQUMsY0FBYyxHQUFHLGdCQUFnQixDQUFDO1lBQy9DLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7WUFDOUMsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7U0FDakM7S0FDRDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBRTlELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDdEQsWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7WUFDdEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQztZQUNwRCxZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO1lBQ25ELFlBQVksQ0FBQyxLQUFLO2dCQUNqQixVQUFVLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEU7YUFBTTtZQUNOLFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQ3RDLFlBQVksQ0FBQyxjQUFjLEdBQUcscUJBQXFCLENBQUM7WUFDcEQsWUFBWSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztZQUNuRCxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztTQUNqQztLQUNEO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFFN0QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDckQsWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7WUFDdEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxvQkFBb0IsQ0FBQztZQUNuRCxZQUFZLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO1lBQ2xELFlBQVksQ0FBQyxLQUFLO2dCQUNqQixVQUFVLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9EO2FBQU07WUFDTixZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztZQUN0QyxZQUFZLENBQUMsY0FBYyxHQUFHLG9CQUFvQixDQUFDO1lBQ25ELFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7WUFDbEQsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7U0FDakM7S0FDRDtTQUNJLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBRXpELElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3ZDLDJIQUEySCxDQUMzSCxDQUFDLFdBQVcsQ0FBQztRQUNkLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2xDLDJIQUEySCxDQUMzSCxDQUFDLFdBQVcsQ0FBQztRQUNkLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ25DLGtJQUFrSSxDQUNsSSxDQUFDLFdBQVcsQ0FBQztRQUNkLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2hDLHlJQUF5SSxDQUN6SSxDQUFDLFdBQVcsQ0FBQztRQUNkLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2xDLDRIQUE0SCxDQUM1SCxDQUFDLFdBQVcsQ0FBQztRQUNkLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLElBQUksRUFBRTtZQUMzRCxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSztpQkFDMUIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDeEIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDOUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckM7WUFDRCxZQUFZLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUNuQyxZQUFZLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztZQUN0QyxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixHQUFHLE9BQU8sQ0FBQztZQUMxRCxZQUFZLENBQUMsS0FBSztnQkFDakIsMkJBQTJCO29CQUMzQixhQUFhO29CQUNiLFdBQVc7b0JBQ1gsSUFBSTtvQkFDSixXQUFXO29CQUNYLE9BQU87b0JBQ1AsSUFBSTtvQkFDSixVQUFVO29CQUNWLE1BQU07b0JBQ04sSUFBSTtvQkFDSixRQUFRO29CQUNSLElBQUk7b0JBQ0osSUFBSTtvQkFDSixtQkFBbUI7b0JBQ25CLE1BQU0sQ0FBQztTQUNSO2FBQU07WUFDTixJQUNDLFFBQVE7aUJBQ04sYUFBYSxDQUNiLDJIQUEySCxDQUMzSDtpQkFDQSxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUM5QjtnQkFDRCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSztxQkFDNUIsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUM7cUJBQzNCLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNoQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDekM7Z0JBQ0QsSUFBSSxXQUFXLEdBQUcsUUFBUTtxQkFDeEIsYUFBYSxDQUFDLGtCQUFrQixDQUFDO3FCQUNqQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUNwQixDQUFDO2dCQUNGLElBQUksV0FBVyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDNUMsSUFBSSxXQUFXLElBQUksUUFBUSxFQUFFO3dCQUM1QixZQUFZLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQzt3QkFDckMsWUFBWSxDQUFDLGNBQWM7NEJBQzFCLFNBQVMsR0FBRyxhQUFhLEdBQUcsV0FBVyxDQUFDO3dCQUN6QyxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsR0FBRyxTQUFTLENBQUM7d0JBQ2pELFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTSxHQUFHLFdBQVcsR0FBRyxTQUFTLENBQUM7cUJBQ3REO3lCQUFNLElBQUksV0FBVyxJQUFJLFFBQVEsRUFBRTt3QkFDbkMsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO3dCQUN2RCxZQUFZLENBQUMsY0FBYzs0QkFDMUIsU0FBUyxHQUFHLGFBQWEsR0FBRyxXQUFXLENBQUM7d0JBQ3pDLFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxHQUFHLFNBQVMsQ0FBQzt3QkFDakQsWUFBWSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1RCxZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU07NEJBQzFCLENBQUMsQ0FBQyxNQUFNLEdBQUcsV0FBVyxHQUFHLFdBQVc7NEJBQ3BDLENBQUMsQ0FBQyxNQUFNLEdBQUcsV0FBVyxHQUFHLGtCQUFrQixDQUFDO3dCQUM3QyxZQUFZLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQzFEO2lCQUNEO3FCQUFNO29CQUNOLFlBQVksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO29CQUN4QyxZQUFZLENBQUMsY0FBYzt3QkFDMUIsU0FBUyxHQUFHLGFBQWEsR0FBRyxXQUFXLENBQUM7b0JBQ3pDLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLEdBQUcsU0FBUyxDQUFDO29CQUN6RCxZQUFZLENBQUMsS0FBSzt3QkFDakIsMkJBQTJCOzRCQUMzQixlQUFlOzRCQUNmLFdBQVc7NEJBQ1gsSUFBSTs0QkFDSixZQUFZOzRCQUNaLFdBQVc7NEJBQ1gsSUFBSTs0QkFDSixVQUFVOzRCQUNWLE1BQU07NEJBQ04sSUFBSTs0QkFDSixRQUFROzRCQUNSLElBQUk7NEJBQ0osSUFBSTs0QkFDSixtQkFBbUI7NEJBQ25CLE1BQU0sQ0FBQztpQkFDUjthQUNEO2lCQUFNLElBQ04sUUFBUTtpQkFDTixhQUFhLENBQ2IsMkhBQTJILENBQzNIO2lCQUNBLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQzlCO2dCQUNELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLO3FCQUM1QixPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQztxQkFDM0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ2hDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN6QztnQkFDRCxJQUFJLFVBQVUsR0FBRyxhQUFhLENBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQ3BCLENBQUM7Z0JBQ0YsSUFBSSxXQUFXLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUM1QyxJQUFJLFdBQVcsSUFBSSxRQUFRLEVBQUU7d0JBQzVCLFlBQVksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO3dCQUNyQyxZQUFZLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQzt3QkFDeEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLEdBQUcsU0FBUyxDQUFDO3dCQUNqRCxZQUFZLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQztxQkFDcEM7eUJBQU0sSUFBSSxXQUFXLElBQUksUUFBUSxFQUFFO3dCQUNuQyxZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7d0JBQ3ZELFlBQVksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO3dCQUN4QyxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsR0FBRyxTQUFTLENBQUM7d0JBQ2pELFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTTs0QkFDMUIsQ0FBQyxDQUFDLGVBQWU7NEJBQ2pCLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQzt3QkFDMUIsWUFBWSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1RCxZQUFZLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQzFEO2lCQUNEO3FCQUFNO29CQUNOLFlBQVksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO29CQUN4QyxZQUFZLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztvQkFDeEMsWUFBWSxDQUFDLE9BQU8sR0FBRyw2QkFBNkIsR0FBRyxTQUFTLENBQUM7b0JBQ2pFLFlBQVksQ0FBQyxLQUFLO3dCQUNqQiw2QkFBNkI7NEJBQzdCLGFBQWE7NEJBQ2IsV0FBVzs0QkFDWCxJQUFJOzRCQUNKLFVBQVU7NEJBQ1YsTUFBTTs0QkFDTixJQUFJOzRCQUNKLFFBQVE7NEJBQ1IsSUFBSTs0QkFDSixJQUFJOzRCQUNKLG1CQUFtQjs0QkFDbkIsTUFBTSxDQUFDO29CQUNSLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO2lCQUM1QzthQUNEO2lCQUFNLElBQ04sUUFBUTtpQkFDTixhQUFhLENBQ2IsMkhBQTJILENBQzNIO2lCQUNBLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQzVCO2dCQUNELElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLO3FCQUMxQixPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQztxQkFDM0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzlCLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNyQztnQkFDRCxJQUFJLFNBQVMsR0FBRyxRQUFRO3FCQUN0QixhQUFhLENBQUMsa0JBQWtCLENBQUM7cUJBQ2pDLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLFVBQVUsR0FBRyxhQUFhLENBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQ3BCLENBQUM7Z0JBQ0YsSUFBSSxXQUFXLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUM1QyxJQUFJLFdBQVcsSUFBSSxRQUFRLEVBQUU7d0JBQzVCLFlBQVksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO3dCQUNyQyxZQUFZLENBQUMsY0FBYyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLE9BQU8sQ0FBQzt3QkFDbEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLEdBQUcsT0FBTyxDQUFDO3dCQUMvQyxZQUFZLENBQUMsS0FBSyxHQUFHLFNBQVMsR0FBRyxjQUFjLENBQUM7cUJBQ2hEO3lCQUFNLElBQUksV0FBVyxJQUFJLFFBQVEsRUFBRTt3QkFDbkMsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO3dCQUN2RCxZQUFZLENBQUMsY0FBYyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLE9BQU8sQ0FBQzt3QkFDbEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLEdBQUcsT0FBTyxDQUFDO3dCQUMvQyxZQUFZLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVELFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTTs0QkFDMUIsQ0FBQyxDQUFDLFNBQVMsR0FBRyxnQkFBZ0I7NEJBQzlCLENBQUMsQ0FBQyxTQUFTLEdBQUcsdUJBQXVCLENBQUM7d0JBQ3ZDLFlBQVksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDMUQ7aUJBQ0Q7cUJBQU07b0JBQ04sWUFBWSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7b0JBQ3hDLFlBQVksQ0FBQyxjQUFjLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsT0FBTyxDQUFDO29CQUNsRSxZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixHQUFHLE9BQU8sQ0FBQztvQkFDdkQsWUFBWSxDQUFDLEtBQUs7d0JBQ2pCLDZCQUE2Qjs0QkFDN0IsYUFBYTs0QkFDYixXQUFXOzRCQUNYLElBQUk7NEJBQ0osU0FBUzs0QkFDVCxTQUFTOzRCQUNULFVBQVU7NEJBQ1YsTUFBTTs0QkFDTixJQUFJOzRCQUNKLFFBQVE7NEJBQ1IsSUFBSTs0QkFDSixJQUFJOzRCQUNKLG1CQUFtQjs0QkFDbkIsTUFBTSxDQUFDO2lCQUNSO2FBQ0Q7aUJBQU0sSUFDTixRQUFRO2lCQUNOLGFBQWEsQ0FDYiwySEFBMkgsQ0FDM0g7aUJBQ0EsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFDNUI7Z0JBQ0QsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUs7cUJBQzFCLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDO3FCQUMzQixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDOUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3JDO2dCQUNELElBQUksU0FBUyxHQUFHLFFBQVE7cUJBQ3RCLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztxQkFDakMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksVUFBVSxHQUFHLGFBQWEsQ0FDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FDcEIsQ0FBQztnQkFDRixJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQzVDLElBQUksV0FBVyxJQUFJLFFBQVEsRUFBRTt3QkFDNUIsWUFBWSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7d0JBQ3JDLFlBQVksQ0FBQyxjQUFjLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsT0FBTyxDQUFDO3dCQUNsRSxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsR0FBRyxPQUFPLENBQUM7d0JBQy9DLFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUyxHQUFHLGNBQWMsQ0FBQztxQkFDaEQ7eUJBQU0sSUFBSSxXQUFXLElBQUksUUFBUSxFQUFFO3dCQUNuQyxZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7d0JBQ3ZELFlBQVksQ0FBQyxjQUFjLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsT0FBTyxDQUFDO3dCQUNsRSxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsR0FBRyxPQUFPLENBQUM7d0JBQy9DLFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTTs0QkFDMUIsQ0FBQyxDQUFDLFNBQVMsR0FBRyxnQkFBZ0I7NEJBQzlCLENBQUMsQ0FBQyxTQUFTLEdBQUcsdUJBQXVCLENBQUM7d0JBQ3ZDLFlBQVksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUQsWUFBWSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUMxRDtpQkFDRDtxQkFBTTtvQkFDTixZQUFZLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztvQkFDeEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLFNBQVMsR0FBRyxPQUFPLENBQUM7b0JBQ2xFLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLEdBQUcsT0FBTyxDQUFDO29CQUN2RCxZQUFZLENBQUMsS0FBSzt3QkFDakIsNkJBQTZCOzRCQUM3QixhQUFhOzRCQUNiLFdBQVc7NEJBQ1gsSUFBSTs0QkFDSixTQUFTOzRCQUNULFNBQVM7NEJBQ1QsVUFBVTs0QkFDVixNQUFNOzRCQUNOLElBQUk7NEJBQ0osUUFBUTs0QkFDUixJQUFJOzRCQUNKLElBQUk7NEJBQ0osbUJBQW1COzRCQUNuQixNQUFNLENBQUM7aUJBQ1I7YUFDRDtpQkFBTSxJQUNOLFFBQVE7aUJBQ04sYUFBYSxDQUNiLDJIQUEySCxDQUMzSDtpQkFDQSxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUNoQztnQkFDRCxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsS0FBSztxQkFDOUIsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUM7cUJBQzNCLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNsQyxXQUFXLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDN0M7Z0JBQ0QsSUFBSSxhQUFhLEdBQUcsUUFBUTtxQkFDMUIsYUFBYSxDQUFDLGtCQUFrQixDQUFDO3FCQUNqQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUNwQixDQUFDO2dCQUNGLElBQUksV0FBVyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDNUMsSUFBSSxXQUFXLElBQUksUUFBUSxFQUFFO3dCQUM1QixZQUFZLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQzt3QkFDckMsWUFBWSxDQUFDLGNBQWM7NEJBQzFCLFdBQVcsR0FBRyxHQUFHLEdBQUcsYUFBYSxHQUFHLFdBQVcsQ0FBQzt3QkFDakQsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLEdBQUcsV0FBVyxDQUFDO3dCQUNuRCxZQUFZLENBQUMsS0FBSyxHQUFHLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQztxQkFDeEQ7eUJBQU0sSUFBSSxXQUFXLElBQUksUUFBUSxFQUFFO3dCQUNuQyxZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7d0JBQ3ZELFlBQVksQ0FBQyxjQUFjOzRCQUMxQixXQUFXLEdBQUcsR0FBRyxHQUFHLGFBQWEsR0FBRyxXQUFXLENBQUM7d0JBQ2pELFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxHQUFHLFdBQVcsQ0FBQzt3QkFDbkQsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNOzRCQUMxQixDQUFDLENBQUMsYUFBYSxHQUFHLG9CQUFvQjs0QkFDdEMsQ0FBQyxDQUFDLGFBQWEsR0FBRywyQkFBMkIsQ0FBQzt3QkFDL0MsWUFBWSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1RCxZQUFZLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQzFEO2lCQUNEO3FCQUFNO29CQUNOLFlBQVksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO29CQUN4QyxZQUFZLENBQUMsY0FBYzt3QkFDMUIsV0FBVyxHQUFHLEdBQUcsR0FBRyxhQUFhLEdBQUcsV0FBVyxDQUFDO29CQUNqRCxZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixHQUFHLFdBQVcsQ0FBQztvQkFDM0QsWUFBWSxDQUFDLEtBQUs7d0JBQ2pCLDZCQUE2Qjs0QkFDN0IsYUFBYTs0QkFDYixXQUFXOzRCQUNYLElBQUk7NEJBQ0osYUFBYTs0QkFDYixVQUFVOzRCQUNWLE1BQU07NEJBQ04sSUFBSTs0QkFDSixRQUFROzRCQUNSLElBQUk7NEJBQ0osSUFBSTs0QkFDSixtQkFBbUI7NEJBQ25CLE1BQU0sQ0FBQztpQkFDUjthQUNEO2lCQUFNLElBQ04sUUFBUTtpQkFDTixhQUFhLENBQ2IsMkhBQTJILENBQzNIO2lCQUNBLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQ2hDO2dCQUNELElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxLQUFLO3FCQUM5QixPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQztxQkFDM0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ2xDLFdBQVcsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM3QztnQkFDRCxJQUFJLFVBQVUsR0FBRyxhQUFhLENBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQ3BCLENBQUM7Z0JBQ0YsSUFBSSxXQUFXLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUM1QyxJQUFJLFdBQVcsSUFBSSxRQUFRLEVBQUU7d0JBQzVCLFlBQVksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO3dCQUNyQyxZQUFZLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQzt3QkFDMUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLEdBQUcsV0FBVyxDQUFDO3dCQUNuRCxZQUFZLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO3FCQUN0Qzt5QkFBTSxJQUFJLFdBQVcsSUFBSSxRQUFRLEVBQUU7d0JBQ25DLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQzt3QkFDdkQsWUFBWSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUM7d0JBQzFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxHQUFHLFdBQVcsQ0FBQzt3QkFDbkQsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNOzRCQUMxQixDQUFDLENBQUMsa0JBQWtCOzRCQUNwQixDQUFDLENBQUMseUJBQXlCLENBQUM7d0JBQzdCLFlBQVksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUQsWUFBWSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUMxRDtpQkFDRDtxQkFBTTtvQkFDTixZQUFZLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztvQkFDeEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUM7b0JBQzFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0NBQWdDLEdBQUcsV0FBVyxDQUFDO29CQUN0RSxZQUFZLENBQUMsS0FBSzt3QkFDakIsNkJBQTZCOzRCQUM3QixhQUFhOzRCQUNiLFdBQVc7NEJBQ1gsSUFBSTs0QkFDSixVQUFVOzRCQUNWLE1BQU07NEJBQ04sSUFBSTs0QkFDSixRQUFROzRCQUNSLElBQUk7NEJBQ0osSUFBSTs0QkFDSixtQkFBbUI7NEJBQ25CLE1BQU0sQ0FBQztpQkFDUjthQUNEO1NBQ0Q7S0FDRDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzNELFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBQ3RDLFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxjQUFjLEdBQUcsa0JBQWtCLENBQUM7UUFDakQsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUMxQyxZQUFZLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztLQUNsQztTQUFNO1FBQ04sWUFBWSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDM0MsWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7UUFDdEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDN0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7S0FDdEM7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2pDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDdkI7U0FBTTtRQUNOLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDbkM7QUFDRixDQUFDLENBQUMsQ0FBQztBQU9ILFNBQVMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsYUFBcUI7SUFDOUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2hELENBQUMifQ==