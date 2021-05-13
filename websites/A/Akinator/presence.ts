var presence = new Presence({
  clientId: "631543282601558046"
});
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  var presenceData: PresenceData = {
    largeImageKey: "akinator"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname == "/") {
    presenceData.details = "Starting Akinator";
  } else if (document.location.pathname == "/theme-selection") {
    presenceData.details = "Selecting Theme";
  } else if (document.location.pathname == "/game") {
    const current =
      document.getElementsByClassName("bubble-body")[0].textContent;
    const hover = document.querySelectorAll(":hover")[12].textContent;
    presenceData.details = `Q: ${current}`;
    presenceData.state = `Selecting: ${
      hover != undefined ? hover : "Still Thinking"
    }`;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
