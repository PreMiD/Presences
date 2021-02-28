const presence = new Presence({
  clientId: "808664560936026122"
});

let elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo"
    },
    inGame =
      document.querySelector("#containerGamePlayers").textContent === ""
        ? false
        : true;
  if (inGame) {
    const round = document.querySelector("#round").textContent;
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
