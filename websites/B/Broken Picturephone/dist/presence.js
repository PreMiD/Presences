var presence = new Presence({
    clientId: "756196794727399617"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    var presenceData = {
        largeImageKey: "large_image",
        smallImageKey: "playing",
        smallImageText: "Playing",
        details: "In game",
        startTimestamp: browsingStamp
    };
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
