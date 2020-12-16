const presence = new Presence({
    clientId: "751981945881231430"
});
presence.on("UpdateData", async () => {
    const PresenceData = {
        largeImageKey: "bubblez-logo",
        smallImageKey: "rebrand",
        smallImageText: "Bubblez.app",
        details: "Browsing Bubblez",
        state: "Reading some posts"
    };
    presence.setActivity(PresenceData);
});
