const presence = new Presence({
    clientId: "747190301676011550"
  }),
  strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  }),
  startTimestamp = Math.floor(Date.now() / 1000);

let video: HTMLVideoElement;

presence.on("iFrameData", async (msg: HTMLVideoElement) => {
  if (!msg) return;
  video = msg;
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "animewho",
      details: "Ana Sayfada Anime Arıyor",
      startTimestamp
    },
    title = document.querySelector("head > title"),
    anime = title.textContent
      .replace("Türkçe İzle - AnimeWho? Anime", "")
      .replace("Türkçe Oku - AnimeWho? Manga", "")
      .replace("AnimeWho?", "")
      .replace(" Türkçe İzle ve İndir", "");
  presenceData.details = anime;
  if (document.location.pathname === "/") {
    presenceData.details = "Ana Sayfada";
    presenceData.state = "Anime & Manga Arıyor";
  } else if (new RegExp("izle/[a-zA-Z0_9]+").test(document.location.pathname)) {
    const bolum = document.querySelector(
      "div.MuiBox-root > button.MuiButton-outlinedSecondary > span.MuiButton-label"
    );
    presenceData.state = `${bolum.innerHTML}'ü İzliyor`;
  } else if (new RegExp("oku/[0-9]+/[0-9]+").test(document.location.pathname)) {
    const readType = document.querySelector(
        "div.MuiGrid-root > div.MuiBox-root > button.MuiButtonBase-root > span.MuiButton-label"
      ),
      arr = document.location.pathname.split("/");
    presenceData.state = `${arr[5]}.Bölüm`;
    if (readType && readType.innerHTML.includes("Webtoon"))
      presenceData.state = `${arr[5]}.Bölüm ${arr[6]}.Sayfa`;
  } else if (
    document.location.pathname.includes("/izle") ||
    document.location.pathname.includes("/oku")
  )
    presenceData.state = "Bölüm Seçiyor";
  else if (new RegExp("ceviriler/anime").test(document.location.pathname))
    presenceData.state = "Göz Gezdiriyor";
  else if (document.location.pathname.includes("/ekip-alimlari")) {
    presenceData.details = "Ekip Alımları";
    presenceData.state = "Potansiyel Ekip Üyesi";
  } else if (document.location.pathname.includes("/ara")) {
    const tur = document.querySelector(
      "div.MuiGrid-root > div.MuiBox-root > button.MuiButton-outlinedPrimary > span.MuiButton-label"
    );
    if (tur.innerHTML === "Anime")
      presenceData.state = "Ne İzlesem Diye Bakıyor";
    else presenceData.state = "Ne Okusam Diye Bakıyor";
  } else if (document.location.pathname.includes("/destek-ol")) {
    presenceData.details = "Destek Ol";
    presenceData.state = "Acaba? Bir İhtimal?";
  } else if (document.location.pathname.includes("/sss")) {
    presenceData.details = "Sıkça Sorulan Sorular";
    presenceData.state = "Sorunlarına Çözüm Arıyor";
  }

  if (video) {
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).paused
      : (await strings).playing;

    if (!video.paused && video.duration) {
      [presenceData.startTimestamp, presenceData.endTimestamp] =
        presence.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        );
    }
  }

  presence.setActivity(presenceData);
});
