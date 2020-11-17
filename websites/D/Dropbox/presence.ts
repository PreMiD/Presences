const presence = new Presence({
  clientId: "777578842172162068"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "dropbox_logo"
    };
  
  console.log(document.location.pathname);

  if (document.location.pathname = '/') {
    presenceData.details = "Viewing homepage";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
