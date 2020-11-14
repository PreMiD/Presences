const presence = new Presence({
  clientId: "775661829887754260"
}),
      browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  
  const exploreTitles = document.querySelector("#__next > div > header") as HTMLHeadingElement,
      articleTitles = document.querySelector("#__next > div.p16bck5y > header > div > header > h1"),
      newsPublisher = document.querySelector("#__next > div.p16bck5y > header > div > div.b12pz0kr > a"),
      authorName = document.querySelector("#__next > div.p16bck5y > header > div > div.b12pz0kr > ul > li"),
      path = document.location.pathname;
  //This is just here so that I can have "changes"  to push to GitHub
  //This is just to push to GitHub

  if (window.location.host == "app.getpocket.com") {
    if (path == "/"){
    presenceData.startTimestamp = browsingStamp
    presenceData.details = "Looking at their Pocket list"
    }
  else if (path.startsWith ("/archive")){
  presenceData.startTimestamp = browsingStamp
  presenceData.details = "Looking at their Pocket archives"
  }
  else if (path.startsWith ("/favorites")){
  presenceData.startTimestamp = browsingStamp 
  presenceData.details = "Looking at their Pocket favorites"
  }
  else if (path.startsWith("/highlights")){
    presenceData.startTimestamp = browsingStamp
    presenceData.details = "Looking at thier Pocket highlights"
  }
  else if (path.startsWith ("/articles")){
  presenceData.startTimestamp = browsingStamp
  presenceData.details = "Looking at their saved Pocket articles"
  }
  else if (path.startsWith ("/videos")){
  presenceData.startTimestamp = browsingStamp
  presenceData.details = "Seeing their saved Pocket videos"
  }
  else if (path.startsWith ("/discover")){
  presenceData.startTimestamp = browsingStamp
  presenceData.details = "Looking at the content Pocket recommends"
  }

  }
  else {
     if (path == "/"){
     presenceData.startTimestamp = browsingStamp;
     presenceData.details = "Viewing the Pocket homepage";
     }
    else if (path == "/explore"){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Exploring Pocket"
    }
    else if (path.startsWith ("/explore/")){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the " +exploreTitles?.textContent+" topic on Pocket"
    }
    if (path.startsWith("/explore/item/")){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing article " + articleTitles?.textContent+ "|" +newsPublisher?.textContent + "|" + authorName.textContent;
    }
    else if (path=="/login"){
      presenceData.startTimestamp = browsingStamp
      presenceData.details = "Logging into Pocket"
    }
    
  }
  

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
