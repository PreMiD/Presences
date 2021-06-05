const presence = new Presence({
    clientId: "808757125747966032"
  }),
  elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo"
    },
    gameLink = document.location.pathname.split("/")[1].match(/^\d/)
      ? true
      : false;
  if (gameLink) {
    const user = document.querySelector(
        "div.user.proprio .dados span"
      ).textContent,
      points = document.querySelector(
        "div.user.proprio .dados pre"
      ).textContent,
      lobby = document.querySelector("title").innerText;
    data.details = user + " - " + points.split("pontos")[0].trim() + " points";
    data.state = "Lobby: " + lobby.split("-")[0];
    data.startTimestamp = elapsed;
  } else {
    data.details = "Not in-game";
  }
  presence.setActivity(data);
});
