const dizibox = new Presence({
    clientId: "643788489871196161"
  }),
  strings = dizibox.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  pages: { [k: string]: string } = {
    "/": "Ana Sayfa",
    "/arsiv": "Dizi Arşivi",
    "/diziler": "Dizi Arşivi",
    "/dizi-takvimi": "Dizi Takvimi",
    "/iletisim": "İletişim",
    "/efsane-diziler": "Efsane Diziler",
    "/tum-bolumler": "Tüm Bölümler",
    "/favorilerim": "Favorilerim",
    "/izlediklerim": "İzlediklerim",
    "/izleyeceklerim": "İzleyeceklerim",
    "/yorumlarim": "Yorumlarım",
    "/hesap-ayarlari": "Hesap Ayarları"
  },
  video: {
    dataAvailable?: boolean;
    currentTime?: number;
    duration?: number;
    paused?: boolean;
  } = {};

dizibox.on(
  "iFrameData",
  (data: {
    error?: boolean;
    currentTime: number;
    duration: number;
    paused: boolean;
  }) => {
    if (!data.error) {
      video.dataAvailable = true;
      video.currentTime = data.currentTime;
      video.duration = data.duration;
      video.paused = data.paused;
    }
  }
);

dizibox.on("UpdateData", async () => {
  const page = document.location.pathname,
    isVideoData = Object.keys(video).length > 0 ? true : false,
    _video = document.querySelector("video");

  if (!_video && !isVideoData) {
    if (
      (page.includes("/diziler/") &&
        document.location.pathname !== "/diziler/") ||
      (page.includes("/diziler") && document.location.pathname !== "/diziler")
    ) {
      const showName = document.querySelector(
        "#single-diziler > div.tv-overview.bg-dark > div.title-terms > h1 > a"
      );

      dizibox.setActivity({
        largeImageKey: "db-logo",
        details: "Bir diziye göz atıyor:",
        state:
          showName && showName.textContent !== ""
            ? showName.textContent
            : "Belirsiz",
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    } else if (document.location.search.includes("?s=")) {
      const searchingFor =
        document.querySelector("#search > div.title > h1 > span.text-muted") &&
        document.querySelector("#search > div.title > h1 > span.text-muted")
          .textContent
          ? document
              .querySelector("#search > div.title > h1 > span.text-muted")
              .textContent.replace("(", "")
              .replace(")", "")
          : null;

      dizibox.setActivity({
        largeImageKey: "db-logo",
        details: "Bir dizi arıyor:",
        state: searchingFor || "Belirsiz",
        smallImageKey: "search",
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    } else if (page.includes("/author/")) {
      const user = document.querySelector(
        "#main-wrapper > div.content-wrapper > address > div.user-summary > strong"
      );

      dizibox.setActivity({
        largeImageKey: "db-logo",
        details: "Bir üyenin profiline bakıyor:",
        state: user && user.textContent ? user.textContent : "Belirsiz",
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    } else if (pages[page] || pages[page.slice(0, -1)]) {
      dizibox.setActivity({
        largeImageKey: "db-logo",
        details: "Bir sayfaya göz atıyor:",
        state: pages[page] || pages[page.slice(0, -1)],
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    }
  } else {
    if (_video && _video.currentTime) {
      const title = document.querySelector(
          "#main-wrapper > div.content-wrapper > div.title > h1 > span.tv-title-archive > span"
        ),
        episode = document.querySelector(
          "#main-wrapper > div.content-wrapper > div.title > h1 > span.tv-title-episode"
        ),
        timestamps = dizibox.getTimestamps(
          Math.floor(_video.currentTime),
          Math.floor(_video.duration)
        ),
        data: PresenceData = {
          largeImageKey: "db-logo",
          details: title && title.textContent ? title.textContent : "Belirsiz",
          state:
            episode && episode.textContent ? episode.textContent : "Belirsiz",
          smallImageKey: _video.paused ? "pause" : "play",
          smallImageText: _video.paused
            ? (await strings).pause
            : (await strings).play
        };

      if (!isNaN(timestamps[0]) && !isNaN(timestamps[1]))
        [data.startTimestamp, data.endTimestamp] = timestamps;

      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      dizibox.setTrayTitle(
        _video.paused
          ? ""
          : `${title && title.textContent ? title.textContent : "Belirsiz"} - ${
              episode && episode.textContent ? episode.textContent : "Belirsiz"
            }`
      );
      dizibox.setActivity(data);
    } else if (isVideoData && video && video.currentTime) {
      const title = document.querySelector(
          "#main-wrapper > div.content-wrapper > div.title > h1 > span.tv-title-archive > span"
        ),
        episode = document.querySelector(
          "#main-wrapper > div.content-wrapper > div.title > h1 > span.tv-title-episode"
        ),
        timestamps = dizibox.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        ),
        data: PresenceData = {
          largeImageKey: "db-logo",
          details: title && title.textContent ? title.textContent : "Belirsiz",
          state:
            episode && episode.textContent ? episode.textContent : "Belirsiz",
          smallImageKey: video.paused ? "pause" : "play",
          smallImageText: video.paused
            ? (await strings).pause
            : (await strings).play
        };

      if (!isNaN(timestamps[0]) && !isNaN(timestamps[1]))
        [data.startTimestamp, data.endTimestamp] = timestamps;

      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      dizibox.setTrayTitle(
        video.paused
          ? ""
          : `${title && title.textContent ? title.textContent : "Belirsiz"} - ${
              episode && episode.textContent ? episode.textContent : "Belirsiz"
            }`
      );
      dizibox.setActivity(data);
    }
  }
});
