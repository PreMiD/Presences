const presence = new Presence({
	clientId: "889780989386170420",
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
			largeImageKey: "https://i.imgur.com/FSoJXWn.png",
		},
		{ href } = document.location;

	let { pathname } = document.location;

	if (pathname.includes("uk/")) pathname = pathname.replace("uk/", "");
	if (pathname.includes("uk")) pathname = pathname.replace("uk", "");

	if (href.includes("news")) {
		if (pathname.split("/")[2]) {
			presenceData.details = "Reading an article...";
			presenceData.state = `Article: '${pathname
				.split("/")[2]
				.replace(".html", "")}'`;
		} else presenceData.details = "Scrolling through news articles...";
	} else if (href.includes("reviews")) {
		if (pathname.split("/")[2]) {
			presenceData.details = "Reading a review...";
			presenceData.state = `Review: '${pathname
				.split("/")[2]
				.replace(".html", "")}'`;
		} else presenceData.details = "Scrolling through reviews...";
	} else if (href.includes("best-picks")) {
		if (pathname.split("/")[2]) {
			presenceData.details = "Looking at best picks...";
			presenceData.state = `The best picks for: '${pathname
				.split("/")[3]
				.replace(".html", "")
				.replace("best-", "")}'`;
		} else presenceData.details = "Scrolling through best picks...";
	} else if (href.includes("coupons")) {
		if (pathname.includes("?")) presenceData.details = "Looking at a coupon...";
		else if (pathname.split("/")[2]) {
			presenceData.details = "Looking at coupons...";
			presenceData.state = `Coupons for: '${pathname
				.split("/")[3]
				.replace(".html", "")}'`;
		} else presenceData.details = "Scrolling through coupons...";
	} else if (href.includes("forums.")) {
		if (pathname.includes("forums")) {
			presenceData.state = `Category: '${pathname
				.split("/")[2]
				.split(".")[0]
				.replace(".html", "")}'`;
		} else if (pathname.includes("threads")) {
			presenceData.state = `Category: '${pathname
				.split("/")[2]
				.split(".")[0]
				.replace(".html", "")}'`;
		} else if (pathname.includes("featured"))
			presenceData.state = "Looking at featured threads...";
		else if (pathname.includes("whats-new"))
			presenceData.state = "Looking at new threads...";
		else if (pathname.includes("members"))
			presenceData.state = "Looking at members...";
		else if (pathname.includes("help")) presenceData.state = "Getting help...";
		else if (pathname.includes("search"))
			presenceData.state = "Searching the forums...";
		else if (pathname.includes("billboard"))
			presenceData.state = "Looking at the billboard...";
		else if (pathname.includes("register"))
			presenceData.state = "Registering an account...";

		presenceData.details = "Visiting the forums...";
	} else if (href.includes("topics")) {
		if (pathname.split("/")[3]) {
			presenceData.state = `Subcategory: '${pathname
				.split("/")[3]
				.replace(".html", "")}'`;
		}
		presenceData.details = `Looking at the topic: ${pathname.split("/")[2]}`;
	} else if (href.includes("feeds"))
		presenceData.details = "Visiting the RSS page...";
	else if (href.includes("search")) {
		if (pathname.split("=")[1]) {
			presenceData.state = `Searching Term: '${pathname
				.split("=")[1]
				.replace(".html", "")}'`;
		}
		presenceData.details = "Searching the site...";
	} else if (pathname && pathname.length > 2) {
		presenceData.details = "Browsing...";
		presenceData.state = `On the page '${pathname.split("/")[1]}'`;
	} else presenceData.details = "Visiting the front page...";

	presence.setActivity(presenceData);
});
