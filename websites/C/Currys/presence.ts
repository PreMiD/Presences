const presence = new Presence({
		clientId: "996516483150663721",
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
	let presenceData = {
		smallImageKey: "https://i.imgur.com/B5iUj20.png",
		largeImageKey: "https://i.imgur.com/yOolF4f.png",
		largeImageText: "Browsing Currys",
		startTimestamp: browsingTimestamp,
		details: "Browsing",
		state: "Currys Website",
	};
	const { pathname } = document.location;

	switch (true) {
		case !!document.querySelector(".amp-herobanner-headline"):
			presenceData.state = document.querySelector(
				".amp-herobanner-headline"
			).textContent;
			break;
		case !!document.querySelector(".plp-heading"):
			presenceData.state = document.querySelector(".plp-heading").textContent;
			break;
		case !!document.querySelector("#clp-row-1 > div > div > h1"):
			presenceData.state = document.querySelector(
				"#clp-row-1 > div > div > h1"
			).textContent;
			break;
		case !!document.querySelector("#clp-row-1 > div > h1"):
			presenceData.state = document.querySelector(
				"#clp-row-1 > div > h1"
			).textContent;
			break;
		case pathname.includes("/products/") &&
			!!document.querySelector(".product-name"):
			presenceData.state = document.querySelector(".product-name").textContent;
			break;
		default:
			break;
	}

	const pages: Record<string, PresenceData> = {
		"/account": { details: "Viewing", state: "My Account" },
		"/wishlist-show": { details: "Viewing", state: "Wishlist" },
		"/order": { details: "Viewing", state: "Orders" },
		"/manage-your-details": { details: "Managing", state: "Account Details" },
		"/cart": { details: "Viewing", state: "Basket" },
		"/store-finder": { details: "Finding", state: "Stores" },
		"/services/": { details: "Viewing", state: "Services" },
	};

	for (const [path, data] of Object.entries(pages))
		if (pathname.includes(path)) presenceData = { ...presenceData, ...data };

	// When searching for product
	const search = document.querySelector<HTMLInputElement>('[id="Search"]');
	if (search?.value) {
		presenceData.details = "Searching for:";
		presenceData.state = search.value;
		presenceData.smallImageKey = "https://i.imgur.com/B5iUj20.png";
		return presence.setActivity(presenceData);
	}

	if (pathname === "/search") {
		presenceData.details = "Viewing search results for:";
		presenceData.state = document
			.querySelector('[class="breadcrumb"]')
			.lastElementChild?.textContent?.trim();
		presenceData.smallImageKey = "https://i.imgur.com/B5iUj20.png";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
