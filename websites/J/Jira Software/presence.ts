var presence = new Presence({
  clientId: "782358522628145153" //Presence Application on Discord Developers ID.
});

var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "jira"
  };

  if (document.location.hostname.match(/([a-z0-9]+)[.]atlassian[.]net/)) {
    if (document.location.pathname == "/projects") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing projects";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
