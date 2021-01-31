const presence = new Presence({
  clientId: "719415069460529163"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    path = document.location.pathname.split("/")[1],
    query = document.location.pathname.split("/")[2];

  switch (path) {
    case "":
      presenceData.details = "Main Menu";
      break;
    case "play":
      presenceData.details = "Waiting to play";
      break;
    case "game":
      presenceData.details = "Currently in game";
      break;
    case "settings":
      presenceData.details = "Changing settings";
      break;
    case "login":
      presenceData.details = "Logging in";
      break;
    case "learn":
      if (query) {
        presenceData.details = "Playing Lesson";
        presenceData.state = query.replace("_", " ");
      } else presenceData.details = "Viewing Learn";
      break;
    case "blogs":
      presenceData.details = "Newsletter";
      break;
    case "leaderboards":
      presenceData.details = "Viewing Leaderboards";
      if (query)
        presenceData.state = `${
          query.charAt(0).toUpperCase() + query.slice(1)
        } Leaders`;
      break;
    case "profile":
      if (query) {
        presenceData.details = `Viewing profile`;
        presenceData.state = query.replace("-", "#");
      } else presenceData.details = "Viewing profile";
      break;
    default:
      presenceData.details = "Browsing...";
      break;
  }

  presence.setActivity(presenceData);
});
