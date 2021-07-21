const LSHiver = new Presence({
    clientId: "818540288334757958"
  }),
  pages: { [k: string]: string } = {
    "/": "Ana Sayfa",
    "/ekip": "Ekip",
    "/kategoriler": "Kategoriler",
    "/kaydedilenler": "Kaydedilenler",
    "/discord": "Discord",
    "/wp-admin/profile.php": "Profil",
    "/wp-login.php": "Giriş Yap & Kayıt Ol",
    "/wp-admin/index.php": "Çok Gizli WordPress Paneli",
    "/ekip-basvuru": "Ekip Başvuru",
    "/adan-zye-liste": "A'dan Z'ye Liste",
    "/random": "Şaşırt Beni",
    "/manga": "Manga Listesi"
  },
  startTimestamp = Math.round(Date.now() / 1000);

LSHiver.on("UpdateData", async () => {
  const page = location.pathname,
    presenceData: PresenceData = {
      largeImageKey: "lsh-logo",
      startTimestamp
    },
    chapterTitle = document.querySelector(
      ".chapterbody .postarea .headpost h1.entry-title"
    )?.textContent;

  if (page.includes("/genres/")) {
    const genre =
      document.querySelector("#content .wrapper .postbody .bixbox .releases h1")
        ?.textContent || "Bilinmeyen Tür";

    presenceData.details = "Bir türe göz atıyor:";
    presenceData.state = genre;

    LSHiver.setActivity(presenceData);
  } else if (page === "/" && location.search?.includes("?s=")) {
    const searchingFor =
      decodeURI(location.search).replace("?s=", "").replace(/\+/g, " ") ||
      "Bilinmeyen Terim";

    presenceData.details = "Bir şey arıyor:";
    presenceData.state = searchingFor;
    presenceData.smallImageKey = "search";

    LSHiver.setActivity(presenceData);
  } else if (page.includes("/blog")) {
    const title = document.querySelector(
      ".entry-header h1.entry-title"
    )?.textContent;

    if (title) {
      presenceData.details = "Bir gönderi okuyor:";
      presenceData.state = title;
      presenceData.smallImageKey = "reading";

      LSHiver.setActivity(presenceData);
    } else {
      presenceData.details = "Bir sayfaya göz atıyor:";
      presenceData.state = "Blog";

      LSHiver.setActivity(presenceData);
    }
  } else if (page.includes("/manga/")) {
    const mangaTitle =
      document.querySelector(".infox h1.entry-title")?.textContent ||
      "Bilinmeyen Manga";

    presenceData.details = "Bir mangaya göz atıyor:";
    presenceData.state = mangaTitle;

    LSHiver.setActivity(presenceData);
  } else if (page.includes("/author/")) {
    const authorName =
      document.querySelector("#content .postbody .releases h1")?.textContent ||
      "Bilinmeyen Yazar";

    presenceData.details = "Bir yazara bakıyor:";
    presenceData.state = authorName;

    LSHiver.setActivity(presenceData);
  } else if (page.includes("/") && chapterTitle) {
    const episodeTitle = document.querySelector(
        "#chapter option[selected = selected]"
      )?.textContent,
      episodeNumber = episodeTitle?.replace("Bölüm ", "")?.trim();

    presenceData.details =
      chapterTitle.replace(episodeNumber, "") || "Bilinmeyen Manga";
    presenceData.state = episodeTitle;

    presenceData.smallImageText = "Bir manga okuyor";
    presenceData.smallImageKey = "reading";

    LSHiver.setActivity(presenceData);
  } else if (pages[page] || pages[page.slice(0, -1)]) {
    presenceData.details = "Bir sayfaya göz atıyor:";
    presenceData.state = pages[page] || pages[page.slice(0, -1)];

    LSHiver.setActivity(presenceData);
  } else LSHiver.setActivity();
});
