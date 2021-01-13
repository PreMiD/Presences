const presence = new Presence({
    clientId: "798368817318330400"
}),
    strings = presence.getStrings({
        search: "presence.playback.search",
    });

var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "tokopedia"
    };

    if (document.location.hostname == "www.tokopedia.com") {
        var path = document.location.pathname;
        if (path.includes("/p?nref=")) {
            presenceData.details = "Viewing Product List....";
            presenceData.startTimestamp = elapsed;
        } else if (path.includes("/mitra")) {
            presenceData.details = "Viewing a Tokopedia Partner....";
            presenceData.startTimestamp = elapsed;
        } else if (path.includes("/promo")) {
            presenceData.details = "Viewing a Promo....";
            presenceData.startTimestamp = elapsed;
        } else if (path.includes("/edu")) {
            presenceData.details = "Viewing on Seller Education Center....";
            presenceData.startTimestamp = elapsed;
        } else {
            presenceData.details = "Viewing a Homepage";
            presenceData.startTimestamp = elapsed;
        }
    }

    presence.setActivity(presenceData);
});
