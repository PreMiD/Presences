const sinefy = new Presence({
    clientId: "817552908991594530"
  }),
  strings = async () => {
    return sinefy.getStrings(
      {
        play: "general.playing",
        pause: "general.paused"
      },
      await sinefy.getSetting("lang")
    );
  },
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

let video: HTMLVideoElement;
sinefy.on("iFrameData", (data: { video: HTMLVideoElement }) => {
  if (data.video) video = data.video;
});

const startTimestamp = Math.floor(Date.now() / 1000);
sinefy.on("UpdateData", async () => {
  const page = location.pathname,
    activity: PresenceData = {
      largeImageKey: "s-logo",
      startTimestamp
    },
    settings = {
      buttons: await sinefy.getSetting("buttons"),
      showTitle: await sinefy.getSetting("show-title")
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

    // Set status state
    activity.details = title.replace(episode, "");
    if (episode) activity.state = episode.replace("izle", "");

    if (video) {
      const timestamps = sinefy.getTimestamps(
        video.currentTime,
        video.duration
      );

      // Set timestamps
      activity.startTimestamp = timestamps[0];
      activity.endTimestamp = timestamps[1];

      // Set playing/paused text
      activity.smallImageKey = video.paused ? "pause" : "play";
      activity.smallImageText = video.paused
        ? (await strings()).pause
        : (await strings()).play;
    }

    // Set activity
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

    // Set buttons if settings is turned on
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
