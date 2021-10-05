const kitaplarinDili = new Presence({
    clientId: "769651625379102761"
  }),
  strings = kitaplarinDili.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  kitapPages: { [k: string]: string } = {
    "/": "Ana Sayfa",
    "/movies.html": "Sesli Kitaplar",
    "/all-movies.html": "Tüm Sesli Kitaplar",
    "/az.html": "Sesli Kitap Arşivi",
    "/yazarlar": "Yazarlar",
    "/page/sss": "Sıkça Sorulan Sorular",
    "/contact-us.html": "İletişim",
    "/istek": "İstek & Öneri",
    "/user/login": "Giriş Yap",
    "/user/profile": "Profil",
    "/my-account/profile": "Profil",
    "/my-account/favorite": "Dinlediklerim",
    "/my-account/watch-later": "Dinlenecekler",
    "/my-account/update": "Profili Düzenle",
    "/my-account/change-password": "Şifre Değiştir"
  };

kitaplarinDili.on("UpdateData", async () => {
  const page = document.location.pathname;

  if (page.includes("/genre/")) {
    let genre =
      document.querySelector(".page-title > h1")?.textContent ||
      "Bilinmeyen Tür";

    genre = genre
      .split(": ")
      .slice(1)
      .join("")
      .split("-")
      .map(
        (text) =>
          text[0]?.toUpperCase() + text.slice(1, text.length)?.toLowerCase()
      )
      .join(" ");

    kitaplarinDili.setActivity({
      largeImageKey: "kd-logo",
      details: "Bir türü inceliyor:",
      state: genre || "Bilinmeyen Tür",
      startTimestamp: Date.now()
    });
  } else if (page.includes("/az-list/")) {
    const letter = page.split("/")?.[page.split("/").length - 1]?.toUpperCase();

    kitaplarinDili.setActivity({
      largeImageKey: "kd-logo",
      details: "Arşivi inceliyor:",
      state: letter ? `Harf: ${letter}` : "Bilinmeyen Harf",
      smallImageKey: "search",
      startTimestamp: Date.now()
    });
  } else if (page.includes("/search")) {
    const term = document.title.replace(" - Kitapların Dili", "");

    kitaplarinDili.setActivity({
      largeImageKey: "kd-logo",
      details: "Bir şey arıyor:",
      state: term || "Bilinmeyen Terim",
      smallImageKey: "search",
      startTimestamp: Date.now()
    });
  } else if (page.includes("/country/")) {
    const languageName = document
      .querySelector(".breadcrumb > .active")
      ?.textContent?.split(" ")
      ?.map(
        (text) =>
          text[0]?.toUpperCase() + text.slice(1, text.length)?.toLowerCase()
      )
      ?.join(" ");

    kitaplarinDili.setActivity({
      largeImageKey: "kd-logo",
      details: "Bir dili inceliyor:",
      state: languageName || "Bilinmeyen Dil",
      smallImageKey: "search",
      startTimestamp: Date.now()
    });
  } else if (page.includes("/star/")) {
    const starName =
      document.querySelector(".page-title > font")?.textContent?.trim() ||
      "Bilinmeyen Yazar";

    kitaplarinDili.setActivity({
      largeImageKey: "kd-logo",
      details: "Bir yazarı inceliyor:",
      state: starName,
      startTimestamp: Date.now()
    });
  } else if (page.includes("/watch/")) {
    const bookName =
        document.querySelector(".pull-left.title")?.textContent ||
        "Bilinmeyen Kitap",
      video: HTMLVideoElement = document.querySelector("video.vjs-tech");

    if (!video) {
      return kitaplarinDili.setActivity({
        largeImageKey: "kd-logo",
        details: bookName,
        smallImageKey: "question",
        smallImageText: "Video verisi alınamıyor"
      });
    }

    const timestamps = kitaplarinDili.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      presenceData: PresenceData = {
        largeImageKey: "kd-logo",
        details: bookName,
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    kitaplarinDili.setActivity(presenceData);
  } else if (
    kitapPages[page] ||
    kitapPages[page.slice(0, -1)] ||
    kitapPages[page.replace(".html", "")]
  ) {
    kitaplarinDili.setActivity({
      largeImageKey: "kd-logo",
      details: "Bir sayfaya göz atıyor:",
      state:
        kitapPages[page] ||
        kitapPages[page.slice(0, -1)] ||
        kitapPages[page.replace(".html", "")] ||
        "Bilinmeyen Sayfa",
      startTimestamp: Date.now()
    });
  } else {
    kitaplarinDili.setActivity({
      largeImageKey: "kd-logo",
      details: "Bir sayfaya göz atıyor:",
      state: "Ana Sayfa",
      startTimestamp: Date.now()
    });
  }
});
