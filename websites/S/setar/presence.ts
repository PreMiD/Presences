const presence = new Presence({
  clientId: "721094392613437542"
})

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "main",
    details: "Browsing Home Page ",
    state: "SeTar Bot",
  };
  presenceData.buttons = [
    {
      label: "Visit Website",
      url: "https://3tarbot.ir",
    },
    {
      label: "Designed By",
      url: "https://hadi-az.ir",
    }
  ];
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});