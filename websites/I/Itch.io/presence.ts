const presence = new Presence({
    clientId: "752464948965408768"
}),
browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "bigdefault"
    };
    
    if (document.location.hostname == "itch.io") {
        const pathname = document.location.pathname;
        switch (pathname) {
            case "/":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing Frontpage";
                break;
            default:
                //Idle
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Idling";
                presenceData.state = "Doing... Something?";
                break;
        }
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});