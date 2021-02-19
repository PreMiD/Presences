const presence = new Presence({
  clientId: "812176837748457483"
});

var browsingStamp = Math.floor(Date.now() / 1000);

var user: any;
var title: any;
var replace: any;
var search: any;
var post: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing home page";
  }
  else if (document.location.pathname == "/forum.php") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the forum's menu";
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname == "index.php") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing home page";
  } else if (document.location.pathname.includes("topic.php?topic")) {
    presenceData.startTimestamp = browsingStamp;
   presenceData.details = "Browsing Forum topic";
   presenceData.smallImageKey = "search"
  } else if (document.location.pathname.includes("profil.php?")) {    // not spelling mistake, the document location name is profil not profile. 
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing user profile";
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname == "/category.php?category=4") { 
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing the international category";
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname == "/category.php?category=0") { 
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "browsing official topics ";
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname == "/category.php?category=1") { 
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing unofficial announcements and presentations";
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname == "/category.php?category=2") { 
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing discussion about the game ";
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname == "/category.php?category=3") { 
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "In Various discussions ";
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname == "/mariokart.php") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing the core game";
    presenceData.smallImageKey = "wheel"
    
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
