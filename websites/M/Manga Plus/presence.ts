const presence = new Presence({
		clientId: "923893773048619008",
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
let cacheMangaURL: string, cacheMangaChapter: string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Browsing",
			largeImageKey: "https://i.imgur.com/W3vFfFi.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location,
		mangaURL = document.querySelector<HTMLAnchorElement>(
			"#app div.Navigation-module_detailContainer_1aDk8 > a"
		),
		mangaChapter = document.querySelector<HTMLParagraphElement>(
			"#app > div > div > div > div > div > div > p"
		),
		buttons = await presence.getSetting<boolean>("buttons");

	// So that the script would stop throwing errors when the navigator collapses
	if (mangaURL?.href !== cacheMangaURL) cacheMangaURL = mangaURL.href;
	if (mangaChapter?.textContent !== cacheMangaChapter)
		cacheMangaChapter = mangaChapter.textContent;

	if (pathname.startsWith("/updates"))
		presenceData.details = "Browsing lastest updates";
	else if (pathname.startsWith("/featured"))
		presenceData.details = "Browsing featured mangas";
	else if (pathname.startsWith("/manga_list")) {
		if (pathname.includes("all")) presenceData.details = "Browsing all mangas";
		else if (pathname.includes("hot"))
			presenceData.details = "Browsing hottest mangas";
		else if (pathname.includes("updated"))
			presenceData.details = "Browsing updated mangas";
	} else if (pathname.startsWith("/favorited"))
		presenceData.details = "Viewing favorited mangas";
	else if (pathname.startsWith("/titles")) {
		presenceData.details = `Viewing: ${document.title.substring(
			0,
			document.title.lastIndexOf("-") - 1
		)}`;
		presenceData.state = document.title.substring(
			document.title.lastIndexOf("-") + 1,
			document.title.lastIndexOf("|") - 1
		);
		presenceData.buttons = [{ label: "View series", url: document.URL }];
	} else if (pathname.startsWith("/viewer")) {
		presenceData.details = `Reading: ${
			document.querySelector<HTMLHeadingElement>("#app a > h1").textContent
		}`;
		presenceData.state = `Chapter ${cacheMangaChapter}`;
		presenceData.buttons = [
			{ label: "Read chapter", url: document.URL },
			{
				label: "View series",
				url: cacheMangaURL,
			},
		];
	}
	if (!buttons) delete presenceData.buttons;
	presence.setActivity(presenceData);
});
