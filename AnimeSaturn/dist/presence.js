var presence = new Presence({
    clientId: "669254632400355358",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("iFrameData", data => {
    playback =
        data.iframe_video.duration !== null
            ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.duration;
        videosource = data.iframe_video.source;
        paused = data.iframe_video.paused;
    }
});
presence.on("UpdateData", () => {
    let data = {
        largeImageKey: "asnew"
    };
    if (document.location.pathname == ("/")) {
        if (document.cookie.includes("pmd_")) deleteCookies;
        data.smallImageKey = "search", // Homepage
        data.smallImageText = "Homepage",
            data.details = "Navigando...",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/info")) { // Info
        data.smallImageKey = "info",
        data.smallImageText = "Info",
            data.details = "Nelle Info del Sito",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/animelist")) { // Anime Archive
        data.smallImageKey = "archive",
        data.smallImageText = "Archivio",
            data.details = "Sfogliando l'Archivio",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/animeincorso")) { // On Going Anime
        data.smallImageKey = "new",
        data.smallImageText = "Anime in corso",
            data.details = "Sfogliando gli Anime",
            data.state = "in Corso",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/toplist")) { // Top Anime
        data.smallImageKey = "top",
        data.smallImageText = "TOP List",
            data.details = "Guarda la TOP List degli",
            data.state = "Anime",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/calendario")) { // Schedule
        data.smallImageKey = "schedule",
        data.smallImageText = "Calendario",
            data.details = "Consulta il Calendario",
            data.state = "delle uscite settimanali",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/anime/")) { // Anime
        if (document.cookie.includes("pmd_")) deleteCookies;
        var animev = document.querySelector("head > title").textContent;
        var animename = animev.replace("AnimeSaturn - ", "").replace(" Streaming SUB ITA e ITA", "");
        if (animename.includes("(ITA)")) { animename = animename.replace(" (ITA)", "") }
        setCookie("animename", animename)
        data.smallImageKey = "viewing",
        data.smallImageText = "Valutando",
            data.details = "Valuta se guardare:",
            data.state = animename,
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.match("/ep/")) { // Episode
        var animeept1 = document.querySelector("head > title").textContent;
        var animeept = animeept1.replace("AnimeSaturn - ", "").split(" Episodio")[0];
        var animeepe = animeept1.replace(animeept, "").replace("AnimeSaturn - ", "").replace("Episodio ", "").replace(" Streaming SUB ITA e ITA", "");
        if (animeept.includes("(ITA)")) { animeept = animeept.replace(" (ITA)", "") }
        setCookie("anime", animeept)
        setCookie("episode", animeepe)
        data.smallImageKey = "watching",
        data.smallImageText = "Per guardare",
            data.details = "Sta per guardare: " + animeept,
            data.state = "Episodio: " + animeepe,
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    } else if (document.location.pathname.match("/watch")) { // Watching Page
        if (document.cookie.includes("_animepmd")) {
            var animewt = getCookie("anime");
        }
        if (document.cookie.includes("_episodepmd")) {
            var animewe = getCookie("episode");
        }
        if (document.cookie.includes("_animenamepmd")) {
            var animename = getCookie("animename");
        }
        var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
        if (document.location.href.endsWith("&s=alt")) {
            if (animewe[0] === undefined) {
                if (animename[0] === undefined) {
                    data.smallImageKey = paused ? "pause" : "play",
                    data.smallImageText = paused ? "In pausa" : "In riproduzione",
                        data.details = "Sta guardando un",
                        data.state = "anime",
                        data.startTimestamp = paused ? "" : timestamps[0],
                        data.endTimestamp = paused ? "" : timestamps[1],
                        presence.setActivity(data);
                } else {
                    data.smallImageKey = "watching",
                    data.smallImageText = "Guardando",
                        data.details = "Sta guardando:",
                        data.state = animename,
                        data.startTimestamp = browsingStamp;
                    presence.setActivity(data);
                }
                window.onbeforeunload = deleteCookies;
            } else {
                data.smallImageKey = "watching",
                data.smallImageText = "Guardando",
                    data.details = "Sta guardando: " + animewt,
                    data.state = "Episodio: " + animewe,
                    presence.setActivity(data);
            }
            window.onbeforeunload = deleteCookies;
        } else
            if (animewe === undefined) {
                if (animename === undefined) {
                    data.smallImageKey = paused ? "pause" : "play",
                        data.smallImageText = paused ? "In pausa" : "In riproduzione",
                        data.details = "Sta guardando un",
                        data.state = "anime",
                        data.startTimestamp = paused ? "" : timestamps[0],
                        data.endTimestamp = paused ? "" : timestamps[1],
                        presence.setActivity(data);
                } else {
                    var animeweextra = videosource.split("Ep_")[1].split("_")[0];
                    data.smallImageKey = paused ? "pause" : "play",
                        data.smallImageText = paused ? "In pausa" : "In riproduzione",
                        data.details = "Guardando: " + animename,
                        data.state = paused ? "Ep. " + animeweextra + "｜In pausa" : "Ep. " + animeweextra + "｜In riproduzione",
                        data.startTimestamp = paused ? "" : timestamps[0],
                        data.endTimestamp = paused ? "" : timestamps[1],
                        presence.setActivity(data);
                }
                window.onbeforeunload = deleteCookies; // When the WebSite get closed -> Call Function deleteCookies
            } else
                data.smallImageKey = paused ? "pause" : "play",
                    data.smallImageText = paused ? "In pausa" : "In riproduzione",
                    data.details = "Guardando: " + animewt,
                    data.state = paused ? "Ep. " + animewe + "｜In pausa" : "Ep. " + animewe + "｜In riproduzione",
                    data.startTimestamp = paused ? "" : timestamps[0],
                    data.endTimestamp = paused ? "" : timestamps[1],
                    presence.setActivity(data);
    }
    window.onbeforeunload = deleteCookies;
});
function setCookie(cookieName, cookieValue) {
    if (cookieValue.includes(";")) {
        cookieValue = cookieValue.replace(/;/g, "£S3");
    }
    document.cookie = "pmd_" + cookieName + "=" + cookieValue + "_" + cookieName + "pmd; path=/"
}
function getCookie(cookieName) {
    var cookie = document.cookie.split("pmd_" + cookieName + "=")[1].split("_" + cookieName + "pmd")[0];
    if (cookie.includes("£S3")) {
        cookie = cookie.replace(/£S3/g, ";");
    }
    return cookie
}
function deleteCookies() {
    document.cookie = " pmd_anime=;max-age=0; path=/";
    document.cookie = " pmd_episode=;max-age=0; path=/";
    document.cookie = " pmd_animename=;max-age=0; path=/";
}
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}