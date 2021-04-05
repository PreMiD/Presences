const presence = new Presence({
  clientId: "828549761376059441"
});

const getAction = (): string => {
  if (window.location.href.indexOf("movielist") != -1) {
    return "movielist";
  } else if (window.location.href.indexOf("sportlist") != -1) {
    return "sportlist";
  } else if (window.location.href.indexOf("tvlist") != -1) {
    return "tvlist";
  } else if (window.location.href.indexOf("Tczo") != -1) {
    return "tvshow";
  } else if (window.location.href.indexOf("Mczo") != -1) {
    return "movie";
  } else if (window.location.href.indexOf("Sczo") != -1) {
    return "sport";
  } else if (window.location.href.indexOf("faq") != -1) {
    return "faq";
  } else if (window.location.href.indexOf("Eczo") != -1) {
    return "tv";
  } else { return "home"; }
}
const getTitle = (): string => {
  return document.getElementsByClassName("player-title-bar")[0].textContent.trim();
}
const constructAction: Record<string, string> = {
  "movielist": "Searching for a movie",
  "sportlist": "Keeping up with sports",
  "tvlist":    "Looking for a TV show",
  "tvshow":    "Perusing through some episodes",
  "movie":     "Watching a movie",
  "sport":     "Enjoying some sports",
  "home":      "Checking out the home page",
  "faq":       "Reading the FAQ",
  "tv":        "Relaxing to some TV",
}

presence.on("UpdateData", async () => {
  let presenceData: PresenceData = {
    largeImageKey: "icon",
    details: constructAction[getAction()],
    startTimestamp: Math.floor(Date.now() / 1000),
  };
  if (["movie", "tv", "sport"].includes(getAction())) {
    presenceData.state = getTitle();
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
