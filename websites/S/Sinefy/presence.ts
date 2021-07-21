const sinefy = new Presence({
    clientId: "817552908991594530"
  }),
  strings = sinefy.getStrings(
    {
      play: "general.playing",
      pause: "general.paused"
    },
    "tr"
  ),
  pages: { [k: string]: string } = {
    "/": "Ana Sayfa",
    "/gozat": "Göz At",
    "/yeni-filmler": "Yeni Filmler",
    "/yeni-filmler/son-eklenen": "Son Eklenen Filmler",
    "/yeni-filmler/imdb-yuksek": "IMDb'si En Yüksek Filmler",
    "/yeni-filmler/imdb-dusuk": "IMDb'si En Düşük Filmler",
    "/dizi-izle": "Yabancı Diziler",
    "/en-iyiler": "En İyiler",
    "/koleksiyon": "Koleksiyonlar",
    "/oyuncular": "Oyuncular",
    "/forum": "Forum",
    "/forum/latest": "Yeni Konular (Forum)",
    "/forum/favorites": "Favorilerim (Forum)",
    "/login": "Giriş Yap",
    "/register": "Kayıt Ol",
    "/istek": "İstek Yap",
    "/profil/ayarlar": "Hesap Ayarları",
    "/app": "Mobil Uygulama",
    "/netflix-filmleri-izle": "Netflix Filmleri"
  };

interface iframeData {
  duration: number;
  currentTime: number;
  paused: boolean;
}

let video: iframeData;
sinefy.on("iFrameData", (data: iframeData) => {
  if (data) video = data;
});

const startTimestamp = Math.floor(Date.now() / 1000);
sinefy.on("UpdateData", async () => {
  const page = location.pathname,
    activity: PresenceData = {
      largeImageKey: "s-logo",
      startTimestamp
    },
    settings = {
      buttons: await sinefy.getSetting("buttons")
    };

  if (page.includes("/izle/")) {
    const title =
        document.querySelector(".bg-cover-faker a h1.page-title")
          ?.textContent ||
        document.querySelector(".bg-cover-faker h1.page-title a")
          ?.textContent ||
        "Bilinmeyen Dizi/Film",
      episode =
        document.querySelector(".bg-cover-faker h1.page-title span")
          ?.textContent || null;

    activity.details = title.replace(episode, "");
    if (episode) activity.state = episode.replace("izle", "");

    if (Object.keys(video || {}).length > 0) {
      const timestamps = sinefy.getTimestamps(
        video.currentTime,
        video.duration
      );

      activity.startTimestamp = timestamps[0];
      activity.endTimestamp = timestamps[1];

      if (video.paused) {
        delete activity.startTimestamp;
        delete activity.endTimestamp;
      }

      if (settings.buttons)
        activity.buttons = [
          {
            label: "Filmi/Diziyi İzle",
            url: location.href
          }
        ];

      activity.smallImageKey = video.paused ? "pause" : "play";
      activity.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
    }

    sinefy.setActivity(activity);
  } else if (page.includes("/gozat/")) {
    const title =
      document.querySelector(".bg-cover-faker h1.page-title")?.textContent ||
      "Bilinmeyen Kategori";

    activity.details = "Bir kategoriye göz atıyor:";
    activity.state = title;

    sinefy.setActivity(activity);
  } else if (page.includes("/profil/")) {
    const username =
      document.querySelector(".generic-box h2.title-secondary a")
        ?.textContent || "Bilinmeyen Kullanıcı";

    activity.details = "Bir kullanıcıya göz atıyor:";
    activity.state = username;

    if (settings.buttons === true)
      activity.buttons = [
        {
          label: "Kullanıcıyı Görüntüle",
          url: location.href
        }
      ];

    sinefy.setActivity(activity);
  } else if (page.includes("/oyuncu/")) {
    const name =
      document.querySelector(".bg-cover-faker h1.page-title")?.textContent ||
      "Bilinmeyen Kategori";

    activity.details = "Bir oyuncuya göz atıyor:";
    activity.state = name;

    if (settings.buttons === true)
      activity.buttons = [
        {
          label: "Oyuncuyu Görüntüle",
          url: location.href
        }
      ];

    sinefy.setActivity(activity);
  } else if (page.includes("/forum/")) {
    const entry =
      document.querySelector(".story-detail .story-header h1.title-primary")
        ?.textContent || "Bilinmeyen Kategori";

    activity.details = "Forum gönderisi:";
    activity.state = entry;

    if (settings.buttons === true)
      activity.buttons = [
        {
          label: "Gönderiyi Görüntüle",
          url: location.href
        }
      ];

    sinefy.setActivity(activity);
  } else if (pages[page] || pages[page.slice(0, -1)]) {
    activity.details = "Bir sayfaya göz atıyor:";
    activity.state = pages[page] || pages[page.slice(0, -1)];

    sinefy.setActivity(activity);
  } else sinefy.setActivity();
});
