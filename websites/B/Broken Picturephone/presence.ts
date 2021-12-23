const presence = new Presence({
  clientId: "756196794727399617"
});

presence.on("UpdateData", async () => {
  const browsingTimestamp = Math.floor(Date.now() / 1000),
    valor = document.getElementsByTagName("button").length,
    players = document.getElementsByClassName("userActive"),
    presenceData: PresenceData = {
      largeImageKey: "large_image",
      startTimestamp: browsingTimestamp
    };

  if (valor === 1) {
    presenceData.details = "Creating a room";
    presenceData.smallImageKey = "home";
    presenceData.smallImageText = "On homepage";
  }
  if (valor >= 6) {
    const numLimit = parseFloat(document.querySelector(".line b").textContent);
    presenceData.details = "Waiting";
    presenceData.state = `Playing ${`(${players.length} of ${numLimit})`}`;
    presenceData.smallImageKey = "playing";
    presenceData.smallImageText = "On game";

    if (players.length > numLimit)
      presenceData.state = `(${numLimit} of ${numLimit} players)`;
  }

  if (document.getElementById("writeEntryundefined"))
    presenceData.details = "Typing...";

  if (document.getElementsByClassName("ptro-crp-el").length >= 1)
    presenceData.details = "Drawing";

  if (document.getElementsByClassName("presentationSection").length >= 1)
    presenceData.details = "Viewing the presentation";

  if (document.getElementsByClassName("waitingSet rounded").length >= 1)
    presenceData.details = "On waitlist";

  if (!presenceData.details) presence.setActivity();
  else presence.setActivity(presenceData);
});
