  const presence = new Presence({
    clientId: "843629449068937217" //The client ID of the Application created at https://discordapp.com/developers/applications
  })  

  var browsingStamp = Math.floor(Date.now() / 1000);

  var title: any;
  var button: any;
  

  presence.on("UpdateData", async () => {

  const presenceData: PresenceData = {
    largeImageKey: "adkami",
  }
    
  if (document.location.hostname == "www.adkami.com") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Home Page";
    }else if(document.location.pathname.includes("/anime") || (document.location.pathname.includes("/video") && document.location.search.includes("t=0"))){
      if (document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > h1") !== null) {
        presenceData.startTimestamp = browsingStamp;
        title = document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > h1");
        presenceData.details = "Viewing Anime:";
        presenceData.state = title.innerText;
             presenceData.buttons = [
            {
              label: "Go to the anime",
              url: document.URL
            }
          ];
      }else{
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Looking for animes";
      }
    }else if(document.location.pathname.includes("/drama") || (document.location.pathname.includes("/video") && document.location.search.includes("t=5"))){
            if (document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > h1") !== null) {
        presenceData.startTimestamp = browsingStamp;
        title = document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > h1")
        presenceData.details = "Viewing Drama:";
        presenceData.state = title.innerText;
             presenceData.buttons = [
            {
              label: "Go to the drama",
              url: document.URL
            }
          ];
      }else{
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Looking for dramas";
      }
    }else if(document.location.pathname.includes("/serie") || (document.location.pathname.includes("/video") && document.location.search.includes("t=1"))){
            if (document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > h1") !== null) {
        presenceData.startTimestamp = browsingStamp;
        title = document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > h1")
        presenceData.details = "Viewing Serie:";
        presenceData.state = title.innerText;
             presenceData.buttons = [
            {
              label: "Go to the serie",
              url: document.URL
            }
          ];
      }else{
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Looking for series";
      }
    }else if(document.location.pathname.includes("/hentai") || (document.location.pathname.includes("/video") && document.location.search.includes("t=4"))){
            if (document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > h1") !== null) {
        presenceData.startTimestamp = browsingStamp;
        title = document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > h1")
        presenceData.details = "Viewing Hentai:";
        presenceData.state = title.innerText;
             presenceData.buttons = [
            {
              label: "Go to the hentai",
              url: document.URL
            }
          ];
      }else{
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Looking for juicy contents";
    } 
  }else if(document.location.pathname.includes("/club")){
     if (document.querySelector("#body > section > div.col-12.col-l-9.blocm.box-display.club-global > h1 > span:nth-child(1)") !== null) {
        presenceData.startTimestamp = browsingStamp;
        title = document.querySelector("#body > section > div.col-12.col-l-9.blocm.box-display.club-global > h1 > span:nth-child(1)")
        presenceData.details = "Viewing club page:";
        presenceData.state = title.innerText;
             presenceData.buttons = [
            {
              label: "Watch Club Page",
              url: document.URL
            }
          ];
     }else{
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing Club";
     }
  }else if(document.location.pathname.includes("/news")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing News";
  }else{
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Surfing on the site";
  }
}
          
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  } 
});