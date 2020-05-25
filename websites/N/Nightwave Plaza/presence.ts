const presence = new Presence({
  clientId: "620204628608417832"
});

presence.on("UpdateData", async () => {
  const playerTime = document.getElementById("player-time").textContent
  if (playerTime == "Welcome back") return;

  const playBackStatus = document.querySelector(".player-play").textContent == "Stop" ? "play" : "pause"
  const presenceData: presenceData = {
    state: document.querySelector(".player-title").textContent,
    details: document.querySelector(".player-artist").textContent,
    largeImageKey: "icon",
    smallImageKey: playBackStatus
  };

  console.log(playBackStatus)
  if (playBackStatus == "play") {
    const ts = playerTime.substring(0, 5).split(":").map((n) => Number(n));
    const te = playerTime.substring(8, 13).split(":").map((n) => Number(n));

    presenceData.startTimestamp = Date.now() - (ts[0] * 60 + ts[1]) * 1000;
    presenceData.endTimestamp = Date.now() - (ts[0] * 60 + ts[1]) * 1000 + (te[0] * 60 + te[1]) * 1000;
  } else {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }

  presence.setActivity(presenceData);
});
