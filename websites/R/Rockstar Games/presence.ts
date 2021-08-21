const presence = new Presence({
    clientId: "765234467849240657" //The client ID of the Application created at https://discordapp.com/developers/applications
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
    //You can use this to get translated strings in their browser language
  });

/*

function myOutsideHeavyLiftingFunction(){
    //Grab and process all your data here

    // element grabs //
    // api calls //
    // variable sets //
}

setInterval(myOutsideHeavyLiftingFunction, 10000);
//Run the function separate from the UpdateData event every 10 seconds to get and set the variables which UpdateData picks up

*/

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey:"rockstargameshome",
    startTimestamp: browsingTimestamp
  };

    var pathname = document.location.pathname;
    var hostname = document.location.hostname;
  
    if (hostname === "rockstargames.com" || hostname === "www.rockstargames.com") {
      presenceData.largeImageKey = "rockstargameshome"
      if (pathname === "/") {
        presenceData.details = "Browsing Homepage"
      } else if (pathname === "/newswire") {
        presenceData.details = "Browsing Newsire"
      } else if (pathname.startsWith("/newswire/")) {
        presenceData.details = "Browsing Videos";
        presenceData.state = document.querySelector(
          "head > title"
        ).textContent;
      } else if (pathname === "/games") {
        presenceData.details = "Browsing Games"
      } else if (pathname.startsWith("/games/")) {
        presenceData.details = "Browsing Games";
        presenceData.state = document.querySelector(
          "head > title"
        ).textContent;
      } else if (pathname === "/reddeadonline") {
        presenceData.details = "Browsing Games"
        presenceData.state = "Read Dead Redemption Online"
      } else if (pathname === "/GTAOnline") {
        presenceData.details = "Browsing Games"
        presenceData.state = "Grand Theft Auto Online"
      } else if (pathname === "/videos") {
        presenceData.details = "Browsing Videos"
      } else if (pathname.startsWith("/videos/")) {
        presenceData.details = "Browsing Videos";
        presenceData.state = document.querySelector(
          "head > title"
        ).textContent;
      } else if (pathname === "/downloads") {
        presenceData.details = "Browsing Downloads"
      }
    } 
    
    if (hostname === "support.rockstargames.com" || hostname === "www.support.rockstargames.com") {
      presenceData.largeImageKey = "rockstargamestransparent"
      if (pathname === "/") {
        presenceData.details = "Browsing Support Homepage"
      } else if (pathname.startsWith("/categories/")) {
        presenceData.details = "Browsing Support Pages";
        presenceData.state = document.querySelector(
          "head > title"
        ).textContent;
      } 
    }

    if (hostname === "socialclub.rockstargames.com" || hostname === "www.socialclub.rockstargames.com") {
      presenceData.largeImageKey = "rockstargamespurple"
      if (pathname === "/") {
        presenceData.details = "Browsing Social Club Homepage"
      } else if (pathname === "/games") {
        presenceData.details = "Browsing Social Club Games"
      } else if (pathname.startsWith("/games/")) {
        presenceData.details = "Browsing Games";
        presenceData.state = document.querySelector(
          "head > title"
        ).textContent;
      } else if (pathname === "/crews") {
        presenceData.details = "Browsing Social Club Crews"
      } else if (pathname === "/jobs") {
        presenceData.details = "Browsing Social Club Jobs"
      } else if (pathname === "/photos") {
        presenceData.details = "Browsing Social Club Photos"
      } else if (pathname === "/videos") {
        presenceData.details = "Browsing Social Club Videos"
      } else if (pathname === "/events") {
        presenceData.details = "Browsing Social Club Events"
      } else if (pathname === "/rockstar-games-launcher") {
        presenceData.details = "Browsing Rockstar's Game Launcher"
      }
    }

    if (hostname === "store.rockstargames.com" || hostname === "www.store.rockstargames.com") {
      presenceData.largeImageKey = "rockstargamesspecial3"
      if (pathname === "/en") {
        presenceData.details = "Browsing Store Homepage"
      }  else if (pathname.startsWith("/en/")) {
        presenceData.details = "Browsing Rockstar Store";
        presenceData.state = document.querySelector(
          "head > title"
        ).textContent;
      } 
    }

    

  if (presenceData.details === null) {
    
    presence.setTrayTitle();
    presence.setActivity(); 
  } else {
    presence.setActivity(presenceData);
  }
});