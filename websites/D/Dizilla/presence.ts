const dizilla = new Presence({
    clientId: "712838005165129728"
  }),
  strings = dizilla.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  pages: { [k: string]: string } = {
    "/": "Ana Sayfa",
    "/giris-yap": "Giriş Yap",
    "/kayit-ol": "Kayıt Ol",
    "/favorilerim": "Favorilerim",
    "/favori-oyuncularim": "Favori Oyuncularım",
    "/izleyeceklerim": "İzleyeceklerim",
    "/izlediklerim": "İzlediklerim",
    "/profilim": "Profilim",
    "/duyurular": "Duyurular",
    "/altyazili-bolumler": "Altyazılı Bölümler",
    "/turkce-dublaj-bolumler": "Türkçe Dublajlı Bölümler",
    "/trend": "Trendler",
    "/imdb-top-100": "IMDb Top 100",
    "/kanallar": "Kanallar",
    "/dizi-onerileri": "Dizi Önerileri",
    "/iletisim": "İletişim"
  };

interface IframeData {
  duration: number;
  currentTime: number;
  paused: boolean;
}

let video: IframeData;
dizilla.on("iFrameData", (data: IframeData) => {
  video = data;
});

dizilla.on("UpdateData", async () => {
  const path: string = document.location.pathname,
    showName: HTMLLinkElement = document.querySelector(
      "div.content > div > div.top-sticky-content h1 > a"
    ),
    episode: HTMLSpanElement = document.querySelector(
      "div.content > div > div.top-sticky-content span.text-white.text-small"
    ),
    object: PresenceData = {
      largeImageKey: "dz-logo",
      startTimestamp: Math.floor(Date.now() / 1000)
    };

  if (path.startsWith("/dizi/")) {
    object.details = "Bir diziye göz atıyor:";
    object.state =
      document.querySelector(
        "div.content > div > div.top-sticky-content div > h1 > a"
      )?.textContent || "Bilinmeyen Dizi";

    dizilla.setActivity(object);
  } else if (path.startsWith("/oyuncular/")) {
    object.details = "Bir oyuncuya göz atıyor:";
    object.state =
      document.querySelector(
        "div.content > div > div.top-sticky-content div > span"
      )?.textContent || "Bilinmeyen Oyuncu";

    dizilla.setActivity(object);
  } else if (path.startsWith("/dizi-turu/")) {
    object.details = "Bir türe göz atıyor:";
    object.state =
      document.querySelector(
        "div.content > div > div.top-sticky-content div > h1"
      )?.textContent || "Bilinmeyen Tür";

    dizilla.setActivity(object);
  } else if (path.startsWith("/kanal/")) {
    object.details = "Bir kanala göz atıyor:";
    object.state =
      document.title.slice(0, document.title.indexOf("arşivleri")) ||
      "Bilinmeyen Kanal";

    dizilla.setActivity(object);
  } else if (path.startsWith("/arsiv/")) {
    const query = new URL(document.location.href).searchParams.get("q");

    if (query) {
      object.details = "Bir şey arıyor:";
      object.state = query[0].toUpperCase() + query.slice(1).toLowerCase();
      object.smallImageKey = "search";
    } else {
      object.details = "Bir sayfaya göz atıyor:";
      object.state = "Arşiv";
    }

    dizilla.setActivity(object);
  } else if (pages[path] || pages[path.slice(0, -1)]) {
    object.details = "Bir sayfaya göz atıyor:";
    object.state =
      pages[path] || pages[path.slice(0, -1)] || "Bilinmeyen Sayfa";

    dizilla.setActivity(object);
  } else if (
    !isNaN(video?.duration) &&
    showName?.textContent &&
    episode?.textContent
  ) {
    const [, endTimestamp] = dizilla.getTimestamps(
      Math.floor(video?.currentTime),
      Math.floor(video?.duration)
    );

    object.details = showName?.textContent || "Bilinmeyen Dizi";
    object.state = episode?.textContent || "Bilinmeyen Bölüm";

    object.smallImageKey = video?.paused ? "pause" : "play";
    object.smallImageText = video?.paused
      ? (await strings).pause
      : (await strings).play;

    if (!isNaN(endTimestamp)) object.endTimestamp = endTimestamp;

    if (video.paused) {
      delete object.startTimestamp;
      delete object.endTimestamp;
    }

    dizilla.setTrayTitle(showName?.textContent);
    dizilla.setActivity(object);
  } else dizilla.setActivity();
});
