const presence = new Presence({
  clientId: "631970829348896769"
});

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "krunker"
    },
    gameInfo = document.querySelector("#curGameInfo");

  if (gameInfo) {
    presenceData.details = gameInfo.textContent.replace("on ", " on ");
    data.state = `${document.querySelector("#menuClassName").textContent} (${
      document.querySelector("#menuClassSubtext").textContent
    })`;
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  } else {
    presenceData.details = "In the menus";
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  }
});
