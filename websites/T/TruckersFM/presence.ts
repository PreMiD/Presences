const presence = new Presence({
  clientId: "640914619082211338"
});

presence.on("UpdateData", () => {
  const title = `${
    document.querySelector(".player-artist-text").textContent
  } - ${document.querySelector(".player-title-text").textContent} `;
  const dj = document.querySelector(".live-name").textContent;
  const liveTill = document.querySelector(".live-time");
  const pageName = document.title.slice(13);
  const presenceData: PresenceData = {
    largeImageKey: "tfmlogo",
    smallImageKey: "smalltfmlogo",
    smallImageText: `Viewing: ${pageName}`
  };

  let stateText = "";
    if(liveTill) {
        const time = liveTill.textContent;
       stateText = `${dj} till ${time.slice(6)}`;
    } else {
       stateText = `${dj}`;
    }

  presenceData.details = `${title}`;
  presenceData.state = `${stateText}`;

  presence.setActivity(presenceData);
  presence.setTrayTitle();
});
