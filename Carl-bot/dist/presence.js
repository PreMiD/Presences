var presence = new Presence({
    clientId: "653372675166568481",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "carllogo"
    };
    if (document.location.hostname == "carl.gg") {
        presenceData.startTimestamp = browsingStamp;
        if (document.location.pathname.includes("/dashboard/")) {
            presenceData.details = "Managing the settings of";
            title = document.querySelector("#__BVID__17__BV_button_ > strong").innerText
            presenceData.state = "server: " + title;
        } else if (document.location.pathname.includes("/servers")) {
            presenceData.details = "Browsing through";
            presenceData.state = "servers";
        } else if (document.location.pathname.includes("/premium")) {
            presenceData.details = "Viewing Premium Plans";
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
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
