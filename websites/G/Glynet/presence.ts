const presence = new Presence({ clientId: "655480486046466098" }),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/G/Glynet/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};

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
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/G/Glynet/assets/logo.png",
		});
	}
});
