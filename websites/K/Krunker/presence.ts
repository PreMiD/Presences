var presence = new Presence({
  clientId: "631970829348896769"
});

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "krunker"
  };

  var gameInfo = document.querySelector("#curGameInfo");

  if (gameInfo) {
    var className = document.querySelector("#menuClassName");
    var classSubtext = document.querySelector("#menuClassSubtext");
    var playerInfo =
      className.textContent + " (" + classSubtext.textContent + ")";

    data.details = gameInfo.textContent.replace("on ", " on ");
    data.state = playerInfo;
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  } else {
    data.details = "In the menus";
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  }
});
