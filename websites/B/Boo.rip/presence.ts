const presence = new Presence({
  clientId: "660928900163174412"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: presenceData = {
    largeImageKey: "logo"
  };

  if (document.location.hostname == "boo.rip") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Home Page";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
