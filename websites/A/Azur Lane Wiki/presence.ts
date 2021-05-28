const presence = new Presence({
    clientId: "670325644319522816"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "azurlogo",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname === "/Azur_Lane_Wiki")
    presenceData.details = "Viewing Wiki home page";
  else if (document.querySelector(".firstHeading") !== null) {
    presenceData.details = "Viewing page:";
    presenceData.state = document.querySelector(".firstHeading").textContent;
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
