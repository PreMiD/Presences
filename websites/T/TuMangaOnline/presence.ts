const presence = new Presence({
		clientId: "640980262750126080",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/1CYkKgl.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "lectortmo.com") {
		if (document.location.pathname === "/")
			presenceData.details = "Browsing...";
		else if (document.location.pathname.includes("/library/manga/")) {
			presenceData.details = "Viewing manga:";
			presenceData.state = document.querySelector(
				"#app > section > header > section > div > div > div:nth-child(3) > h1"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/library"))
			presenceData.details = "Viewing the library";
		else if (document.location.pathname.includes("/groups/")) {
			presenceData.details = "Viewing group:";
			presenceData.state = document.querySelector(
				"#app > section > header > section > div > div > div:nth-child(2) > h1"
			).textContent;
		} else if (document.location.pathname.includes("/groups"))
			presenceData.details = "Viewing groups";
		else if (document.location.pathname.includes("/lists/")) {
			presenceData.details = "Viewing group:";
			presenceData.state = document.querySelector(
				"#app > section > header > section > div > div > div:nth-child(2) > h1"
			).textContent;
		} else if (document.location.pathname.includes("/lists"))
			presenceData.details = "Viewing groups";
		else if (document.location.pathname.includes("/viewer/")) {
			presenceData.details = "Reading manga:";
			presenceData.smallImageKey = Assets.Reading;
			presenceData.state = document.querySelector(
				"#app > section:nth-child(2) > div > div > h1"
			).textContent;
		}
	} else if (document.location.hostname === "tmocommunity.com") {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Browsing the forums...";
		if (document.location.pathname.includes("/d/")) {
			presenceData.details = "Reading forum post:";
			presenceData.state = document.querySelector(
				"#content > div > div > header > div > ul > li.item-title > h2"
			).textContent;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
