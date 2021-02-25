const presence = new Presence({
    clientId: "813518808634621952"
}),
strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});

const browsingStamp =  Math.floor(Date.now() / 1000)

let details: string;

presence.on("UpdateData", async () => {

      switch (location.host) {
        case "kosmi.io":
            details = "On the Startpage";
            break;
        case "app.kosmi.io": 
            if (location.pathname === "/") {
                details =  "Viewing the Home Page...";
            }
                
            else if (location.pathname === "/lobby") {
                details = "Browsing public rooms...";
            }
                
            else if (location.pathname.includes("/room/")) {
                details = "In a room";
            }
                    
            break;
      default: break;
    }

        const presenceData: PresenceData = {
            largeImageKey: "kosmimain",
            details,
            startTimestamp: browsingStamp
        };

        if (presenceData.details == null) {
            presence.setTrayTitle();
            presence.setActivity();
        } else {
            presence.setActivity(presenceData);
        }      
});
