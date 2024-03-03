const presence = new Presence({
		clientId: "1212379206521192458",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		buttonViewShow: "general.buttonViewShow",
		viewMovie: "general.buttonWatchMovie",
		viewEpisode: "general.buttonViewEpisode",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	pages: {
		[k: string]: string;
	} = {
		"/": "Anasayfaya Göz Atıyor",
		"/filmler": "Filmlere Göz Atıyor",
		"/seri-filmler": "Seri Filmlere Göz Atıyor",
		"/diziler?kelime=&durum=&tur=26&type=": "Anime Dizilerine Göz Atıyor",
		"/diziler": "Dizilere Göz Atıyor",
		"/koleksiyon/asya-dizileri": "Asya Dizilerine Göz Atıyor",
		"/diziler/son-bolumler": "Son Dizi Bölümlerine Göz Atıyor",
		"/koleksiyon/": "Koleksiyonuna Göz Atıyor",
		"/bildirimler": "Bildirimlerine Göz Atıyor",
		"/izlediklerim": "İzlediklerine Göz Atıyor",
		"/izleyeceklerim": "İzleyeceklerine Göz Atıyor",
		"/takip-ettiklerim": "Takip Ettiklerine Göz Atıyor",
		"/ayarlar": "Ayarlarına Göz Atıyor",
	};

const enum Assets {
	Logo = "https://i.imgur.com/CMzeCH3.png",
}

interface IframeData {
	duration: number;
	currentTime: number;
	paused: boolean;
}

let video: IframeData;
presence.on("iFrameData", (data: IframeData) => {
	video = data;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		stringsData = await strings,
		{ pathname, href } = document.location,
		seriesPageCheck =
			!!document.querySelector('.cover-actions > [data-request]')

	for (const [key, value] of Object.entries(pages)) {
		if (pathname.includes("/dizi/") && seriesPageCheck) {
			const stringsData = await strings,
				seriesTitle = document
					.querySelector("#container")
					.querySelector("h5")?.textContent,
				episode = document.querySelector(
					"#container > div.episode-head > div:nth-child(1) > header > h2 > a"
				)?.textContent,
				seriesUrl = document.querySelector<HTMLAnchorElement>(
					"#container > div.episode-head > div:nth-child(1) > header > h2 > a"
				)?.href;

			if (seriesTitle && !episode) {
				presenceData.details = `${seriesTitle} Adlı Diziye Göz Atıyor.`;

				presenceData.buttons = [
					{
						label: `${stringsData.viewShow} ${seriesTitle}`,
						url: href,
					},
				];
			} else if (episode) {
				delete presenceData.startTimestamp;

				if (video) {
					presenceData.details = `${episode} İzliyor.`;

					presenceData.state = `${
						document.querySelector(
							"#container > div.episode-head > div:nth-child(1) > h6"
						)?.textContent
					} ${video.paused ? stringsData.pause : stringsData.play}`;

					[presenceData.startTimestamp, presenceData.endTimestamp] =
						presence.getTimestamps(video.currentTime, video.duration);
				} else presenceData.details = `${episode} Adlı Bölüme Göz Atıyor.`;

				presenceData.buttons = [
					{
						label: stringsData.viewEpisode,
						url: href,
					},
					{
						label: "Diziye Git",
						url: seriesUrl,
					},
				];
			}
		} else if (
			document.querySelector("#pre_content > div.g-title > div > span")
				?.textContent
		) {
			const stringsData = await strings;

			presenceData.details = document.querySelector(
				".g-title > div > span"
			)?.textContent;

			if (video?.currentTime && video?.duration) {
				presenceData.state = video.paused
					? stringsData.pause
					: stringsData.play;

				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(video.currentTime, video.duration);

				presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
				presenceData.smallImageText = video.paused
					? stringsData.pause
					: stringsData.play;
			}

			presenceData.buttons = [
				{
					label: stringsData.viewMovie,
					url: href,
				},
			];
		} else if (pathname.includes("/koleksiyon/")) {
			presenceData.details = `${
				document.querySelector(".g-title > div")?.textContent
			} Koleksiyonuna Göz Atıyor`;
		} else if (pathname.includes("@")) {
			presenceData.details = `${
				document.querySelector(".title")?.textContent
			} Adlı Kullanıcının Profiline Göz Atıyor`;
} else {
		for (const [key, value] of Object.entries(pages))
			if (pathname === key) presenceData.details = value;
	}

	presence.setActivity(presenceData);
});
