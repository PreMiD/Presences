const presence = new Presence({
    clientId: "754149249335296010"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "bigdefault"
    },
    pathname = document.location.pathname.split("/").splice(1),
    queryString = document.location.search.substring(1);
  presenceData.startTimestamp = browsingStamp;
  
  //Sets BaseUrl
  const BaseUrl = 'https://jstris.jezevec10.com',

  //Inits temporary button array that is to be applied to presenceData later.
  tempButtons = new Array(0),
    
  //Sets button for joining.
  joinLinkArr = document.getElementsByClassName('joinLink'),

  //Sets username
  username = getUsername();

  if (joinLinkArr.length !== 0) {
    const joinUrl = joinLinkArr[joinLinkArr.length-1].innerHTML;
    tempButtons.push({ label: "Join", url: joinUrl });
  }
  //Sets button for viewing profile.
  
  if (typeof username !== "undefined") {
    const profileUrl = `${BaseUrl}/u/${username}`;
    tempButtons.push({ label: "View Profile", url: profileUrl });
  }
  
  switch (pathname[0]) {
    //Play Modes
    case "":
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "Ingame...";
      if (queryString) {
        const queryObj = parseQuery(queryString);
        switch (queryObj.play) {
          case "1":
            presenceData.details = "Sprint";
            if (queryObj.rule) {
              presenceData.state = "Special Ruleset";
            } else {
              presenceData.state = sprintLineMode(queryObj.mode);
            }
            break;
          case "2":
            presenceData.details = "Practice";
            break;
          case "3":
            presenceData.details = "Cheese Race";
            break;
          case "4":
            presenceData.details = "Survival";
            break;
          case "5":
            presenceData.details = "Ultra";
            break;
          case "6":
            presenceData.details = "Playing Custom Map";
            presenceData.state = "Map ID: " + queryObj.map;
            if (tempButtons.length !== 2) {
              tempButtons.unshift({ label: "Play Map", url: `${BaseUrl}/?play=6&map=${queryObj.map}` });
            }
            break;
          case "7":
            presenceData.details = "20TSD";
            break;
          case "8":
            presenceData.details = "PC Mode";
            break;
        }
      } else {
        presenceData.details = "Live";
      }
      break;
    //Leaderboards
    case "sprint":
      presenceData.details = leaderboardText("Sprint");
      break;
    case "cheese":
      presenceData.details = leaderboardText("Cheese Race");
      break;
    case "survival":
      presenceData.details = leaderboardText("Survival");
      break;
    case "ultra":
      presenceData.details = leaderboardText("Ultra");
      break;
    case "20TSD":
      presenceData.details = leaderboardText("20TSD");
      break;
    case "PC-mode":
      presenceData.details = leaderboardText("PC Mode");
      break;
    //Maps
    case "maps":
      presenceData.details = "Browsing Maps";
      break;
    case "map":
      presenceData.details =
        "Viewing Map: " + document.querySelector("h1").innerText;
      presenceData.state = "Map ID: " + pathname[1];
      break;
    //User
    case "u":
      presenceData.details = "Viewing User: " + pathname[1];
      presenceData.state = (<HTMLElement>(
        document.querySelector(".col-md-8")
      )).innerText;
      break;
    default:
      //Idle
      presenceData.details = "Idling";
      break;
  }

  //Sets the buttons:
  if (tempButtons.length !== 0 && tempButtons.length <= 2) {
    presenceData.buttons = tempButtons;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});

function getUsername() {
  try {
    return document.getElementsByClassName('navbar-right')[0].getElementsByClassName('dropdown-toggle')[1].textContent.replace(/\n/g, '');
  }
  catch(err) {
    return undefined;
  }
}

function parseQuery(search: string) {
  return JSON.parse(
    '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === "" ? value : decodeURIComponent(value);
    }
  );
}

function leaderboardText(innerText: string) {
  return "Browsing " + innerText + " Leaderboards";
}

function sprintLineMode(mode: string) {
  switch (mode) {
    case "1":
      return "40 Lines";
      break;
    case "2":
      return "20 Lines";
      break;
    case "3":
      return "100 Lines";
      break;
    case "4":
      return "1000 Lines";
      break;
  }
}
