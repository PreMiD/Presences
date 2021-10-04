const presence = new Presence({
    clientId: "776113876605337660"
  }),
  data: PresenceData = {
    largeImageKey: "mojevideo"
  };

presence.on("UpdateData", async () => {
  if (!data.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(data);
});

function RefreshData() {
  if (document.getElementById("video-comment")) {
    const mvPlay = document.getElementById("mv-pl"),
      mvTime = document.getElementById("mv-tm"),
      mvPlaying = mvPlay.style.visibility !== "visible",
      mvCaptionElement = document.getElementById("video-comment"),
      [mvCaptionH1] = mvCaptionElement.getElementsByTagName("h1"),
      videoName = mvCaptionH1 ? mvCaptionH1.textContent : "Unknown video";

    if (mvTime) {
      data.details = videoName;
      data.state = mvTime.textContent;
    } else {
      data.details = "Sleduje video";
      data.state = videoName;
    }
    data.smallImageKey = mvPlaying ? "mvplaying" : "mvpaused";
  } else {
    let actualUrl = window.location.toString();
    const actualTitle = document.title;

    actualUrl = actualUrl.replace("https://www.mojevideo.sk/", "");
    actualUrl = actualUrl.replace("https://mojevideo.sk/", "");
    actualUrl = actualUrl.replace("mesiac/", "");
    actualUrl = actualUrl.replace("celkovo/", "");

    if (actualUrl === "") data.details = "Hlavná stránka";
    else if (!actualTitle.startsWith("Videá - mojeVideo.sk")) {
      if (actualTitle.includes(".strana")) {
        const titlePieces = actualTitle.split(" - ");
        [data.details, data.state] = titlePieces;
      } else data.details = actualTitle;
    } else {
      let extraPage = "Hlavná stránka",
        extraPageNumber = 0;
      const urlPieces = actualUrl.split("/");

      for (let i = 0; i < urlPieces.length; i++) {
        const urlPiece = urlPieces[i];
        if (urlPiece.includes("strana_")) {
          extraPageNumber = parseInt(urlPiece.replace("strana_", "")) || 0;
          extraPageNumber++;
        }
      }

      if (actualUrl.includes("prihlasenie")) extraPage = "Prihlásenie";
      else if (actualUrl.includes("registracia")) extraPage = "Registrácia";
      data.details = extraPage;
      if (extraPageNumber !== 0) data.state = `${extraPageNumber}.strana`;
    }
  }
  data.largeImageKey = "mojevideo";
}

setInterval(RefreshData, 1000);
