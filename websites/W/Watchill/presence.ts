const presence = new Presence({
		clientId: "646716119289298984",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	pages: { [page: string]: string } = {
		"/": "Ana Sayfa",
		"/login": "Giriş Yap",
		"/series": "Diziler",
		"/movies": "Filmler",
		"/register": "Kayıt Ol",
		"/collections": "Listeler",
		"/timeline": "Akış",
		"/profile": "Profilim",
	};

presence.on("UpdateData", async () => {
	const page = document.location.pathname,
		video = document.querySelector("video") as HTMLVideoElement,
		showTitle = document.querySelector(
			"body > div.wrapper > div.fw.movieDetailAll > div.container > div > div > div.movieDetailRightCol > div > div.fw.movieDetailTitle > h1"
		),
		username = document.querySelector("#profile_fullname");

	if (page.includes("/show/") && showTitle && showTitle.textContent !== "") {
		presence.setActivity({
			largeImageKey: "https://i.imgur.com/XGGf0Xq.png",
			details: "Bir diziyi inceliyor:",
			state: showTitle.textContent || "Bilinmeyen",
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	} else if (
		page.includes("/user/") &&
		username &&
		username.textContent !== ""
	) {
		presence.setActivity({
			largeImageKey: "https://i.imgur.com/XGGf0Xq.png",
			details: "Bir üyenin profiline bakıyor:",
			state: username.textContent.trim() || "Bilinmeyen",
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	} else if (page.includes("/search/")) {
		presence.setActivity({
			largeImageKey: "https://i.imgur.com/XGGf0Xq.png",
			details: "Bir şey arıyor:",
			state:
				decodeURI(page.replace("/search/", ""))
					.split(" ")
					.map(i => i[0].toUpperCase() + i.slice(1).toLowerCase())
					.join(" ") || "Bilinmeyen",
			startTimestamp: Math.floor(Date.now() / 1000),
			smallImageKey: "search",
		});
	} else if (page.includes("/category/")) {
		const categoryName = document.querySelector(
			"body > div.wrapper > div.container.st > div > div.top_right_arsiv > h5"
		);

		presence.setActivity({
			largeImageKey: "https://i.imgur.com/XGGf0Xq.png",
			details: "Bir kategoriye göz atıyor:",
			state:
				categoryName && categoryName.textContent !== ""
					? categoryName.textContent.replace("Dizileri", "")
					: "Bilinmeyen",
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	} else if (page.includes("/movie/") && video) {
		const title = document.querySelector(
				"body > div.wrapper > div:nth-child(4) > div > div:nth-child(1) > div.col-md-9 > h2"
			),
			IMDb = document.querySelector(
				"body > div.wrapper > div:nth-child(4) > div > div:nth-child(3) > div:nth-child(1) > button > span"
			),
			[startTimestamp, endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			),
			presenceData: PresenceData = {
				largeImageKey: "https://i.imgur.com/XGGf0Xq.png",
				details:
					title && title.textContent !== "" ? title.textContent : "Bilinmeyen",
				state: `IMDb: ${
					IMDb && IMDb.textContent !== "" ? IMDb.textContent : "Bilinmiyor"
				}`,
				smallImageKey: video.paused ? "pause" : "play",
				smallImageText: video.paused
					? (await strings).pause
					: (await strings).play,
			};

		if (!isNaN(startTimestamp) && !isNaN(endTimestamp)) {
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;
		}
		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		presence.setActivity(presenceData);
	} else if (page.includes("/watch/") && video) {
		const showName =
				document.querySelector(
					"#mep_0 > div > div.mejs__layers > div.mejs__currentlayer-layer > div > h1"
				) ||
				document.querySelector(
					"body > div.wrapper > div.fw.playBotAll > div > div > div.playTopInfo > ul > li.title"
				),
			episode =
				document.querySelector(
					"#mep_0 > div > div.mejs__layers > div.mejs__currentlayer-layer > div > h3"
				) ||
				document.querySelector(
					"body > div.wrapper > div.fw.playBotAll > div > div > div.playTopInfo > ul > li.desc"
				),
			[startTimestamp, endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			),
			data: { [k: string]: string | number } = {
				largeImageKey: "https://i.imgur.com/XGGf0Xq.png",
				details:
					showName && showName.textContent !== ""
						? showName.textContent.trim()
						: "Bilinmeyen",
				state:
					episode && episode.textContent !== ""
						? episode.textContent.trim()
						: "Bilinmeyen",
				smallImageKey: video.paused ? "pause" : "play",
				smallImageText: video.paused
					? (await strings).pause
					: (await strings).play,
			};

		if (!isNaN(startTimestamp) && !isNaN(endTimestamp)) {
			data.startTimestamp = startTimestamp;
			data.endTimestamp = endTimestamp;
		}
		if (video.paused) {
			delete data.startTimestamp;
			delete data.endTimestamp;
		}

		presence.setActivity(data);
	} else if (pages[page] || pages[page.slice(0, -1)]) {
		presence.setActivity({
			largeImageKey: "https://i.imgur.com/XGGf0Xq.png",
			details: "Bir sayfaya göz atıyor:",
			state: pages[page] || pages[page.slice(0, -1)],
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	} else {
		presence.setActivity({
			largeImageKey: "https://i.imgur.com/XGGf0Xq.png",
			details: "Bir sayafaya göz atıyor:",
			state: "Ana Sayfa",
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	}
});
