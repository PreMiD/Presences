const presence = new Presence({
  clientId: "640914619082211338"
});

var title: any, dj: any, liveTill: any, pageName: any, stateText: any, time: any; 

presence.on("UpdateData", () => {
  title = `${
    document.querySelector(".player-artist-text").textContent
  } - ${document.querySelector(".player-title-text").textContent} `;
  dj = document.querySelector(".live-name").textContent;
  liveTill = document.querySelector(".live-time");
  pageName = document.title.slice(13);
  const presenceData: PresenceData = {
    largeImageKey: "tfmlogo",
    smallImageKey: "smalltfmlogo",
    smallImageText: `Viewing: ${pageName}`
  };

  let stateText = "";
    if(liveTill) {
        time = liveTill.textContent;
       stateText = `${dj} till ${time.slice(6)}`;
    } else {
       stateText = `${dj}`;
    }

  presenceData.details = `${title}`;
  presenceData.state = `${stateText}`;

  presence.setActivity(presenceData);
  presence.setTrayTitle();
});
