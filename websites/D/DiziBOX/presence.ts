const presence = new Presence({
		clientId: "643788489871196161",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
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
		"/hesap-ayarlari": "Hesap Ayarları",
	},
	video: {
		dataAvailable?: boolean;
		currentTime?: number;
		duration?: number;
		paused?: boolean;
	} = {};

presence.on(
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

presence.on("UpdateData", async () => {
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

			presence.setActivity({
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/D/DiziBOX/assets/logo.png",
				details: "Bir diziye göz atıyor:",
				state:
					showName && showName.textContent !== ""
						? showName.textContent
						: "Belirsiz",
				startTimestamp: Math.floor(Date.now() / 1000),
			});
		} else if (document.location.search.includes("?s=")) {
			presence.setActivity({
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/D/DiziBOX/assets/logo.png",
				details: "Bir dizi arıyor:",
				state:
					document.querySelector(
						"#search > div.title > h1 > span.text-muted"
					) &&
					document.querySelector("#search > div.title > h1 > span.text-muted")
						.textContent
						? document
								.querySelector("#search > div.title > h1 > span.text-muted")
								.textContent.replace("(", "")
								.replace(")", "")
						: null || "Belirsiz",
				smallImageKey: Assets.Search,
				startTimestamp: Math.floor(Date.now() / 1000),
			});
		} else if (page.includes("/author/")) {
			const user = document.querySelector(
				"#main-wrapper > div.content-wrapper > address > div.user-summary > strong"
			);

			presence.setActivity({
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/D/DiziBOX/assets/logo.png",
				details: "Bir üyenin profiline bakıyor:",
				state: user && user.textContent ? user.textContent : "Belirsiz",
				startTimestamp: Math.floor(Date.now() / 1000),
			});
		} else if (pages[page] || pages[page.slice(0, -1)]) {
			presence.setActivity({
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/D/DiziBOX/assets/logo.png",
				details: "Bir sayfaya göz atıyor:",
				state: pages[page] || pages[page.slice(0, -1)],
				startTimestamp: Math.floor(Date.now() / 1000),
			});
		}
	} else if (_video && _video.currentTime) {
		const title = document.querySelector(
				"#main-wrapper > div.content-wrapper > div.title > h1 > span.tv-title-archive > span"
			),
			episode = document.querySelector(
				"#main-wrapper > div.content-wrapper > div.title > h1 > span.tv-title-episode"
			),
			timestamps = presence.getTimestamps(
				Math.floor(_video.currentTime),
				Math.floor(_video.duration)
			),
			presenceData: PresenceData = {
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/D/DiziBOX/assets/logo.png",
				details: title && title.textContent ? title.textContent : "Belirsiz",
				state:
					episode && episode.textContent ? episode.textContent : "Belirsiz",
				smallImageKey: _video.paused ? Assets.Pause : Assets.Play,
				smallImageText: _video.paused
					? (await strings).pause
					: (await strings).play,
			};

		if (!isNaN(timestamps[0]) && !isNaN(timestamps[1]))
			[presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		presence.setActivity(presenceData);
	} else if (isVideoData && video && video.currentTime) {
		const title = document.querySelector(
				"#main-wrapper > div.content-wrapper > div.title > h1 > span.tv-title-archive > span"
			),
			episode = document.querySelector(
				"#main-wrapper > div.content-wrapper > div.title > h1 > span.tv-title-episode"
			),
			timestamps = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			),
			presenceData: PresenceData = {
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/D/DiziBOX/assets/logo.png",
				details: title && title.textContent ? title.textContent : "Belirsiz",
				state:
					episode && episode.textContent ? episode.textContent : "Belirsiz",
				smallImageKey: video.paused ? Assets.Pause : Assets.Play,
				smallImageText: video.paused
					? (await strings).pause
					: (await strings).play,
			};

		if (!isNaN(timestamps[0]) && !isNaN(timestamps[1]))
			[presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		presence.setActivity(presenceData);
	}
});
