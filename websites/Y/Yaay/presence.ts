const yaay = new Presence({
    clientId: "752933383411204196"
  }),
  yaayPages: { [key: string]: string } = {
    "/": "Ana Sayfa",
    "/home": "Ana Sayfa",
    "/notifications": "Bildirimler",
    "/settings": "Ayarlar",
    "/messages": "Mesajlar",
    "/settings/profileindex": "Profil Ayarları",
    "/settings/account": "Hesap Ayarları",
    "/settings/privacy": "Gizlilik Ayarları",
    "/logout": "Çıkış Yap",
    "/register": "Kayıt Ol",
    "/login": "Giriş Yap",
    "/explore": "Popüler 24"
  };

yaay.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "yaay-logo",
      startTimestamp: Math.floor(Date.now() / 1000)
    },
    page = document.location.pathname,
    userPage = document.querySelector(".profile_container");

  if (page.includes("/category/")) {
    presenceData.details = "Bir kategoriye göz atıyor:";
    presenceData.state =
      document.querySelector(".category_name > .text")?.textContent ||
      "Bilinmeyen Kategori";

    yaay.setActivity(presenceData);
  } else if (page.includes("/explore/tag")) {
    presenceData.details = "Bir başlığa göz atıyor:";
    presenceData.state =
      document.querySelector(".feed_content > .hashtagpage_title")
        ?.textContent || "Bilinmeyen Başlık";

    yaay.setActivity(presenceData);
  } else if (page.includes("/post/")) {
    presenceData.details = "Bir gönderiye bakıyor:";
    presenceData.state = `${
      document.querySelector("#postDetail .usernick")?.textContent ||
      document.querySelector("#postDetail .username")?.textContent ||
      "Bilinmeyen Kullanıcı"
    } ${document.querySelector("#postDetail .posttime")?.textContent || ""}`;

    yaay.setActivity(presenceData);
  } else if (page.includes("/messages/")) {
    presenceData.details = "Bir kişiyle mesajlaşıyor:";
    presenceData.state =
      document.querySelector(".feed_content .username")?.textContent ||
      "Bilinmeyen Kullanıcı";

    yaay.setActivity(presenceData);
  } else if (userPage) {
    const username = userPage.getAttribute("data-user");

    presenceData.details = "Bir profile göz atıyor:";
    presenceData.state = username ? `@${username}` : "Bilinmeyen Kullanıcı";

    yaay.setActivity(presenceData);
  } else if (page.includes("/search")) {
    presenceData.smallImageKey = "search";
    presenceData.details = "Bir şey arıyor:";
    presenceData.state =
      document.querySelector(".top .text b")?.textContent || "Bilinmeyen Arama";

    yaay.setActivity(presenceData);
  } else if (yaayPages[page] || yaayPages[page.slice(0, -1)]) {
    presenceData.details = "Bir sayfaya göz atıyor:";
    presenceData.state = yaayPages[page] || yaayPages[page.slice(0, -1)];

    yaay.setActivity(presenceData);
  }
});
