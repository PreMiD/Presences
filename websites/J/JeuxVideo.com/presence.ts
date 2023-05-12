const presence = new Presence({
	clientId: "651930315279040512",
});

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

/**
 * Truncate a string by "..." if needed
 * @param {String} text The string to truncate
 * @param {Number} length The desized length
 */
function truncateString(text: string, length: number): string {
	if (text.length > length) return `${text.substring(0, length - 3)}...`;
	else return text;
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/EnEXs1P.jpg",
	};

	if (document.location.pathname === "/")
		presenceData.details = "Page d'accueil";
	else if (document.location.pathname.includes("/news/")) {
		presenceData.details = "Lis une actualité";
		presenceData.state = truncateString(
			document.querySelector("div.titre-wrapper").textContent,
			128
		);
	} else if (document.location.pathname.includes("/videos/")) {
		presenceData.details = "Regarde une vidéo";
		presenceData.state = truncateString(
			document.querySelector("div.titre-video").textContent,
			128
		);
	} else if (document.location.pathname.includes("/test/")) {
		presenceData.details = "Lis un test";
		presenceData.state = `${truncateString(
			document.querySelector(".gameHeaderBanner__title").textContent,
			128
		)} (${
			document.querySelector(".bloc-avis-testeur > .note > strong").textContent
		}/20)`;
	} else if (document.location.pathname.includes("/messages-prives/"))
		presenceData.details = "Lis ses MP";
	else if (document.location.pathname.includes("/forums/0-")) {
		presenceData.details = truncateString(
			document.querySelector(
				"#forum-main-col > .titre-head-bloc > .titre-bloc-forum"
			).textContent,
			64
		);
		presenceData.state = document.querySelector(
			".panel-heading > .nb-connect-fofo"
		).textContent;
	} else if (document.location.pathname.includes("/forums/")) {
		presenceData.details = truncateString(
			document.querySelector(
				".bloc-fil-ariane-crumb-forum > .fil-ariane-crumb > span:last-of-type > a"
			).textContent,
			64
		);
		presenceData.state = truncateString(
			document.querySelector(
				"#forum-main-col > .titre-head-bloc > .titre-bloc-forum > #bloc-title-forum"
			).textContent,
			128
		);
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
