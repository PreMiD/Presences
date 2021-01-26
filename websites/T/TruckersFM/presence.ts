const presence = new Presence({
  clientId: "640914619082211338"
});

presence.on("UpdateData", () => {
  const title = `${document.querySelector(".player-artist-text").textContent} - ${document.querySelector(".player-title-text").textContent}`;
  const presenter = document.querySelector(".live-time") 
		? `${document.querySelector(".live-name").textContent} till ${document.querySelector(".live-time").textContent.slice(6)}` 
		: `${document.querySelector(".live-name").textContent}`;
		
  const presenceData: PresenceData = {
    largeImageKey: "tfmlogo"
  };

  presenceData.details = `${title}`;
  presenceData.state = `${presenter}`;

  presence.setActivity(presenceData);
  presence.setTrayTitle();
});
