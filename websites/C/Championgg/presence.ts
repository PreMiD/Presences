const presence = new Presence({
    clientId: "704756386860499089"
  }),
  time = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "championgg"
    },
    path = document.location.pathname.toLowerCase();
  if (path === "/") {
    presenceData.details = "Initial page";
    presenceData.state = "Viewing champions";
    presenceData.startTimestamp = time;
  } else if (path === "/statistics/") {
    presenceData.details = "Statistics";
    presenceData.state = "Viewing win rates";
    presenceData.startTimestamp = time;
  } else if (path.startsWith("/matchup")) {
    presenceData.details = "Analysing matchup";
    presenceData.state = "Preparing to fight";
    presenceData.startTimestamp = time;
  } else if (path.startsWith("/champion")) {
    const name = path.replace("/champion/", "");
    presenceData.details = "Checking Runes";
    presenceData.state = name;
    presenceData.startTimestamp = time;
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
