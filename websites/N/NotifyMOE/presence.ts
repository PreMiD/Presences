const presence = new Presence({

  clientId: "838833715013746729"
});

presence.on("UpdateData", async () => {

  const presenceData: PresenceData = {
    largeImageKey: "notifymoe_1024"
  };

  

  if (!document.getElementById("audio-player-anime-info").classList.contains("hidden")) //    Check for music
  {
    let musicPlayer = document.getElementById("audio-player");

    presenceData.smallImageKey = "notifymoe_512";
    presenceData.smallImageText = "Listening to " + musicPlayer.children[1].innerHTML;

  }

  var location = document.location.toString();
  if(location.startsWith("https://notify.moe/+") && !location.includes("animelist"))
  {
    presenceData.details = "Viewing " + document.getElementsByTagName("title")[0].innerHTML + "'s profile.";
  }

  else if (location.includes("animelist")) //    LIST
  { 
    presenceData.details = "Viewing " + document.getElementsByTagName("title")[0].innerHTML;
  }


  else if (location.includes("settings")) //    SETTINGS
  {
    presenceData.details = "Setting settings";
  }

  else if (location.includes("notifications")) //    NOTIFICATION
  {
    presenceData.details = "Tweaking notifications";
  }

  else if(location.includes("post")) //   POST
  {
    presenceData.details = "Looking at a post";
  }

  else if (location.includes("activity")) //    ACTIVITY
  {
    presenceData.details = "Looking at recent activity";
  }

  else if (location.includes("forum")) //    FORUM
  {
    presenceData.details = "Scrolling the forum";
  }

  else if (location.includes("explore")) //    EXPLORE
  {
    presenceData.details = "Exploring anime";
  }

  else if (location.includes("amvs")) //    AMVS
  {
    presenceData.details = "Viewing AMVs";
  }

  else if (location.includes("soundtracks")) //    SOUNDTRACKS
  {
    presenceData.details = "Looking at soundtracks";
  }

  else if (location.includes("quotes")) //    QUOTES
  {
    presenceData.details = "Viewing quotes";
  }

  else if (location.includes("groups")) //    GROUPS
  {
    presenceData.details = "Looking at groups";
  }

  else if (location.includes("users")) //    USERS
  {
    presenceData.details = "Viewing user list";
  }

  else if (location.includes("support")) //    SUPPORT
  {
    presenceData.details = "Viewing support options";
  }

  else if (location.includes("shop/history")) //    PURCHASE  HISTORY
  {
    presenceData.details = "Reflecting on purchases";
  }

  else if (location.includes("shop")) //    SHOP
  {
    presenceData.details = "Shopping";
  }

  else if (location.includes("inventory")) //    INVENTORY
  {
    presenceData.details = "Sorting inventory...";
  }

  else if (location.includes("charge")) //    CHARGE
  {
    presenceData.details = "Shopping for gems";
  }

  else
  {
    presenceData.details = "Off in the ether...";
  }

  if (presenceData == null) { console.log("null."); }
  presence.setActivity(presenceData);
});