const presence = new Presence({

  clientId: "838833715013746729"
});

var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {

  const presenceData: PresenceData = {
    largeImageKey: "notifymoe_1024"
  };

  var location = document.location.toString();
  if (location.includes("animelist")) //    LIST
  { 
    presenceData.details = "Viewing " + document.getElementsByTagName("title")[0].innerHTML;
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

  presence.setActivity(presenceData);
});