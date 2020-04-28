var presence = new Presence({
    clientId: "704756386860499089"
  });

var time = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    var presenceData: presenceData = {
        largeImageKey: "championgg"
    }

      var path = document.location.pathname.toLowerCase();
    if (path === "/") {
        presenceData.details = "Initial page";
        presenceData.state = "Viewing champions";
        presenceData.startTimestamp = time;

    }
    if (path === "/statistics/") {
        presenceData.details = "Statistics";
        presenceData.state = "Viewing win rates";
        presenceData.startTimestamp = time;

    }
    if (path.startsWith("/matchup")) {
        presenceData.details = "Analysing matchup";
        presenceData.state = "Preparing to fight";
        presenceData.startTimestamp = time;

    }
    if (path.startsWith("/champion")){
      const name = path.replace("/champion/", "");
      presenceData.details = "Checking Runes";
      presenceData.state = name;
      presenceData.startTimestamp = time;

    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
      } else {
        presence.setActivity(presenceData);
      }
});
    
