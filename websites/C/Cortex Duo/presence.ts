const presence = new Presence({
    clientId: "1011560036058800198",
}),
browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingTimestamp,
  };

  if (window.location.pathname.toLowerCase() === "/") {
    if (document.querySelector<HTMLElement>("#duo_loading").style.display === "flex") {
      presenceData.details = "CortexDuo'da eşleşiyor...";
      presenceData.state = "cortexduo.com";
    } else if (!document.querySelector<HTMLElement>('button[class="search_humans"]')) {
      presenceData.details = "Sohbet ediyor...";
      presenceData.state = "cortexduo.com";
    } else if (document.querySelectorAll<HTMLElement>("#line_chat").length > 5) {
      presenceData.details = "Yapay Zeka ile sohbet ediyor...";
      presenceData.state = "cortexduo.com";
    } else {
      presenceData.details = "CortexDuo'da takılıyor...";
      presenceData.state = "cortexduo.com";
    }
  } else if (window.location.pathname.toLowerCase() === "/error") {
    presenceData.details = "Hata sayfasında.";
    presenceData.state = "cortexduo.com";
  }
  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
