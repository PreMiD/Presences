const presence = new Presence({
		clientId: "747190301676011550",
	}),
	strings = presence.getStrings({
		playing: "general.playing",
		paused: "general.paused",
		browsing: "general.browsing",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

let video: HTMLVideoElement;

presence.on("iFrameData", async (msg: HTMLVideoElement) => {
	if (!msg) return;
	video = msg;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/y0RA8SX.jpg",
		details: "Ana Sayfada Anime Arıyor",
		startTimestamp: browsingTimestamp,
	};
	presenceData.details = (
		document.querySelector("head > title") as HTMLHeadElement
	).textContent
		.replace("Türkçe İzle - AnimeWho? Anime", "")
		.replace("Türkçe Oku - AnimeWho? Manga", "")
		.replace("AnimeWho?", "")
		.replace(" Türkçe İzle ve İndir", "");
	if (document.location.pathname === "/") {
		presenceData.details = "Ana Sayfada";
		presenceData.state = "Anime & Manga Arıyor";
	} else if (new RegExp("izle/[a-zA-Z0_9]+").test(document.location.pathname)) {
		presenceData.state = `${
			(
				document.querySelector(
					"div.MuiBox-root > button.MuiButton-outlinedSecondary > span.MuiButton-label"
				) as HTMLSpanElement
			).textContent
		}'ü İzliyor`;
	} else if (new RegExp("oku/[0-9]+/[0-9]+").test(document.location.pathname)) {
		const readType = document.querySelector(
				"div.MuiGrid-root > div.MuiBox-root > button.MuiButtonBase-root > span.MuiButton-label"
			),
			arr = document.location.pathname.split("/");
		presenceData.state = `${arr[5]}.Bölüm`;
		if (readType && readType.textContent.includes("Webtoon"))
			presenceData.state = `${arr[5]}.Bölüm ${arr[6]}.Sayfa`;
	} else if (
		document.location.pathname.includes("/izle") ||
		document.location.pathname.includes("/oku")
	)
		presenceData.state = "Bölüm Seçiyor";
	else if (new RegExp("ceviriler/anime").test(document.location.pathname))
		presenceData.state = "Göz Gezdiriyor";
	else if (document.location.pathname.includes("/ekip-alimlari")) {
		presenceData.details = "Ekip Alımları";
		presenceData.state = "Potansiyel Ekip Üyesi";
	} else if (document.location.pathname.includes("/ara")) {
		if (
			(
				document.querySelector(
					"div.MuiGrid-root > div.MuiBox-root > button.MuiButton-outlinedPrimary > span.MuiButton-label"
				) as HTMLSpanElement
			).textContent === "Anime"
		)
			presenceData.state = "Ne İzlesem Diye Bakıyor";
		else presenceData.state = "Ne Okusam Diye Bakıyor";
	} else if (document.location.pathname.includes("/destek-ol")) {
		presenceData.details = "Destek Ol";
		presenceData.state = "Acaba? Bir İhtimal?";
	} else if (document.location.pathname.includes("/sss")) {
		presenceData.details = "Sıkça Sorulan Sorular";
		presenceData.state = "Sorunlarına Çözüm Arıyor";
	}

	if (video) {
		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused
			? (await strings).paused
			: (await strings).playing;

		if (!video.paused && video.duration) {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				);
		}
	}

	presence.setActivity(presenceData);
});
