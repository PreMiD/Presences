var presence = new Presence({
  clientId: "640711877609127976"
});

/*
const pagetype;
const gametype;
const gameregion;

*/
var value: any;
var pagetype;
var gametype;
var gameregion;
var regionregex = /(.*) \[.*\]/;

var active;
var killcount;
var alivecount;
var place;
var end: boolean;

var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo"
  };

  active =
    window.getComputedStyle(document.getElementById("game-area-wrapper"))
      .display != "none"
      ? true
      : false;
  end =
    window.getComputedStyle(document.getElementById("ui-stats")).display !=
    "none"
      ? true
      : false;
  if (!active) {
    pagetype =
      window.getComputedStyle(document.getElementById("start-menu")).display !=
      "none"
        ? "default"
        : "private";
    if (pagetype == "default") {
      var solo = document.querySelector("#btn-start-mode-0");
      var duo = document.querySelector("#btn-start-mode-1");
      var squad = document.querySelector("#btn-start-mode-2");

      solo.addEventListener("mousedown", function () {
        console.log("Works");
        value = "Solos: ";
      });

      duo.addEventListener("mousedown", function () {
        value = "Duos: ";
      });

      squad.addEventListener("mousedown", function () {
        value = "Squads: ";
      });

      gametype = value;
    } else if (pagetype == "private") {
      var button = document.querySelector("a.btn-hollow-selected");
      gametype = button.innerHTML + "s: ";
    }

    data.state = "Looking for game...";
    data.startTimestamp = browsingStamp;

    gameregion = document
      .querySelector("[data-label]:checked")
      .innerHTML.match(regionregex)[1];
    presence.setActivity(data, true);
  } else if (end) {
    place = document.querySelector(".ui-stats-header-value").innerHTML;
    data.state = "Placed " + place;
    data.startTimestamp = browsingStamp;
    presence.setActivity(data, true);
  } else if (active) {
    alivecount = document.querySelector(".ui-players-alive").innerHTML;
    killcount = document.querySelector(".ui-player-kills").innerHTML;

    data.startTimestamp = browsingStamp;
    data.details =
      parseInt(killcount) != 1
        ? killcount + " kills with " + alivecount + " alive"
        : killcount + " kill with " + alivecount + " alive";
    data.state = gametype + " " + gameregion;
    presence.setActivity(data, true);
  }
});
