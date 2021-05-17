  const presence = new Presence({
    clientId: "843629449068937217"
  }), browsingStamp = Math.floor(Date.now() / 1000);
  let title: HTMLElement;

  presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "adkami",
    startTimestamp: browsingStamp
  }

    if (document.location.pathname == "/") {
      presenceData.details = "Viewing Home Page";
    }else if(document.location.pathname.includes("/anime") || (document.location.pathname.includes("/video") && document.location.search.includes("t=0"))){
      if (document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > h1") !== null) {
        title = document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > h1");
        presenceData.details = "Viewing Anime:";
        presenceData.state = title.innerText;
             presenceData.buttons = [
            {
              label: "View Anime",
              url: document.URL
            }
          ];
      }else{
        presenceData.details = "Looking for animes";
      }
    }else if(document.location.pathname.includes("/drama") || (document.location.pathname.includes("/video") && document.location.search.includes("t=5"))){
            if (document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > h1") !== null) {
        title = document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > h1")
        presenceData.details = "Viewing Drama:";
        presenceData.state = title.innerText;
             presenceData.buttons = [
            {
              label: "View Drama",
              url: document.URL
            }
          ];
      }else{
        presenceData.details = "Looking for dramas";
      }
    }else if(document.location.pathname.includes("/serie") || (document.location.pathname.includes("/video") && document.location.search.includes("t=1"))){
            if (document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > h1") !== null) {
        title = document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > h1")
        presenceData.details = "Viewing Serie:";
        presenceData.state = title.innerText;
             presenceData.buttons = [
            {
              label: "View Serie",

              url: document.URL
            }
          ];
      }else{
        presenceData.details = "Looking for series";
      }
    }else if(document.location.pathname.includes("/hentai") || (document.location.pathname.includes("/video") && document.location.search.includes("t=4"))){
            if (document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > h1") !== null) {
        title = document.querySelector("#body > section > div.col-12.col-l-9.fiche-look > div.row.blocshadow > div > h1")
        presenceData.details = "Viewing Anime (-18):";
        presenceData.state = title.innerText;
             presenceData.buttons = [
            {
              label: "View Anime (-18)",

              url: document.URL
            }
          ];
      }else{
        presenceData.details = "Looking for animes (-18)";
    } 
  }else if(document.location.pathname.includes("/club")){
     if (document.querySelector("#body > section > div.col-12.col-l-9.blocm.box-display.club-global > h1 > span:nth-child(1)") !== null) {
        title = document.querySelector("#body > section > div.col-12.col-l-9.blocm.box-display.club-global > h1 > span:nth-child(1)")
        presenceData.details = "Viewing club page:";
        presenceData.state = title.innerText;
             presenceData.buttons = [
            {
              label: "Check Club Page",

              url: document.URL
            }
          ];
     }else{
        presenceData.details = "Browsing Club";
     }
  }else if(document.location.pathname.includes("/news")){
        presenceData.details = "Browsing News";
  }else{
    presenceData.details = "Browsing...";
  }
}
          
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  } 
});
