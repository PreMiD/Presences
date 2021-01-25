const presence = new Presence({
  clientId: "640914619082211338"
});

presence.on("UpdateData", () => {
  const title = `${
    document.querySelector(".player-artist-text").textContent
  } - ${document.querySelector(".player-title-text").textContent} `;
  const dj = document.querySelector(".live-name").textContent;
  const liveTill = document.querySelector(".live-time") ? document.querySelector(".live-time").textContent.slice(6) : false;
  const presenceData: PresenceData = {
    largeImageKey: "tfmlogo"
  };

  let stateText = "";
  if (liveTill) { 
    stateText = `${dj} till ${liveTime}`;
  } else {
    stateText = `${dj}`;
  }

  presenceData.details = `${title}`;
  presenceData.state = `${stateText}`;

  presence.setActivity(presenceData);
  presence.setTrayTitle();
});
