const presence = new Presence({
		clientId: "769651625379102761",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	kitapPages: { [k: string]: string } = {
		"/": "Ana Sayfa",
		"/movies.html": "Sesli Kitaplar",
		"/all-movies.html": "Tüm Sesli Kitaplar",
		"/az.html": "Sesli Kitap Arşivi",
		"/yazarlar": "Yazarlar",
		"/page/sss": "Sıkça Sorulan Sorular",
		"/contact-us.html": "İletişim",
		"/istek": "İstek & Öneri",
		"/user/login": "Giriş Yap",
		"/user/profile": "Profil",
		"/my-account/profile": "Profil",
		"/my-account/favorite": "Dinlediklerim",
		"/my-account/watch-later": "Dinlenecekler",
		"/my-account/update": "Profili Düzenle",
		"/my-account/change-password": "Şifre Değiştir",
	};

presence.on("UpdateData", async () => {
	const page = document.location.pathname;

	if (page.includes("/genre/")) {
		let genre =
			document.querySelector(".page-title > h1")?.textContent ||
			"Bilinmeyen Tür";

		genre = genre
			.split(": ")
			.slice(1)
			.join("")
			.split("-")
			.map(
				text =>
					text[0]?.toUpperCase() + text.slice(1, text.length)?.toLowerCase()
			)
			.join(" ");

		presence.setActivity({
			largeImageKey: "https://i.imgur.com/vVYzTFE.png",
			details: "Bir türü inceliyor:",
			state: genre || "Bilinmeyen Tür",
			startTimestamp: Date.now(),
		});
	} else if (page.includes("/az-list/")) {
		const letter = page.split("/")?.[page.split("/").length - 1]?.toUpperCase();

		presence.setActivity({
			largeImageKey: "https://i.imgur.com/vVYzTFE.png",
			details: "Arşivi inceliyor:",
			state: letter ? `Harf: ${letter}` : "Bilinmeyen Harf",
			smallImageKey: "search",
			startTimestamp: Date.now(),
		});
	} else if (page.includes("/search")) {
		presence.setActivity({
			largeImageKey: "https://i.imgur.com/vVYzTFE.png",
			details: "Bir şey arıyor:",
			state:
				document.title.replace(" - Kitapların Dili", "") || "Bilinmeyen Terim",
			smallImageKey: "search",
			startTimestamp: Date.now(),
		});
	} else if (page.includes("/country/")) {
		presence.setActivity({
			largeImageKey: "https://i.imgur.com/vVYzTFE.png",
			details: "Bir dili inceliyor:",
			state:
				document
					.querySelector(".breadcrumb > .active")
					?.textContent?.split(" ")
					?.map(
						text =>
							text[0]?.toUpperCase() + text.slice(1, text.length)?.toLowerCase()
					)
					?.join(" ") || "Bilinmeyen Dil",
			smallImageKey: "search",
			startTimestamp: Date.now(),
		});
	} else if (page.includes("/star/")) {
		presence.setActivity({
			largeImageKey: "https://i.imgur.com/vVYzTFE.png",
			details: "Bir yazarı inceliyor:",
			state:
				document.querySelector(".page-title > font")?.textContent?.trim() ||
				"Bilinmeyen Yazar",
			startTimestamp: Date.now(),
		});
	} else if (page.includes("/watch/")) {
		const bookName =
				document.querySelector(".pull-left.title")?.textContent ||
				"Bilinmeyen Kitap",
			video: HTMLVideoElement = document.querySelector("video.vjs-tech");

		if (!video) {
			return presence.setActivity({
				largeImageKey: "https://i.imgur.com/vVYzTFE.png",
				details: bookName,
				smallImageKey: "question",
				smallImageText: "Video verisi alınamıyor",
			});
		}

		const timestamps = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			),
			presenceData: PresenceData = {
				largeImageKey: "https://i.imgur.com/vVYzTFE.png",
				details: bookName,
				smallImageKey: video.paused ? "pause" : "play",
				smallImageText: video.paused
					? (await strings).pause
					: (await strings).play,
				startTimestamp: timestamps[0],
				endTimestamp: timestamps[1],
			};

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		presence.setActivity(presenceData);
	} else if (
		kitapPages[page] ||
		kitapPages[page.slice(0, -1)] ||
		kitapPages[page.replace(".html", "")]
	) {
		presence.setActivity({
			largeImageKey: "https://i.imgur.com/vVYzTFE.png",
			details: "Bir sayfaya göz atıyor:",
			state:
				kitapPages[page] ||
				kitapPages[page.slice(0, -1)] ||
				kitapPages[page.replace(".html", "")] ||
				"Bilinmeyen Sayfa",
			startTimestamp: Date.now(),
		});
	} else {
		presence.setActivity({
			largeImageKey: "https://i.imgur.com/vVYzTFE.png",
			details: "Bir sayfaya göz atıyor:",
			state: "Ana Sayfa",
			startTimestamp: Date.now(),
		});
	}
});
