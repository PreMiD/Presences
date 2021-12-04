const presence = new Presence({
    clientId: "914354609370329098"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "vyrnball"
  };
  presenceData.startTimestamp = browsingStamp;
  
  if (document.location.pathname === "/Main_Page")
    presenceData.details = "Viewing Wiki home page";
  else if (document.querySelector(".firstHeading") !== null) {
    presenceData.details = "Viewing page:";
    presenceData.state = document.querySelector(".firstHeading").textContent;
  }

  presence.setActivity(presenceData);
});