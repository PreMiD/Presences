var presence = new Presence({
    clientId: "692465350788251748",
    mediaKeys: false 
}),

strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});


presence.on("UpdateData", () => {
   

  
var browsingStamp = Math.floor(Date.now() / 1000);
    var presenceData = {
        startTimestamp: browsingStamp,
        largeImageKey: "large",
        smallImageKey: "small",
        smallImageText: "GamingAnthems Logo", 
        details: "Listening To The Station", 
        state: "No1 Gaming Radio Station", 
    }; 

    if (presenceData.details == null) {
      
        presence.setTrayTitle(); 
        presence.setActivity(); 
    } else {
       
        presence.setActivity(presenceData);
    }
});