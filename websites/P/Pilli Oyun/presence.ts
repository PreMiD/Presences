const presence = new Presence({
    clientId: "814412476543533087"
  }),
  pages: { [key: string]: any } = {
    "/": "Ana Sayfa",
    "/haberler": "Haberler",
    "/haberler/oyun-haberleri": "Oyun Haberleri",
    "/inceleme": "İncelemeler",
    "/oyun-rehberleri": "Rehberler",
    "/sistem-gereksinimleri": "Sistem Gereksinimleri",
    "/gizlilik-politikasi": "Gizlilik Politikası",
    "/alinti-sartlari": "Alıntı Şartları",
    "/kunye": "Künye",
    "/iletisim": "İletişim",
    "/gonullu-yazarlik": "Gönüllü Yazarlık",
    "/wp-admin/post-new.php": "Yeni Yazı Ekle"
  };

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    postTitle = document.querySelector("h1.jeg_post_title"),
    date = document.querySelector(
      ".jeg_meta_date > a"
    ),
    author = document.querySelector(".jeg_meta_author > a"),
    _author = document.querySelector("h3.jeg_author_name");

  if (
    postTitle &&
    author &&
    date &&
    postTitle.textContent != "" &&
    author.textContent != "" &&
    date.textContent != ""
  ) {
    presence.setActivity({
      largeImageKey: "po-logo",
      details: postTitle.textContent || "Belirsiz",
      state: `Yazar: ${author.textContent} (${date.textContent})`,
      smallImageKey: "reading",
      smallImageText: "Bir gönderi okuyor...",
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else if (
    page.includes("/author/") &&
    _author &&
    _author.textContent != ""
  ) {
    presence.setActivity({
      largeImageKey: "po-logo",
      details: "Bir yazara göz atıyor:",
      smallImageKey: "author",
      smallImageText: `${_author.textContent} yazarına göz atıyor...`,
      state: _author.textContent,
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else if (page.includes("/etiket/")) {
    const tag = document.querySelector(
        ".jeg_archive_title > span"
      );

    presence.setActivity({
      largeImageKey: "po-logo",
      details: "Bir etikete göz atıyor:",
      smallImageKey: "tag",
      smallImageText: `${tag.textContent || "Belirsiz"} etiketine göz atıyor...`,
      state: tag.textContent || "Belirsiz",
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else if (document.location.search.includes("?s=")) {
    const searchingFor = document.querySelector(
        ".jeg_archive_title"
      ),
      fixedSearch =
        searchingFor && searchingFor.textContent != ""
          ? searchingFor.textContent.split("'")[1]
          : null;

    presence.setActivity({
      largeImageKey: "po-logo",
      details: "Bir şey arıyor:",
      state: fixedSearch || "Belirsiz",
      smallImageKey: "searching",
      smallImageText: `${fixedSearch || "Belirsiz"} arama sonuçlarına göz atıyor...`,
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else if (pages[page] || pages[page.slice(0, -1)]) {
    presence.setActivity({
      largeImageKey: "po-logo",
      details: "Bir sayfaya göz atıyor:",
      smallImageKey: "page",
      smallImageText: `${pages[page] || pages[page.slice(0, -1)]} sayfasına göz atıyor...`,
      state: pages[page] || pages[page.slice(0, -1)],
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else {
    presence.setActivity({
      largeImageKey: "po-logo",
      details: "Bir sayfaya göz atıyor:",
      state: "Ana Sayfa",
      smallImageKey: "home",
      smallImageText: "Ana Sayfaya göz atıyor...",
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  }
});
