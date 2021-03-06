const presence = new Presence({
  clientId: "817593236763705354"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };

  presenceData.details = "Managing custom links";
  presenceData.state = "in d-l-c.ml";
  presence.setActivity(presenceData);
});