const presence = new Presence({
  clientId: "930231661986197554"
});

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    smallImageKey: "https://i.imgur.com/AJ9gTe1.png",
    smallImageText: "Playing Voxiom"
  };

  let url = window.location.pathname;
  let gameCode = window.location.hash.substring(1);
  let inGame = url == "/" && gameCode;

  if (inGame) {
    data.details = "In a Game";

    let possibleScoreDiv = 
      [...document.querySelectorAll("div div")] // score display is in two divs
      .filter(d => d.innerHTML.match(/\<div/g)?.length==3) // score display has 3 divs inside it
      .find(d => d?.firstElementChild?.nextElementSibling?.innerHTML.includes(":")); // find the time display

    if (possibleScoreDiv) {
      let blueScore = Number(possibleScoreDiv.children[0]?.textContent) || 0;
      let timeLeft = possibleScoreDiv.children[1]?.textContent || "";
      let redScore = Number(possibleScoreDiv.children[2]?.textContent) || 0;
      if(timeLeft.includes(":")) {
        // time is in format 'mm:ss'
        let secondsLeft = Number(timeLeft.split(":")[1]);
        secondsLeft += Number(timeLeft.split(":")[0]) * 60;
        data.state = `Score: ${blueScore}-${redScore}`;
        data.endTimestamp = Date.now() + (secondsLeft * 1000);
        data.buttons = [
          {
            label: "Join Game", 
            url: `${window.location.protocol}//${window.location.hostname}/#${gameCode}`
          }
        ];
      }
    }
  } else {
    if (url == "/" || url == "/experimental") data.details = "In Main Menu";
    else if (url.startsWith("/loadouts")) {
      data.details = "Managing Loadouts";
      switch(url) {
        case "/loadouts":
        case "/loadouts/inventory":
          data.state = "Viewing Inventory";
          break;
        case "/loadouts/market":
          data.state = "Viewing Market";
          break;
        case "/loadouts/sales":
          data.state = "Viewing Listed Items";
          break;
        case "/loadouts/history":
          data.state = "Viewing Market History";
          break;
      }
    } else if (url.startsWith("/shop")) data.details = "In Shop";
    else if (url.startsWith("/leaderboard")) data.details = "Viewing Leaderboard";
    else if (url == "/changelog") data.details = "Reading Changelog";
    else if (url == "/settings") data.details = "Changing Settings";
    else if (url == "/match") data.details = "Reviewing Match Stats";
    else if (url.startsWith("/account")) data.details = "Viewing Account";
    else if (url.startsWith("/friends")) data.details = "Managing Friends";
    else if (url.startsWith("/player")) {
      let viewName = url.substring("/player/".length);
      data.details = "Viewing Player";
      data.state = `Player: ${viewName}`;
    } else if (url.startsWith("/clans/view")) {
      let viewName = url.substring("/clans/view/".length);
      data.details = "Viewing Clan";
      data.state = `Clan: ${viewName}`;
    } else if (url.startsWith("/clans")) {
      data.details = "Managing Clan";
      switch(url) {
        case "/clans":
        case "/clans/join":
          data.state = "Viewing Clan List";
          break;
        case "/clans/create":
          data.state = "Creating a Clan";
          break;
        case "/clans/invites":
          data.state = "Viewing Clan Invites";
          break;
        case "/clans/requests":
          data.state = "Viewing Clan Requests";
          break;
      }
    }
  }

  if (data.details) presence.setActivity(data);
  else presence.setActivity();
});
