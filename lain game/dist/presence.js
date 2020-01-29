var presence = new Presence({
    clientId: "672143036767272961",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
});
var browsingStamp = Math.floor(Date.now() / 1000);
var url = new URLSearchParams(window.location.search).get('site');
var title; 
var replace;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {

    let presenceData = {
        largeImageKey: "logo"
    };

    if (url == "0" || document.location.pathname == "/index.php") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "viewing site A";
    }
    else if (url == "1") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "viewing site B";
    }
    else if (new URLSearchParams(window.location.search).has('id')) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "viewing an file:";
        presenceData.state = document.querySelector("body > center > table > tbody > tr:nth-child(1) > td.ta4d01 > table > tbody > tr:nth-child(1) > td.ta4d2 > a:nth-child(2)").textContent;
       }
       else if (new URLSearchParams(window.location.search).has('tag')) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "viewing an tag:";
        presenceData.state = document.querySelector("body > center > h1").textContent;
       }
    else if (document.location.pathname == "/" || (document.location.pathname == "/index.html")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "index";
    }
    else if (document.location.pathname.includes("/about.html")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "reading the about page";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/feedback.php")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "giving feedback";
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