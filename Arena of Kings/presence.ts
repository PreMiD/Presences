var presence = new Presence({
  clientId: "555834227833307146"
});

presence.on("UpdateData", async () => {
  var presenceData = await presence.getPageVariable("PreMiD_PresenceData");

  if (presenceData === null) presence.setActivity();
  else presence.setActivity(presenceData.data);
});
