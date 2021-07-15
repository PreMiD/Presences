const presence = new Presence({
    clientId: "808737268239302697"
}), browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    if (document.location.hostname == "infoblock.gq") {
        presenceData.details = "Looking at:";
        presenceData.state = "Homepage";
        if (document.location.pathname.includes("/partner")) {
            presenceData.details = "Looking at:";
            presenceData.state = "Partner";
        }
        else if (document.location.pathname.includes("/commands")) {
            presenceData.details = "Looking at:";
            presenceData.state = "Commands";
        }
        else if (document.location.pathname.includes("/tacfm")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Listening to:";
            presenceData.state = "TAC-FM";
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
