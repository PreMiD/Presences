const presence = new Presence({
    clientId: "805098006625517599"
  });
  
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    browsingStamp = Math.floor(Date.now() / 1000), 
    privacy = await presence.getSetting("privacy");
  presenceData.startTimestamp = browsingStamp;
  if (privacy) {
    presenceData.details = "Browsing";
  } else {
    presenceData.details = "Viewing a page:";
    presenceData.state = document.title.replace(' | Altearn', '');
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
