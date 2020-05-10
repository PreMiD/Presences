const presence = new Presence({
    clientId: "660882722839068702"
});
const browsingStamp = Math.floor(Date.now() / 1000);
var iFrameVideo, currentTime, duration, paused;
var usernamewl, username, hentainame, episodenumber, timestamps;
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("iFrameData", (data) => {
    const playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.duration;
        paused = data.iframe_video.paused;
    }
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "hwnew"
    };
    presenceData.startTimestamp = browsingStamp;
    if (!navigator.language.includes("it-IT")) {
        if (document.location.pathname == "/") {
            presenceData.smallImageKey = "home";
            presenceData.details = "Browsing in the homepage";
        }
        else if (document.location.pathname.startsWith("/contact")) {
            presenceData.smallImageKey = "contacts";
            presenceData.details = "Contacting the Staff";
        }
        else if (document.location.pathname.startsWith("/user/")) {
            if (document.location.pathname.startsWith("/user/settings")) {
                presenceData.smallImageKey = "settings";
                presenceData.details = "In the settings";
            }
            else if (document.location.href.includes("watchlist")) {
                presenceData.smallImageKey = "wlsettings";
                presenceData.details = "Editing the WatchList";
            }
            else if (document.location.pathname.startsWith("/user/import")) {
                presenceData.smallImageKey = "import";
                presenceData.details = "Importing the";
                presenceData.state = "WatchList from MAL";
            }
            else if (document.location.pathname.startsWith("/user/notifications")) {
                presenceData.smallImageKey = "notifications";
                presenceData.details = "Browsing the";
                presenceData.state = "notifications";
            }
            else
                presenceData.smallImageKey = "settings";
            presenceData.details = "In the settings";
        }
        else if (document.location.pathname.startsWith("/profile")) {
            if (document.location.href.includes("watchlist")) {
                usernamewl = document.querySelector("span.site-name > b").textContent;
                presenceData.smallImageKey = "userwl";
                presenceData.details = "Watching the " + usernamewl + "'s";
                presenceData.state = "WatchList";
            }
            else {
                username = document
                    .querySelector("div.ruolo-aw2")
                    .textContent.replace("Hey ", "")
                    .replace(" Benvenuto!", "");
                presenceData.smallImageKey = "user";
                presenceData.details = "Watching the " + username + "'s";
                presenceData.state = "profile";
            }
        }
        else if (document.location.pathname.startsWith("/genre")) {
            if (document.location.href.includes("?page=")) {
                presenceData.smallImageKey = "search";
                presenceData.details = "Browsing the genre:";
                presenceData.state =
                    document.title.split('"')[1] +
                        "Page: " +
                        document.location.href.split("=")[1];
            }
            else {
                presenceData.smallImageKey = "search";
                presenceData.details =
                    "Browsing the genre:" + document.title.split('"')[1];
                presenceData.state = document.title.split('"')[1] + "Page: 1";
            }
        }
        else if (document.location.pathname.startsWith("/newest")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/newest?page=")) {
                presenceData.smallImageKey = "new";
                presenceData.details = "Browsing the new Hentai";
                presenceData.state =
                    "Page: " +
                        document.location.href.replace("https://www.hentaiworld.eu/newest?page=", "");
            }
            else {
                presenceData.smallImageKey = "new";
                presenceData.details = "Browsing the new Hentai";
                presenceData.state = "Page: 1";
            }
        }
        else if (document.location.pathname.startsWith("/updated")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/updated?page=")) {
                presenceData.smallImageKey = "new";
                presenceData.details = "Browsing the new episodes";
                presenceData.state =
                    "Page: " +
                        document.location.href.replace("https://www.hentaiworld.eu/newest?page=", "");
            }
            else {
                presenceData.smallImageKey = "new";
                presenceData.details = "Browsing the new episodes";
                presenceData.state = "Page: 1";
            }
        }
        else if (document.location.pathname.startsWith("/ongoing")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/ongoing?page=")) {
                presenceData.smallImageKey = "schedule";
                presenceData.details = "Browsing the on going";
                presenceData.state =
                    "Hentai. Page: " +
                        document.location.href.replace("https://www.hentaiworld.eu/ongoing?page=", "");
            }
            else {
                presenceData.smallImageKey = "schedule";
                presenceData.details = "Browsing the on going";
                presenceData.state = "Hentai. Page: 1";
            }
        }
        else if (document.location.pathname.startsWith("/upcoming")) {
            presenceData.smallImageKey = "clock";
            presenceData.details = "Browsing the upcoming";
            presenceData.state = "Hentai";
        }
        else if (document.location.pathname.startsWith("/az-list")) {
            if (document.location.href.includes("?page=")) {
                presenceData.smallImageKey = "archive";
                presenceData.details = "Browsing the archive";
                presenceData.state = "Page: " + document.location.href.split("=")[1];
            }
            else
                presenceData.smallImageKey = "archive";
            presenceData.details = "Browsing the archive";
            presenceData.state = "Page: 1";
        }
        else if (document.location.pathname.startsWith("/search")) {
            presenceData.smallImageKey = "search";
            presenceData.details = "Searching:";
            presenceData.state = document.title.replace("HentaiWorld: ", "");
        }
        else if (document.location.href.startsWith("https://www.hentaiworld.eu/filter")) {
            presenceData.smallImageKey = "search";
            presenceData.details = "Doing an advanced";
            presenceData.state = "search";
        }
        else if (document.location.pathname.startsWith("/tv-series")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/tv-series?page=")) {
                presenceData.smallImageKey = "search";
                presenceData.details = "In the category: Hentai";
                presenceData.state =
                    "Page: " +
                        document.location.href.replace("https://www.hentaiworld.eu/tv-series?page=", "");
            }
            else {
                presenceData.smallImageKey = "search";
                presenceData.details = "In the category: Hentai";
                presenceData.state = "Page: 1";
            }
        }
        else if (document.location.pathname.startsWith("/movies")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/movies?page=")) {
                presenceData.smallImageKey = "search";
                presenceData.details = "In the category: Movies";
                presenceData.state =
                    "Page: " +
                        document.location.href.replace("https://www.hentaiworld.eu/movies?page=", "");
            }
            else {
                presenceData.smallImageKey = "search";
                presenceData.details = "In the category: Movies";
                presenceData.state = "Page: 1";
            }
        }
        else if (document.location.pathname.startsWith("/ova")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/ova?page=")) {
                presenceData.smallImageKey = "search";
                presenceData.details = "In the category: OVA";
                presenceData.state =
                    "Page: " +
                        document.location.href.replace("https://www.hentaiworld.eu/ova?page=", "");
            }
            else {
                presenceData.smallImageKey = "search";
                presenceData.details = "In the category: OVA";
                presenceData.state = "Page: 1";
            }
        }
        else if (document.location.pathname.startsWith("/ona")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/ona?page=")) {
                presenceData.smallImageKey = "search";
                presenceData.details = "In the category: ONA";
                presenceData.state =
                    "Page: " +
                        document.location.href.replace("https://www.hentaiworld.eu/ona?page=", "");
            }
            else {
                presenceData.smallImageKey = "search";
                presenceData.details = "In the category: ONA";
                presenceData.state = "Page: 1";
            }
        }
        else if (document.location.pathname.startsWith("/specials")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/specials?page=")) {
                presenceData.smallImageKey = "search";
                presenceData.details = "In the category: Specials";
                presenceData.state =
                    "Page: " +
                        document.location.href.replace("https://www.hentaiworld.eu/specials?page=", "");
            }
            else {
                presenceData.smallImageKey = "search";
                presenceData.details = "In the category: Specials";
                presenceData.state = "Page: 1";
            }
        }
        else if (document.location.pathname.startsWith("/preview")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/preview?page=")) {
                presenceData.smallImageKey = "search";
                presenceData.details = "In the category: Preview";
                presenceData.state =
                    "Page: " +
                        document.location.href.replace("https://www.hentaiworld.eu/preview?page=", "");
            }
            else {
                presenceData.smallImageKey = "search";
                presenceData.details = "In the category: Preview";
                presenceData.state = "Page: 1";
            }
        }
        else if (document.location.pathname.startsWith("/watch")) {
            hentainame = document.title
                .replace("HentaiWorld: ", "")
                .split(" Episodio")[0];
            episodenumber = document
                .querySelector("a#downloadLink.btn.btn-sm.btn-primary")
                .textContent.split("Ep ")[1];
            timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
            if (iFrameVideo == true && !isNaN(duration)) {
                presenceData.smallImageKey = paused ? "pause" : "play";
                presenceData.details = "Watching: " + hentainame;
                presenceData.state = paused
                    ? "Ep. " + episodenumber + "｜Paused"
                    : "Ep. " + episodenumber + "｜Playing";
                presenceData.startTimestamp = paused ? "" : timestamps[0];
                presenceData.endTimestamp = paused ? "" : timestamps[1];
            }
            else {
                presenceData.smallImageKey = "watching";
                presenceData.details = " Is going to watch: " + hentainame;
                presenceData.state = "Episode: " + episodenumber;
            }
        }
    }
    else {
        if (document.location.pathname == "/") {
            presenceData.smallImageKey = "home";
            presenceData.details = "Nella homepage";
        }
        else if (document.location.pathname.startsWith("/contact")) {
            presenceData.smallImageKey = "contacts";
            presenceData.details = "Sta contattando lo";
            presenceData.state = "Staff";
        }
        else if (document.location.pathname.startsWith("/user/")) {
            if (document.location.pathname.startsWith("/user/settings")) {
                presenceData.smallImageKey = "settings";
                presenceData.details = "Nelle sue impostazioni";
            }
            else if (document.location.href.includes("watchlist")) {
                presenceData.smallImageKey = "wlsettings";
                presenceData.details = "Sta modificando la";
                presenceData.state = "sua WatchList";
            }
            else if (document.location.pathname.startsWith("/user/import")) {
                presenceData.smallImageKey = "import";
                presenceData.details = "Sta importando la sua";
                presenceData.state = "WatchList da MAL";
            }
            else if (document.location.pathname.startsWith("/user/notifications")) {
                presenceData.smallImageKey = "notifications";
                presenceData.details = "Sfoglia le notifiche";
            }
            else
                presenceData.smallImageKey = "settings";
            presenceData.details = "Nelle impostazioni";
        }
        else if (document.location.pathname.startsWith("/profile")) {
            if (document.location.href.includes("watchlist")) {
                usernamewl = document.querySelector("span.site-name > b").textContent;
                presenceData.smallImageKey = "userwl";
                presenceData.details = "Guarda la WatchList di:";
                presenceData.state = usernamewl;
            }
            else {
                username = document
                    .querySelector("div.ruolo-aw2")
                    .textContent.replace("Hey ", "")
                    .replace(" Benvenuto!", "");
                presenceData.smallImageKey = "user";
                presenceData.details = "Guarda il profilo di:";
                presenceData.state = username;
            }
        }
        else if (document.location.pathname.startsWith("/genre")) {
            if (document.location.href.includes("?page=")) {
                presenceData.smallImageKey = "search";
                presenceData.details = "Nel genere: " + document.title.split('"')[1];
                presenceData.state = "Pagina: " + document.location.href.split("=")[1];
            }
            else {
                presenceData.smallImageKey = "search";
                presenceData.details = "Nel genere: " + document.title.split('"')[1];
                presenceData.state = "Pagina: 1";
            }
        }
        else if (document.location.pathname.startsWith("/newest")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/newest?page=")) {
                presenceData.smallImageKey = "new";
                presenceData.details = "Sfoglia le nuove aggiunte";
                presenceData.state =
                    "Pagina: " +
                        document.location.href.replace("https://www.hentaiworld.eu/newest?page=", "");
            }
            else {
                presenceData.smallImageKey = "new";
                presenceData.details = "Sfoglia le nuove aggiunte";
                presenceData.state = "Pagina: 1";
            }
        }
        else if (document.location.pathname.startsWith("/updated")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/updated?page=")) {
                presenceData.smallImageKey = "new";
                presenceData.details = "Sfoglia i nuovi episodi";
                presenceData.state =
                    "Pagina: " +
                        document.location.href.replace("https://www.hentaiworld.eu/newest?page=", "");
            }
            else {
                presenceData.smallImageKey = "new";
                presenceData.details = "Sfoglia i nuovi episodi";
                presenceData.state = "Pagina: 1";
            }
        }
        else if (document.location.pathname.startsWith("/ongoing")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/ongoing?page=")) {
                presenceData.smallImageKey = "schedule";
                presenceData.details = "Sfoglia gli hentai in corso";
                presenceData.state =
                    "Pagina: " +
                        document.location.href.replace("https://www.hentaiworld.eu/ongoing?page=", "");
            }
            else {
                presenceData.smallImageKey = "schedule";
                presenceData.details = "Sfoglia gli hentai in corso";
                presenceData.state = "Pagina: 1";
            }
        }
        else if (document.location.pathname.startsWith("/upcoming")) {
            presenceData.smallImageKey = "clock";
            presenceData.details = "Sfoglia le prossime";
            presenceData.state = "uscite";
        }
        else if (document.location.pathname.startsWith("/az-list")) {
            if (document.location.href.includes("?page=")) {
                presenceData.smallImageKey = "archive";
                presenceData.details = "Sfoglia tutti gli hentai";
                presenceData.state = "Pagina: " + document.location.href.split("=")[1];
            }
            else
                presenceData.smallImageKey = "archive";
            presenceData.details = "Sfoglia tutti gli hentai";
            presenceData.state = "Pagina: 1";
        }
        else if (document.location.pathname.startsWith("/search")) {
            presenceData.smallImageKey = "search";
            presenceData.details = "Sta cercando:";
            presenceData.state = document.title.replace("HentaiWorld: ", "");
        }
        else if (document.location.href.startsWith("https://www.hentaiworld.eu/filter")) {
            presenceData.smallImageKey = "search";
            presenceData.details = "Sta facendo una ricerca";
            presenceData.state = "avanzata";
        }
        else if (document.location.pathname.startsWith("/tv-series")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/tv-series?page=")) {
                presenceData.smallImageKey = "search";
                presenceData.details = "Nella categoria: Hentai";
                presenceData.state =
                    "Pagina: " +
                        document.location.href.replace("https://www.hentaiworld.eu/tv-series?page=", "");
            }
            else {
                presenceData.smallImageKey = "search";
                presenceData.details = "Nella categoria: Hentai";
                presenceData.state = "Pagina: 1";
            }
        }
        else if (document.location.pathname.startsWith("/movies")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/movies?page=")) {
                presenceData.smallImageKey = "search";
                presenceData.details = "Nella categoria: Film";
                presenceData.state =
                    "Pagina: " +
                        document.location.href.replace("https://www.hentaiworld.eu/movies?page=", "");
            }
            else {
                presenceData.smallImageKey = "search";
                presenceData.details = "Nella categoria: Film";
                presenceData.state = "Pagina: 1";
            }
        }
        else if (document.location.pathname.startsWith("/ova")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/ova?page=")) {
                presenceData.smallImageKey = "search";
                presenceData.details = "Nella categoria: OVA";
                presenceData.state =
                    "Pagina: " +
                        document.location.href.replace("https://www.hentaiworld.eu/ova?page=", "");
            }
            else {
                presenceData.smallImageKey = "search";
                presenceData.details = "Nella categoria: OVA";
                presenceData.state = "Pagina: 1";
            }
        }
        else if (document.location.pathname.startsWith("/ona")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/ona?page=")) {
                presenceData.smallImageKey = "search";
                presenceData.details = "Nella categoria: ONA";
                presenceData.state =
                    "Pagina: " +
                        document.location.href.replace("https://www.hentaiworld.eu/ona?page=", "");
            }
            else {
                presenceData.smallImageKey = "search";
                presenceData.details = "Nella categoria: ONA";
                presenceData.state = "Pagina: 1";
            }
        }
        else if (document.location.pathname.startsWith("/specials")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/specials?page=")) {
                presenceData.smallImageKey = "search";
                presenceData.details = "Nella categoria: Specials";
                presenceData.state =
                    "Pagina: " +
                        document.location.href.replace("https://www.hentaiworld.eu/specials?page=", "");
            }
            else {
                presenceData.smallImageKey = "search";
                presenceData.details = "Nella categoria: Specials";
                presenceData.state = "Pagina: 1";
            }
        }
        else if (document.location.pathname.startsWith("/preview")) {
            if (document.location.href.startsWith("https://www.hentaiworld.eu/preview?page=")) {
                presenceData.smallImageKey = "search";
                presenceData.details = "Nella categoria: Preview";
                presenceData.state =
                    "Pagina: " +
                        document.location.href.replace("https://www.hentaiworld.eu/preview?page=", "");
            }
            else {
                presenceData.smallImageKey = "search";
                presenceData.details = "Nella categoria: Preview";
                presenceData.state = "Pagina: 1";
            }
        }
        else if (document.location.pathname.startsWith("/watch")) {
            hentainame = document.title
                .replace("HentaiWorld: ", "")
                .split(" Episodio")[0];
            episodenumber = document
                .querySelector("a#downloadLink.btn.btn-sm.btn-primary")
                .textContent.split("Ep ")[1];
            timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
            if (iFrameVideo == true && !isNaN(duration)) {
                presenceData.smallImageKey = paused ? "pause" : "play";
                presenceData.details = "Guardando: " + hentainame;
                presenceData.state = paused
                    ? "Ep. " + episodenumber + "｜In pausa"
                    : "Ep. " + episodenumber + "｜In riproduzione";
                presenceData.startTimestamp = paused ? "" : timestamps[0];
                presenceData.endTimestamp = paused ? "" : timestamps[1];
            }
            else {
                presenceData.smallImageKey = "watching";
                presenceData.details = "Sta per guardare: " + hentainame;
                presenceData.state = "Episodio: " + episodenumber;
            }
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3BELElBQUksV0FBVyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO0FBQy9DLElBQUksVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQztBQUVoRSxTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQ2pDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDcEUsSUFBSSxRQUFRLEVBQUU7UUFDWixXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7UUFDNUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQ3pD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