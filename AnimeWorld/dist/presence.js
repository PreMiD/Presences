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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksV0FBVyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQztBQUV6RCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRTtJQUMvQixRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM5RCxJQUFJLFFBQVEsRUFBRTtRQUNaLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQztRQUM1QyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDekMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQ3RDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztLQUNuQztBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxZQUFZLEdBQWlCO1FBQy9CLGFBQWEsRUFBRSxhQUFhO0tBQzdCLENBQUM7SUFFRixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUU1QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUVyQyxZQUFZLENBQUMs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