var presence = new Presence({
  clientId: "609774216430092298",
  mediaKeys: false
}), presenceData: presenceData = {
  largeImageKey: "logo"
};

presence.on("UpdateData", async () => {

  if(document.location.pathname == ("/home")) {

      presenceData.details = "Viewing the homepage";

  } else if(document.location.pathname.startsWith("/home/download")) {
    
     presenceData.details = "Downloading the game";

 } else if(document.location.pathname.startsWith("/beatmapsets")) {
     
      presenceData.details = "Searching for new beatmaps";

  } else if(document.location.pathname.startsWith("/store")) {
     
      presenceData.details = "Browsing through the store";

  } else if(document.location.pathname.startsWith("/rankings")) {
     
      presenceData.details = "Browsing through the rankings";

  } else if(document.location.pathname.startsWith("/community/forums")) {
     
      presenceData.details = "Browsing through the forum";

  } else if(document.location.pathname.startsWith("/community/chat")) {
     
    presenceData.details = "Chatting";

} else if(document.location.pathname.startsWith("/community/contests")) {
     
  presenceData.details = "Browsing through the Contests";

} else if(document.location.pathname.startsWith("/community/livestreams")) {
     
  presenceData.details = "Browsing through livestreams";

}  else if(document.location.pathname.startsWith("/community/tournaments")) {
     
  presenceData.details = "Browsing through Tournaments";

} else if(document.location.pathname.startsWith("/home/search")) {
    
      presenceData.details = "Is searching something";

    } else if(document.location.pathname.startsWith("/home/account/edit")) {
    
      presenceData.details = "Changing their account settings";
  
  } else if(document.location.pathname.startsWith("/wiki")) {
     
      presenceData.details = "Browsing through the wiki";
//https://osu.ppy.sh/home/changelog
  } else if(document.location.pathname.startsWith("/home/changelog")) {

    presenceData.details = "Looking at the changelog";

  } else if(document.location.pathname.startsWith("/home/friends")) {

    presenceData.details = "Browsing through the friend list";

  }  else if(document.location.pathname.startsWith("/users")) {

      presenceData.details = "Looking at " + (document.querySelector(".profile-info__name") as HTMLElement).innerText + "'s Profile";
      presenceData.state = "Rank: " + (document.querySelector(".value-display__value") as HTMLElement).innerText + " / " + (document.querySelector('.value-display--pp .value-display__value') as HTMLElement).innerText + "pp";

  } else {
      presenceData.details = "Seems to be somewhere wrongly";
  }
  presence.setActivity(presenceData);
});

presence.on('iFrameData', function(data) {
  console.log(data);
});

