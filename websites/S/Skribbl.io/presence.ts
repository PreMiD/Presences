var presence = new Presence({
  clientId: "620829310399545344"
});

var elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "skribblio-logo"
  };
  var inGame =
    document.querySelector("#containerGamePlayers").textContent === ""
      ? false
      : true;
  if (inGame) {
    var round = document.querySelector("#round").textContent;
    data.details = round;
    if (elapsed == null) {
      elapsed = Math.floor(Date.now() / 1000);
    }
    data.startTimestamp = elapsed;
  } else {
    data.details = "Viewing the Homepage";
    elapsed = null;
  }
  presence.setActivity(data);
});
