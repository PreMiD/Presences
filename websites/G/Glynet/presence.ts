const presence = new Presence({ clientId: "655480486046466098" }),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/IOeHPUb.png",
		startTimestamp: browsingTimestamp,
	};

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

presence.on("UpdateData", () => {
	const page = document.location.pathname;

	if (page === "/") presenceData.details = "Ana sayfa";

	if (page.startsWith("/feed")) {
		presenceData.details = "Ana sayfa";
		presenceData.state = "Duvarını kontrol ediyor...";
	}

	// Explore
	if (page.startsWith("/explore")) presenceData.details = "Keşfet bölümünde...";

	// Hashtags
	if (page.startsWith("/hashtag-")) {
		presenceData.details = "Bir etikete bakıyor...";
		presenceData.state = document.querySelector(
			"#content > div > div:nth-child(2) > div.eksigimneanlamiyorum > div > a"
		)?.textContent;
	}

	if (page.startsWith("/news"))
		presenceData.details = "Haberlere göz atıyor...";

	// Users
	if (page.startsWith("/@")) {
		presenceData.details = "Bir profile göz atıyor...";
		presenceData.state = document.querySelector(
			"#profiletop_username"
		)?.textContent;
	}

	// Server Errors

	if (page.startsWith("/404")) {
		presenceData.details = "Server Error: 404";
		presenceData.state = "Sayfa bulunamadı.";
	}

	if (page.startsWith("/403")) {
		presenceData.details = "Server Error: 403";
		presenceData.state = "Yasaklı Bölge!";
	}
	if (page.startsWith("/503") || page.startsWith("/500")) {
		presenceData.details = `Server Error: ${page.substring(1)}`;
		presenceData.state = "Sunucuya şu anda ulaşılamıyor.";
	}
	if (page.startsWith("/400")) {
		presenceData.details = "Server Error: 400";
		presenceData.state = "Geçersiz istek.";
	}
	if (typeof presenceData.details === "string")
		presence.setActivity(presenceData);
	else {
		presence.setActivity({
			details: "Bilinmeyen bir sayfada...",
			startTimestamp: browsingTimestamp,
			largeImageKey: "https://i.imgur.com/IOeHPUb.png",
		});
	}
});
