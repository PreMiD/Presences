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
    localStorage.removeItem("Anime");
    localStorage.removeItem("Episode");
    localStorage.removeItem("AnimeName");
    data.smallImageKey = "search",
    data.details = "Navigando...",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/info")) {
    data.smallImageKey = "info",
    data.details = "Nelle Info del Sito",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
    else if (document.location.pathname.endsWith("/animelist")) {
    data.smallImageKey = "archive",
    data.details = "Sfogliando l'Archivio",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/animeincorso")) {
    data.smallImageKey = "new",
    data.details = "Sfogliando gli Anime",
	data.state = "in Corso",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/toplist")) {
    data.smallImageKey = "top",
    data.details = "Guarda la TOP List degli",
	data.state = "Anime",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
	else if (document.location.pathname.endsWith("/calendario")) {
    data.smallImageKey = "schedule",
    data.details = "Consulta il Calendario",
	data.state = "delle uscite settimanali",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
    else if (document.location.pathname.startsWith("/anime/")) {
    localStorage.removeItem("Anime");
    localStorage.removeItem("Episode");
    localStorage.removeItem("AnimeName");
    var animev = document.querySelector("head > title").textContent;
    var animename = animev.replace("AnimeSaturn - ","").replace(" Streaming SUB ITA e ITA", "");
    localStorage.setItem("AnimeName", animename);
    data.smallImageKey = "viewing",
    data.details = "Valuta se guardare:",
	data.state = animename,
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
	}
	else if (document.location.pathname.match("/ep/")) {
	var animeept1 = document.querySelector("head > title").textContent;
	var animeept = animeept1.replace("AnimeSaturn - ","").split(" Episodio")[0];
	var animeepe = animeept1.replace(animeept, "").replace("AnimeSaturn - ", "").replace("Episodio ", "").replace(" Streaming SUB ITA e ITA", "");
    localStorage.setItem("Anime", animeept);
    localStorage.setItem("Episode", animeepe);
    data.smallImageKey = "watching",
    data.details = "Sta per guardare: " + animeept,
	data.state = "Episodio: " + animeepe,
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    } else if (document.location.pathname.match("/watch")) {
    var animewt = localStorage.getItem("Anime");
    var animewe = localStorage.getItem("Episode");
    var animename = localStorage.getItem("AnimeName");
    var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
    if (document.location.href.endsWith("&s=alt")){
        if (animewe === null) {
            if (animename === null) {
            data.smallImageKey = paused ? "pause" : "play",
            data.details = "Sta guardando un",
            data.state = "anime",
            data.startTimestamp = paused ? "" : timestamps[0],
            data.endTimestamp = paused ? "" : timestamps[1],
            presence.setActivity(data);
        } else {
        data.smallImageKey = "watching",
        data.details = "Sta guardando:",
        data.state = animename,
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);}
        window.onbeforeunload = function () { // When the WebSite get closed -> delete all the localStorage
        localStorage.removeItem("Anime");
        localStorage.removeItem("Episode");
        localStorage.removeItem("AnimeName");
    };} else {
    data.smallImageKey = "watching",
    data.details = "Sta guardando: " + animewt,
    data.state = "Episodio: " + animewe,
    presence.setActivity(data);}
    window.onbeforeunload = function () { // When the WebSite get closed -> delete all the localStorage
    localStorage.removeItem("Anime");
    localStorage.removeItem("Episode");
    localStorage.removeItem("AnimeName");
    };} else
    if (animewe === null) {
            if (animename === null) {
            data.smallImageKey = paused ? "pause" : "play",
            data.details = "Sta guardando un",
            data.state = "anime",
            data.startTimestamp = paused ? "" : timestamps[0],
            data.endTimestamp = paused ? "" : timestamps[1],
            presence.setActivity(data);
        } else {
        var animeweextra = videosource.split("Ep_")[1].split("_")[0];
        data.smallImageKey = paused ? "pause" : "play",
        data.details = "Guardando: " + animename,
        data.state = paused ? "Ep. " + animeweextra + "｜In pausa" : "Ep. " + animeweextra + "｜In riproduzione",
        data.startTimestamp = paused ? "" : timestamps[0],
        data.endTimestamp = paused ? "" : timestamps[1],
        presence.setActivity(data);}
        window.onbeforeunload = function () { // When the WebSite get closed -> delete all the localStorage
        localStorage.removeItem("Anime");
        localStorage.removeItem("Episode");
        localStorage.removeItem("AnimeName");
        };
    } else {
    data.smallImageKey = paused ? "pause" : "play",
    data.details = "Guardando: " + animewt,
    data.state = paused ? "Ep. " + animewe + "｜In pausa" : "Ep. " + animewe + "｜In riproduzione",
    data.startTimestamp = paused ? "" : timestamps[0],
    data.endTimestamp = paused ? "" : timestamps[1],
    presence.setActivity(data);}
    window.onbeforeunload = function () { // When the WebSite get closed -> delete all the localStorage
    localStorage.removeItem("Anime");
    localStorage.removeItem("Episode");
    localStorage.removeItem("AnimeName");
    };
    }
    });
    function getTimestamps(videoTime, videoDuration) {
        var startTime = Date.now();
        var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
        return [Math.floor(startTime / 1000), endTime];
    }