interface Video {
	paused: boolean;
	duration: number;
	currentTime: number;
}

enum Assets {
	Logo = "https://i.imgur.com/Z3G1Ubm.png",
	Pause = "https://i.imgur.com/0A75vqT.png",
	Play = "https://i.imgur.com/Dj5dekr.png",
}
const presence = new Presence({
	clientId: "1094616557763710976",
});

let video: Video;

presence.on("iFrameData", (msg: Video) => {
	video = msg;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		},
		{ href, pathname } = document.location,
		haberAd: string =
			document
				.querySelector(
					"body > div.haberler > div > div > div:nth-child(7) > div > div > div.kart-header > h2"
				)
				?.textContent.trim() || null,
		haberDetay: string =
			document
				.querySelector(
					"body > div.haberler > div > div > div:nth-child(7) > div > div > div.kart-body > p:nth-child(4)"
				)
				?.textContent.trim() || null,
		animeInfo: string =
			document
				.querySelector(
					"body > div.container-fluid > div > div > div:nth-child(2) > div:nth-child(1) > span"
				)
				?.textContent.trim() || null,
		profilAd: string =
			document
				.querySelector(
					"body > div.container-fluid > div.row > div.col-md-10 > div:nth-child(6) > div:nth-child(1) > label"
				)
				?.textContent.trim() || null;

	if (pathname === "/" || pathname.startsWith("/index")) {
		presenceData.details = "Anasayfaya bakıyor";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	} else if (pathname.startsWith("/animeler")) {
		presenceData.details = "Animelere bakıyor";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	} else if (pathname.startsWith("/haberler")) {
		presenceData.details = "Haberlere bakıyor";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	} else if (pathname.startsWith("/haberoku") && haberAd) {
		presenceData.details = `Haber başlığı: ${haberAd}`;
		if (haberDetay) presenceData.state = haberDetay;

		presenceData.buttons = [
			{
				label: "Haber",
				url: href,
			},
		];
	} else if (pathname.startsWith("/paketler")) {
		presenceData.details = "Paketlere bakıyor";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	} else if (pathname.startsWith("/hemenizle") && animeInfo) {
		const epNum =
			animeInfo.match(/[0-9]+\.Bölüm/g) || animeInfo.match(/[0-9]+\. Bölüm/g);

		presenceData.details = `${animeInfo.split("->")[2]} izliyor`;

		if (epNum) presenceData.state = `Bölüm ${epNum[0].split(".")[0]}`;

		presenceData.buttons = [
			{
				label: "Anime",
				url: href,
			},
		];
	} else if (pathname.startsWith("/profile") && profilAd) {
		presenceData.state = `${profilAd} profilinde`;
		presenceData.buttons = [
			{
				label: "Profil",
				url: href,
			},
		];
	} else {
		presenceData.details = "Göz atıyor...";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	}

	if (video) {
		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused ? "Duraklatıldı" : "Oynatılıyor";

		if (!video.paused && video.duration) {
			[, presenceData.endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);
		}
	}

	presence.setActivity(presenceData);
});
