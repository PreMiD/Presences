var presence = new Presence({
  clientId: "630480364288081942"
});

var elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "gartic-logo"
  };

  var gameLink = document.location.pathname.split("/")[1].match(/^\d/)
    ? true
    : false;
  if (gameLink) {
    var user = document.querySelector("div.user.proprio .dados span")
      .textContent;
    var points = document.querySelector("div.user.proprio .dados pre")
      .textContent;
    var lobby = document.querySelector("title").innerText;
    data.details = user + " - " + points.split("pontos")[0].trim() + " points";
    data.state = "Lobby: " + lobby.split("-")[0];
    data.startTimestamp = elapsed;
  } else {
    data.details = "Not in-game";
  }
  presence.setActivity(data);
});
