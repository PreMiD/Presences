const presence = new Presence({
		clientId: "755542346367631362",
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

let item;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/14KOuEk.png",
	};

	presenceData.startTimestamp = browsingTimestamp;

	if (
		document.location.pathname === "/" ||
		(document.location.pathname.includes("/shop/") &&
			document.location.pathname.length <= 25)
	) {
		item = document.querySelector(
			"body > div:nth-child(2) > header > nav > div > div > ul > li.selected"
		) as HTMLElement;

		presenceData.details = "Browsing";
		presenceData.state = item.textContent;
		presenceData.smallImageKey = Assets.Search;

		presence.setActivity(presenceData);
	} else if (
		document.location.pathname.includes("/shop/") &&
		document.location.pathname.length >= 26
	) {
		item = document.querySelector(
			"body > div:nth-child(2) > div.main > div:nth-child(5) > div > div:nth-child(2) > div:nth-child(2) > div > h1"
		) as HTMLElement;

		presenceData.details = "Browsing";
		presenceData.state = item.textContent;
		presenceData.smallImageKey = Assets.Search;

		presence.setActivity(presenceData);
	} else if (document.location.pathname.includes("/products/")) {
		item = document.querySelector(
			"body > div:nth-child(2) > div.main > div:nth-child(2) > div > div > h1"
		) as HTMLElement;

		presenceData.details = "Viewing";
		presenceData.state = item.textContent;
		presenceData.smallImageKey = Assets.Reading;

		presence.setActivity(presenceData);
	} else presence.setActivity();
});
