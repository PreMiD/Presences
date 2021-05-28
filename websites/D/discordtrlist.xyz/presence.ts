const presence = new Presence({
    clientId: "668013997760708618"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };

  presenceData.details = "Bir Sayfaya Bakıyor:";
  presenceData.state = "Anasayfa";

  if (document.location.pathname.includes("/api")) {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Api sayfası";
  } else if (document.location.pathname.includes("/botlar")) {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Botların Hepsine";
  } else if (document.location.pathname.includes("/giris")) {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Siteye giriş";
  } else if (document.location.pathname.includes("/cikis")) {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Siteden çıkış";
  } else if (document.location.pathname.includes("/oyver")) {
    const priceEls = document.getElementsByClassName("ubott");
    for (let i = 0; i < priceEls.length; i++) {
      const profilename = priceEls[i].textContent;
      presenceData.details = "Bir Bota Oyveriyor:";
      presenceData.state = profilename;
    }
  } else if (document.location.pathname.includes("/duzenle")) {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Botu değiştiriyor.";
  } else if (document.location.pathname.includes("/rapor")) {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Botu raporluyor.";
  } else if (document.location.pathname.includes("/profil/")) {
    const priceEls = document.getElementsByClassName("uname");
    for (let i = 0; i < priceEls.length; i++) {
      const profilename = priceEls[i].textContent;
      presenceData.details = "Bir kişinin profiline bakıyor:";
      presenceData.state = profilename;
    }
  } else if (document.location.pathname.includes("/botekle")) {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Bot ekleme sayfası";
  } else if (document.location.pathname.includes("/yetkili")) {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Yetkili paneli";
  } else if (document.location.pathname.includes("/yetkili/tum")) {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Yetkili paneli ~ Botların Hepsi";
  } else if (document.location.pathname.includes("/yetkili/onayl")) {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Yetkili paneli ~ Onaylı Botlar";
  } else if (document.location.pathname.includes("/yetkili/red")) {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Yetkili paneli ~ Reddedilmiş Botlar";
  } else if (document.location.pathname.includes("/yetkili/bekle")) {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Yetkili paneli ~ Beklemede Olan Botlar";
  } else if (document.location.pathname.includes("/kurucu")) {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Kurucu paneli";
  } else if (document.location.pathname.includes("/kurucu/duyuru")) {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Kurucu paneli ~ Duyuru";
  } else if (document.location.pathname.includes("/kurucu/yliste")) {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Kurucu paneli ~ Yetkili Listesi";
  } else if (document.location.pathname.includes("/kurucu/yekle")) {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Kurucu paneli ~ Yetkili Ekle";
  } else if (document.location.pathname.includes("/kurucu/reklamlibot")) {
    presenceData.details = "Bir Sayfaya Bakıyor:";
    presenceData.state = "Kurucu paneli ~ Reklamlı Bot Ekle";
  } else if (document.location.pathname.includes("/bot/")) {
    const priceEls = document.getElementsByClassName("ubot");
    for (let i = 0; i < priceEls.length; i++) {
      const botname = priceEls[i].textContent;
      presenceData.details = "Bir Bota bakıyor:";
      presenceData.state = botname;
    }
  }
  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
