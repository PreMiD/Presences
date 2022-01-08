const presence = new Presence({
    clientId: "631543282601558046"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "akinator",
    startTimestamp: browsingTimestamp
  };

  if (document.location.pathname === "/")
    presenceData.details = "Starting Akinator";
  else if (document.location.pathname === "/theme-selection")
    presenceData.details = "Selecting Theme";
  else if (document.location.pathname === "/game") {
    const hover = document.querySelectorAll(":hover")[12].textContent;
    presenceData.details = `Q: ${
      document.getElementsByClassName("bubble-body")[0].textContent
    }`;
    presenceData.state = `Selecting: ${hover ? hover : "Still Thinking"}`;
  }
  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
