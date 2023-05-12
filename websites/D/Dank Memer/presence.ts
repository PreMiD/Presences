const presence = new Presence({
	clientId: "653324146503188490",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/MovN0IN.png",
	};

	if (window.location.pathname.endsWith("commands")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "Commands";
	} else if (window.location.pathname.endsWith("about")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "About";
	} else if (window.location.pathname.endsWith("blogs")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "Blogs";
	} else if (window.location.pathname.startsWith("/blogs/")) {
		presenceData.details = "Viewing a blog:";
		presenceData.state = document.querySelector(
			"#root > div.psuedoBody > header"
		).textContent;
	} else if (window.location.pathname.includes("/store/presences/")) {
		presenceData.details = "Viewing a presence page:";
		presenceData.state = document.querySelector(
			"#app > div.page-wrapper > div.content > div > div > div.fullpresence__header > div.header__title > h1"
		).textContent;
	} else if (window.location.pathname.endsWith("loot")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "Lootboxes";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
