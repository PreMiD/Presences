var presence = new Presence({
    clientId: "635213174144237601",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    search: "presence.activity.searching",
    reading: "presence.activity.reading"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title; 
var replace;
var viewString = "Viewing ";
var torrentString = "'s torrents";
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {

    let presenceData = {
        largeImageKey: "logo"
    };

    if (new URLSearchParams(window.location.search).has('q')) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Searching for:";
        presenceData.state = document.querySelector('input').value;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = (yield strings).search;
    }
    else if (document.location.pathname == "/") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing home page";
    }
    else if (document.location.pathname.includes("/rules")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = "reading";
        presenceData.details = "Reading the rules";
        presenceData.smallImageText = (yield strings).reading;
    }
    else if (document.location.pathname.includes("/help")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = "reading";
        presenceData.details = "Reading the help section";
        presenceData.smallImageText = (yield strings).reading;
    }
    else if (document.location.pathname.includes("/upload")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = "upload";
        presenceData.details = "Uploading a torrent";
        presenceData.smallImageText = "Uploading";
    }
    else if (document.location.pathname.includes("/view/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing torrent:";
        title = document.querySelector('h3.panel-title').textContent.trim();
        presenceData.state = title;
    }
    else if (document.location.pathname.includes("/user/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = viewString + document.querySelector("body > div > div > h3 > span").textContent + torrentString;      
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
}));