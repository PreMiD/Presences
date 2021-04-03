const presence = new Presence({
  clientId: "810203651317432351"
}),
browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "geno",
    details: "Genoanime !!!"
  },
title = document.title; //title of the page

  if (document.location.pathname == "/" ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Exploring Genoanime";
	presenceData.buttons = [{label:"Visit Genoanime",url: document.location.href}];
  } else if (document.location.pathname.includes("/browse")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Exploring Genoanime library";
	presenceData.buttons = [{label:"See the Library",url: document.location.href}];
  }
  else if (document.location.pathname.includes("/details")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing on Genoanime";
  } 
  else if (document.location.pathname.includes("/watch")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = title;
    presenceData.state = 'Episode '+ String(document.location.href.split("episode=")[1]);
    presenceData.buttons = [{label:"Watch The Same",url: document.location.href}];
 }
  else if (document.location.pathname.includes("/search")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Searching Catalogue";
  }
  else if (document.location.pathname.includes("/amv")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Watching cool AMV videos";
	   presenceData.buttons = [{label:"Check it yourself",url: document.location.href}];
  }
  else if (document.location.pathname.includes("/favorite")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing Favourites";
  }
  
  else if (document.location.pathname.includes("/schedule")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Checking Schedule";
	presenceData.buttons = [{label:"Get some Dates",url: document.location.href}];
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});