const presence = new Presence({
		clientId: "1212379206521192458",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		viewShow: "general.viewShow",
		viewMovie: "general.buttonWatchMovie",
		viewEpisode: "general.buttonViewEpisode",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	
	pages: { [k: string]: string } = {
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
	}

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://i.imgur.com/CMzeCH3.png",
	play = "play",
	pause = "pause"
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
	};

	const { pathname } = document.location;

	const filmPageCheck = document.querySelector("#pre_content > div.g-title > div > span")?.textContent,
	seriesPageCheck = document.querySelector("#container > div.popup-inner.auto > div.cover > div > a:nth-child(1)") === null;


	for (const [key, value] of Object.entries(pages)) {
		if ((pathname.includes("/dizi/") && seriesPageCheck)) {
			console.log("seriesPageCheck");
			let stringsData = await strings;
			let seriesTitle = document.querySelector("#container > div.popup-inner.auto > div.cover > h5")?.textContent,
				episode = document.querySelector("#container > div.episode-head > div:nth-child(1) > header > h2 > a")?.textContent,
				episodeSeason = document.querySelector("#container > div.episode-head > div:nth-child(1) > h6")?.textContent,
				seriesUrl = (document.querySelector("#container > div.episode-head > div:nth-child(1) > header > h2 > a") as HTMLAnchorElement)?.href;

			if (seriesTitle && !episode) {
				presenceData.details = seriesTitle + " Adlı Diziye Göz Atıyor.";

				presenceData.buttons = [
					{ label: `${stringsData.viewShow} ${seriesTitle}`, url: document.location.href }
				];
			} else if (episode) {

				delete presenceData.startTimestamp;

				if (video) {
					presenceData.details = episode + " İzliyor.";

					presenceData.state = `${episodeSeason} ${video.paused ? stringsData.pause : stringsData.play}`;

					presenceData.startTimestamp = Date.now() - video.currentTime * 1000;
					presenceData.endTimestamp =
						Date.now() + (video.duration - video.currentTime) * 1000;
					
				} else {
					presenceData.details = episode + " Adlı Bölüme Göz Atıyor.";
				}

				presenceData.buttons = [
					{ label: stringsData.viewEpisode, url: document.location.href },
					{ label: "Diziye Git", url: seriesUrl }
				];

				
			}
		} else if (filmPageCheck) {
			console.log("filmPageCheck");
			let stringsData = await strings;
			
			let title = document.querySelector("#pre_content > div.g-title > div > span")?.textContent;
			presenceData.details = title;

			if (video?.currentTime && video?.duration) {
				presenceData.state = video.paused ? stringsData.pause : stringsData.play;

				presenceData.startTimestamp = Date.now() - video.currentTime * 1000;
				presenceData.endTimestamp =
					Date.now() + (video.duration - video.currentTime) * 1000;


				presenceData.smallImageKey = video.paused ? Assets.pause : Assets.play;
				presenceData.smallImageText = video.paused
					? stringsData.pause
					: stringsData.play;
			}

			presenceData.buttons = [
				{ label: stringsData.viewMovie, url: document.location.href }
			];

		} else if (pathname.includes("/koleksiyon/")) {
			console.log("koleksiyon");
			let category = document.querySelector("#pre_content > div.g-title > div")?.textContent;
			presenceData.details = category + " Koleksiyonuna Göz Atıyor";
		} else if (pathname.includes("@")) {
			console.log("profile");
			let username = document.querySelector("#container > div > aside > div > div > div.title")?.textContent;
			presenceData.details = username + " Adlı Kullanıcının Profiline Göz Atıyor";
		} else if (pathname === key) {
			console.log("pages");
			presenceData.details = value;
		}
	}

	presence.setActivity(presenceData);
});
