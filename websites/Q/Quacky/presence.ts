const presence = new Presence({
  clientId: "882955333121757236"
}),

 browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "avatar",
    startTimestamp: browsingStamp
  };

  if (document.location.hostname === "quacky.xyz") {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Home";
    if (document.location.pathname.includes("/vote")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Vote";
    } else if (document.location.pathname.includes("/login/")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Login`;
    } else if (document.location.pathname.includes("/profile")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = "Bots List";
    } else if (document.location.pathname.includes("/add")) {
      presenceData.details = `Viewing Page:`;
      presenceData.state = `Add Bot`;
    }
  }

  if (document.location.hostname === "docs.quacky.xyz") 
    presenceData.details = "Viewing Docs";
  

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});
