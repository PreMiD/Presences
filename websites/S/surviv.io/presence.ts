const presence = new Presence({
  clientId: "640711877609127976"
});

let gametypequery: string;
let gamemodequery: string;
let gametype: string;
let gamemode: string;
let active: boolean;
let end;
let killcount: string;
let alivecount: string;
let place: string;

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo"
  };
  const broadcasttc = await presence.getSetting("broadcasttc");
  active = window.getComputedStyle(document.getElementById("start-menu-wrapper")).display == "none";
  end = document.querySelector(".ui-stats-current") !== null;
  
  if (end) { // Player is looking at match results, this needs to be before checking if active due to the way the active variable is set up  
    place = document.querySelector(".ui-stats-current .ui-stats-player-rank").textContent;
    data.details = "Placed " + place;
    data.startTimestamp = browsingStamp;
  } else if (!active) {
    gametypequery = 'div[id="index-play-type-selected"]';
    gamemodequery = 'div[id="index-play-mode-selected"]';
    if (window.getComputedStyle(document.querySelector("#team-menu")).display == "block"){ // If the player made a team
      gametypequery = gametypequery.replace('"]', '-team"]');
      gamemodequery = gamemodequery.replace('"]', '-team"]');
    }

    gametype = document.querySelector(gametypequery).textContent;
    gamemode = document.querySelector(gamemodequery).textContent;
    data.details = "In the menus...";
    data.startTimestamp = browsingStamp;
  } else if (active) { // Player is in-game    
    data.smallImageKey = gametype.toLowerCase();
    data.smallImageText = "Playing " + gametype + "s";
    if (broadcasttc && (gametype == "Duo" || gametype == "Squad") && document.querySelector("#team-code")){
      data.smallImageText += " - " + document.querySelector("#team-code").textContent;
    }
    alivecount = document.querySelector(".ui-players-alive").textContent;
    killcount = document.querySelector(".ui-player-kills").textContent;

    data.startTimestamp = browsingStamp;
    data.details = `${killcount} kill${parseInt(killcount) > 1 ? "s" : ""} with ${alivecount} alive`;
    data.state = `${gamemode != "50v50" ? gametype + " - " : ""}${gamemode}`;
  }
  if (data.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(data);
  }  
});
