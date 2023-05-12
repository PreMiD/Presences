const presence = new Presence({
		clientId: "653644508507930645",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/Nh2SWRD.png",
		startTimestamp: browsingTimestamp,
	};

	if (window.location.pathname.endsWith("top")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "Top Voted Bots";
	} else if (window.location.pathname.endsWith("add"))
		presenceData.details = "Adding a new bot";
	else if (window.location.pathname.endsWith("mine"))
		presenceData.details = "Viewing their bot(s)";
	else if (window.location.pathname.startsWith("/bots/")) {
		presenceData.details = "Viewing a bot:";
		presenceData.state = document
			.querySelector(
				"#__layout > div > div.main-content > div > div > div.row > div.col-12.col-md-6 > h1"
			)
			.textContent.replace(
				document.querySelector(
					"#__layout > div > div.main-content > div > div > div.row > div.col-12.col-md-6 > h1 > a"
				).textContent,
				""
			);
	} else if (window.location.pathname.startsWith("/tags/")) {
		presenceData.details = "Viewing a tag:";
		presenceData.state = document.querySelector(
			"#__layout > div > div.main-content > div > div > div:nth-child(1) > div.col-12.col-md-4 > h2"
		).textContent;
	} else if (window.location.pathname.includes("/users/")) {
		presenceData.details = "Viewing a user:";
		presenceData.state = document.querySelector(
			"#__layout > div > div.main-content > div > div > div.user-bar.text-center > h2"
		).textContent;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
