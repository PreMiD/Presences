var presence = new Presence({
    clientId: "562817871152021505",
    mediaKeys: false
});

presence.on("UpdateData", async () => {
    // made in notepad LOL
    var presenceData = {
        largeImageKey: "ie",
        details: "browsing Internet Explorer",
        state: "and watching Dora"
    }; 

    presence.setActivity(presenceData);

});