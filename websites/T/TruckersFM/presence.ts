const presence = new Presence({
  clientId: "640914619082211338"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "tfmlogo"
  };

  presenceData.details = `${document.querySelector(".player-artist-text").textContent} - ${document.querySelector(".player-title-text").textContent}`;
  presenceData.state = document.querySelector(".live-name").textContent
    ? document.querySelector(".live-name").textContent
    : 'AutoDJ';

  presence.setActivity(presenceData);
  presence.setTrayTitle();
});
