const sezonlukDizi = new Presence({
    clientId: "800520515315695666"
  }),
  pages: { [key: string]: string } = {
    "/": "Ana Sayfa",
    "/diziler.asp": "Diziler",
    "/trend": "Trend",
    "/forum": "Forum",
    "/oyuncular.asp": "Oyuncular",
    "/rehber.asp": "Rehber",
    "/uye": "Üye Profili",
    "/dizi-tartisma": "Dizi Tartışma"
  },
  strings = sezonlukDizi.getStrings({
    play: "general.playing",
    pause: "general.paused"
  });

interface iframeData {
  duration: number;
  currentTime: number;
  paused: boolean;
}

let video: iframeData;
sezonlukDizi.on("iFrameData", (data: iframeData) => {
  if (data) video = data;
});

const startTimestamp = Math.floor(Date.now() / 1000);
sezonlukDizi.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "sdlogo",
      startTimestamp
    },
    page = document.location.pathname,
    search = document.location.search;

  if (search.includes("?tur=")) {
    const titleReplaced = document.title.slice(
      0,
      document.title.indexOf("Türündeki")
    );

    presenceData.details = "Bir türe göz atıyor:";
    presenceData.state = titleReplaced;
  } else if (search.includes("?adi=") && /\?.*?&/g.test(search) === false) {
    const searchingFor = search.replace("?adi=", "");

    presenceData.smallImageKey = "search";

    presenceData.details = "Bir şey arıyor";
    presenceData.state = searchingFor;
  } else if (
    (page.includes("/diziler") && !page.includes("/diziler.asp")) ||
    page.includes("/bolumler") ||
    page.includes("/oyuncular") ||
    page.includes("/tartismalar") ||
    page.includes("/yorumlar")
  ) {
    const showTitle =
      document.querySelector("#dizibilgisi .content .header")?.textContent ||
      "Bilinmeyen Dizi";

    let currentTabTitle = "Bir diziyi inceliyor:";
    switch (true) {
      case page.includes("/bolumler"):
        currentTabTitle = "Dizinin bölümlerini inceliyor:";
        break;
      case page.includes("/oyuncular"):
        currentTabTitle = "Dizinin oyuncularını inceliyor:";
        break;
      case page.includes("/tartismalar"):
        currentTabTitle = "Dizinin tartışmalarını inceliyor:";
        break;
      case page.includes("/yorumlar"):
        currentTabTitle = "Dizinin yorumlarını inceliyor:";
        break;
    }

    presenceData.buttons = [
      {
        label: "Diziyi Görüntüle",
        url: location.href
      }
    ];
    presenceData.details = currentTabTitle;
    presenceData.state = showTitle;
  } else if (page.includes("/dizi-tartisma/")) {
    const postTitle =
        document.querySelector(".ui.minimal h1.header")?.textContent ||
        "Bilinmeyen Gönderi",
      showTitle =
        document.querySelector(".ui.stackable.cards .card .content a.header")
          ?.textContent || "Bilinmeyen Dizi";

    presenceData.buttons = [
      {
        label: "Tartışmayı Görüntüle",
        url: location.href
      }
    ];

    presenceData.details = postTitle;
    presenceData.state = showTitle;
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = "Bir tartışma okuyor";
  } else if (Object.keys(video || {}).length > 0) {
    const showTitle =
        document.querySelector(".content strong h1.header a")?.textContent ||
        "Bilinmeyen İsim",
      episode = document.querySelector(
        ".content strong h1.header small"
      )?.textContent,
      timestamps = sezonlukDizi.getTimestamps(
        video.currentTime,
        video.duration
      );

    presenceData.details = showTitle;
    presenceData.state = episode;

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

    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
  } else if (page.includes("/uye/")) {
    const username =
      document.querySelector(".ui.stackable.cards .card .content div.header")
        ?.textContent || "Bilinmeyen Üye";

    presenceData.buttons = [
      {
        label: "Kullanıcıyı Görüntüle",
        url: location.href
      }
    ];

    presenceData.details = "Bir kullanıcıya göz atıyor:";
    presenceData.state = username;
  } else if (pages[page] || pages[page.slice(0, -1)]) {
    presenceData.details = "Bir sayfaya göz atıyor:";
    presenceData.state = pages[page] || pages[page.slice(0, -1)];
  }

  if (Object.keys(presenceData).length > 2)
    sezonlukDizi.setActivity(presenceData);
  else sezonlukDizi.setActivity();
});
