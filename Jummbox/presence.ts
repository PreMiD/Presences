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
        largeImageKey: "large", 
        smallImageKey: "small", 
        details: "Using Jummbox", 
        state: "Making a Beep", 
    }; 

    if (presenceData.details == null) {

        presence.setTrayTitle(); 
        presence.setActivity(); 
    } else {

        presence.setActivity(presenceData); 
    }
});