const presence = new Presence({
  clientId: "828549761376059441"
}),
getAction = (): string => {
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
  } else { return "home" }
},
getText = (text: string): string => {
  return document.getElementsByClassName(text)[0].textContent.trim();
},
epochWithOffset = (t: number): number => {
  const now = new Date();
  now.setTime(now.getTime() + t);
  return now.setTime(now.getTime());
},
getStatus = (): string => {
  const element = document.getElementById("t3").textContent.trim();
  if (element === "") return "Loading";
  else return element;
},
constructAction: Record<string, string> = {
  "movielist": "Searching for a movie",
  "sportlist": "Keeping up with sports",
  "tvlist":    "Looking for a TV show",
  "tvshow":    "Perusing through some episodes",
  "movie":     "Watching a movie",
  "sport":     "Enjoying some sports",
  "home":      "Checking out the home page",
  "faq":       "Reading the FAQ",
  "tv":        "Relaxing to some TV"
};
let flag = false,
watchStamp = 0;

presence.on("UpdateData", async () => {

  let presenceData: PresenceData = {
    largeImageKey: "icon",
    details: constructAction[getAction()]
  };
  // If the user is watching something, get the title and set duration.
  if (["movie", "tv", "sport"].includes(getAction())) {
    // If paused, reset update remaining.
    if (getStatus() === "Pause") flag = false;

    if (!flag) {
      watchStamp = epochWithOffset(document.getElementsByTagName("video")[0].duration);
      if (!isNaN(watchStamp)) flag = true;
    }
    presenceData = {
      state: `${getStatus()} | ${getText("player-title-bar")}`,
      endTimestamp: watchStamp,
      ...presenceData
    };
  } else { // If the user is not watching something, return how long they have been browsing.
    flag = false;
    presenceData = {
      startTimestamp: Math.floor(Date.now() / 1000),
      ...presenceData
    };
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
