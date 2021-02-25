const presence = new Presence({
    clientId: "813518808634621952"
}),
strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});

let browsingStamp =  Math.floor(Date.now() / 1000)

let details: string;

function updateMetadata() {

    switch (location.host) {
        case "kosmi.io":
            details = "On the Startpage"
            break;
        case "app.kosmi.io": 
            if (location.pathname === "/") {
                details =  "Viewing the Home Page..."
            }
                
            else if (location.pathname === "/lobby") {
                details = "Browsing public rooms..."
            }
                
            else if (location.pathname.includes("/room/")) {
                details = "In a room"
            }
                    
            break;
      default: break;
    }

}

setInterval(updateMetadata, 1000);




presence.on("UpdateData", async () => {


        const presenceData: PresenceData = {
            largeImageKey: "kosmimain",
            details: details,
            startTimestamp: browsingStamp,
        };

        if (presenceData.details == null) {
            presence.setTrayTitle();
            presence.setActivity();
        } else {
            presence.setActivity(presenceData)
        }      
});
