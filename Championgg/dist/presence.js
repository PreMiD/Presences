var presence = new Presence({
    clientId: "704756386860499089"
  });
  
  var time = Math.floor(Date.now() / 1000);
  presence.on("UpdateData", () => {
    let data = {
        largeImageKey: "championgg"
      },
      path = document.location.pathname.toLowerCase();
    if (path === "/") {
      data.details = "Initial page";
      data.state = "Viewing champions";
      data.startTimestamp = time;
      presence.setActivity(data);
    }
    if (path === "/statistics/") {
      data.details = "Statistics";
      data.state = "Viewing win rates";
      data.startTimestamp = time;
      presence.setActivity(data);
    }
    if (path.startsWith("/matchup")) {
      data.details = "Analysing matchup";
      data.state = "Preparing to fight";
      data.startTimestamp = time;
      presence.setActivity(data);
    }
    if (path.startsWith("/champion")){
      let string = path.replace("/champion/", "");
      data.details = "Checking Runes";
      data.state = string;
      data.startTimestamp = time;
      presence.setActivity(data);
    }
    else {
      presence.setActivity(presenceData);
    }
});
  
