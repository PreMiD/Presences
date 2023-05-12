const presence = new Presence({
		clientId: "940892975502856232",
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
			largeImageKey: "https://i.imgur.com/1SIuzpu.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location,
		[buttons, covers] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("cover"),
		]),
		search = document.querySelector<HTMLInputElement>('[id="search"]'),
		active = document.querySelector('[class="navigation__link current"]'),
		series = document.querySelector(
			"#maincontent > div.columns > div > div.wrap.cms-content"
		),
		game = document.querySelector(
			"#maincontent > div.pathname-title-wrapper > h1 > span"
		);
	if (search?.value) {
		presenceData.details = "Searching for";
		presenceData.state = search.value;
		presenceData.smallImageKey = Assets.Search;
	} else if (game) {
		presenceData.buttons = [
			{
				label: "View Game",
				url: href,
			},
		];
		presenceData.largeImageKey =
			document
				.querySelector<HTMLImageElement>('[alt="main product photo"]')
				?.getAttribute("src") ?? "logo";
		presenceData.details = "Viewing product";
		presenceData.state = game.textContent;
	} else if (document.querySelector("#product-addtocart-button")) {
		presenceData.largeImageKey =
			document
				.querySelector<HTMLImageElement>('[alt="main product photo"]')
				?.getAttribute("src") ?? "logo";
		presenceData.buttons = [
			{
				label: "View Product",
				url: href,
			},
		];
		presenceData.details = "Viewing product";
		presenceData.state = document.querySelector<HTMLMetaElement>(
			"meta[property='og:title']"
		).content;
	} else if (series) {
		presenceData.buttons = [
			{
				label: "View Product Series",
				url: href,
			},
		];
		presenceData.details = "Viewing product series";
		presenceData.state = series.querySelector('[alt*=" "]').getAttribute("alt");
	} else if (active || pathname.includes("/coming-soon")) {
		presenceData.buttons = [
			{
				label: "View Category",
				url: href,
			},
		];
		presenceData.details = "Viewing Category:";
		presenceData.state = active?.textContent ?? "Coming soon";
	} else if (pathname.includes("-sale")) {
		presenceData.details =
			document.querySelector<HTMLMetaElement>('[name="title"]').content;
	} else if (pathname.includes("order/history"))
		presenceData.details = "Order History";
	else if (pathname.includes("/cart")) presenceData.details = "Cart";
	else if (pathname === "/") presenceData.details = "Home page";
	else if (pathname.includes("/wishlist")) presenceData.details = "Wishlist";

	if (!buttons) delete presenceData.buttons;
	if (!covers) presenceData.largeImageKey = "https://i.imgur.com/1SIuzpu.png";
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
