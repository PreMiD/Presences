const presence = new Presence({
  clientId: "716647040146472970"
});

const browsedTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "woxebot-logo"
  };

  if (document.location.hostname == "panel.woxe.me") {
    presenceData.startTimestamp = browsedTimestamp;
    if (document.location.pathname == "/") {
      presenceData.details = "Ana sayfayı inceliyor...";
    } else if (document.location.pathname.includes("commands")) {
      presenceData.details = "Komutları inceliyor...";
    } else if (
      document.location.pathname == "/manage" ||
      document.location.pathname == "/manage/"
    ) {
      presenceData.details = "Sunucularını inceliyor...";
    } else if (
      document.getElementsByClassName("manage-content") &&
      document.getElementsByClassName("input-div") &&
      document.location.pathname.includes("/guild/")
    ) {
      presenceData.details = "Bir sunucusunu yönetiyor...";
    } else if (document.location.pathname.includes("profile")) {
      presenceData.details = "Profilini inceliyor...";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
