const presence = new Presence({
    clientId: "752464948965408768"
}),
browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "logo"
    };
    if (document.location.hostname.includes("itch.io")) {
        const hostname = document.location.hostname;
        const pathname = document.location.pathname;
        
        if ((hostname.split("."))[0] != "itch") {
            if (pathname == "/") {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing Developer Profile";
                presenceData.state = document.title.replace(' - itch.io','');
            }
            else {
                const documentTitle = document.title.split(' by '),
                    gameName = documentTitle[0],
                    devName = documentTitle[1];
                presenceData.details = gameName;
                presenceData.state = devName;
                if (document.querySelector(".game_loaded")) {
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.smallImageKey = "play";
                }
            }
        }
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});