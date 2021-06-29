const presence = new Presence({
  clientId: "620204628608417832"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = { largeImageKey: "icon" },
    playerTitle: HTMLDivElement = document.querySelector("div.player-title"),
    playerArtist: HTMLDivElement = document.querySelector("div.player-artist"),
    playerTime: HTMLDivElement = document.querySelector("div.player-time"),
    playBackStatus: HTMLButtonElement =
      document.querySelector("button.player-play"),
    listeners: HTMLDivElement = document.querySelector("div.col.cell");

  if (playerTitle) presenceData.state = playerTitle.innerText;
  if (playerArtist) presenceData.details = playerArtist.innerText;

  if (playBackStatus) {
    switch (playBackStatus.innerText) {
      case "Play": {
        presenceData.smallImageKey = "play";
        if (listeners) presenceData.smallImageText = listeners.innerText;
        break;
      }
      case "Stop": {
        presenceData.smallImageKey = "pause";
        if (listeners) presenceData.smallImageText = listeners.innerText;
        break;
      }
      default:
        break;
    }
  }

  if (playerTime) {
    const [currentTime, duration] = playerTime.innerText
        .split("/")
        .map((time) => presence.timestampFromFormat(time)),
      timestamps = presence.getTimestamps(currentTime, duration);

    [, presenceData.endTimestamp] = timestamps;
  }

  presenceData.buttons = [
    {
      label: "Listen Along",
      url: document.location.href
    }
  ];

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
