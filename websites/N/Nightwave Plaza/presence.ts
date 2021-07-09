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
    listeners: HTMLDivElement = document.querySelector("div.col.cell"),
    header: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      ".window > .inner > .header.header-draggable.noselect"
    ),
    songInfo: HTMLDivElement = document.querySelector(".p-2.song-info");

  if (songInfo) {
    const details: NodeListOf<HTMLDivElement> =
        songInfo.querySelectorAll(".mb-1"),
      [artist, album, title] = [...details].map((e) => e.innerText);
    if (artist && album && title) {
      presenceData.details = `Looking at ${title.substring(
        8
      )} by ${artist.substring(10)}`;
      presenceData.state = `Album: ${album.substring(8)}`;
    }
  } else if (header.length === 2) {
    let rating: HTMLButtonElement;
    if (header[1].innerText === "Ratings")
      rating = document.querySelector("button.active");
    presenceData.details = `Looking at ${rating ? rating.innerText : ""} ${
      header[1].innerText
    }`;
  } else {
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
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
