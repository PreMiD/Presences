const presence = new Presence({
    clientId: "565844309442560002"
});

presence.on("UpdateData", async () => {

  const presenceData: PresenceData = {
    largeImageKey:
      "discord_pdp",
    smallImageKey:
      "lune",
    smallImageText: "Lunatic | V3.0.0",
    details: "Viewing the homepage",
    //state: "Viewing the homepage",
    startTimestamp: new Date().getTime()
  };

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
