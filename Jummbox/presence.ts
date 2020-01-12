var presence = new Presence({
    clientId: "637737627151368202", 
    mediaKeys: false 
}),

strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
    
});




presence.on("UpdateData", async () => {
    

    var presenceData = {
        largeImageKey: "favicon.ico", 
        smallImageKey: "favicon.ico", 
        details: "Using Jummbox", 
        state: "Making a Beep", 
        startTimestamp: 1577232000, 
        endTimestamp: 1577151472000 
    }; 

    if (presenceData.details == null) {
        
        presence.setTrayTitle(); 
        presence.setActivity(); 
    } else {
        
        presence.setActivity(presenceData); 
    }
});
