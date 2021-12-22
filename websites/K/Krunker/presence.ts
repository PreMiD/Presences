const presence = new Presence({
  clientId: "631970829348896769"
});

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "krunker"
    },
    gameInfo = document.querySelector("#curGameInfo");

  if (gameInfo) {
    const className = document.querySelector("#menuClassName"),
      classSubtext = document.querySelector("#menuClassSubtext"),
      playerInfo = `${className.textContent} (${classSubtext.textContent})`;

    data.details = gameInfo.textContent.replace("on ", " on ");
    data.state = playerInfo;
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  } else {
    data.details = "In the menus";
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  }
});
