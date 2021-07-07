const presence = new Presence({
  clientId: "640711877609127976"
});

let gametypequery: string,
  gamemodequery: string,
  gametype: string,
  gamemode: string,
  killcount: string,
  alivecount: string,
  place: string;

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo"
    },
    broadcasttc = await presence.getSetting("broadcasttc"),
    active =
      window.getComputedStyle(document.getElementById("start-menu-wrapper"))
        .display == "none",
    end = document.querySelector(".ui-stats-current") !== null;
  data.startTimestamp = browsingStamp;

  if (end) {
    // Player is looking at match results, this needs to be before checking if active due to the way the active variable is set up
    place = document.querySelector(
      ".ui-stats-current .ui-stats-player-rank"
    ).textContent;
    data.details = "Placed " + place;
  } else if (!active) {
    gametypequery = 'div[id="index-play-type-selected"]';
    gamemodequery = 'div[id="index-play-mode-selected"]';
    if (
      window.getComputedStyle(document.querySelector("#team-menu")).display ==
      "block"
    ) {
      // If the player made a team
      if (broadcasttc && (gametype == "Duo" || gametype == "Squad")) {
        data.buttons = [
          {
            label: "Join Game",
            url: document.baseURI
          }
        ];
        data.smallImageKey = gametype.toLowerCase();
        data.smallImageText = document.querySelector("#team-code").textContent;
      }
      gametypequery = gametypequery.replace('"]', '-team"]');
      gamemodequery = gamemodequery.replace('"]', '-team"]');
    }

    gametype = document.querySelector(gametypequery).textContent;
    gamemode = document.querySelector(gamemodequery).textContent;
    data.details = "In the menus...";
  } else if (active) {
    // Player is in-game
    data.smallImageText = "Playing " + gametype + "s";
    alivecount = document.querySelector(".ui-players-alive").textContent;
    killcount = document.querySelector(".ui-player-kills").textContent;

    data.details = `${killcount} kill${
      parseInt(killcount) != 1 ? "s" : ""
    } with ${alivecount} alive`;
    data.state = `${gamemode != "50v50" ? gametype + " - " : ""}${gamemode}`;
  }
  if (data.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(data);
  }
});
