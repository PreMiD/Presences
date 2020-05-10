const presence = new Presence({
  clientId: "640914619082211338"
});

presence.on("UpdateData", () => {
  const title = `${
    document.querySelector(".player-artist-text").textContent
  } - ${document.querySelector(".player-title-text").textContent} `;
  const dj = document.querySelector(".live-name").textContent;
  const liveTill = document.querySelector(".live-time").textContent;
  const pageName = document.title.slice(13);
  const liveTime = liveTill.slice(6);
  const presenceData: presenceData = {
    largeImageKey: "tfmlogo",
    smallImageKey: "smalltfmlogo",
    smallImageText: `Viewing: ${pageName}`
  };

  presenceData.details = `${title}`;
  presenceData.state = `${dj} till ${liveTime}`;

  presence.setActivity(presenceData);
  presence.setTrayTitle();
});
