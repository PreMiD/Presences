var presence = new Presence({
    clientId: "630081759941361696",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now()/1000);

presence.on("UpdateData", () => {
  
    var presenceData = {
        largeImageKey: "lg"
    }
     
    presenceData.state = document.title.replace("Invalid Stresser |", "");


    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "lg";

    presence.setActivity(presenceData, true);
  
  });
  