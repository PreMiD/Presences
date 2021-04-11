const presence = new Presence({
  clientId: "824697537121615930"
});

presence.on("UpdateData", async () => {
  if (document.location.pathname == "/bugun") {
    const homepagePresence: PresenceData = {
      details: "Ana Sayfada",
      state: "Dolaşıyor..",
      largeImageKey: "logo"
    };
    presence.setActivity(homepagePresence);
  } else if (document.location.pathname.startsWith("/panel/hatirlatma")) {
    const presenceData: PresenceData = {
      details: "Hatırlatıcıda",
      state: document.location.pathname.split("/")[2],
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/freelancer-bul")) {
    const presenceData: PresenceData = {
      details: "Freelancer arıyor...",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/chat")) {
    const presenceData: PresenceData = {
      details: "Mesajlaşıyor..",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/panel/istekler")) {
    const presenceData: PresenceData = {
      details: "Kişiye Özel İstekleri",
      state: "Kontrol Ediyor..",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/panel/ilanlar/yeni")) {
    const presenceData: PresenceData = {
      details: "Yeni ilan oluşturuyor",
      state: "Freelancer olarak..",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/settings")) {
    const presenceData: PresenceData = {
      details: "Ayarlar Ekranında..",
      largeImageKey: "logo"
    };

    presence.setActivity(presenceData);
  }
});
