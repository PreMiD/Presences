const presence = new Presence({
  clientId: "810203651317432351"
});

const browsingStamp = Math.floor(Date.now() / 1000);



presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "Genoanime"
  };

  const title = document.title; //title of the page

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
