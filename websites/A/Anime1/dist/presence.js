const presence = new Presence({
    clientId: "841601256203485205"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing",
});
var browsingStamp = Math.floor(Date.now() / 1000);
function update() {
    presence.info('test');
    console.log('test');
}
setInterval(update, 10000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "anime1_me",
        state: "Inital details",
    };
    if (document.location.hostname == "anime1.me" || document.location.hostname.includes("www.")) {
        if (presenceData.details == null) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Watching:";
            presenceData.state = document
                .querySelector("head > title")
                .textContent.replace(" – Anime1.me 動畫線上看", "");
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity(presenceData);
        }
    }
});
