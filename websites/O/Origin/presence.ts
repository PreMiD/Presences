const path = window.location.pathname;
const browsingStamp = Math.floor(Date.now() / 1000),
  presence = new Presence({
    clientId: "773080268126683186"
  });
let title, timestamp;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "origin_logo",
    smallImageKey: "shop_icon"
  };

  if (
    document.location.pathname == "/" ||
    document.location.pathname == "/usa/en-us/store"
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the homepage.";
  }
  else{
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing Games"
  }
  // I would like it so that the presenceData.details just has the webpage Title, like what shows in the tab on your browser.

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
