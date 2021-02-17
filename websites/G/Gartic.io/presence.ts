const presence = new Presence({
    clientId: "808668919635247104"
  }),
  elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo"
    },
    path = document.location.pathname,
    gameLink = document.location.pathname.split("/")[1].match(/^\d/)
      ? true
      : false;
  if (path == "/") {
    data.details = "Viewing the Homepage";
    data.startTimestamp = elapsed;
  } else if (path == "/rooms") {
    data.details = "Viewing Rooms";
    data.startTimestamp = elapsed;
  } else if (gameLink || path == "/room") {
    const inSetup = document.querySelector(".infosUsers") ? true : false;
    if (inSetup) {
      const players = document.querySelector(
        ".infosRoom li:last-child span strong"
      ).textContent;
      data.details = "Setting up Info to Join";
      data.state = "Players: " + players;
      data.startTimestamp = elapsed;
    } else {
      const user = document.querySelector(".you .nick").textContent,
        points = document.querySelector(".you .points").textContent,
        lobby = document.querySelector("title").innerText;
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
