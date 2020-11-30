const presence = new Presence({
  clientId: "782958551123361822"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };

  function setTimestamp(): number {
    return Math.floor(Date.now() / 1000);
  }

  if (
    document.URL === "https://wiki.facepunch.com/" ||
    document.URL === "https://wiki.facepunch.com"
  ) {
    presenceData.details = await presence.getSetting("homepageMessage");
    presenceData.startTimestamp = setTimestamp();
  } else {
    presenceData.details = await presence.getSetting("viewingMessage") + " " + document.title;
    presenceData.startTimestamp = setTimestamp();
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
