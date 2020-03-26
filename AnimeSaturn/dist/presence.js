var presence = new Presence({
    clientId: "669254632400355358",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000);
var currentTime
var duration
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
    else if (document.location.pathname.startsWith("/anime/")) {
        deleteCookies;
        var videoName = document.title.split("AnimeSaturn - ")[1].split(" Streaming")[0];
        if (videoName.includes("(ITA)")) {
            videoName = videoName.replace(" (ITA)", "");
        }
        if (document.querySelector("#Blog1 > div.blog-posts > article > div:nth-child(13)").textContent != null) {
            if (document.querySelector("#Blog1 > div.blog-posts > article > div:nth-child(13)").textContent.includes("OAV" || "OVA")) {
                var videoType = "OAV"
            }
            if (document.querySelector("#Blog1 > div.blog-posts > article > div:nth-child(13)").textContent.includes("Movie" || "Film")) {
                var videoType = "Movie"
            } else {
                var videoType = "Anime"
            }
        }
        setCookie("videoName", videoName);
        setCookie("videoType", videoType);
        data.smallImageKey = "viewing",
            data.smallImageText = videoName,
            data.details = "Valuta se guardare:",
            data.state = videoName,
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/ep/")) {
        deleteCookies;
        var videoName = document.title.split("AnimeSaturn - ")[1].split(" Episodio")[0];
        if (videoName.includes("(ITA)")) {
            videoName = videoName.replace(" (ITA)", "");
        }
        var videoEpisode = document.title.split(" Episodio")[1].split(" Streaming")[0];
        setCookie("videoName", videoName);
        setCookie("videoType", "Anime");
        setCookie("videoEpisode", videoEpisode);
        data.smallImageKey = "watching",
            data.smallImageText = videoName + " Ep. " + videoEpisode,
            data.details = "Sta per guardare: " + videoName,
            data.state = "Episodio: " + videoEpisode,
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/oav/")) {
        deleteCookies;
        var videoName = document.title.split("AnimeSaturn - ")[1].split(" OAV")[0];
        if (videoName.includes("(ITA)")) {
            videoName = videoName.replace(" (ITA)", "");
        }
        if (videoName.includes("OAV")) {
            videoName = videoName.replace(" OAV", "");
        }
        if (videoName.includes("OVA")) {
            videoName = videoName.replace(" OVA", "");
        }
        var videoEpisode = document.title.split(" OVA")[1].split(" Streaming")[0];
        if (videoEpisode.includes(" OAV ")) {
            videoEpisode = videoEpisode.replace(" OAV ", "");
        }
        setCookie("videoName", videoName);
        setCookie("videoType", "OAV");
        setCookie("videoEpisode", videoEpisode);
        data.smallImageKey = "watching",
            data.smallImageText = videoName + " OAV " + videoEpisode,
            data.details = "Sta per guardare: " + videoName,
            data.state = "OAV: " + videoEpisode,
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/movie/")) {
        deleteCookies;
        var videoName = document.title.split("AnimeSaturn - ")[1].split(" Film")[0];
        if (videoName.includes("(ITA)")) {
            videoName = videoName.replace(" (ITA)", "");
        }
        setCookie("videoName", videoName);
        setCookie("videoType", "Movie");
        data.smallImageKey = "watching",
            data.smallImageText = videoName,
            data.details = "Sta per guardare il film: ",
            data.state = videoName,
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/watch")) {
        if (currentTime == undefined) {
            data.smallImageKey = "watching",
                data.smallImageText = "Guardando",
                data.details = "Sta guardando un",
                data.state = "anime",
                data.startTimestamp = browsingStamp,
                presence.setActivity(data);
        } else if (document.cookie.includes("videoType")) {
            var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
            var videoType = getCookie("videoType");
            if (videoType == "Anime") {
                var videoName = getCookie("videoName");
                var videoEpisode = getCookie("videoEpisode");
                if (videoEpisode == null) {
                    if (videoName == null) {
                        data.smallImageKey = paused ? "pause" : "play",
                            data.smallImageText = paused ? "In pausa" : "In riproduzione",
                            data.details = "Sta guardando un",
                            data.state = "anime",
                            data.startTimestamp = paused ? "" : timestamps[0],
                            data.endTimestamp = paused ? "" : timestamps[1],
                            presence.setActivity(data);
                    } else {
                        var videoEpisode = videosource.split("Ep_")[1].split("_")[0];
                        data.smallImageKey = paused ? "pause" : "play",
                            data.smallImageText = paused ? "In pausa" : "In riproduzione",
                            data.details = "Guardando: " + videoName,
                            data.state = paused ? "Ep. " + videoEpisode + "｜In pausa" : "Ep. " + videoEpisode + "｜In riproduzione",
                            data.startTimestamp = paused ? "" : timestamps[0],
                            data.endTimestamp = paused ? "" : timestamps[1],
                            presence.setActivity(data);
                    }
                    window.onbeforeunload = deleteCookies;
                }
                if (videoEpisode != null) {
                    if (videoName != null) {
                        data.smallImageKey = paused ? "pause" : "play",
                            data.smallImageText = paused ? "In pausa" : "In riproduzione",
                            data.details = "Guardando: " + videoName,
                            data.state = paused ? "Ep. " + videoEpisode + "｜In pausa" : "Ep. " + videoEpisode + "｜In riproduzione",
                            data.startTimestamp = paused ? "" : timestamps[0],
                            data.endTimestamp = paused ? "" : timestamps[1],
                            presence.setActivity(data);
                    }
                    window.onbeforeunload = deleteCookies;
                }
            }
            if (videoType == "OAV") {
                var videoName = getCookie("videoName");
                var videoEpisode = getCookie("videoEpisode");
                if (videoEpisode == null) {
                    if (videoName != null) {
                        data.smallImageKey = paused ? "pause" : "play",
                            data.smallImageText = paused ? "In pausa" : "In riproduzione",
                            data.details = "Sta guardando un",
                            data.state = "OAV",
                            data.startTimestamp = paused ? "" : timestamps[0],
                            data.endTimestamp = paused ? "" : timestamps[1],
                            presence.setActivity(data);
                    } else {
                        var videoEpisode = videosource.split("OVA_")[1].split("_")[0];
                        data.smallImageKey = paused ? "pause" : "play",
                            data.smallImageText = paused ? "In pausa" : "In riproduzione",
                            data.details = "Guardando: " + videoName,
                            data.state = paused ? "OAV ~ " + videoEpisode + "｜In pausa" : "OAV ~ " + videoEpisode + "｜In riproduzione",
                            data.startTimestamp = paused ? "" : timestamps[0],
                            data.endTimestamp = paused ? "" : timestamps[1],
                            presence.setActivity(data);
                    }
                    window.onbeforeunload = deleteCookies;
                }
                if (videoEpisode != null) {
                    if (videoName != null) {
                        data.smallImageKey = paused ? "pause" : "play",
                            data.smallImageText = paused ? "In pausa" : "In riproduzione",
                            data.details = "Guardando: " + videoName,
                            data.state = paused ? "OAV ~ " + videoEpisode + "｜In pausa" : "OAV ~ " + videoEpisode + "｜In riproduzione",
                            data.startTimestamp = paused ? "" : timestamps[0],
                            data.endTimestamp = paused ? "" : timestamps[1],
                            presence.setActivity(data);
                    }
                    window.onbeforeunload = deleteCookies;
                }
            }
            if (videoType == "Movie") {
                var videoName = getCookie("videoName");
                if (videoName == null) {
                    data.smallImageKey = paused ? "pause" : "play",
                        data.smallImageText = paused ? "In pausa" : "In riproduzione",
                        data.details = "Sta guardando un",
                        data.state = "film",
                        data.startTimestamp = paused ? "" : timestamps[0],
                        data.endTimestamp = paused ? "" : timestamps[1],
                        presence.setActivity(data);
                } else {
                    data.smallImageKey = paused ? "pause" : "play",
                        data.smallImageText = paused ? "In pausa" : "In riproduzione",
                        data.details = "Guardando: " + videoName,
                        data.state = paused ? "Film｜In pausa" : "Film｜In riproduzione",
                        data.startTimestamp = paused ? "" : timestamps[0],
                        data.endTimestamp = paused ? "" : timestamps[1],
                        presence.setActivity(data);
                    window.onbeforeunload = deleteCookies;
                }
            }
        } else {
            var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
            data.smallImageKey = paused ? "pause" : "play",
                data.smallImageText = paused ? "In pausa" : "In riproduzione",
                data.details = "Sta guardando un",
                data.state = "anime",
                data.startTimestamp = paused ? "" : timestamps[0],
                data.endTimestamp = paused ? "" : timestamps[1],
                presence.setActivity(data);
        }
    }
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
    return cookie;
}
function deleteCookies() {
    document.cookie = " pmd_videoName=;max-age=0; path=/";
    document.cookie = " pmd_videoType=;max-age=0; path=/";
    document.cookie = " pmd_videoEpisode=;max-age=0; path=/";
}
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}