const yabancidizi = new Presence({
    clientId: "643593006821408778"
  }),
  strings = yabancidizi.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  pages: { [k: string]: string } = {
    "/": "Ana Sayfa",
    "/vip": "Ana Sayfa",
    "/kesfet": "Keşfet",
    "/kesfet/eyJjb250ZW50IjoiMSJ9": "Keşfet (Film)",
    "/trend": "Trendler",
    "/takvim": "Dizi Takvimi",
    "/dizi-izle": "TV Dizileri",
    "/forum": "Forum",
    "/koleksiyon": "Koleksiyon",
    "/birlikte-izle": "Birlikte İzle",
    "/profil/ayarlar": "Hesap Ayarları"
  };
let video: {
  dataAvailable?: boolean;
  currentTime?: number;
  duration?: number;
  paused?: boolean;
} = {};

yabancidizi.on(
  "iFrameData",
  (data: {
    error?: boolean;
    currentTime: number;
    duration: number;
    paused: boolean;
  }) => {
    if (!data.error) video = { ...data, dataAvailable: true };
  }
);

yabancidizi.on("UpdateData", async () => {
  const page = document.location.pathname,
    _video = document.querySelector("video") as HTMLVideoElement,
    isVideoData = Object.keys(video).length > 0 ? true : false,
    categoryTitle = document.querySelector(
      "#router-view > div.ui.grid.mb-0 > div.left.floated.sixteen.wide.tablet.twelve.wide.computer.column.pb-0 > h1"
    ),
    categoryTitle2 = document.querySelector(
      "#router-view > div.ui.grid.mb-0 > div.left.floated.sixteen.wide.tablet.ten.wide.computer.column.pb-0 > h1"
    ),
    showName = document.querySelector(
      "#router-view > div.bg-cover-faker > div.ui.grid > div.left.floated.sixteen.wide.tablet.nine.wide.computer.column > a > h1"
    ),
    movieTitle = document.querySelector(
      "#router-view > div.bg-cover-faker > div:nth-child(3) > div.left.floated.sixteen.wide.tablet.eight.wide.computer.column > a > h1"
    ),
    userName = document.querySelector(
      "#router-view > section > div.ui.grid > div.left.floated.sixteen.wide.tablet.four.wide.computer.column > div > section:nth-child(1) > h2 > a"
    );

  if (!isVideoData && !_video) {
    if (page.includes("/kesfet")) {
      yabancidizi.setActivity({
        largeImageKey: "yd-logo",
        details: "Bir sayfaya göz atıyor:",
        state: "Keşfet",
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    } else if (page.includes("/oyuncu/")) {
      const actorName = document.querySelector(
        "#router-view > div > div.profile-header > div.heading-user-title > h1"
      );

      yabancidizi.setActivity({
        largeImageKey: "yd-logo",
        details: "Bir aktöre göz atıyor:",
        state: actorName ? actorName.textContent.trim() : "Belirsiz",
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    } else if (
      page.includes("/film/tur/") &&
      categoryTitle &&
      categoryTitle.textContent !== ""
    ) {
      yabancidizi.setActivity({
        largeImageKey: "yd-logo",
        details: "Bir kategoriye göz atıyor:",
        state: categoryTitle.textContent,
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    } else if (
      page.includes("/dizi/tur") &&
      categoryTitle &&
      categoryTitle.textContent !== ""
    ) {
      yabancidizi.setActivity({
        largeImageKey: "yd-logo",
        details: "Bir kategoriye göz atıyor:",
        state: categoryTitle.textContent,
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    } else if (
      page.includes("/film-izle") &&
      categoryTitle2 &&
      categoryTitle2.textContent !== ""
    ) {
      yabancidizi.setActivity({
        largeImageKey: "yd-logo",
        details: "Bir kategoriye göz atıyor:",
        state: categoryTitle2.textContent,
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    } else if (
      page.includes("/dizi/") &&
      showName &&
      showName.textContent !== ""
    ) {
      yabancidizi.setActivity({
        largeImageKey: "yd-logo",
        details: "Bir diziye göz atıyor:",
        state: showName.textContent,
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    } else if (
      page.includes("/profil/") &&
      userName &&
      userName.textContent !== ""
    ) {
      yabancidizi.setActivity({
        largeImageKey: "yd-logo",
        details: "Bir profile göz atıyor:",
        state: userName.textContent,
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    } else if (pages[page] || pages[page.slice(0, -1)]) {
      yabancidizi.setActivity({
        largeImageKey: "yd-logo",
        details: "Bir sayfaya göz atıyor:",
        state: pages[page] || pages[page.slice(0, -1)],
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    }
  } else if (_video && !isNaN(_video.currentTime)) {
    const title = document.querySelector(
        "#router-view > div.bg-cover-faker > div.ui.grid.mt-0 > div > h1 > a"
      ),
      episode = document.querySelector(
        "#router-view > div.bg-cover-faker > div.ui.grid.mt-0 > div > h1 > span"
      );

    if (page.includes("/film") && movieTitle && movieTitle.textContent !== "") {
      const [startTimestamp, endTimestamp] = yabancidizi.getTimestamps(
          Math.floor(_video.currentTime),
          Math.floor(_video.duration)
        ),
        data: PresenceData = {
          largeImageKey: "yd-logo",
          details: "Bir film izliyor:",
          state: movieTitle.textContent,
          smallImageKey: _video.paused ? "pause" : "play",
          smallImageText: _video.paused
            ? (await strings).pause
            : (await strings).play
        };

      if (!isNaN(startTimestamp) && !isNaN(endTimestamp)) {
        data.startTimestamp = startTimestamp;
        data.endTimestamp = endTimestamp;
      }
      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      yabancidizi.setTrayTitle(video.paused ? "" : `${movieTitle.textContent}`);
      yabancidizi.setActivity(data);
    } else if (
      page.includes("/dizi/") &&
      title &&
      episode &&
      title.textContent !== "" &&
      episode.textContent !== ""
    ) {
      const [startTimestamp, endTimestamp] = yabancidizi.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        ),
        data: PresenceData = {
          largeImageKey: "yd-logo",
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

      yabancidizi.setTrayTitle(
        video.paused ? "" : `${title.textContent} - ${episode.textContent}`
      );
      yabancidizi.setActivity(data);
    }
  } else if (isVideoData && video && !isNaN(video.duration)) {
    const showName2 = document.querySelector(
        "#router-view > div.bg-cover-faker > div.ui.grid.mt-0 > div > h1 > a"
      ),
      episode = document.querySelector(
        "#router-view > div.bg-cover-faker > div.ui.grid.mt-0 > div > h1 > span"
      );

    if (
      page.includes("/film/") &&
      movieTitle &&
      movieTitle.textContent !== ""
    ) {
      const [startTimestamp, endTimestamp] = yabancidizi.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        ),
        data: PresenceData = {
          largeImageKey: "yd-logo",
          details: "Bir film izliyor:",
          state: movieTitle.textContent,
          smallImageKey: video.paused ? "pause" : "play",
          smallImageText: video.paused
            ? (await strings).pause
            : (await strings).play
        };

      if (!isNaN(startTimestamp) && !isNaN(endTimestamp)) {
        data.startTimestamp = startTimestamp;
        data.endTimestamp = endTimestamp;
      }
      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      yabancidizi.setTrayTitle(video.paused ? "" : `${movieTitle.textContent}`);
      yabancidizi.setActivity(data);
    } else if (
      page.includes("/dizi/") &&
      showName2 &&
      showName2.textContent !== "" &&
      episode &&
      episode.textContent !== ""
    ) {
      const [startTimestamp, endTimestamp] = yabancidizi.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        ),
        data: PresenceData = {
          largeImageKey: "yd-logo",
          details: showName2.textContent,
          state: episode.textContent,
          smallImageKey: video.paused ? "pause" : "play",
          smallImageText: video.paused
            ? (await strings).pause
            : (await strings).play
        };

      if (!isNaN(startTimestamp) && !isNaN(endTimestamp)) {
        data.startTimestamp = startTimestamp;
        data.endTimestamp = endTimestamp;
      }
      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }

      yabancidizi.setTrayTitle(
        video.paused ? "" : `${showName2.textContent} - ${episode.textContent}`
      );
      yabancidizi.setActivity(data);
    }
  } else {
    yabancidizi.setActivity({
      largeImageKey: "yd-logo",
      details: "Bir sayfaya göz atıyor:",
      state: "Bilinmeyen Sayfa",
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  }
});
