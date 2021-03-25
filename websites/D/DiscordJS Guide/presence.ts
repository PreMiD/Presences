const pPresence = new Presence({
    clientId: "819865300173324288"
  }),
  pBrowsing = Math.floor(Date.now() / 1000);

pPresence.on("UpdateData", async () => {
  const pData: PresenceData = {
      largeImageKey: "icon2",
      startTimestamp: pBrowsing
    },
    title: string = document
      .getElementsByTagName("h1")[0]
      .textContent.replace("#", "");

  pData.details = "Viewing Docs";
  pData.state = "Page: " + title;

  if (pData.details == null) {
    pPresence.setTrayTitle();
    pPresence.setActivity();
  } else {
    pPresence.setActivity(pData);
  }
});
