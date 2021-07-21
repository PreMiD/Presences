const TRanimeizle = new Presence({
    clientId: "819994268801957899"
  }),
  pages: { [k: string]: string } = {
    "/": "Ana Sayfa",
    "/haberler": "Haberler",
    "/ekipAlimi/translator": "Çevirmen Alımı",
    "/ekipAlimi/uploader": "Yükleyici Alımı",
    "/ekipAlimi/encoder": "Encoder Alımı",
    "/ekipAlimi/editor": "Editör Alımı",
    "/iletisim": "İletişim",
    "/Account/Login": "Giriş Yap",
    "/Account/Register": "Kayıt Ol"
  },
  strings = TRanimeizle.getStrings(
    {
      play: "general.playing",
      pause: "general.paused"
    },
    "tr"
  );

interface iframeData {
  duration: number;
  currentTime: number;
  paused: boolean;
}

let video: iframeData;
TRanimeizle.on("iFrameData", (data: iframeData) => {
  if (data) video = data;
});

const startTimestamp = Math.floor(Date.now() / 1000);
TRanimeizle.on("UpdateData", async () => {
  const page: string = location.pathname,
    presenceData: PresenceData = {
      largeImageKey: "traizle-logo",
      startTimestamp
    };

  if (page.includes("/arama/")) {
    const searchingFor = document
      .querySelector(".post-head .title strong")
      ?.textContent.replace(/"/g, "");

    presenceData.details = "Bir şey arıyor:";
    presenceData.state = searchingFor;
    presenceData.smallImageKey = "search";
  } else if (page.includes("/harfler/")) {
    const letter = document.querySelector(
      ".post-head .title strong"
    )?.textContent;

    presenceData.details = "Bir harfe göz atıyor:";
    presenceData.state = letter ? `Harf: ${letter}` : "Bilinmeyen Harf";
  } else if (page.includes("/tur/")) {
    const category =
      document.querySelector(".post-head .title strong")?.textContent ||
      "Bilinmeyen Kategori";

    presenceData.details = "Bir kategoriye göz atıyor:";
    presenceData.state = category;
  } else if (page.includes("/anime/")) {
    const animeName = document
      .querySelector(".container .playlist-title h1")
      ?.textContent?.replace("İzle", "");

    presenceData.details = "Bir animeye göz atıyor:";
    presenceData.state = animeName;
  } else if (page.includes("/haberler/")) {
    const title =
      document.querySelector(".post-header h1")?.textContent ||
      "Bilinmeyen Gönderi";

    presenceData.details = title;
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = "Bir gönderi okuyor";
  } else if (page.includes("/BanaOzel/")) {
    const list =
      document.querySelector(".post-head .title")?.textContent ||
      "Bilinmeyen Liste";

    presenceData.details = "Bir listeye göz atıyor:";
    presenceData.state = list;
  } else if (Object.keys(video || {}).length > 0) {
    const episode = document
        .querySelector(".container .playlist-title h1")
        ?.textContent?.replace("İzle", ""),
      timestamps = TRanimeizle.getTimestamps(video.currentTime, video.duration);

    // Set timestamps
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    presenceData.buttons = [
      {
        label: "Bölümü İzle",
        url: location.href
      }
    ];

    // Set playing/paused text
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;

    presenceData.state = episode;
  } else if (pages[page] || pages[page.slice(0, -1)]) {
    presenceData.details = "Bir sayfaya göz atıyor:";
    presenceData.state = pages[page] || pages[page.slice(0, -1)];
  }

  if (Object.keys(presenceData).length > 2)
    TRanimeizle.setActivity(presenceData);
  else TRanimeizle.setActivity();
});
