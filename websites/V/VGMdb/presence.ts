const presence = new Presence({
		clientId: "928142086446923798",
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
			largeImageKey: "https://i.imgur.com/mKSqsgJ.png",
			startTimestamp: browsingTimestamp,
		},
		cover = await presence.getSetting<boolean>("cover"),
		shortTitle = document.title.match(/(.*) -/)[1],
		{ pathname } = document.location;

	if (pathname.startsWith("/album")) {
		presenceData.details = document.querySelector<HTMLSpanElement>(
			"#innermain > h1 > span"
		).textContent;
		presenceData.state =
			document.querySelector<HTMLDivElement>("#coverart").title;
		if (cover) {
			if (
				document.querySelector<HTMLMetaElement>("meta[property='og:image']")
			) {
				presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
					"meta[property='og:image']"
				).content;
				presenceData.smallImageKey = "logo";
			} else presenceData.largeImageKey = "https://i.imgur.com/mKSqsgJ.png";
		}
		presenceData.buttons = [{ label: "View Album", url: document.URL }];
	} else if (pathname.startsWith("/artist")) {
		presenceData.details = "Viewing an artist:";
		presenceData.state = shortTitle;
		if (cover) {
			if (document.querySelector<HTMLAnchorElement>("#leftfloat > div > a")) {
				presenceData.largeImageKey = document.querySelector<HTMLAnchorElement>(
					"#leftfloat > div > a"
				).href;
				presenceData.smallImageKey = "logo";
			} else if (
				document.querySelector<HTMLAnchorElement>("#innermain > div > a")
			) {
				presenceData.largeImageKey = document.querySelector<HTMLAnchorElement>(
					"#innermain > div > a"
				).href;
				presenceData.smallImageKey = "logo";
			} else presenceData.largeImageKey = "https://i.imgur.com/mKSqsgJ.png";
		}
		presenceData.buttons = [{ label: "View Artist", url: document.URL }];
	} else if (pathname.startsWith("/org") || pathname.startsWith("/product")) {
		if (pathname.startsWith("/org")) {
			presenceData.details = "Viewing a label/organization:";
			presenceData.buttons = [{ label: "View Label/Org", url: document.URL }];
		} else if (pathname.startsWith("/product")) {
			presenceData.details = "Viewing a product:";
			presenceData.buttons = [{ label: "View Product", url: document.URL }];
		}
		presenceData.state = shortTitle;
		if (cover) {
			if (document.querySelector<HTMLAnchorElement>("#innermain > div > a")) {
				presenceData.largeImageKey = document.querySelector<HTMLAnchorElement>(
					"#innermain > div > a"
				).href;
				presenceData.smallImageKey = "logo";
			} else presenceData.largeImageKey = "https://i.imgur.com/mKSqsgJ.png";
		}
	} else if (pathname.startsWith("/event")) {
		presenceData.details = "Viewing an event:";
		presenceData.state = shortTitle;
	} else if (pathname.startsWith("/db")) {
		presenceData.details = "Searching the database";
		if (pathname.includes("albums")) presenceData.state = "Browsing albums";
		else if (pathname.includes("artists"))
			presenceData.state = "Browsing artists";
		else if (pathname.includes("org"))
			presenceData.state = "Browsing labels & organizations";
		else if (pathname.includes("product"))
			presenceData.state = "Browsing products";
		else if (pathname.includes("marketplace"))
			presenceData.state = "Browsing the marketplace";
	} else if (pathname.startsWith("/search"))
		presenceData.details = "Searching...";
	else if (
		pathname.startsWith("/forums") &&
		(pathname.includes("forumdisplay") || pathname.includes("showthread"))
	) {
		if (pathname.includes("forumdisplay"))
			presenceData.details = "Viewing a forum:";
		else if (pathname.includes("showthread"))
			presenceData.details = "Viewing a thread:";
		else presenceData.details = "Browsing the forum";
		presenceData.state = shortTitle;
	}
	presence.setActivity(presenceData);
});
