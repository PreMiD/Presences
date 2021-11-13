const presence = new Presence({
  clientId: "587347620574265498"
});

let gameData: PresenceData = null;

presence.on("UpdateData", async () => {
  if (!gameData || gameData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(gameData);
});

presence.on("iFrameData", (data: PresenceData) => (gameData = data));
