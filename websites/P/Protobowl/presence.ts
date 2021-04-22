const presence = new Presence({
  clientId: "742839740709208115"
}),
  elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey:
      "protobowl",
  },
    path = document.location.pathname,
    privacyMode = await presence.getSetting("privacy"),
    showTimestamp = await presence.getSetting("timestamp");

  if (privacyMode) {
    presenceData.details = "Reading tossups"
  }
  else {
    if (path == "/") {
      presenceData.details = "Home";
    }
    else {
      presenceData.details = "In room \"" + path.substring(1) + "\"";
      presenceData.state = "Playing as " + (<HTMLInputElement>document.getElementById("username")).value;
      presenceData.buttons = [
        {
          label: "Join room",
          url: document.location.href
        }
      ]
    }
  }

  if (showTimestamp) {
    presenceData.startTimestamp = elapsed;
  }

  function setUsername() {
    presenceData.state = "Playing as " + (<HTMLInputElement>document.getElementById("username")).value;
  }

  if (!privacyMode) {
    setInterval(setUsername, 10000);
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});