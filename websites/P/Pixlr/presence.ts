const presence = new Presence({
    clientId: "731195217063182387"
  });

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "pixlr"
  };

  presenceData.startTimestamp = browsingStamp;  
  if (document.location.hostname == "pixlr.com") {
    if (document.location.pathname == "/") {
      presenceData.details = "Viewing home page...";

      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/e/") {
      presenceData.details = "Edits an image",
      presenceData.state = "Advanced editor"
      
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/x/") {
      presenceData.details = "Edits an image",
      presenceData.state = "Playful editor";


    }
  }
});  
