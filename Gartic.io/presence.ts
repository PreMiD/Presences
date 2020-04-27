var presence = new Presence({
  clientId: "620839311629221889"
});

var elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: presenceData = {
    largeImageKey: "gartic-logo"
  };

  var path = document.location.pathname;
  var gameLink = document.location.pathname.split("/")[1].match(/^\d/)
    ? true
    : false;
  if (path == "/") {
    data.details = "Viewing the Homepage";
    data.startTimestamp = elapsed;
  } else if (path == "/rooms") {
    data.details = "Viewing Rooms";
    data.startTimestamp = elapsed;
  } else if (gameLink || path == "/room") {
    var inSetup = document.querySelector(".infosUsers") ? true : false;
    if (inSetup) {
      var players = document.querySelector(
        ".infosRoom li:last-child span strong"
      ).textContent;
      data.details = "Setting up Info to Join";
      data.state = "Players: " + players;
      data.startTimestamp = elapsed;
    } else {
      var user = document.querySelector(".you .nick").textContent;
      var points = document.querySelector(".you .points").textContent;
      var lobby = document.querySelector("title").innerText;
      data.details = user + " - " + points.split("pts")[0].trim() + " points";
      data.state = "Lobby: " + lobby.split("-")[0];
      data.startTimestamp = elapsed;
    }
  } else {
    data.details = "Somewhere on-site";
    data.startTimestamp = elapsed;
  }
  presence.setActivity(data);
});
