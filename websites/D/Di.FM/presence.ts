const presence = new Presence({
  clientId: "630542731701387276"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "dilogo"
  };
  if (
    document.getElementById("webplayer-region").getAttribute("data-state") ===
    "playing"
  ) {
    presenceData.details = document
      .getElementsByClassName("artist-name")[0]
      .textContent.replace("-", "");
    presenceData.state =
      document.getElementsByClassName("track-name")[0].textContent;
    presenceData.smallImageKey = "play";
  } else {
    presenceData.state = "Browsing...";
    presenceData.smallImageKey = "pause";
  }

  presence.setActivity(presenceData);
});
