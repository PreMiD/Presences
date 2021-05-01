const presence = new Presence({
    clientId: "837482821785223179",
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
  
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "genodrama",
	  details: "Exploring Genodrama",
      startTimestamp: browsingStamp
    },
	 pathname = document.location.pathname;
	  switch(true){

    case pathname.includes("/details/"):
	presenceData.details = "Currently watching:";
	presenceData.state = document.querySelector("body > section.section.section--head.section--head-fixed.section--gradient.section--details-bg > div.container > div > div > div:nth-child(1) > div > h1").textContent;

	presenceData.buttons = [
      {
        label: "Watch Episode",
        url: document.URL
      },
  ];
 
  
    break;
  
    case pathname.includes("/movies"):
    presenceData.details = "Browsing Movies";
	
	presenceData.buttons = [
        {
          label: "View Movies",
          url: document.URL
        }
      ];
	  
	    break;
	  
    case pathname.includes("/kshows"):
    presenceData.details = "Browsing KShows";
	
	presenceData.buttons = [
        {
          label: "View KShows",
          url: document.URL
        }
      ];
	  
	    break;
	  
   case pathname.includes("/profile"):
	  presenceData.details = "Looking at profile";
	  
	    break;
 
	  }
  
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});