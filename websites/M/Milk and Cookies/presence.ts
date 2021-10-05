const presence = new Presence({
    clientId: "758753662079729764"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };

  if (document.location.hostname === "milkandcookies.games") {
    if (document.location.pathname === "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viendo la página principal";
    } else if (document.location.pathname.includes("/awards")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viendo la sección de Awards";
    } else if (document.location.pathname.includes("/postulaciones")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viendo la sección de Postulaciones";
    }
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
