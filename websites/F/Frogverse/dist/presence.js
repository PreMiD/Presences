const presence = new Presence({
    clientId: "922165604595679263"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo",
        smallImageKey: "key",
        smallImageText: "",
        details: "Viewing Frogverse",
        state: "Main Page",
        startTimestamp: 3133657200000,
        endTimestamp: 3133700400000
    };
    if (presenceData.details)
        presence.setActivity(presenceData);
    else
        presence.setActivity();
});
