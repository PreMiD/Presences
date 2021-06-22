const presence = new Presence({
    clientId: "707431547715977218"
  }),
  pages = {
    "/turbobit-premium-alma-hizli-indirme":
      "Turbobit Premium Alma Hızlı indirme !",
    "/redbunker-premium-alma-hizli-indirme":
      "Redbunker Premium Alma Hızlı indirme !",
    "/windows-nasil-lisanslanir": "Windows Nasıl lisanslanır !",
    "/kirik-link-bildirimi-yapin": "Kırık Link Bildirimi Yapın!",
    "/winrar-crc-hatasi-cozumu-0": "Winrar CRC Hatası Çözümü %100",
    "/windows-dvd-usb-ile-format-atma": "Windows DVD USB İle Format Atma !",
    "/yardim-istek-bolumu": "Yardım & İstek Bölümü !"
  };

let pgn: string;

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    searchingFor = document.querySelector("#icerik > h1"),
    category = document.querySelector("#icerik > h1");
  if (page.includes("/kategori/") && category && category.textContent !== "") {
    if (page.includes("/page/")) {
      const location = document.location.pathname.indexOf("page");
      pgn = `Sayfa: ${document.location.pathname.slice(
        location + 5,
        document.location.pathname.length
      )}`;
    }
    let category2 = category.textContent
      .slice(0, category.textContent.length - 27)
      .trim();
    if (pgn) category2 = `${category2}(${pgn})`;

    presence.setActivity({
      largeImageKey: "fp-logo",
      details: "Bir kategoriyi inceliyor:",
      state: category2 || "Belirsiz",
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else if (document.location.href.includes("?s=") && searchingFor) {
    presence.setActivity({
      largeImageKey: "fp-logo",
      details: "Bir şey arıyor:",
      state: searchingFor.textContent
        ? searchingFor.textContent.slice(17, searchingFor.textContent.length)
        : "Belirsiz",
      smallImageKey: "search",
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else if (page.includes("/page/")) {
    const pgnum = document.location.pathname.slice(
      6,
      document.location.pathname.length
    );
    presence.setActivity({
      largeImageKey: "fp-logo",
      details: "Sayfalar arasında geziniyor:",
      state: pgnum ? `Ana Sayfa: ${pgnum}` : "Belirsiz",
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else if (page.includes(".html")) {
    const topic = document.querySelector(
        "#icerik-yazi > div.icerik-baslik > h1 > a"
      ),
      published = document.querySelector(
        "#icerik > div > div.yazi-alt > ul > li.tarih > span"
      ),
      publisher = document.querySelector(
        "#icerik > div > div.yazi-alt > ul > li.yazar > a"
      );
    presence.setActivity({
      largeImageKey: "fp-logo",
      details: topic.textContent.trim() || "Belirsiz",
      state:
        publisher && publisher.textContent !== ""
          ? `${publisher.textContent.trim()} ${
              published && published.textContent !== ""
                ? `(${published.textContent.trim()})`
                : ""
            }`
          : "Belirsiz",
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else if (
    pages[page as keyof typeof pages] ||
    pages[page.slice(0, -1) as keyof typeof pages]
  ) {
    presence.setActivity({
      largeImageKey: "fp-logo",
      details: "Bir sayfaya göz atıyor:",
      state:
        pages[page as keyof typeof pages] ||
        pages[page.slice(0, -1) as keyof typeof pages],
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else {
    presence.setActivity({
      largeImageKey: "fp-logo",
      details: "Bir sayfaya göz atıyor:",
      state: "Ana Sayfa",
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  }
});
