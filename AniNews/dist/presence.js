
var presence = new Presence({
    clientId: "651244193624096778",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title = document.querySelector('#content h1').innerText.replace(document.querySelector('#content h1 i').innerText, '').trim();
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "logo"
    };

    if (document.location.pathname.includes("/resenhas/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Lendo uma resenha:";
        presenceData.state = document.querySelector('#noticia_titulo').innerText;
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/noticia/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Lendo uma notícia:";
        presenceData.state = document.querySelector('#noticia_titulo').innerText;
        presenceData.smallImageKey = "reading";
    } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Vendo a" + (document.location.pathname == "/" ? "s " : " ") + title;
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
