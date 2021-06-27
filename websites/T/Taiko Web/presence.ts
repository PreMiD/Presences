const presence = new Presence({
    clientId: "858246998561783828"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "taiko_logo",
      startTimestamp: browsingStamp
    },
    canvas: HTMLCanvasElement = document.querySelector("canvas"),
    initalLoading: HTMLSpanElement = document.querySelector("span.percentage"),
    loadingDon: HTMLDivElement = document.querySelector("div#loading-don"),
    invite: HTMLDivElement = document.querySelector("div#session-invite");

  if (canvas !== null) {
    const { id } = canvas;
    switch (id) {
      case "logo": {
        presenceData.details = "At Home Screen";
        break;
      }
      case "song-sel-canvas": {
        presenceData.details = "Selecting Song";
        break;
      }
      case "canvas": {
        const lyrics: HTMLDivElement = document.querySelector(
          "div#song-lyrics > div.fill"
        );
        presenceData.state = lyrics !== null ? lyrics.innerText : "";
        break;
      }
    }
  } else if (initalLoading !== null) {
    presenceData.details = "At Loading screen";
    presenceData.state = `${initalLoading.innerText} Loaded`;
  } else if (loadingDon !== null) presenceData.details = "Game Loading ...";

  presenceData.buttons = [
    {
      label: "Play game",
      url: `https://${document.location.hostname}`
    }
  ];

  if (invite !== null) {
    presenceData.details = "Waiting for other player to join ...";
    presenceData.buttons.push({
      label: "Join Invite",
      url: document.location.href
    });
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
