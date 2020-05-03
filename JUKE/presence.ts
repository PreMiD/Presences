var presence = new Presence({
  clientId: "629751665242669056"
});

presence.on("UpdateData", async () => {
  const testPresenceData: presenceData = {
    details: "Luister radio op juke.nl",
    state: "Browsen...",
    largeImageKey: "juke-large"
  };
  presence.setActivity(testPresenceData);
});
