const presence = new Presence({
		clientId: "934462939417673770"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			details: "Browsing...",
			startTimestamp: browsingTimestamp
		},
		productName = document.querySelector<HTMLHeadingElement>(
			"#main-content > div > section:nth-child(3) > div.css-j7qwjs > div.css-0 > h1"
		),
		{ pathname } = document.location,
		[price, image, buttons] = await Promise.all([
			presence.getSetting<boolean>("price"),
			presence.getSetting<boolean>("image"),
			presence.getSetting<boolean>("buttons")
		]);
	if (pathname.startsWith("/search")) {
		presenceData.details = "Searching For:";
		presenceData.state = document.querySelector<HTMLParagraphElement>(
			"#browse-wrapper > div > div > div.css-c8gdzb > div.css-b1ilzc > div > div:nth-child(1) > div > div.css-0 > nav > ol > li:nth-child(3) > p"
		).textContent;
		presenceData.smallImageKey = "search";
	} else if (pathname.startsWith("/buy") || pathname.startsWith("/sell")) {
		if (pathname === "/sell") presenceData.details = "Selling an Item";
		else {
			if (pathname.startsWith("/buy"))
				presenceData.details = "Buying a Product/Placing a Bid:";
			else presenceData.details = "Selling an Item:";
			presenceData.state = document.querySelector<HTMLHeadingElement>(
				"#main-content > div > div > div.pane.sixty.css-12aduxl > div > div.css-b0dyos > h1"
			).textContent;
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>(
					"#main-content > div > div > div.pane.sixty.css-12aduxl > div > div.css-1ru79ae > img"
				)?.src ?? "logo";
		}
	} else if (pathname.startsWith("/news/")) {
		if (pathname === "/news/") presenceData.details = "Browsing News";
		else {
			presenceData.details = "Reading an Article:";
			presenceData.state = document.title.replace("- StockX News", "").trim();
			presenceData.smallImageKey = "reading";
			presenceData.buttons = [{ label: "Read Article", url: document.URL }];
		}
	} else if (pathname.startsWith("/about")) {
		presenceData.details = "Reading about StockX";
		presenceData.smallImageKey = "reading";
	} else if (productName) {
		if (price) {
			presenceData.details = `Viewing: ${productName.textContent}`;
			presenceData.state = `${
				document.querySelector<HTMLLIElement>(
					"#main-content > div > section:nth-child(3) > div.css-gg4vpm > div.css-0 > div.css-qt7qal > div.chakra-stack.css-12vwdz3 > div:nth-child(1) > div > dl > dd"
				).textContent
			} / ${
				document.querySelector<HTMLLIElement>(
					"#main-content > div > section:nth-child(3) > div.css-gg4vpm > div.css-0 > div.css-qt7qal > div.chakra-stack.css-12vwdz3 > div:nth-child(3) > div > dl > dd"
				).textContent
			}`;
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>(
					":is(div.css-sn7afr > div > div > img, div > div > div > img)"
				)?.src ?? "logo";
			presenceData.smallImageKey = "search";
			presenceData.buttons = [{ label: "View Product", url: document.URL }];
		} else {
			presenceData.details = "Viewing Product:";
			presenceData.state = productName.textContent;
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>(
					":is(div.css-sn7afr > div > div > img, div > div > div > img)"
				)?.src ?? "logo";
			presenceData.smallImageKey = "search";
		}
	} else if (
		document.querySelector<HTMLHeadingElement>("#browse-wrapper > div > h1")
	) {
		presenceData.details = "Viewing Category:";
		presenceData.state = document.querySelector<HTMLHeadingElement>(
			"#browse-wrapper > div > h1"
		).textContent;
		presenceData.smallImageKey = "reading";
	}
	if (!image) presenceData.largeImageKey = "logo";
	if (!buttons) delete presenceData.buttons;
	presence.setActivity(presenceData);
});
