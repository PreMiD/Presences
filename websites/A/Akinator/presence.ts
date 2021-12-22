const presence = new Presence({
    clientId: "631543282601558046"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "akinator"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname === "/")
    presenceData.details = "Starting Akinator";
  else if (document.location.pathname === "/theme-selection")
    presenceData.details = "Selecting Theme";
  else if (document.location.pathname === "/game") {
    const current =
        document.getElementsByClassName("bubble-body")[0].textContent,
      hover = document.querySelectorAll(":hover")[12].textContent;
    presenceData.details = `Q: ${current}`;
    presenceData.state = `Selecting: ${hover ? hover : "Still Thinking"}`;
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
