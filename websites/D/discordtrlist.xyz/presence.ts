const presence = new Presence({
  clientId: "668013997760708618"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: presenceData = {
    largeImageKey: "logo"
  };

  if (document.location.hostname == "discordtrlist.xyz") {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Anasayfa";
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/api")) {
      presenceData.details = "Bir Sayfaya Bakıyor:";
      presenceData.state = "Api sayfası";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/botlar")) {
      presenceData.details = "Bir Sayfaya Bakıyor:";
      presenceData.state = "Botların Hepsine";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/giris")) {
      presenceData.details = "Bir Sayfaya Bakıyor:";
      presenceData.state = "Siteye giriş";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/cikis")) {
      presenceData.details = "Bir Sayfaya Bakıyor:";
      presenceData.state = "Siteden çıkış";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/oyver")) {
      const priceEls = document.getElementsByClassName("ubott");
      for (var i = 0; i < priceEls.length; i++) {
        const profilename = priceEls[i].textContent;
        presenceData.details = "Bir Bota Oyveriyor:";
        presenceData.state = profilename;
        presenceData.startTimestamp = browsingStamp;
      }
    } else if (document.location.pathname.includes("/duzenle")) {
      presenceData.details = "Bir Sayfaya Bakıyor:";
      presenceData.state = "Botu değiştiriyor.";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/rapor")) {
      presenceData.details = "Bir Sayfaya Bakıyor:";
      presenceData.state = "Botu raporluyor.";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/profil/")) {
      const priceEls = document.getElementsByClassName("uname");
      for (var i = 0; i < priceEls.length; i++) {
        const profilename = priceEls[i].textContent;
        presenceData.details = "Bir kişinin profiline bakıyor:";
        presenceData.state = profilename;
        presenceData.startTimestamp = browsingStamp;
      }
    } else if (document.location.pathname.includes("/botekle")) {
      presenceData.details = "Bir Sayfaya Bakıyor:";
      presenceData.state = "Bot ekleme sayfası";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/yetkili")) {
      presenceData.details = "Bir Sayfaya Bakıyor:";
      presenceData.state = "Yetkili paneli";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/yetkili/tum")) {
      presenceData.details = "Bir Sayfaya Bakıyor:";
      presenceData.state = "Yetkili paneli ~ Botların Hepsi";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/yetkili/onayl")) {
      presenceData.details = "Bir Sayfaya Bakıyor:";
      presenceData.state = "Yetkili paneli ~ Onaylı Botlar";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/yetkili/red")) {
      presenceData.details = "Bir Sayfaya Bakıyor:";
      presenceData.state = "Yetkili paneli ~ Reddedilmiş Botlar";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/yetkili/bekle")) {
      presenceData.details = "Bir Sayfaya Bakıyor:";
      presenceData.state = "Yetkili paneli ~ Beklemede Olan Botlar";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/kurucu")) {
      presenceData.details = "Bir Sayfaya Bakıyor:";
      presenceData.state = "Kurucu paneli";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/kurucu/duyuru")) {
      presenceData.details = "Bir Sayfaya Bakıyor:";
      presenceData.state = "Kurucu paneli ~ Duyuru";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/kurucu/yliste")) {
      presenceData.details = "Bir Sayfaya Bakıyor:";
      presenceData.state = "Kurucu paneli ~ Yetkili Listesi";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/kurucu/yekle")) {
      presenceData.details = "Bir Sayfaya Bakıyor:";
      presenceData.state = "Kurucu paneli ~ Yetkili Ekle";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/kurucu/reklamlibot")) {
      presenceData.details = "Bir Sayfaya Bakıyor:";
      presenceData.state = "Kurucu paneli ~ Reklamlı Bot Ekle";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/bot/")) {
      const priceEls = document.getElementsByClassName("ubot");
      for (var i = 0; i < priceEls.length; i++) {
        const botname = priceEls[i].textContent;
        presenceData.details = "Bir Bota bakıyor:";
        presenceData.state = botname;
        presenceData.startTimestamp = browsingStamp;
      }
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
