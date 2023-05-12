const presence = new Presence({
		clientId: "656175238412763163",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/lDlL1TY.png",
			startTimestamp: browsingTimestamp,
		},
		page = window.location.pathname;

	if (page.includes("search")) presenceData.details = "Searching something";
	else if (page.endsWith("/add")) presenceData.details = "Adding a new bot";
	else if (page.startsWith("/bots/")) {
		presenceData.details = "Viewing a bot:";
		presenceData.state = document.querySelector(
			"#__layout > div > main > div > section.bot__header > div > div > div > div.bot__name"
		).textContent;
	} else if (page.includes("profile")) {
		presenceData.details = "Viewing a profile:";
		presenceData.state = document.querySelector(
			"#__layout > div > main > div > section.profile__header > div > div > div"
		).textContent;
	} else if (page.includes("terms")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "Terms of Service";
	} else if (page.startsWith("/about")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "About";
	} else if (page.includes("docs")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "API Documentation";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
