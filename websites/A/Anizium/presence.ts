interface Video {
	paused: boolean;
	duration: number;
	currentTime: number;
}

const presence = new Presence({
	clientId: "1094616557763710976",
}),
	strings = presence.getStrings({
		viewHome: "general.viewHome",

	});


let video: Video;

presence.on("iFrameData", (msg: Video) => {
	video = msg;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/Z3G1Ubm.png",
	};

	let haberAd: string = document.querySelector("body > div.haberler > div > div > div:nth-child(7) > div > div > div.kart-header > h2")?.textContent.trim() || null;
	let haberDetay: string = document.querySelector("body > div.haberler > div > div > div:nth-child(7) > div > div > div.kart-body > p:nth-child(4)")?.textContent.trim() || null;

	let animeInfo: string = document.querySelector("body > div.container-fluid > div > div > div:nth-child(2) > div:nth-child(1) > span")?.textContent.trim() || null;

	let profilAd: string = document.querySelector("body > div.container-fluid > div.row > div.col-md-10 > div:nth-child(6) > div:nth-child(1) > label")?.textContent.trim() || null;

	if (window.location.pathname === "/" || window.location.pathname.startsWith("/index")) {
		presenceData.details = (await strings).viewHome;
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	} else if (window.location.pathname.startsWith("/animeler")) {
		presenceData.details = "Animelere bakıyor";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	} else if (window.location.pathname.startsWith("/haberler")) {
		presenceData.details = "Haberlere bakıyor";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	} else if (window.location.pathname.startsWith("/haberoku") && haberAd) {
		presenceData.details = `Haber başlığı: ${haberAd}`;
		if (haberDetay) {
			presenceData.state = haberDetay;
		};
		presenceData.buttons = [
			{
				label: "Haber",
				url: document.URL,
			},
		]
	} else if (window.location.pathname.startsWith("/paketler")) {
		presenceData.details = "Paketlere bakıyor";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	} else if (window.location.pathname.startsWith("/hemenizle") && animeInfo) {
		const epNum = animeInfo.match(/[0-9]+\.Bölüm/g);


		presenceData.details = `${animeInfo.split("->")[2]} izliyor`;

		if (epNum) {
			presenceData.state = `Bölüm ${epNum[0].split(".")[0]}`;
		};
		presenceData.buttons = [
			{
				label: "Anime",
				url: document.URL,
			},
		]
	} else if (window.location.pathname.startsWith("/profile") && profilAd) {
		presenceData.state = `${profilAd} profilinde`;
		presenceData.buttons = [
			{
				label: "Profil",
				url: document.URL,
			},
		]
	} else {
		presenceData.details = "Göz atıyor..."
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	};


	if (video) {
		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused
			? "Duraklatıldı"
			: "Oynatılıyor";

		if (!video.paused && video.duration) {
			[, presenceData.endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);
		};
	};

	presence.setActivity(presenceData);
});
