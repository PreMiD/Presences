const presence = new Presence({
    clientId: "634816982843129857"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  pages: {
    [name: string]: string;
  } = {
    "/film-arsivi": "Film Arşivi",
    "/en-cok-izlenen-filmler": "En Çok İzlenen Filmler",
    "/boxset-filmler": "Seri Filmleri",
    "/oyuncular": "Oyuncular",
    "/yonetmenler": "Yönetmenler",
    "/altyazili-film-izle": "Alt Yazılı Filmler",
    "/turkce-dublaj-izle": "Türkçe Dublajlı Filmler",
    "/giris-yap": "Giriş Yap",
    "/kayit-ol": "Kayıt Ol",
    "/iletisim": "İletişim"
  };

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    title = document.querySelector(
      "body > div.watch-page > div:nth-child(1) > div > div.col-md-7.col-xs-12.titles > h1"
    ) as HTMLElement,
    video = document.querySelector("video") as HTMLVideoElement;

  if (pages[page] || pages[page.slice(0, -1)]) {
    presence.setActivity({
      largeImageKey: "fm-logo",
      startTimestamp: Math.floor(Date.now() / 1000),
      details: "Bir sayfaya göz atıyor:",
      state: pages[page] || pages[page.slice(0, -1)]
    });
  } else if (page.includes("/liste/")) {
    const listName = document.querySelector(
      "body > main > div.row.category-head > div > h2"
    ) as HTMLElement;

    presence.setActivity({
      largeImageKey: "fm-logo",
      startTimestamp: Math.floor(Date.now() / 1000),
      details: "Bir listeye göz atıyor:",
      state:
        listName && listName.textContent !== ""
          ? listName.textContent
          : "Belirsiz"
    });
  } else if (page.includes("/film-ara")) {
    const searching = document.querySelector(
        "body > main > div.row.category-head > div > h2"
      ) as HTMLElement,
      fixedSearching =
        searching && searching.textContent !== ""
          ? searching.textContent.replace(/"/g, "").replace(" Sonuçları", "")
          : "Belirsiz";

    presence.setActivity({
      largeImageKey: "fm-logo",
      startTimestamp: Math.floor(Date.now() / 1000),
      details: "Bir şey arıyor:",
      state:
        fixedSearching !== "Belirsiz"
          ? fixedSearching[0].toUpperCase() + fixedSearching.slice(1)
          : "Belirsiz",
      smallImageKey: "search"
    });
  } else if (page.includes("/kategori/")) {
    const categoryName = document.querySelector(
      "body > main > div.row.category-head > div:nth-child(1) > h2"
    ) as HTMLElement;

    presence.setActivity({
      largeImageKey: "fm-logo",
      startTimestamp: Math.floor(Date.now() / 1000),
      details: "Bir kategoriyi inceliyor:",
      state:
        categoryName && categoryName.textContent !== ""
          ? categoryName.textContent
          : "Belirsiz"
    });
  } else if (title && title.textContent !== "" && !video) {
    presence.setActivity({
      largeImageKey: "fm-logo",
      startTimestamp: Math.floor(Date.now() / 1000),
      details: "Bir filmi inceliyor:",
      state: title.textContent
    });
  } else if (title && title.textContent !== "" && video) {
    const [startTimestamp, endTimestamp] = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      data: { [k: string]: string | number } = {
        largeImageKey: "fm-logo",
        details: "Bir film izliyor:",
        state: title.textContent,
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play
      };

    data.startTimestamp = startTimestamp;
    data.endTimestamp = endTimestamp;

    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data);
  } else {
    presence.setActivity({
      largeImageKey: "fm-logo",
      startTimestamp: Math.floor(Date.now() / 1000),
      details: "Bir sayfaya göz atıyor:",
      state: "Ana Sayfa"
    });
  }
});
