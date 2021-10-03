const presence = new Presence({
    clientId: "639208971806310441"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };

  if (document.location.hostname === "scp-int.wikidot.com")
    presenceData.largeImageKey = "logo-int";
  if (document.location.hostname === "scp-sandbox-3.wikidot.com")
    presenceData.largeImageKey = "logo-sandbox";

  if (document.location.pathname === "/" || !document.location.pathname)
    presenceData.state = "Front Page";
  else {
    presenceData.state = document
      .getElementById("page-title")
      .textContent.trim();
  }

  presence.setActivity(presenceData);
});
