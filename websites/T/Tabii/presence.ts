const presence = new Presence({
		clientId: "1212022540080382013",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		view: "general.watching",
	});

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://cms-tabii-public-image.tabii.com/int/webp/26087.jpeg",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		// startTimestamp: browsingTimestamp,
	};

	if (
		document.location.pathname === "/" ||
		document.location.pathname.includes("/browse/")
	) {
		const pageIds = [
			{ id: "154830_134666", name: "Anasayfa" },
			{ id: "149106_149112", name: "Dizi" },
			{ id: "149265_149266", name: "Film" },
			{ id: "149301_149418", name: "Belgesel" },
			{ id: "149332_149333", name: "Çocuk" },
			{ id: "233080_242470", name: "Tekrar İzle" },
		];

		presenceData.details = `${
			pageIds.find(x => document.location.pathname.includes(x.id))?.name
		} Sayfasına Göz Atıyor`;
	} else if (document.location.pathname.includes("/settings/account"))
		presenceData.details = "Hesap Ayarlarına Göz Atıyor";
	else if (document.location.pathname.includes("/settings/profile"))
		presenceData.details = "Profil Ayarlarına Göz Atıyor";
	else if (document.location.pathname.includes("/search")) {
		if (document.querySelector("input").value)
			presenceData.details = "Arama Yapıyor";
		else presenceData.details = "Arama Sayfasına Göz Atıyor";
	} else if (document.location.pathname.includes("/watch")) {
		const video = document.querySelector("video");

		if (video) {
			presenceData.state = document.querySelector("h1")?.textContent;
			const stringsData = await strings;
			presenceData.buttons = [
				{
					label: `${stringsData.view} ${presenceData.state}`,
					url: document.location.href,
				},
			];

			if (video.currentTime && video.duration) {
				presenceData.startTimestamp = Date.now() - video.currentTime * 1000;
				presenceData.endTimestamp =
					Date.now() + (video.duration - video.currentTime) * 1000;

				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused
					? stringsData.pause
					: stringsData.play;
			}

			presenceData.smallImageKey = video.paused ? "pause" : "play";
			presenceData.smallImageText = video.paused
				? stringsData.pause
				: stringsData.play;
		}
	} else if (document.location.pathname.includes("/genre")) {
		const catName = (
			document.querySelector(
				"#Main > div > div:nth-child(1) > main > div > div.flex.pt-8 > div > div > span:nth-child(2)"
			) as HTMLElement
		).textContent;
		if (catName) presenceData.details = `${catName} Kategorisine Göz Atıyor`;
		else presenceData.details = "Kategori Sayfasına Göz Atıyor";
	} else if (document.location.pathname.includes("/my-stuff"))
		presenceData.details = "Kütüphanesine Göz Atıyor";
	else if (document.location.pathname.includes("/faq"))
		presenceData.details = "SSS'ye Göz Atıyor";
	else presenceData.details = "Bilinmeyen Sayfada";

	// console.log(presenceData.details);

	// console.log(document.location.pathname.includes("/browse/"));

	// console.log(document.querySelector("video")?.currentTime);

	presence.setActivity(presenceData);
});

//
