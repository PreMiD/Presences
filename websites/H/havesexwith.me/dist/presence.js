var presence = new Presence({
    clientId: "782635291105689631"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", async () => {
    var presenceData = {
        largeImageKey: "woman",
        smallImageKey: "doggo",
        smallImageText: "£2.50 lifetime emails",
        details: "On: " + location.hostname,
        state: "Being epic",
        startTimestamp: Date.now()
    };
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
