const presence = new Presence({
  clientId: "756196794727399617"
});

presence.on("UpdateData", async () => {
  const browsingStamp = Math.floor(Date.now() / 1000),
    button = document.getElementsByTagName("button"),
    valor = button.length,
    players = document.getElementsByClassName("userActive"),
    data: PresenceData = {
      largeImageKey: "large_image",
      startTimestamp: browsingStamp
    };

  if (valor === 1) {
    data.details = "Creating a room";
    data.smallImageKey = "home";
    data.smallImageText = "On homepage";
  }
  if (valor >= 6) {
    const limitPlayers = document.querySelector(".line b").textContent,
      numLimit = parseFloat(limitPlayers),
      nump = `(${players.length} of ${numLimit})`;
    data.details = "Waiting";
    data.state = `Playing ${nump}`;
    data.smallImageKey = "playing";
    data.smallImageText = "On game";

    if (players.length > numLimit)
      data.state = `(${numLimit} of ${numLimit} players)`;
  }

  const typing = document.getElementById("writeEntryundefined"),
    drawing = document.getElementsByClassName("ptro-crp-el"),
    valueDraw = drawing.length,
    presenting = document.getElementsByClassName("presentationSection"),
    presentingValue = presenting.length,
    waitlist = document.getElementsByClassName("waitingSet rounded"),
    waitValue = waitlist.length;

  if (typing) data.details = "Typing...";

  if (valueDraw >= 1) data.details = "Drawing";

  if (presentingValue >= 1) data.details = "Viewing the presentation";

  if (waitValue >= 1) data.details = "On waitlist";

  if (!data.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(data);
});
