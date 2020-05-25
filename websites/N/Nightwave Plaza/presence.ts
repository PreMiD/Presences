const presence = new Presence({
  clientId: "620204628608417832"
});

presence.on("UpdateData", async () => {
  if (document.getElementById("player-time").textContent == "Welcome back")
    return;
  const ts = document
    .getElementById("player-time")
    .textContent.substring(0, 5)
    .split(":")
    .map((n) => Number(n));
  const te = document
    .getElementById("player-time")
    .textContent.substring(8, 13)
    .split(":")
    .map((n) => Number(n));
  const presenceData: presenceData = {
    state: document.querySelector(".player-title").textContent,
    details: document.querySelector(".player-artist").textContent,
    startTimestamp: Date.now() - (ts[0] * 60 + ts[1]) * 1000,
    endTimestamp:
      Date.now() - (ts[0] * 60 + ts[1]) * 1000 + (te[0] * 60 + te[1]) * 1000,
    largeImageKey: "icon",
    smallImageKey:
      document.querySelector(".player-play").textContent == "Stop"
        ? "play"
        : "pause"
  };
  presence.setActivity(presenceData);
});
