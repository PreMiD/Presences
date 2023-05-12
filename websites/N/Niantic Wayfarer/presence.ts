const presence = new Presence({
		clientId: "684174415415476240",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/dOqOUxw.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname.includes("/review")) {
		const title = document.querySelector(
				"#descriptionDiv > div.card__body > div > a > h1"
			),
			description = document.querySelector(
				"#descriptionDiv > div.card__body > div > h4"
			),
			location = document.querySelector(".flex-map-row > span:nth-child(2)");
		if (title && description && location) {
			presenceData.largeImageKey = "wayfarer";
			presenceData.smallImageKey = "nw";
			presenceData.details = `Reviewing: ${title.textContent}`;
			presenceData.state = `Description: ${description.textContent}`;
			presenceData.smallImageText = `Address: ${location.textContent
				.split(":")[1]
				.trim()}`;
		} else {
			presenceData.details = "Getting ready to";
			presenceData.state = "review a location...";
		}
	} else if (document.location.pathname.includes("/settings"))
		presenceData.details = "Changing some settings...";
	else if (document.location.pathname.includes("/help")) {
		const article = document.querySelector(
			"#help-section-breadcrumbs > span.ng-binding"
		).textContent;
		presenceData.smallImageKey = Assets.Reading;
		if (article !== "") {
			presenceData.details = "Reading article:";
			presenceData.state = article;
		} else presenceData.details = "Browsing the Help Center...";
	} else if (document.location.pathname.includes("/login"))
		presenceData.details = "Logging in...";
	else if (document.location.pathname.includes("/profile"))
		presenceData.details = "Viewing their own profile...";
	else if (document.location.pathname.includes("/nominations"))
		presenceData.details = "Viewing their nominations...";
	else if (document.location.pathname === "/")
		presenceData.details = "Viewing the showcased wayspots...";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
