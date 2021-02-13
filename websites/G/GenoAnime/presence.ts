var presence = new Presence({
  clientId: "810203651317432351"
});

var browsingStamp = Math.floor(Date.now() / 1000);

var title: any;
var titleName: any;
var search: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "Genoanime"
  };

  title = document.title; //title of the page

  // titleName = title.split("Watching - ")[1]; 
   
  if (
    document.location.pathname == "/" 
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Watching Genoanime";
  } else if (document.location.pathname.includes("/browse")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing Genoanime library";
  } else if (document.location.pathname.includes("/watch")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = title;
  } 
  else if (document.location.pathname.includes("/details")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing on Genoanime";
  } 
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
