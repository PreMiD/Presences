const presence = new Presence({
    clientId: "660928900163174412"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.hostname === "boo.rip") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Home Page";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
