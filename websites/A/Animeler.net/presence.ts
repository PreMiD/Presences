const presence = new Presence({
		clientId: "967799918100111364"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		startTimestamp: browsingTimestamp,
		largeImageKey: "https://i.imgur.com/9JPsUmz.png"
	};

	let headline = "";
	const headlineElement = document.querySelector(".content-title a");

	if (headlineElement) headline = headlineElement.textContent;

	const prefixMap = {
			create: "Yeni İçerik Oluşturuyor",
			"anime-anketleri": "Anime Anketleri",
			galeri: "Galeri",
			"anime-inceleme": "Anime İnceleme",
			"light-novel": "Light Novel",
			novel: "Novel",
			"anime-fansublari": "Anime Fansubları",
			"anime-tanitim": "Anime Tanıtım",
			"drama-galerileri": "Drama Galerileri",
			"manga-inceleme": "Manga İnceleme",
			"drama-haberleri": "Drama Haberleri",
			"live-action": "Live Action",
			haber: "Haber",
			"anime-haberleri": "Anime Haberleri",
			haberler: "Haberler",
			"anime-galerileri": "Anime Galerileri",
			galeriler: "Galeriler",
			testler: "Testler",
			test: "Testler",
			admin: "Yetkili Panelde",
			"": "Anasayfada",
			cosplay: "Cosplay",
			"oyun-haberleri": "Oyun Haberleri",
			japonya: "Japonya",
			videolar: "Videolar",
			video: "Video",
			"cosplay-roportajlar": "Cosplay Röportajlar",
			"manga-galerileri": "Manga Galerileri",
			anketler: "Anketler"
		} as { [key: string]: string },
		parts = document.location.pathname.split("/"),
		desc = prefixMap[parts[1]];

	if (parts[1] == "profile")
		presenceData.details = `${parts[2]} Kişisinin Profile Bakıyor.`;

	if (desc) {
		presenceData.details = desc;
		presenceData.state = headline;
	}

	if (presenceData.details) {
		presenceData.buttons = [
			{
				label: "Sayfaya git",
				url: document.location.href.toString()
			} as ButtonData
		];

		presence.setActivity(presenceData);
	} else presence.setActivity();
});
