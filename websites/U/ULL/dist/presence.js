var presence = new Presence({
    clientId: "776252916666990592"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", async () => {
    var presenceData = {
        largeImageKey: "big",
        smallImageKey: "little",
        smallImageText: "Campus Virtual",
        details: "En el Campus Virtual",
        state: "Humanidades",
        startTimestamp: 1577232000,
        endTimestamp: 1577151472000
    };
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
