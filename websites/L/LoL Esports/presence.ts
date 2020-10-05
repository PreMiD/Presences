const presence = new Presence({
  clientId: "759897044323794985"
}),
time = Math.floor(Date.now() / 1000),
path = window.location.pathname;
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  if (path === "/") {
    presenceData.details = "Viewing the homepage.";
    presenceData.startTimestamp = time;
  } else if (path === "/news") {
    presenceData.details = "News";
    presenceData.state = "Looking at a news.";
    presenceData.startTimestamp = time;
  } else if (path.startsWith("/schedule")) {
    presenceData.details = "Schedule";
    presenceData.state = "Viewing matches.";
    presenceData.startTimestamp = time;
  }else if(path.startsWith("/live/") ){
    const liveqs = document.querySelector("div.teams").textContent;
    presenceData.details = "Live!";
    presenceData.state = liveqs.replace("VS", " vs ") + " is watching.";
    presenceData.startTimestamp = time;
  }else if(path.startsWith("/article/")){
    presenceData.details = "Reading news article:";
    presenceData.state = document.querySelector("div.title").textContent;
    presenceData.startTimestamp = time;
  }else if(path.startsWith("/vods/")){
    presenceData.details = "Repeats";
    presenceData.state = "Looking at match histories.";
    presenceData.startTimestamp = time;
  }else if(path.startsWith("/vod/")){
    const teams = document.querySelector("div.teams").textContent;
    presenceData.details = "Watching repeats";
    presenceData.state = teams.replace("VS", " vs ") + " watching the match replay.";
    presenceData.startTimestamp = time;
  }else if(path.startsWith("/standings/")){
    presenceData.details = "Standings";
    presenceData.state = "Looking at standings.";
    presenceData.startTimestamp = time;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
