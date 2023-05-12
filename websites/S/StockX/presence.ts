const presence = new Presence({
		clientId: "934462939417673770",
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
			largeImageKey: "https://i.imgur.com/RMjJZkx.png",
			details: "Browsing...",
			startTimestamp: browsingTimestamp,
		},
		productName = document.querySelector<HTMLHeadingElement>(
			"#main-content > div > section:nth-child(3) > div > div.css-0 > h1"
		),
		{ pathname } = document.location,
		[price, image, buttons] = await Promise.all([
			presence.getSetting<boolean>("price"),
			presence.getSetting<boolean>("image"),
			presence.getSetting<boolean>("buttons"),
		]);
	if (pathname.startsWith("/search")) {
		presenceData.details = "Searching For:";
		presenceData.state = document.querySelector<HTMLParagraphElement>(
			"#browse-wrapper nav > ol > li:nth-child(3) > p"
		).textContent;
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.startsWith("/buy") || pathname.startsWith("/sell")) {
		if (pathname === "/sell") presenceData.details = "Selling an Item";
		else {
			if (pathname.startsWith("/buy"))
				presenceData.details = "Buying a Product/Placing a Bid:";
			else presenceData.details = "Selling an Item:";
			presenceData.state = document.querySelector<HTMLHeadingElement>(
				"#main-content > div > div > div > div > div > h1"
			).textContent;
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>(
					"#main-content > div > div > div > div > div > img"
				)?.src ?? "logo";
		}
	} else if (pathname.startsWith("/news/")) {
		if (pathname === "/news/") presenceData.details = "Browsing News";
		else {
			presenceData.details = "Reading an Article:";
			presenceData.state = document.title.replace("- StockX News", "").trim();
			presenceData.smallImageKey = Assets.Reading;
			presenceData.buttons = [{ label: "Read Article", url: document.URL }];
		}
	} else if (pathname.startsWith("/about")) {
		presenceData.details = "Reading about StockX";
		presenceData.smallImageKey = Assets.Reading;
	} else if (productName) {
		if (price) {
			presenceData.details = `Viewing: ${productName.textContent}`;
			presenceData.state = `${
				document.querySelector<HTMLLIElement>(
					"#main-content div:nth-child(1) > div > dl > dd"
				).textContent
			} / ${
				document.querySelector<HTMLLIElement>(
					"#main-content div:nth-child(3) > div > dl > dd"
				).textContent
			}`;
		} else {
			presenceData.details = "Viewing Product:";
			presenceData.state = productName.textContent;
		}
		presenceData.largeImageKey =
			document.querySelector<HTMLImageElement>("div > div > div > img")?.src ??
			"logo";
		presenceData.smallImageKey = Assets.Search;
		presenceData.buttons = [{ label: "View Product", url: document.URL }];
	} else if (
		document.querySelector<HTMLHeadingElement>("#browse-wrapper > div > h1")
	) {
		presenceData.details = "Viewing Category:";
		presenceData.state = document.querySelector<HTMLHeadingElement>(
			"#browse-wrapper > div > h1"
		).textContent;
		presenceData.smallImageKey = Assets.Reading;
	}
	if (!image) presenceData.largeImageKey = "https://i.imgur.com/RMjJZkx.png";
	if (!buttons) delete presenceData.buttons;
	presence.setActivity(presenceData);
});
