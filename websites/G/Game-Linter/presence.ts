const presence = new Presence({
  clientId: "724010668751323196" //The client ID of the Application created at https://discordapp.com/developers/applications
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    browsingStamp = Math.floor(Date.now() / 1000);

  presenceData.startTimestamp = browsingStamp;

  const path = window.location.pathname;

  if (path === "/") {
    presenceData.details = "Browsing For Games";
    presenceData.state = "All Games 🎮";
  } else if (path === "/request") {
    presenceData.details = "Making a request or a report";
    presenceData.state = "Request/Report";
  } else if (/\/game\/(.)+/g.test(path)) {
    presenceData.details = `Browsing a Game`;
    presenceData.state = `Downloading the Game ${path
      .split("/")[2]
      .split("-")
      .slice(0, 2)
      .join(" ")
      .toUpperCase()}`;
  } else if (path === "/stack") {
    presenceData.details = "Cheking out the tech stack";
    presenceData.state = "Stack Share";
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
