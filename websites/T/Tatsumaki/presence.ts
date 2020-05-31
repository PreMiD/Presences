const presence = new Presence({
  clientId: "652773935829614592"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  const browsingStamp = Math.floor(Date.now() / 1000);
  if (window.location.pathname.endsWith("about")) {
    presenceData.details = "Hakkında kısmına göz atıyor...";
    presenceData.startTimestamp = browsingStamp;
  } else if (window.location.pathname.endsWith("settings.html")) {
    presenceData.details = "Sunucu ayarları sekmesine göz atıyor...";
    presenceData.startTimestamp = browsingStamp;
  } else if (window.location.pathname.endsWith("commands.html")) {
    presenceData.details = "Tüm komutlara göz atıyor...";
    presenceData.startTimestamp = browsingStamp;
  } else if (window.location.pathname.endsWith("faq.html")) {
    presenceData.details = "Sıkça sorulan sorulara göz atıyor...";
    presenceData.startTimestamp = browsingStamp;
  } else if (window.location.pathname.endsWith("globalRankings")) {
    presenceData.details = "Küresel sıralamaya göz atıyor...";
    presenceData.startTimestamp = browsingStamp;
  } else if (window.location.pathname.endsWith("dashboard")) {
    presenceData.details = "Dashboard'da bir şeyleri kontrol ediyor...";
    presenceData.startTimestamp = browsingStamp;
  } else if (window.location.pathname.endsWith("profile")) {
    presenceData.details = "Profilini düzenliyor...";
    presenceData.startTimestamp = browsingStamp;
  } else if (window.location.pathname.startsWith("/serverRankings/")) {
    presenceData.details = "Bir sunucunun level sıralamasına bakıyor...";
    presenceData.state = document.querySelector(
      "#top > div.jumbotron > div > div > div.col-md-10 > p"
    ).textContent;
    presenceData.startTimestamp = browsingStamp;
  } else if (window.location.pathname.startsWith("/guild/")) {
    presenceData.details = "Bir sunucunun ayarlarını düzenliyor:";
    presenceData.state = document.querySelector(
      "#top > div.jumbotron > div > div > div.col-md-10 > h1"
    ).textContent;
    presenceData.startTimestamp = browsingStamp;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
