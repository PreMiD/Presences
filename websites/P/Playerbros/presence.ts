const presence = new Presence({
    clientId: "643848955586805770"
  }),
  pages: {
    [name: string]: string;
  } = {
    "/": "Ana Sayfa",
    "/espor": "Espor Haberleri",
    "/video-konusu": "Video Konuları",
    "/roportaj": "Röportajlar",
    "/testler": "Testler",
    "/lol": "LoL Haberleri",
    "/csgo": "CS:GO Haberleri",
    "/fortnite": "Fortnite Haberleri",
    "/pubg": "PUBG Haberleri",
    "/fifa": "FIFA Haberleri",
    "/zula": "Zula Haberleri",
    "/register": "Kayıt Ol",
    "/login": "Giriş Yap",
    "/hakkinda": "Hakkımızda",
    "/kunye": "Künye",
    "/iletisim": "İletişim",
    "/wp-admin/profile.php": "Profil" // -_- wp-admin? really?
  };

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    postTitle = document.querySelector("#mvp-article-head > h1"),
    date = document.querySelector(
      "#mvp-article-head > div > ul > li > span > p > time"
    ),
    author = document.querySelector("#mvp-author-box-head > span > a"),
    _author = document.querySelector("#mvp-author-top-right > h1");

  if (
    postTitle &&
    author &&
    date &&
    postTitle.textContent !== "" &&
    author.textContent !== "" &&
    date.textContent !== ""
  ) {
    presence.setActivity({
      largeImageKey: "pb-logo",
      details: postTitle.textContent || "Belirsiz",
      state: `Yazar: ${author.textContent} (${date.textContent})`,
      smallImageKey: "reading",
      smallImageText: "Bir gönderi okuyor...",
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else if (
    page.includes("/author/") &&
    _author &&
    _author.textContent !== ""
  ) {
    presence.setActivity({
      largeImageKey: "pb-logo",
      details: "Bir yazara göz atıyor:",
      state: _author.textContent,
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else if (page.includes("/etiket/")) {
    const tag = document.querySelector(
        "#mvp-main-body > div > div > div > div.mvp-main-body-in2 > div > h1 > span"
      ),
      number =
        tag && tag.textContent !== ""
          ? tag.textContent.split(" ").length - 1
          : null,
      fixedTag =
        tag && tag.textContent !== ""
          ? tag.textContent.split(" ")[number].replace(/"/g, "")
          : null;

    presence.setActivity({
      largeImageKey: "pb-logo",
      details: "Bir etikete göz atıyor:",
      state: fixedTag || "Belirsiz",
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else if (document.location.search.includes("?s=")) {
    const searchingFor = document.querySelector(
        "#mvp-main-body > div > div > div > div.mvp-main-body-in2 > div > h1 > span"
      ),
      number =
        searchingFor && searchingFor.textContent !== ""
          ? searchingFor.textContent.split(" ").length - 1
          : null,
      fixedSearch =
        searchingFor && searchingFor.textContent !== ""
          ? searchingFor.textContent.split(" ")[number].replace(/"/g, "")
          : null;

    presence.setActivity({
      largeImageKey: "pb-logo",
      details: "Bir şey arıyor:",
      state: fixedSearch || "Belirsiz",
      smallImageKey: "search",
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else if (pages[page] || pages[page.slice(0, -1)]) {
    presence.setActivity({
      largeImageKey: "pb-logo",
      details: "Bir sayfaya göz atıyor:",
      state: pages[page] || pages[page.slice(0, -1)],
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else {
    presence.setActivity({
      largeImageKey: "pb-logo",
      details: "Bir sayfaya göz atıyor:",
      state: "Ana Sayfa",
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  }
});
