const gain = new Presence({
    clientId: "926450473559547944"
  }),
  gainStrings = gain.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  gainSettings = async () => ({
    showImages: await gain.getSetting<boolean>("showImages"),
    showButtons: await gain.getSetting<boolean>("showButtons")
  }),
  gainPages: { [k: string]: string } = {
    "/": "Ana Sayfa",
    "/guncel": "Güncel İçerikler",
    "/haber": "Haber",
    "/dizi": "Diziler",
    "/film": "Filmler",
    "/program": "Programlar",
    "/belgesel": "Belgeseller",
    "/muzik": "Müzikler",
    "/spor": "Spor",
    "/listelerim": "Listelerim",
    "/profil": "Hesap Bilgilerim",
    "/abonelik-secenekleri": "Abonelik Seçenekleri",
    "/sikca-sorulan-sorular": "Sıkça Sorulan Sorular",
    "/nasil-izlerim": "Nasıl İzlerim?",
    "/kupon-kullan": "Kupon Kullan",
    "/kurumsal-bilgiler": "Kurumsal Bilgiler",
    "/uyelik-kosullari": "Üyelik Koşulları",
    "/on-bilgilendirme-formu": "Ön Bilgilendirme Formu",
    "/cerez-politikasi": "Çerez Politikası",
    "/gizlilik-politikasi": "Gizlilik Politikası",
    "/abonelik-sozlesmesi": "Abonelik Sözleşmesi"
  };

gain.on("UpdateData", async () => {
  const path = document.location.pathname,
    presenceData: PresenceData = {
      largeImageKey: "g-logo",
      startTimestamp: Math.floor(Date.now() / 1000)
    },
    settings = await gainSettings();

  if (path.startsWith("/v/")) {
    const video: HTMLVideoElement = document.querySelector("video"),
      title: HTMLHeadingElement = document.querySelector(
        ".container-fluid .video-details h1"
      ),
      episode: HTMLSpanElement = document.querySelector(
        ".container-fluid .video-details div span.season-and-episode"
      ),
      image: HTMLImageElement = document.querySelector(
        "#video-detail-hero-video-container .video-detail-hero-video.hero-img picture img"
      );

    presenceData.details =
      title?.textContent?.split("-")?.[0] || "Bilinmeyen Dizi";
    presenceData.state = episode?.textContent;

    if (settings.showImages)
      presenceData.largeImageKey = image?.src || "g-logo";

    if (settings.showButtons) {
      presenceData.buttons = [
        {
          label: presenceData.state ? "Bölüme Git" : "Filme Git",
          url: `https://gain.tv${document.location.pathname}`
        }
      ];
    }

    if (!isNaN(video?.duration)) {
      const [, endTimestamp] = gain.getTimestamps(
        Math.floor(video?.currentTime),
        Math.floor(video?.duration)
      );

      presenceData.smallImageKey = video?.paused ? "pause" : "play";
      presenceData.smallImageText = video?.paused
        ? (await gainStrings).pause
        : (await gainStrings).play;

      if (!isNaN(endTimestamp)) presenceData.endTimestamp = endTimestamp;

      if (video?.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }

    gain.setActivity(presenceData);
  } else if (path.startsWith("/t/")) {
    const title: HTMLHeadingElement = document.querySelector(
        ".container-fluid .video-details h1"
      ),
      image: HTMLImageElement = document.querySelector(
        "#video-detail-hero .video-detail-hero-video.hero-img picture img"
      );

    presenceData.details = "Bir içeriğe göz atıyor:";
    presenceData.state = title?.textContent || "Bilinmeyen Dizi";

    if (settings.showImages)
      presenceData.largeImageKey = image?.src || "g-logo";

    gain.setActivity(presenceData);
  } else if (gainPages[path] || gainPages[path.slice(0, -1)]) {
    presenceData.state =
      gainPages[path] || gainPages[path.slice(0, -1)] || "Bilinmeyen Sayfa";

    gain.setActivity(presenceData);
  } else gain.setActivity();
});
