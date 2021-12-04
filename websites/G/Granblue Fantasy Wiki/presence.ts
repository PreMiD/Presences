const presence = new Presence({
    clientId: "914354609370329098"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "vyrnball"
  };
  presenceData.startTimestamp = browsingStamp;
  
  if (document.location.pathname === "/Main_Page")
    presenceData.details = "Viewing Wiki home page";
  else if (document.querySelector("#wpLoginAttempt"))
    presenceData.details = "Logging in";
  else if (document.querySelector("#wpCreateaccount"))
    presenceData.details = "Creating an account";
  else if (document.location.pathname === "/Character_Tier_List")
    presenceData.details = "Viewing the character tier list";
  else if (document.location.pathname === "/Collection_Tracker")
    presenceData.details = "Making a collection tracker";
  else if (document.querySelector(".searchresults")) {
    presenceData.details = "Searching for:";
    presenceData.state = (
      document.querySelector("input[type=search]")as HTMLInputElement
      ).value;
    }
  else if (document.location.href.indexOf ("/Special:Preferences") > -1) {
    presenceData.details = "Editing preferences";
  }
  else if (document.location.href.indexOf ("/Special:Watchlist") > -1) {
    presenceData.details = "Viewing watchlist";
  }
  else if (document.location.href.indexOf ("/Special:Contributions") > -1) {
    presenceData.details = "Looking up contributions";
  }
  else if (document.location.href.indexOf("edit") > -1) {
    presenceData.details = "Viewing revision history/Editing:";
    presenceData.state = document.querySelector(".firstHeading").textContent;
  }
  else if (document.querySelector(".firstHeading") !== null) {
    presenceData.details = "Viewing page:"; 
    presenceData.state = document.querySelector(".firstHeading").textContent;
  }
  
  presence.setActivity(presenceData);
});