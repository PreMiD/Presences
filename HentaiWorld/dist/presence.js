var presence = new Presence({
    clientId: "660882722839068702",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000);
var iFrameVideo, currentTime, duration, paused;
presence.on("iFrameData", data => {
    playback =
        data.iframe_video.duration !== null
            ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.duration;
        paused = data.iframe_video.paused;
    }
});
presence.on("UpdateData", () => {
    let data = {
        largeImageKey: "hwnew"
    };
    if (!navigator.language.includes("it-IT")) { // English
        if (document.location.pathname == ("/")) {
            data.smallImageKey = "home",
                data.details = "Browsing in the homepage",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.pathname.startsWith("/contact")) { // Contact the Staff
            data.smallImageKey = "contacts",
                data.details = "Contacting the Staff",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.pathname.startsWith("/user/")) { // User Settings
            if (document.location.pathname.startsWith("/user/settings")) { // General Settings
                data.smallImageKey = "settings",
                    data.details = "In the settings",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else if (document.location.href.includes("watchlist")) { // WatchList
                data.smallImageKey = "wlsettings",
                    data.details = "Editing the WatchList",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/user/import")) { // Import WL
                data.smallImageKey = "import",
                    data.details = "Importing the",
                    data.state = "WatchList from MAL",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/user/notifications")) { // Notifications
                data.smallImageKey = "notifications",
                    data.details = "Browsing the",
                    data.state = "notifications",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else
                data.smallImageKey = "settings",
                    data.details = "In the settings",
                    data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.pathname.startsWith("/profile")) { // Profile
            if (document.location.href.includes("watchlist")) {
                var usernamewl = document.querySelector("span.site-name > b").textContent;
                data.smallImageKey = "userwl",
                    data.details = "Watching the " + usernamewl + "'s",
                    data.state = "WatchList",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                var username = document.querySelector("div.ruolo-aw2").textContent.replace("Hey ", "").replace(" Benvenuto!", "");
                data.smallImageKey = "user",
                    data.details = "Watching the " + username + "'s",
                    data.state = "profile",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/genre")) { // Genre
            if (document.location.href.includes("?page=")) {
                data.smallImageKey = "search",
                    data.details = "Browsing the genre:",
                    data.state = document.title.split('"')[1] + "Page: " + document.location.href.split("=")[1],
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "search",
                    data.details = "Browsing the genre:" + document.title.split('"')[1],
                    data.state = document.title.split('"')[1] + "Page: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/newest")) { // Newest
            if (document.location.href.startsWith("https://www.hentaiworld.eu/newest?page=")) {
                data.smallImageKey = "new",
                    data.details = "Browsing the new Hentai",
                    data.state = "Page: " + document.location.href.startsWith("https://www.hentaiworld.eu/newest?page=").replace("https://www.hentaiworld.eu/newest?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "new",
                    data.details = "Browsing the new Hentai",
                    data.state = "Page: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/updated")) { // Updated
            if (document.location.href.startsWith("https://www.hentaiworld.eu/updated?page=")) {
                data.smallImageKey = "new",
                    data.details = "Browsing the new episodes",
                    data.state = "Page: " + document.location.href.startsWith("https://www.hentaiworld.eu/updated?page=").replace("https://www.hentaiworld.eu/newest?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "new",
                    data.details = "Browsing the new episodes",
                    data.state = "Page: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/ongoing")) { // On Going
            if (document.location.href.startsWith("https://www.hentaiworld.eu/ongoing?page=")) {
                data.smallImageKey = "schedule",
                    data.details = "Browsing the on going",
                    data.state = "Hentai. Page: " + document.location.href.startsWith("https://www.hentaiworld.eu/ongoing?page=").replace("https://www.hentaiworld.eu/ongoing?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "schedule",
                    data.details = "Browsing the on going",
                    data.state = "Hentai. Page: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/upcoming")) { // Upcoming
            data.smallImageKey = "clock",
                data.details = "Browsing the upcoming",
                data.state = "Hentai",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.pathname.startsWith("/az-list")) { // A-Z List
            if (document.location.href.includes("?page=")) {
                data.smallImageKey = "archive",
                    data.details = "Browsing the archive",
                    data.state = "Page: " + document.location.href.split("=")[1],
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else
                data.smallImageKey = "archive",
                    data.details = "Browsing the archive",
                    data.state = "Page: 1",
                    data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.pathname.startsWith("/search")) { // Search
            data.smallImageKey = "search",
                data.details = "Searching:",
                data.state = document.title.replace("HentaiWorld: ", ""),
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.href.startsWith("https://www.hentaiworld.eu/filter")) { // Accurate Research
            data.smallImageKey = "search",
                data.details = "Doing an advanced",
                data.state = "search",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        } // Categories
        else if (document.location.pathname.startsWith("/tv-series")) { // TV-Series
            if (document.location.href.startsWith("https://www.hentaiworld.eu/tv-series?page=")) {
                data.smallImageKey = "search",
                    data.details = "In the category: Hentai",
                    data.state = "Page: " + document.location.href.startsWith("https://www.hentaiworld.eu/tv-series?page=").replace("https://www.hentaiworld.eu/tv-series?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "search",
                    data.details = "In the category: Hentai",
                    data.state = "Page: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/movies")) { // Movies
            if (document.location.href.startsWith("https://www.hentaiworld.eu/movies?page=")) {
                data.smallImageKey = "search",
                    data.details = "In the category: Movies",
                    data.state = "Page: " + document.location.href.startsWith("https://www.hentaiworld.eu/movies?page=").replace("https://www.hentaiworld.eu/movies?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "search",
                    data.details = "In the category: Movies",
                    data.state = "Page: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/ova")) { // OVA
            if (document.location.href.startsWith("https://www.hentaiworld.eu/ova?page=")) {
                data.smallImageKey = "search",
                    data.details = "In the category: OVA",
                    data.state = "Page: " + document.location.href.startsWith("https://www.hentaiworld.eu/ova?page=").replace("https://www.hentaiworld.eu/ova?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "search",
                    data.details = "In the category: OVA",
                    data.state = "Page: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/ona")) { // ONA
            if (document.location.href.startsWith("https://www.hentaiworld.eu/ona?page=")) {
                data.smallImageKey = "search",
                    data.details = "In the category: ONA",
                    data.state = "Page: " + document.location.href.startsWith("https://www.hentaiworld.eu/ona?page=").replace("https://www.hentaiworld.eu/ona?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "search",
                    data.details = "In the category: ONA",
                    data.state = "Page: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/specials")) { // Specials
            if (document.location.href.startsWith("https://www.hentaiworld.eu/specials?page=")) {
                data.smallImageKey = "search",
                    data.details = "In the category: Specials",
                    data.state = "Page: " + document.location.href.startsWith("https://www.hentaiworld.eu/specials?page=").replace("https://www.hentaiworld.eu/specials?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "search",
                    data.details = "In the category: Specials",
                    data.state = "Page: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/preview")) { // Preview
            if (document.location.href.startsWith("https://www.hentaiworld.eu/preview?page=")) {
                data.smallImageKey = "search",
                    data.details = "In the category: Preview",
                    data.state = "Page: " + document.location.href.startsWith("https://www.hentaiworld.eu/preview?page=").replace("https://www.hentaiworld.eu/preview?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "search",
                    data.details = "In the category: Preview",
                    data.state = "Page: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        } // End Categories
        else if (document.location.pathname.startsWith("/watch")) { // Hentai Episode
            var hentainame = document.title.replace("HentaiWorld: ", "").split(" Episodio")[0];
            var episodenumber = document.querySelector("a#downloadLink.btn.btn-sm.btn-primary").textContent.split("Ep ")[1];
            var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
            if (iFrameVideo == true && !isNaN(duration)) {
                data.smallImageKey = paused ? "pause" : "play",
                    data.details = "Watching: " + hentainame,
                    data.state = paused ? "Ep. " + episodenumber + "｜Paused" : "Ep. " + episodenumber + "｜Playing",
                    data.startTimestamp = paused ? "" : timestamps[0],
                    data.endTimestamp = paused ? "" : timestamps[1],
                    presence.setActivity(data);
            } else {
                data.smallImageKey = "watching",
                    data.details = " Is going to watch: " + hentainame,
                    data.state = "Episode: " + episodenumber,
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
    } else {  // Italian
        if (document.location.pathname == ("/")) {
            data.smallImageKey = "home",
                data.details = "Nella homepage",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.pathname.startsWith("/contact")) { // Contact the Staff
            data.smallImageKey = "contacts",
                data.details = "Sta contattando lo",
                data.state = "Staff",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.pathname.startsWith("/user/")) { // User Settings
            if (document.location.pathname.startsWith("/user/settings")) { // General Settings
                data.smallImageKey = "settings",
                    data.details = "Nelle sue impostazioni",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else if (document.location.href.includes("watchlist")) { // WatchList
                data.smallImageKey = "wlsettings",
                    data.details = "Sta modificando la",
                    data.state = "sua WatchList",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/user/import")) { // Import WL
                data.smallImageKey = "import",
                    data.details = "Sta importando la sua",
                    data.state = "WatchList da MAL",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else if (document.location.pathname.startsWith("/user/notifications")) { // Notifications
                data.smallImageKey = "notifications",
                    data.details = "Sfoglia le notifiche",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else
                data.smallImageKey = "settings",
                    data.details = "Nelle impostazioni",
                    data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.pathname.startsWith("/profile")) { // Profile
            if (document.location.href.includes("watchlist")) {
                var usernamewl = document.querySelector("span.site-name > b").textContent;
                data.smallImageKey = "userwl",
                    data.details = "Guarda la WatchList di:",
                    data.state = usernamewl,
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                var username = document.querySelector("div.ruolo-aw2").textContent.replace("Hey ", "").replace(" Benvenuto!", "");
                data.smallImageKey = "user",
                    data.details = "Guarda il profilo di:",
                    data.state = username,
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/genre")) { // Genre
            if (document.location.href.includes("?page=")) {
                data.smallImageKey = "search",
                    data.details = "Nel genere: " + document.title.split('"')[1],
                    data.state = "Pagina: " + document.location.href.split("=")[1],
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "search",
                    data.details = "Nel genere: " + document.title.split('"')[1],
                    data.state = "Pagina: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/newest")) { // Newest
            if (document.location.href.startsWith("https://www.hentaiworld.eu/newest?page=")) {
                data.smallImageKey = "new",
                    data.details = "Sfoglia le nuove aggiunte",
                    data.state = "Pagina: " + document.location.href.startsWith("https://www.hentaiworld.eu/newest?page=").replace("https://www.hentaiworld.eu/newest?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "new",
                    data.details = "Sfoglia le nuove aggiunte",
                    data.state = "Pagina: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/updated")) { // Updated
            if (document.location.href.startsWith("https://www.hentaiworld.eu/updated?page=")) {
                data.smallImageKey = "new",
                    data.details = "Sfoglia i nuovi episodi",
                    data.state = "Pagina: " + document.location.href.startsWith("https://www.hentaiworld.eu/updated?page=").replace("https://www.hentaiworld.eu/newest?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "new",
                    data.details = "Sfoglia i nuovi episodi",
                    data.state = "Pagina: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/ongoing")) { // On Going
            if (document.location.href.startsWith("https://www.hentaiworld.eu/ongoing?page=")) {
                data.smallImageKey = "schedule",
                    data.details = "Sfoglia gli hentai in corso",
                    data.state = "Pagina: " + document.location.href.startsWith("https://www.hentaiworld.eu/ongoing?page=").replace("https://www.hentaiworld.eu/ongoing?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "schedule",
                    data.details = "Sfoglia gli hentai in corso",
                    data.state = "Pagina: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/upcoming")) { // Upcoming
            data.smallImageKey = "clock",
                data.details = "Sfoglia le prossime",
                data.state = "uscite",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.pathname.startsWith("/az-list")) { // A-Z List
            if (document.location.href.includes("?page=")) {
                data.smallImageKey = "archive",
                    data.details = "Sfoglia tutti gli hentai",
                    data.state = "Pagina: " + document.location.href.split("=")[1],
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else
                data.smallImageKey = "archive",
                    data.details = "Sfoglia tutti gli hentai",
                    data.state = "Pagina: 1",
                    data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.pathname.startsWith("/search")) { // Search
            data.smallImageKey = "search",
                data.details = "Sta cercando:",
                data.state = document.title.replace("HentaiWorld: ", ""),
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.href.startsWith("https://www.hentaiworld.eu/filter")) { // Accurate Research
            data.smallImageKey = "search",
                data.details = "Sta facendo una ricerca",
                data.state = "avanzata",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        } // Categories
        else if (document.location.pathname.startsWith("/tv-series")) { // TV-Series
            if (document.location.href.startsWith("https://www.hentaiworld.eu/tv-series?page=")) {
                data.smallImageKey = "search",
                    data.details = "Nella categoria: Hentai",
                    data.state = "Pagina: " + document.location.href.startsWith("https://www.hentaiworld.eu/tv-series?page=").replace("https://www.hentaiworld.eu/tv-series?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "search",
                    data.details = "Nella categoria: Hentai",
                    data.state = "Pagina: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/movies")) { // Movies
            if (document.location.href.startsWith("https://www.hentaiworld.eu/movies?page=")) {
                data.smallImageKey = "search",
                    data.details = "Nella categoria: Film",
                    data.state = "Pagina: " + document.location.href.startsWith("https://www.hentaiworld.eu/movies?page=").replace("https://www.hentaiworld.eu/movies?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "search",
                    data.details = "Nella categoria: Film",
                    data.state = "Pagina: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/ova")) { // OVA
            if (document.location.href.startsWith("https://www.hentaiworld.eu/ova?page=")) {
                data.smallImageKey = "search",
                    data.details = "Nella categoria: OVA",
                    data.state = "Pagina: " + document.location.href.startsWith("https://www.hentaiworld.eu/ova?page=").replace("https://www.hentaiworld.eu/ova?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "search",
                    data.details = "Nella categoria: OVA",
                    data.state = "Pagina: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/ona")) { // ONA
            if (document.location.href.startsWith("https://www.hentaiworld.eu/ona?page=")) {
                data.smallImageKey = "search",
                    data.details = "Nella categoria: ONA",
                    data.state = "Pagina: " + document.location.href.startsWith("https://www.hentaiworld.eu/ona?page=").replace("https://www.hentaiworld.eu/ona?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "search",
                    data.details = "Nella categoria: ONA",
                    data.state = "Pagina: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/specials")) { // Specials
            if (document.location.href.startsWith("https://www.hentaiworld.eu/specials?page=")) {
                data.smallImageKey = "search",
                    data.details = "Nella categoria: Specials",
                    data.state = "Pagina: " + document.location.href.startsWith("https://www.hentaiworld.eu/specials?page=").replace("https://www.hentaiworld.eu/specials?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "search",
                    data.details = "Nella categoria: Specials",
                    data.state = "Pagina: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/preview")) { // Preview
            if (document.location.href.startsWith("https://www.hentaiworld.eu/preview?page=")) {
                data.smallImageKey = "search",
                    data.details = "Nella categoria: Preview",
                    data.state = "Pagina: " + document.location.href.startsWith("https://www.hentaiworld.eu/preview?page=").replace("https://www.hentaiworld.eu/preview?page=", ""),
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            } else {
                data.smallImageKey = "search",
                    data.details = "Nella categoria: Preview",
                    data.state = "Pagina: 1",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        } // End Categories
        else if (document.location.pathname.startsWith("/watch")) { // Hentai Episode
            var hentainame = document.title.replace("HentaiWorld: ", "").split(" Episodio")[0];
            var episodenumber = document.querySelector("a#downloadLink.btn.btn-sm.btn-primary").textContent.split("Ep ")[1];
            var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
            if (iFrameVideo == true && !isNaN(duration)) {
                data.smallImageKey = paused ? "pause" : "play",
                    data.details = "Guardando: " + hentainame,
                    data.state = paused ? "Ep. " + episodenumber + "｜In pausa" : "Ep. " + episodenumber + "｜In riproduzione",
                    data.startTimestamp = paused ? "" : timestamps[0],
                    data.endTimestamp = paused ? "" : timestamps[1],
                    presence.setActivity(data);
            } else {
                data.smallImageKey = "watching",
                    data.details = "Sta per guardare: " + hentainame,
                    data.state = "Episodio: " + episodenumber,
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}