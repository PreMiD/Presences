const presence = new Presence({
  clientId: "652193616617537577"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    browsingStamp = Math.floor(Date.now() / 1000);
  presenceData.startTimestamp = browsingStamp;

  if (window.location.pathname.endsWith("blog"))
    presenceData.details = "Tüm bloglara göz atıyor...";
  else if (window.location.pathname.endsWith("faq"))
    presenceData.details = "Tüm sıkça sorulan sorulara göz atıyor...";
  else if (window.location.pathname.endsWith("commands"))
    presenceData.details = "Tüm komutlara göz atıyor...";
  else if (window.location.pathname.endsWith("menu"))
    presenceData.details = "Kahve menüsüne göz atıyor...";
  else if (window.location.pathname.endsWith("dashboard"))
    presenceData.details = "Sunucularına göz atıyor...";
  else if (window.location.pathname.startsWith("/dashboard/")) {
    presenceData.details = "Bir sunucuyu dashboard üzerinden kontrol ediyor:";
    presenceData.state = document.querySelector(
      "html body.scrollbar.scrollbar-night-fade div.navbar-expand-lg.navbar-dark div.container-fluid ul.navbar-nav.text-white li.nav-item.avatar.dropdown > a "
    ).textContent;
  } else if (window.location.pathname.endsWith("discord-bot-ekleme"))
    presenceData.details = "Discord Bot Ekleme bloguna göz atıyor...";
  else if (
    window.location.pathname.endsWith("kahve-bot-projesi-nasil-basladi")
  ) {
    presenceData.details =
      "Kahve bot projesi nasıl başladı bloguna göz atıyor...";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
