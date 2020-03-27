var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: "678265146883178519",
    mediaKeys: false
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
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "pokemonlogo" // Bas has been here
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname == "/") {
        presenceData.smallImageKey = "home";
        presenceData.smallImageText = "Homepage";
        presenceData.details = "Nella homepage";
    }
    else if (document.location.pathname.startsWith("/contact") || document.location.pathname.startsWith("/termini")) {
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
            } else {
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
                "Per più informazioni 🎦\n\n" +
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
                    .innerText.replace("Episodio ", "");
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
                    .innerText.replace("Episodio ", "");
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
                    .innerText.replace("Episodio ", "");
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
                    .innerText.replace("Episodio ", "");
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
    } else if (document.location.pathname.startsWith("/admin")) {
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
}));
function getTimestamps(videoTime, videoDuration) {
    let startTime = Date.now();
    let endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzNCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDaEIsQ0FBQyxDQUFDO0FBRUgsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbEQsSUFBSSxXQUFXLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO0FBRXpELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFO0lBQ2hDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzlELElBQUksUUFBUSxFQUFFO1FBQ2IsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO1FBQzVDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUN6QyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDdEMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO0tBQ2xDO0FBQ0YsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDcEMsSUFBSSxZQUFZLEdBQWlCO1FBQ2hDLGFBQWEsRUFBRSxhQUFhO0tBQzVCLENBQUM7SUFFRixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUU1QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdB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
