  const presence = new Presence({
    clientId: "872937214093443093"
  }),

   browsingStamp = Math.floor(Date.now() / 1000);

  presence.on("UpdateData", async () => {
    const urlpath = window.location.pathname.split("/"),
     langs = [
      "de",
      "es",
      "fil",
      "fr",
      "it",
      "nl",
      "no",
      "da",
      "pl",
      "pt-pt",
      "sv",
      "tr",
      "ru",
      "cs",
      "ja",
      "zh-cn",
      "zh-tw",
      "ko",
      "hi"
    ],
    urlpNum = new RegExp(langs.join("|")).test(urlpath[1]) ? 2 : 1,

     data: PresenceData = {
      largeImageKey: "disboardsmall"
    };

      // Home
    if (window.location.hostname == "disboard.org") {
      if (!urlpath[urlpNum]) 
        data.details = "Home";
        data.startTimestamp = browsingStamp;
      
      {
        data.state = document
          .querySelector("head > title")
          .textContent.replace("Disboard", "");
      } 

      // Dashboard - disboard.org/dashboard/
      if (urlpath[urlpNum].startsWith("dashboard")) 
         data.details = "Dashboard";
      

      // Servers - disboard.org/servers
      else if (urlpath[urlpNum].startsWith("servers")) 
        data.details = "Take a look at servers";
      

      // Search - disboard.org/search
      else if (urlpath[urlpNum].startsWith("search")) 
        data.details = "Searching";
      
      
      // Reviews - disboard.org/reviews
      else if (urlpath[urlpNum].startsWith("reviews")) 
        data.details = "Look at reviews";
      
    }

  
    presence.setActivity(data);
  });