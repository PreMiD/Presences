const presence = new Presence({
		clientId: "635199664290922512",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	pages: {
		[name: string]: string;
	} = {
		"/": "Ana Sayfa",
		"/uyeler": "Üyeler",
		"/yabanci-dizi-takvimi": "Dizi Takvimi",
		"/forum": "Forum",
		"/basvuru": "Çevirmenlik",
		"/iletisim": "İletişim",
		"/sifre_sifirla": "Şifre Sıfırla",
		"/mesajlar": "Özel Mesajlar",
		"/oyuncular": "Oyuncular",
		"/pano": "Pano",
		"/pano/sosyal-akis": "Sosyal Akış",
		"/pano/takip-ettiklerim": "Takip Ettiklerim",
		"/pano/izleme-listesi": "İzleme Listesi",
		"/pano/son-izlediklerim": "Son İzlediklerim",
	};

let video: Video;

interface Video extends HTMLVideoElement {
	dataAvailable: boolean;
}

presence.on("iFrameData", (data: Video) => {
	if (!data.error) {
		video = data;
		video.dataAvailable = true;
	}
});

presence.on("UpdateData", async () => {
	const page = document.location.pathname,
		_video = document.querySelector("video") as HTMLVideoElement,
		isVideoData = Object.keys(video).length > 0 ? true : false,
		showTitle = document.querySelector(
			"#container > div.content > div.right > div.right-inner > div.tv-series-profile-head > div.tv-series-right-content > h1"
		),
		actorName = document.querySelector(
			"#container > div.content > div.right > div.artist-right > div.artist-name > h1"
		);

	if (!isVideoData && page.includes("/arsiv")) {
		const url = new URL(document.location.href),
			genre = url.searchParams.get("tur"),
			showName = url.searchParams.get("dizi_adi");

		if (
			!document.location.search ||
			document.location.search === "" ||
			(document.location.search !== "" && !genre && !showName) ||
			(document.location.search !== "" && genre === "" && showName === "")
		) {
			presence.setActivity({
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/D/dizilab/assets/logo.png",
				details: "Bir sayfaya göz atıyor:",
				state: "Arşiv",
				startTimestamp: Math.floor(Date.now() / 1000),
			});
		} else if ((genre && !showName) || (genre && showName === "")) {
			presence.setActivity({
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/D/dizilab/assets/logo.png",
				details: "Bir kategoriye göz atıyor:",
				state: genre,
				smallImageKey: Assets.Search,
				startTimestamp: Math.floor(Date.now() / 1000),
			});
		} else if (genre && showName) {
			presence.setActivity({
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/D/dizilab/assets/logo.png",
				details: "Bir dizi arıyor:",
				state: `${showName} (${genre})`,
				smallImageKey: Assets.Search,
				startTimestamp: Math.floor(Date.now() / 1000),
			});
		} else if (
			(!genre && showName) ||
			(genre === "" && showName && showName !== "")
		) {
			presence.setActivity({
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/D/dizilab/assets/logo.png",
				details: "Bir dizi arıyor:",
				state: showName,
				smallImageKey: Assets.Search,
				startTimestamp: Math.floor(Date.now() / 1000),
			});
		}
	} else if (!isVideoData && page.includes("/uye/")) {
		const user = document.querySelector(
			"#container > div.content > div.right > div.dashboard-head > h1 > span"
		);

		presence.setActivity({
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/D/dizilab/assets/logo.png",
			details: "Bir üyenin profiline bakıyor:",
			state: user && user.textContent ? user.textContent.trim() : "Belirsiz",
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	} else if (!isVideoData && showTitle && showTitle.textContent !== "") {
		presence.setActivity({
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/D/dizilab/assets/logo.png",
			details: "Bir diziyi inceliyor:",
			state: showTitle.textContent,
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	} else if (!isVideoData && actorName && actorName.textContent !== "") {
		presence.setActivity({
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/D/dizilab/assets/logo.png",
			details: "Bir aktörü inceliyor:",
			state: actorName.textContent,
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	} else if (!isVideoData && page.includes("/forum")) {
		const postTitle = document.querySelector(
				"#container > div.content > div.right > div.right-inner > h2 > span"
			),
			forumTitle = document.querySelector(
				"#container > div.content > div.right > div.forum-head > h1"
			);

		if (page.slice(page.indexOf("/forum") + 6).length <= 0) {
			presence.setActivity({
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/D/dizilab/assets/logo.png",
				details: `${
					forumTitle && forumTitle.textContent !== ""
						? forumTitle.textContent.replace(" tartışma forumu", "")
						: "Bilinmeyen"
				} dizisinin forumlarına bakıyor:`,
				state: "Ana Sayfa",
				startTimestamp: Math.floor(Date.now() / 1000),
			});
		} else {
			presence.setActivity({
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/D/dizilab/assets/logo.png",
				details: `${
					forumTitle && forumTitle.textContent !== ""
						? forumTitle.textContent.replace(" tartışma forumu", "")
						: "Bilinmeyen"
				} dizisinin forumlarına bakıyor:`,
				state:
					postTitle && postTitle.textContent !== ""
						? postTitle.textContent
						: "Bilinmeyen",
				startTimestamp: Math.floor(Date.now() / 1000),
			});
		}
	} else if (pages[page] || pages[page.slice(0, -1)]) {
		presence.setActivity({
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/D/dizilab/assets/logo.png",
			details: "Bir sayfaya göz atıyor:",
			state: pages[page] || pages[page.slice(0, -1)],
			startTimestamp: Math.floor(Date.now() / 1000),
		});
	} else if (_video && _video.currentTime) {
		const title =
				document.querySelector(
					"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > a > span > span"
				) ||
				document.querySelector(
					"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > a > span > span"
				),
			episodeX =
				document.querySelector(
					"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div"
				) &&
				document.querySelector(
					"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div"
				).textContent
					? document.querySelector(
							"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div"
					  ).textContent
					: null ||
					  (document.querySelector(
							"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(2) > span"
					  ) &&
							document.querySelector(
								"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(3)"
							))
					? `${document
							.querySelector(
								"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(2) > span"
							)
							.textContent.trim()}. Sezon ${
							document.querySelector(
								"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(3)"
							).textContent
					  }. Bölüm`
					: "none found",
			timestamps = presence.getTimestamps(
				Math.floor(_video.currentTime),
				Math.floor(_video.duration)
			),
			data: { [k: string]: boolean | string | number } = {
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/D/dizilab/assets/logo.png",
				details: title.textContent,
				state: episodeX
					.replace(/\n/g, "")
					.replaceAll("-", "")
					.replace(title.textContent, "")
					.replace(" ", "")
					.trim(),
				smallImageKey: video.paused ? Assets.Pause : Assets.Play,
				smallImageText: video.paused
					? (await strings).pause
					: (await strings).play,
			};

		if (!isNaN(timestamps[0]) && !isNaN(timestamps[1]))
			[data.startTimestamp, data.endTimestamp] = timestamps;

		if (video.paused) {
			delete data.startTimestamp;
			delete data.endTimestamp;
		}

		presence.setActivity(data);
	} else if (isVideoData) {
		const title =
				document.querySelector(
					"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > a > span > span"
				) ||
				document.querySelector(
					"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > a > span > span"
				),
			episodeX =
				document.querySelector(
					"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div"
				) &&
				document.querySelector(
					"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div"
				).textContent
					? document.querySelector(
							"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div"
					  ).textContent
					: null ||
					  (document.querySelector(
							"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(2) > span"
					  ) &&
							document.querySelector(
								"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(3)"
							))
					? `${document
							.querySelector(
								"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(2) > span"
							)
							.textContent.trim()}. Sezon ${
							document.querySelector(
								"#container > div.content > div.right > div.right-inner > div.tv-series-head > div.mini-info > h1 > div > span:nth-child(3)"
							).textContent
					  }. Bölüm`
					: null;

		if (title && title.textContent !== "" && episodeX) {
			const timestamps = presence.getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				),
				presenceData: PresenceData = {
					largeImageKey:
						"https://cdn.rcd.gg/PreMiD/websites/D/dizilab/assets/logo.png",
					details: title.textContent,
					state: episodeX
						.replace(/\n/g, "")
						.replaceAll("-", "")
						.replace(title.textContent, "")
						.replace(" ", "")
						.trim(),
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
		} else {
			presence.setActivity({
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/D/dizilab/assets/logo.png",
				details: "Bir sayfaya göz atıyor:",
				state: "Bilinmeyen Sayfa",
				startTimestamp: Math.floor(Date.now() / 1000),
			});
		}
	}
});
