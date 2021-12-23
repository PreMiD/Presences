const presence = new Presence({
    clientId: "803366782722244638"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "glogo",
      startTimestamp: browsingTimestamp
    },
    privacyDraw = await presence.getSetting("privacyDraw"),
    privacyAlbum = await presence.getSetting("privacyAlbum");

  if (window.location.hostname.includes("garticphone")) {
    if (window.location.pathname.endsWith("lobby"))
      presenceData.details = "Awaiting the launch of the game...";
    else if (window.location.pathname.endsWith("start"))
      presenceData.details = "Start a story";
    else if (window.location.pathname.endsWith("draw")) {
      if (privacyDraw === true) presenceData.details = "Drawing...";
      else {
        presenceData.details = "Drawing:";
        presenceData.state = `${
          document.querySelector(".jsx-1934821697 h3").textContent
        }`;
      }
    } else if (window.location.pathname.endsWith("write"))
      presenceData.details = "Writing...";
    else if (window.location.pathname.endsWith("book")) {
      if (privacyAlbum === true) presenceData.details = "Look at the album";
      else {
        presenceData.details = "Look at the album of:";
        presenceData.state = `${
          document.querySelector(".jsx-1186471753 span").textContent
        }`;
      }
    } else {
      presenceData.details = "Browsing the home page";
      delete presenceData.endTimestamp;
    }
  }
  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
