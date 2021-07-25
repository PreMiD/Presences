const presence = new Presence({
    clientId: "844108029543972885"
  }),
  elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: elapsed
    },
    path = document.location.pathname,
    inGame = document.querySelector(".ctUsers") ? true : false;
  if (inGame) {
    const user = document.querySelector(".you .nick").textContent,
      points = document.querySelector(".you span").textContent,
      roundCurrent = document.querySelector(".rounds span").textContent,
      roundEnd = document.querySelector(".rounds p:nth-child(3)").textContent;

    data.details = user + " - " + points.split("pts")[0].trim() + " points";
    data.state = "Round: " + " " + roundCurrent + roundEnd;
  } else if (path == "/create") {
    data.details = "Creating a Room";
  } else if (path == "/search") {
    data.details = "Viewing Rooms";
  } else {
    data.details = "Not in-game";
  }
  presence.setActivity(data);
});
