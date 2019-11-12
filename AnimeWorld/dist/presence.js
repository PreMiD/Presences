var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "639550668088279073",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title, views, air, air2;
var iFrameVideo, currentTime, duration, paused;
var video, videoDuration, videoCurrentTime;
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var search;
if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("iFrameData", data => {
    playback =
        data.iframe_video.duration !== null
            ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
        paused = data.iframe_video.paused;
    }
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var a = '', timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)), presenceData = {
        largeImageKey: "aw2"
    };
    if (document.location.pathname.includes("/watch/")) {
        if (iFrameVideo == true && !isNaN(duration)) {
            presenceData.smallImageKey = paused ? "pause" : "play";
            presenceData.smallImageText = paused ? (yield strings).pause : (yield strings).play;
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            title = document.querySelector("head > title");
            presenceData.details = title.innerText.replace("AnimeWorld: ", "").replace(" Streaming & Download SUB ITA!", "");
            air = document.querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(4) > font > font");
            if (air == null) {
                air = document.querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(4)");
            }
            presenceData.state = "Trasmesso il: " + air.innerText;
            if (paused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
        }
        else if (iFrameVideo == null && isNaN(duration)) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Guardando: ";
            title = document.querySelector("#main > div > div.widget.player > div.widget-title > h1 > font > font");
            if (title == null) {
                title = document.querySelector("#main > div > div.widget.info > div > div:nth-child(1) > div:nth-child(2) > div.head > div > h2");
            }
            presenceData.state = title.innerText;
            presenceData.smallImageKey = "reading";
        }
    }
    else if (document.location.pathname.includes("/newest")) {
        presenceData.details = "Sfogliando le";
        presenceData.state = "ultime serie";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/updated")) {
        presenceData.details = "Sfogliando le";
        presenceData.state = "serie aggiornate";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/search")) {
        search = document.querySelector("#main > div > div > div.widget-title > span > h1");
        presenceData.details = "Cercando:";
        presenceData.state = search.innerText.replace("RISULTATI PER: ", "");
        presenceData.smallImageKey = "search";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/ongoing")) {
        presenceData.details = "Sfogliando tra gli";
        presenceData.state = "anime in corso";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/tv-series")) {
        presenceData.details = "Sfogliando per";
        presenceData.state = "categoria: anime";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/movies")) {
        presenceData.details = "Sfogliando per";
        presenceData.state = "categoria: movies";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/ova")) {
        presenceData.details = "Sfogliando per";
        presenceData.state = "categoria: ova";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/ona")) {
        presenceData.details = "Sfogliando per";
        presenceData.state = "categoria: ona";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/specials")) {
        presenceData.details = "Sfogliando per";
        presenceData.state = "categoria: specials";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/schedule")) {
        presenceData.details = "Guardando il";
        presenceData.state = "calendario";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/az-list")) {
        presenceData.details = "Sfogliando nella";
        presenceData.state = "lista a-z";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/news/")) {
        title = document.querySelector("#main > div > div.widget > div.widget-title > h2");
        presenceData.smallImageKey = "reading";
        presenceData.details = "Leggendo l'articolo:";
        presenceData.state = title.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/news")) {
        presenceData.details = "Sfogliando";
        presenceData.state = "le notizie";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/genre")) {
        title = document.querySelector("#main > div > div > div.widget-title > span > h1");
        presenceData.details = "Sfogliando per";
        presenceData.state = "genere: " + title.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.URL == "https://www.animeworld.tv/") {
        presenceData.details = "Navigando...";
        presenceData.smallImageKey = "reading";
        presenceData.startTimestamp = browsingStamp;
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
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
