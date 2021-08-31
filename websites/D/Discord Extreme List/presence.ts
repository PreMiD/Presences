const presence = new Presence({
  clientId: "568254611354419211"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if ((await presence.getSetting("incognito")) === false) {
    presenceData.details = document.getElementById("premidPageInfo").innerText;
    if ((await presence.getSetting("showTimestamp")) === true)
      presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
