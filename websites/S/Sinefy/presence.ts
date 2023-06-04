const presence = new Presence({
		clientId: "817552908991594530",
	}),
	strings = presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
		},
		"tr"
	),
	pages: { [k: string]: string } = {
		"/": "Ana Sayfa",
		"/gozat": "Göz At",
		"/yeni-filmler": "Yeni Filmler",
		"/yeni-filmler/son-eklenen": "Son Eklenen Filmler",
		"/yeni-filmler/imdb-yuksek": "IMDb'si En Yüksek Filmler",
		"/yeni-filmler/imdb-dusuk": "IMDb'si En Düşük Filmler",
		"/dizi-izle": "Yabancı Diziler",
		"/en-iyiler": "En İyiler",
		"/koleksiyon": "Koleksiyonlar",
		"/oyuncular": "Oyuncular",
		"/forum": "Forum",
		"/forum/latest": "Yeni Konular (Forum)",
		"/forum/favorites": "Favorilerim (Forum)",
		"/login": "Giriş Yap",
		"/register": "Kayıt Ol",
		"/istek": "İstek Yap",
		"/profil/ayarlar": "Hesap Ayarları",
		"/app": "Mobil Uygulama",
		"/netflix-filmleri-izle": "Netflix Filmleri",
	};

interface iframeData {
	duration: number;
	currentTime: number;
	paused: boolean;
}

let video: iframeData;
presence.on("iFrameData", (data: iframeData) => {
	if (data) video = data;
});

const startTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
	const page = location.pathname,
		presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/S/Sinefy/assets/logo.jpg",
			startTimestamp,
		},
		settings = {
			buttons: await presence.getSetting<boolean>("buttons"),
		};

	if (page.includes("/izle/")) {
		const episode = document.querySelector(
			".bg-cover-faker h1.page-title span"
		)?.textContent;

		presenceData.details = (
			document.querySelector(".bg-cover-faker a h1.page-title")?.textContent ??
			document.querySelector(".bg-cover-faker h1.page-title a")?.textContent ??
			"Bilinmeyen Dizi/Film"
		).replace(episode, "");
		if (episode) presenceData.state = episode.replace("izle", "");

		if (Object.keys(video ?? {}).length > 0) {
			const [startTimestamp, endTimestamp] = presence.getTimestamps(
				video.currentTime,
				video.duration
			);

			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;

			if (video.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}

			if (settings.buttons) {
				presenceData.buttons = [
					{
						label: "Filmi/Diziyi İzle",
						url: location.href,
					},
				];
			}

			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = video.paused
				? (await strings).pause
				: (await strings).play;
		}

		presence.setActivity(presenceData);
	} else if (page.includes("/gozat/")) {
		presenceData.details = "Bir kategoriye göz atıyor:";
		presenceData.state =
			document.querySelector(".bg-cover-faker h1.page-title")?.textContent ??
			"Bilinmeyen Kategori";

		presence.setActivity(presenceData);
	} else if (page.includes("/profil/")) {
		presenceData.details = "Bir kullanıcıya göz atıyor:";
		presenceData.state =
			document.querySelector(".generic-box h2.title-secondary a")
				?.textContent ?? "Bilinmeyen Kullanıcı";

		if (settings.buttons === true) {
			presenceData.buttons = [
				{
					label: "Kullanıcıyı Görüntüle",
					url: location.href,
				},
			];
		}

		presence.setActivity(presenceData);
	} else if (page.includes("/oyuncu/")) {
		presenceData.details = "Bir oyuncuya göz atıyor:";
		presenceData.state =
			document.querySelector(".bg-cover-faker h1.page-title")?.textContent ??
			"Bilinmeyen Kategori";

		if (settings.buttons === true) {
			presenceData.buttons = [
				{
					label: "Oyuncuyu Görüntüle",
					url: location.href,
				},
			];
		}

		presence.setActivity(presenceData);
	} else if (page.includes("/forum/")) {
		presenceData.details = "Forum gönderisi:";
		presenceData.state =
			document.querySelector(".story-detail .story-header h1.title-primary")
				?.textContent ?? "Bilinmeyen Kategori";

		if (settings.buttons === true) {
			presenceData.buttons = [
				{
					label: "Gönderiyi Görüntüle",
					url: location.href,
				},
			];
		}

		presence.setActivity(presenceData);
	} else if (pages[page] || pages[page.slice(0, -1)]) {
		presenceData.details = "Bir sayfaya göz atıyor:";
		presenceData.state = pages[page] ?? pages[page.slice(0, -1)];

		presence.setActivity(presenceData);
	} else presence.setActivity();
});
