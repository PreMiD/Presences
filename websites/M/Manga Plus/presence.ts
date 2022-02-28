const presence = new Presence({
		clientId: "923893773048619008"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let cacheMangaURL: string, cacheMangaChapter: string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Browsing",
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp
		},
		{ pathname } = document.location,
		MangaURL = document.querySelector<HTMLAnchorElement>(
			"#app div.Navigation-module_detailContainer_1aDk8 > a"
		),
		MangaChapter = document.querySelector<HTMLParagraphElement>(
			"#app > div > div > div > div > div > div > p"
		),
		buttons = await presence.getSetting<boolean>("buttons");

	// So that the script would stop throwing errors when the navigator collapses
	if (MangaURL?.href !== cacheMangaURL) cacheMangaURL = MangaURL.href;
	if (MangaChapter?.textContent !== cacheMangaChapter)
		cacheMangaChapter = MangaChapter.textContent;

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
				url: cacheMangaURL
			}
		];
	}
	if (!buttons) delete presenceData.buttons;
	presence.setActivity(presenceData);
});
