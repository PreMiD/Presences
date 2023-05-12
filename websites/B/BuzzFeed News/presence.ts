const presence = new Presence({
	clientId: "651445584955310100",
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

presence.on("UpdateData", async () => {
	const page = document.location.pathname,
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/5qKNHPi.png",
			startTimestamp: Math.floor(Date.now() / 1000),
		};

	if (page.includes("/section")) {
		presenceData.details = "Viewing To Section:";
		presenceData.state = document.querySelector(
			"#news-content > div.content-column.xs-mt2.lg-mt0.md-mb4 > h1 > span"
		).textContent;
	} else if (page.includes("/article")) {
		presenceData.details = "Reads a Article:";
		presenceData.state = document.querySelector(
			"#js-post-container > div > div.grid-layout-main.xs-mb2.lg-mb0 > header > h1"
		).textContent;
	} else {
		presenceData.details = "Viewing Page:";
		presenceData.state = "Homepage";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
