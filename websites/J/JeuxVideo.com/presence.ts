var presence = new Presence({
  clientId: "651930315279040512"
});

/**
 * Truncate a string by "..." if needed
 * @param {String} text The string to truncate
 * @param {Number} length The desized length
 */
function truncateString(text: string, length: number): string {
  if (text.length > length) {
    return text.substring(0, length - 3) + "...";
  } else {
    return text;
  }
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname == "/") {
    presenceData.details = "Page d'accueil";
  } else if (document.location.pathname.includes("/news/")) {
    const article = document.querySelector("div.titre-wrapper").textContent;
    presenceData.details = "Lis une actualité";
    presenceData.state = truncateString(article, 128);
  } else if (document.location.pathname.includes("/videos/")) {
    const video = document.querySelector("div.titre-video").textContent;
    presenceData.details = "Regarde une vidéo";
    presenceData.state = truncateString(video, 128);
  } else if (document.location.pathname.includes("/test/")) {
    const test = document.querySelector(".gameHeaderBanner__title").textContent;
    const note = document.querySelector(
      ".bloc-avis-testeur > .note > strong"
    ).textContent;
    presenceData.details = "Lis un test";
    presenceData.state = truncateString(test, 128) + " (" + note + "/20)";
  } else if (document.location.pathname.includes("/messages-prives/")) {
    presenceData.details = "Lis ses MP";
  } else if (document.location.pathname.includes("/forums/0-")) {
    const forum = document.querySelector(
      "#forum-main-col > .titre-head-bloc > .titre-bloc-forum"
    ).textContent;
    const connected = document.querySelector(
      ".panel-heading > .nb-connect-fofo"
    ).textContent;
    presenceData.details = truncateString(forum, 64);
    presenceData.state = connected;
  } else if (document.location.pathname.includes("/forums/")) {
    const forum = document.querySelector(
      ".bloc-fil-ariane-crumb-forum > .fil-ariane-crumb > span:last-of-type > a"
    ).textContent;
    const thread = document.querySelector(
      "#forum-main-col > .titre-head-bloc > .titre-bloc-forum > #bloc-title-forum"
    ).textContent;
    presenceData.details = truncateString(forum, 64);
    presenceData.state = truncateString(thread, 128);
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
