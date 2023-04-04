const presence = new Presence({
		clientId: "634816982843129857",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	pages: {
		[name: string]: string;
	} = {
		"/film-arsivi": "Film Arşivi",
		"/en-cok-izlenen-filmler": "En Çok İzlenen Filmler",
		"/boxset-filmler": "Seri Filmleri",
		"/oyuncular": "Oyuncular",
		"/yonetmenler": "Yönetmenler",
		"/altyazili-film-izle": "Alt Yazılı Filmler",
		"/turkce-dublaj-izle": "Türkçe Dublajlı Filmler",
		"/giris-yap": "Giriş Yap",
		"/kayit-ol": "Kayıt Ol",
		"/iletisim": "İletişim",
	},
	browsingTimetsamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/JV9Ef1p.png",
			startTimestamp: browsingTimetsamp,
		},
		page = document.location.pathname,
		title = document.querySelector(
			"body > div.watch-page > div:nth-child(1) > div > div.col-md-7.col-xs-12.titles > h1"
		) as HTMLElement,
		video = document.querySelector("video") as HTMLVideoElement;

	if (pages[page] || pages[page.slice(0, -1)]) {
		presenceData.details = "Bir sayfaya göz atıyor:";
		presenceData.state = pages[page] || pages[page.slice(0, -1)];
	} else if (page.includes("/liste/")) {
		const listName = document.querySelector(
			"body > main > div.row.category-head > div > h2"
		) as HTMLElement;

		presenceData.details = "Bir listeye göz atıyor:";
		presenceData.state =
			listName && listName.textContent !== ""
				? listName.textContent
				: "Belirsiz";
	} else if (page.includes("/film-ara")) {
		const searching = document.querySelector(
				"body > main > div.row.category-head > div > h2"
			) as HTMLElement,
			fixedSearching =
				searching && searching.textContent !== ""
					? searching.textContent.replaceAll('"', "").replace(" Sonuçları", "")
					: "Belirsiz";

		presenceData.details = "Bir şey arıyor:";
		presenceData.state =
			fixedSearching !== "Belirsiz"
				? fixedSearching[0].toUpperCase() + fixedSearching.slice(1)
				: "Belirsiz";
		presenceData.smallImageKey = "search";
	} else if (page.includes("/kategori/")) {
		const categoryName = document.querySelector(
			"body > main > div.row.category-head > div:nth-child(1) > h2"
		) as HTMLElement;

		presenceData.details = "Bir kategoriyi inceliyor";
		presenceData.state =
			categoryName && categoryName.textContent !== ""
				? categoryName.textContent
				: "Belirsiz";
	} else if (title && title.textContent !== "" && !video) {
		presenceData.details = "Bir filmi inceliyor:";
		presenceData.state = title.textContent;
	} else if (title && title.textContent !== "" && video) {
		presenceData.details = "Bir film izliyor:";
		presenceData.state = title.textContent;
		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused
			? (await strings).pause
			: (await strings).play;
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		presence.setActivity();
	} else {
		presenceData.details = "Bir sayfaya göz atıyor:";
		presenceData.state = "Ana Sayfa";
	}
	presence.setActivity(presenceData);
});
