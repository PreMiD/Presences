const presence = new Presence({
  clientId: "618212337895079996"
});

const elapsed = Math.floor(Date.now() / 1000);
let text;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "banner",
    startTimestamp: elapsed
  };

  if (document.location.pathname == "/home") {
    if (
      document.getElementsByTagName("p")[1].innerHTML.includes("Welcome back")
    ) {
      text = document.getElementsByTagName("p")[1].innerHTML;
    } else {
      text = document.getElementsByTagName("p")[3].innerHTML;
    }

    if (localStorage.getItem("name") == null) {
      localStorage.setItem("name", text.split(",")[1]);
    }
    presenceData.details = "Online as " + text.split(",")[1];
    presenceData.state = "waiting in lobby";
    presenceData.smallImageKey = "logo";
    presenceData.smallImageText = "in game";
  } else if (document.location.pathname == "/decks") {
    (presenceData.details = `Online as ${localStorage.getItem("name")}`),
      (presenceData.state = "Looking at decklists");
    presenceData.smallImageKey = "logo";
    presenceData.smallImageText = "in game";
  } else if (document.location.pathname.includes("/editor")) {
    const d = document.getElementsByTagName("strong")[0].textContent;
    presenceData.details = "Building Decks";
    presenceData.state = "Editing: " + d;
    presenceData.smallImageKey = "logo";
    presenceData.smallImageText = "in game";
  } else if (document.location.pathname.includes("/game")) {
    let opponent = document.getElementById("game-opponent-name").textContent;
    const mylife = document.getElementById("game-life-player").textContent;
    const opplife = document.getElementById("game-life-opponent").textContent;
    let myname = document.getElementById("game-player-name").textContent;
    let state, status;

    if (myname == "Player" || myname == "Opponent") {
      myname = document.getElementById(
        "game-room-player1-username"
      ).textContent;
    }
    if (opponent == "Opponent" || opponent == "Player") {
      if (
        document.getElementById("game-room-player2-username").textContent ==
        "---"
      ) {
        opponent = "waiting..";
      } else {
        opponent = document.getElementById(
          "game-room-player2-username"
        ).textContent;
      }
    }
    state = `Current lp: ${mylife}, Opponent LP: ${opplife}`;
    status = `Game: ${myname}(me) vs ${opponent}`;
    if (parseInt(mylife) == 0 && 0 == parseInt(opplife)) {
      state = "Game not started";
      status = `Game: ${myname} vs ${opponent}`;
    }
    /* if(localStorage.getItem("name").replace(" ",'')==myname){
           var  status = `Dueling ${opponent}`
        }
        else {
          var   status = `Spectating: ${myname} vs ${opponent}`
        }
*/
    presenceData.details = status;
    presenceData.state = state;
    presenceData.smallImageKey = "logo";
    presenceData.smallImageText = document.location.href;
  } else if (document.location.pathname.includes("/hostgame")) {
    presenceData.details = `Hosting Game `;
    presenceData.state = `as ${localStorage.getItem("name")}`;
    presenceData.smallImageKey = "logo";
    presenceData.smallImageText = "in game";
  } else if (document.location.pathname.includes("/gamelist")) {
    presenceData.details = "Looking for Game";
    presenceData.state = "at All game list";
    presenceData.smallImageKey = "logo";
    presenceData.smallImageText = "in game";
  } else if (document.location.pathname.includes("/profile")) {
    presenceData.details = "Editing Profile";
    presenceData.state = "changing stuffs";
    presenceData.smallImageKey = "logo";
    presenceData.smallImageText = "in game";
  } else if (document.location.pathname.includes("/duel")) {
    presenceData.details = "Searching for Duels";
    presenceData.state = "Choosing game mode";
    presenceData.smallImageKey = "logo";
    presenceData.smallImageText = "in game";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
