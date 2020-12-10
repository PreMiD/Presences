//Application ID on Discord
const presence = new Presence({
  clientId: "784650203172438026"
});

const timeElapsed: number = new Date().getTime();

presence.on("UpdateData", async() => {
  //default data
  var presenceData: PresenceData = {
    largeImageKey: "logo", /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/
    details: document.title, //The upper section of the presence text
    startTimestamp: timeElapsed //The unix epoch timestamp for when to start counting from
  }; 

  if (document.location.pathname == "/") {
    presenceData.details = "Home"
  } else if (document.location.pathname == "/problems") {
    presenceData.details = "Browsing problems"
  } else if (document.location.pathname.startsWith("/problems")) {
    presenceData.details = "Doing a problem"
    presenceData.state = document.title.split("|")[0].trim(); //problem name
  } else if (document.location.pathname.startsWith("/room")) {
    presenceData.details = "In a room"
    presenceData.state = document.title.split("|")[0].trim(); //room name
  } else if (document.location.pathname == "/leaderboards") {
    presenceData.details = "Viewing leaderboards"
    var params = new URLSearchParams(document.location.search);
    if(params.has("category"))
    {
      if(params.get("category") == "streaks") {
        presenceData.state = "Streak";
      } else if (params.get("category") == "solved_today") {
        presenceData.state = "Solved Today";
      } else if (params.get("category") == "solved_all_time") {
        presenceData.state = "Solved All Time";
      } else if (params.get("category") == "contributors") {
        presenceData.state = "Contributors";
      }
    } else {
        presenceData.state = "Contest";
    }
  } else if (document.location.pathname == "/contest") {
    presenceData.details = "Checking out contests"
  } else if (document.location.pathname.startsWith("/@")) {
    presenceData.details = "Viewing a profile"
  }

  presence.setActivity(presenceData);
});