const presence = new Presence({
		clientId: "868085258371870820",
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
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

// Presence On
presence.on("UpdateData", async () => {
	const buttons = await presence.getSetting<boolean>("buttons"),
		time = await presence.getSetting<boolean>("timestamps"),
		presenceData: PresenceData = {
			details: "Page not Supported",
			largeImageKey: "https://i.imgur.com/zP76GVO.png",
			startTimestamp: browsingTimestamp,
		};

	if (document.location.href === "https://komiku.id/")
		presenceData.details = "Viewing Homepage";
	else if (document.location.pathname.endsWith("/baca-manga/"))
		presenceData.details = "Viewing Manga List";
	else if (document.location.pathname.endsWith("/baca-manhua/"))
		presenceData.details = "Viewing Manhua List";
	else if (document.location.pathname.endsWith("/baca-manhwa/"))
		presenceData.details = "Viewing Manhwa List";
	else if (document.location.pathname.endsWith("/daftar-komik/"))
		presenceData.details = "Viewing Comic List";
	else if (document.location.pathname.endsWith("/pustaka/"))
		presenceData.details = "Viewing New Release";
	else if (document.location.pathname.startsWith("/other/")) {
		if (document.location.pathname.startsWith("/other/hot/"))
			presenceData.details = "Browsing Featured";
		else if (document.location.pathname.endsWith("/rekomendasi/"))
			presenceData.details = "Browsing Recommendation";
		else if (document.location.pathname.endsWith("/berwarna/"))
			presenceData.details = "Browsing Coloured Comic";
	} else if (document.location.pathname.startsWith("/bookmark/history.html"))
		presenceData.details = "Viewing History";
	else if (document.location.pathname.startsWith("/manga/")) {
		presenceData.details = `Viewing ${
			document.querySelector("section#Informasi b").textContent
		}`;
		presenceData.state = document
			.querySelector("header#Judul h1")
			.textContent.replace(/\t|\n/g, "");
		// View Manga Buttons
		if (buttons) {
			presenceData.buttons = [
				{
					label: `View ${
						document.querySelector("section#Informasi b").textContent
					}`,
					url: document.location.href,
				},
			];
		}
	} else if (document.location.pathname.startsWith("/ch/")) {
		const chapter = document.location.pathname
			.match(/chapter-\d+/)[0]
			.replace("c", "C")
			.replace("-", " ");
		presenceData.details = document
			.querySelector("header#Judul h1")
			.textContent.replace(/\t|\n/g, "")
			.replace(/Chapter \d+/, "");
		presenceData.state = chapter;
		// View Manga & Chapter Buttons
		if (buttons) {
			presenceData.buttons = [
				{
					label: "View Manga",
					url: document.location.href
						.replace("ch", "manga")
						.replace(/-chapter-\d+/, "")
						.replace(/#\d+/, ""),
				},
				{
					label: chapter,
					url: document.location.href.replace(/#\d+/, ""),
				},
			];
		}
	} else if (document.location.pathname.startsWith("/cari/")) {
		presenceData.details = "Searching:";
		presenceData.state = document
			.querySelector("div.ntah h1")
			.textContent.replace("Hasil Pencarian", "")
			.replace(/\t|\n/g, "");
	} else if (document.location.pathname.startsWith("/genre/")) {
		presenceData.details = `Viewing Genre${document
			.querySelector("div.ntah h1")
			.textContent.replace("Genre", "")
			.replace(/\t|\n/g, "")}`;
	}

	// Show Timestamps
	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	presence.setActivity(presenceData);
});
