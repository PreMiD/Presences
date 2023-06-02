const gain = new Presence({
		clientId: "926450473559547944",
	}),
	gainStrings = gain.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	gainSettings = async () => ({
		showImages: await gain.getSetting<boolean>("showImages"),
		showButtons: await gain.getSetting<boolean>("showButtons"),
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
		"/abonelik-sozlesmesi": "Abonelik Sözleşmesi",
	};

gain.on("UpdateData", async () => {
	const path = document.location.pathname,
		presenceData: PresenceData = {
			largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/G/GAIN/assets/logo.jpg",
			startTimestamp: Math.floor(Date.now() / 1000),
		},
		settings = await gainSettings();

	if (path.startsWith("/v/")) {
		const video = document.querySelector<HTMLVideoElement>("video");

		presenceData.details =
			document
				.querySelector<HTMLHeadingElement>(".container-fluid .video-details h1")
				?.textContent?.split("-")?.[0] || "Bilinmeyen Dizi";
		presenceData.state = document.querySelector<HTMLSpanElement>(
			".container-fluid .video-details div span.season-and-episode"
		)?.textContent;

		if (settings.showImages) {
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>(
					"#video-detail-hero-video-container .video-detail-hero-video.hero-img picture img"
				)?.src || "g-logo";
		}

		if (settings.showButtons) {
			presenceData.buttons = [
				{
					label: presenceData.state ? "Bölüme Git" : "Filme Git",
					url: `https://gain.tv${document.location.pathname}`,
				},
			];
		}

		if (!isNaN(video?.duration)) {
			const [, endTimestamp] = gain.getTimestamps(
				Math.floor(video?.currentTime),
				Math.floor(video?.duration)
			);

			presenceData.smallImageKey = video?.paused ? Assets.Pause : Assets.Play;
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
		presenceData.details = "Bir içeriğe göz atıyor:";
		presenceData.state =
			document.querySelector<HTMLHeadingElement>(
				".container-fluid .video-details h1"
			)?.textContent || "Bilinmeyen Dizi";

		if (settings.showImages) {
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>(
					"#video-detail-hero .video-detail-hero-video.hero-img picture img"
				)?.src || "g-logo";
		}

		gain.setActivity(presenceData);
	} else if (gainPages[path] || gainPages[path.slice(0, -1)]) {
		presenceData.state =
			gainPages[path] || gainPages[path.slice(0, -1)] || "Bilinmeyen Sayfa";

		gain.setActivity(presenceData);
	} else gain.setActivity();
});
