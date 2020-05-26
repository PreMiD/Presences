const presence = new Presence({
  clientId: "655480486046466098"
});

presence.on("UpdateData", () => {
  const page = document.location.pathname;
  const browsingStamp = Math.floor(Date.now() / 1000);

  if (page.startsWith("/home")) {
    presence.setActivity({
      largeImageKey: "gly-logo",
      details: "Ana Sayfa",
      state: "Gönderilere bakıyor...",
      startTimestamp: browsingStamp
    });
  }

  // News
  if (page.startsWith("/news") && page.length > "/news".length + 1) {
    const title = document.querySelector(
      "#content > div:nth-child(3) > a.title"
    );

    presence.setActivity({
      largeImageKey: "gly-logo",
      details: "Bir haber okuyor:",
      state: title ? title.textContent : "Bilinmeyen",
      startTimestamp: browsingStamp
    });
  } else if (page.startsWith("/news") && page.length <= "/news".length + 1) {
    presence.setActivity({
      largeImageKey: "gly-logo",
      details: "Haberlere göz atıyor...",
      startTimestamp: browsingStamp
    });
  }

  // Songs
  if (page.startsWith("/songs")) {
    presence.setActivity({
      largeImageKey: "gly-logo",
      details: "Şarkılara göz atıyor...",
      startTimestamp: browsingStamp
    });
  } else if (page.startsWith("/play")) {
    const artist = document.querySelector(
      "#you_followings > div.contain > div > div > div.titre > h3"
    );
    const song = document.querySelector(
      "#you_followings > div.contain > div > div > div.titre > h1"
    );

    presence.setActivity({
      largeImageKey: "gly-logo",
      state:
        artist && song
          ? `${artist.textContent} - ${song.textContent}`
          : "Bilinmeyen",
      smallImageKey: "play-bt",
      startTimestamp: browsingStamp
    });
  }

  // Explore
  if (page.startsWith("/explore")) {
    presence.setActivity({
      largeImageKey: "gly-logo",
      details: "Keşfet bölümünde...",
      startTimestamp: browsingStamp
    });
  }

  // Notifications
  if (page.startsWith("/notifications")) {
    presence.setActivity({
      largeImageKey: "gly-logo",
      details: "Bildirimlerine göz atıyor...",
      startTimestamp: browsingStamp
    });
  }

  // Settings
  if (page.startsWith("/settings")) {
    if (page == "/settings") {
      presence.setActivity({
        largeImageKey: "gly-logo",
        details: "Profil ayarlarında",
        startTimestamp: browsingStamp
      });
    } else if (page == "/settings-bio")
      presence.setActivity({
        largeImageKey: "gly-logo",
        details: "Hesap ayarlarında",
        state: "Bir ayar yapıyor: Biyografi",
        startTimestamp: browsingStamp
      });
    else if (page == "/settings-avatar")
      presence.setActivity({
        largeImageKey: "gly-logo",
        details: "Hesap ayarlarında",
        state: "Bir ayar yapıyor: Profil fotoğrafı",
        startTimestamp: browsingStamp
      });
    else if (page == "/settings-exinfo")
      presence.setActivity({
        largeImageKey: "gly-logo",
        details: "Hesap ayarlarında",
        state: "Bir ayar yapıyor: Ekstra bilgiler",
        startTimestamp: browsingStamp
      });
    else if (page == "/settings-links")
      presence.setActivity({
        largeImageKey: "gly-logo",
        details: "Profil ayarlarında",
        state: "Bir ayar yapıyor: Bağlantılar",
        startTimestamp: browsingStamp
      });
    else if (page == "/settings-view")
      presence.setActivity({
        largeImageKey: "gly-logo",
        details: "Profil ayarlarında",
        state: "Bir ayar yapıyor: Görünüm",
        startTimestamp: browsingStamp
      });
    else if (page == "/settings-mail")
      presence.setActivity({
        largeImageKey: "gly-logo",
        details: "Profil ayarlarında",
        state: "Bir ayar yapıyor: Mail",
        startTimestamp: browsingStamp
      });
    else if (page == "/settings-password")
      presence.setActivity({
        largeImageKey: "gly-logo",
        details: "Profil ayarlarında",
        state: "Bir ayar yapıyor: Parola",
        startTimestamp: browsingStamp
      });
    else if (page == "/settings-privacy")
      presence.setActivity({
        largeImageKey: "gly-logo",
        details: "Profil ayarlarında",
        state: "Bir ayar yapıyor: Gizlilik",
        startTimestamp: browsingStamp
      });
    else if (page == "/settings-language")
      presence.setActivity({
        largeImageKey: "gly-logo",
        details: "Profil ayarlarında",
        state: "Bir ayar yapıyor: Dil",
        startTimestamp: browsingStamp
      });
  }

  // Users
  if (page.startsWith("/@")) {
    let profile = document.querySelector(
      "#profil_top > div > div:nth-child(2) > a:nth-child(1) > b"
    );
    if (!profile)
      profile = document.querySelector(
        "#profil_top > div > div:nth-child(2) > a:nth-child(3) > b"
      );
    presence.setActivity({
      largeImageKey: "gly-logo",
      details: "Bir profile göz atıyor:",
      state: profile ? profile.textContent : "Bilinmeyen",
      smallImageText: profile ? page.substring(0) : "Bilinmeyen",
      startTimestamp: browsingStamp
    });
  }

  // Post details
  if (page.startsWith("/postdetails")) {
    const profile = document.querySelector(
      "#post_owner_info > div > a:nth-child(3)"
    );
    presence.setActivity({
      largeImageKey: "gly-logo",
      details: "Bir gönderiye göz atıyor,",
      state: profile ? "Gönderen: @" + profile.textContent : "Bilinmeyen",
      startTimestamp: browsingStamp
    });
  }

  // Server Errors

  if (page.startsWith("/404")) {
    presence.setActivity({
      largeImageKey: "gly-logo",
      details: "Server Error: 404",
      state: "Sayfa bulunamadı.",
      startTimestamp: browsingStamp
    });
  }
  if (page.startsWith("/403")) {
    presence.setActivity({
      largeImageKey: "gly-logo",
      details: "Server Error: 403",
      state: "Yasaklı bölge!",
      startTimestamp: browsingStamp
    });
  }
  if (page.startsWith("/503") || page.startsWith("/500")) {
    presence.setActivity({
      largeImageKey: "gly-logo",
      details: "Server Error: " + page.substring(1),
      state: "Sunucuya şu anda ulaşılamıyor.",
      startTimestamp: browsingStamp
    });
  }
  if (page.startsWith("/400")) {
    presence.setActivity({
      largeImageKey: "gly-logo",
      details: "Server Error: 400",
      state: "Geçersiz istek.",
      startTimestamp: browsingStamp
    });
  }

  // Login page
  if (page.startsWith("/login")) {
    presence.setActivity({
      largeImageKey: "gly-logo",
      details: "Giriş yapıyor...",
      startTimestamp: browsingStamp
    });
  }
});
