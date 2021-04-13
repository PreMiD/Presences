var presence = new Presence({
  clientId: "824697537121615930"
});
presence.on("UpdateData", async () => {
  if (document.location.pathname == "/") {
      const homepagePresence = {
          details: "Ana Sayfada..",
          largeImageKey: "logo"
      };
      presence.setActivity(homepagePresence);
  }
  else if (document.location.pathname.startsWith("/bugun")) {
      const presenceData = {
          details: "Ana Sayfaya",
          state: "Bakıyor..",
          largeImageKey: "logo"
      };
      presence.setActivity(presenceData);
  }
  else if (document.location.pathname.startsWith("/panel/siparisler")) {
      const presenceData = {
          details: "Siparişlerine",
          state: "Bakıyor..",
          largeImageKey: "logo"
      };
      presence.setActivity(presenceData);
  }
  else if (document.location.pathname.startsWith("/panel/istekler")) {
      const presenceData = {
          details: "Özel Alıcı İsteği",
          state: "Oluşturuyor",
          largeImageKey: "logo"
      };
      presence.setActivity(presenceData);
  }
  else if (document.location.pathname.startsWith("/panel/favorilerim")) {
      const presenceData = {
          details: "Favorilerine",
          state: "Bakıyor",
          largeImageKey: "logo"
      };
      presence.setActivity(presenceData);
  }
  else if (document.location.pathname.startsWith("/panel/finans")) {
      const presenceData = {
          details: "Finans Paneline",
          state: "Bakıyor",
          largeImageKey: "logo"
      };
      presence.setActivity(presenceData);
  }
  else if (document.location.pathname.startsWith("/panel/alici-istekleri")) {
      const presenceData = {
          details: "Alıcı İsteklerini",
          state: "Kontrol Ediyor",
          largeImageKey: "logo"
      };
      presence.setActivity(presenceData);
  }
  else if (document.location.pathname.startsWith("/panel/satislar")) {
      const presenceData = {
          details: "Satışlarına",
          state: "Bakıyor",
          largeImageKey: "logo"
      };
      presence.setActivity(presenceData);
  }
  else if (document.location.pathname.startsWith("/panel/ilanlar")) {
      const presenceData = {
          details: "İlanlarını",
          state: "Kontrol Ediyor",
          largeImageKey: "logo"
      };
      presence.setActivity(presenceData);
  }
  else if (document.location.pathname.startsWith("/panel/portfolyo")) {
      const presenceData = {
          details: "Portfolyosuna",
          state: "Bakıyor",
          largeImageKey: "logo"
      };
      presence.setActivity(presenceData);
  }
  else if (document.location.pathname.startsWith("/freelancer-bul/")) {
    const presenceData = {
        details: "Freelancer Arıyor..",
        largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
}
else if (document.location.pathname.startsWith("/panel/hatirlatma")) {
  const presenceData = {
      details: "Hatırlatmalara bakıyor..",
      largeImageKey: "logo"
  };
  presence.setActivity(presenceData);
}
else if (document.location.pathname.startsWith("/feed/notifications")) {
  const presenceData = {
      details: "Bildirimlere Bakıyor..",
      largeImageKey: "logo"
  };
  presence.setActivity(presenceData);
}
else if (document.location.pathname.startsWith("/chat/")) {
  const presenceData = {
      details: "Mesajlaşıyor..",
      largeImageKey: "logo"
  };
  presence.setActivity(presenceData);
}
else if (document.location.pathname.startsWith("/login")) {
  const presenceData = {
      details: "Giriş Yapıyor",
      largeImageKey: "logo"
  };
  presence.setActivity(presenceData);
}
else if (document.location.pathname.startsWith("/register")) {
  const presenceData = {
      details: "Kayıt Oluyor",
      largeImageKey: "logo"
  };
  presence.setActivity(presenceData);
}
});
