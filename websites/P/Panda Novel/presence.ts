const presence = new Presence({
		clientId: "1064394161807167568",
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

async function getStrings() {
	return presence.getStrings(
		{
			viewHome: "general.viewHome",
			buttonViewPage: "general.buttonViewPage",
			viewing: "general.viewing",
			reading: "general.reading",
			search: "general.search",
			searchFor: "general.searchFor",
			searchSomething: "general.searchSomething",
			chapter: "general.chapter",
			manga: "general.manga",
			viewAccount: "general.viewAccount",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>;

enum Assets {
	Logo = "https://i.imgur.com/0gC8SLN.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

enum NotTranslated {
	Authors = "authors",
	Comments = "comments",
	Library = "library",
	Novel = "novel",
	NovelPage = "novel page",
	PopularManga = "popular manga",
	ThisWeeksNewNovels = "this weeks new novels",
	TopNovelsRead = "top novels read",
	WorksOfTheAuthor = "works of the author",
}

function textContent(tags: string) {
	return document.querySelector(tags)?.textContent?.trim();
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			details: "Somewhere on the site",
		},
		[privacy, logo, time, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("logo"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
		]),
		{ pathname, href } = document.location,
		path = pathname.split("/");

	if (!strings) strings = await getStrings();

	switch (path[1]) {
		case "top":
			presenceData.details = strings.viewHome;
			break;

		case "details":
			presenceData.details = `${strings.viewing} ${NotTranslated.NovelPage}`;
			presenceData.state = textContent(".novel-desc h1");
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>(
					".novel-cover i"
				)?.dataset?.src;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = "Viewing";
			presenceData.buttons = [{ label: strings.buttonViewPage, url: href }];
			break;

		case "content":
			presenceData.details = `${strings.reading} ${
				privacy
					? NotTranslated.Novel
					: textContent(".breadcrumb li:nth-child(2) h1")
			}`;
			presenceData.state = textContent(".breadcrumb li:nth-child(3) span");
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Reading";
			presenceData.buttons = [
				{
					label: strings.buttonViewPage,
					url: document.querySelector<HTMLLinkElement>(
						".breadcrumb li:nth-child(2) a"
					)?.href,
				},
			];
			break;

		case "browsenovel":
			presenceData.details = !privacy
				? strings.searchFor
				: strings.searchSomething;
			presenceData.state = textContent(".filter-list .current");
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = "Searching";
			break;

		case "rankings":
			presenceData.details = `${strings.viewing} ${NotTranslated.TopNovelsRead}`;
			presenceData.state = textContent(".ranking-tabs .current");
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = "Viewing";
			break;

		case "author":
			presenceData.details = !privacy
				? `${strings.searchFor} ${NotTranslated.Authors}`
				: strings.searchSomething;
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = "Searching";
			if (path[2] === "works") {
				presenceData.details = `${strings.viewing} ${NotTranslated.WorksOfTheAuthor}`;
				presenceData.state = textContent(".author-desc dl dd h4");
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(
						".author-portrait i"
					)?.dataset?.src;
				presenceData.smallImageKey = Assets.Viewing;
				presenceData.smallImageText = "Viewing";
				presenceData.buttons = [
					{
						label: strings.buttonViewPage,
						url: href,
					},
				];
			}
			break;

		case "manga":
			presenceData.details = `${strings.viewing} ${NotTranslated.PopularManga}`;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = "Viewing";
			switch (path[2]) {
				case "details":
				case "novel":
					presenceData.details = `${
						strings.viewing
					} ${strings.chapter.toLowerCase()} ${textContent(
						".details-tabs .current"
					).toLowerCase()}`;
					presenceData.state = textContent(".section-title span");
					presenceData.smallImageKey = Assets.Viewing;
					presenceData.smallImageText = "Viewing";
					presenceData.buttons = [
						{
							label: strings.buttonViewPage,
							url: href,
						},
					];
					break;

				case "content":
					presenceData.details = `${strings.reading} ${
						privacy
							? strings.manga.toLowerCase()
							: textContent(".breadcrumb li:nth-child(2) h1")
					}`;
					presenceData.state = textContent(".breadcrumb li:nth-child(3) span");
					presenceData.smallImageKey = Assets.Reading;
					presenceData.smallImageText = "Reading";
					presenceData.buttons = [
						{
							label: strings.buttonViewPage,
							url: document.querySelector<HTMLLinkElement>(
								".breadcrumb li:nth-child(2) a"
							)?.href,
						},
					];
					break;
			}
			break;

		case "newnovel":
			presenceData.details = `${strings.viewing} ${NotTranslated.ThisWeeksNewNovels}`;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = "Viewing";
			break;

		case "presearch":
		case "search":
			presenceData.details = !privacy
				? `${strings.searchFor} ${NotTranslated.Novel}`
				: strings.searchSomething;
			presenceData.state =
				document.querySelector<HTMLInputElement>("input")?.value;
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = "Searching";
			if (path[2]) presenceData.state = textContent(".header-content h4 i");
			break;

		case "ucenter":
			presenceData.details = strings.viewAccount;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = "Viewing";
			if (path[2] === "reviews") {
				presenceData.details = `${strings.viewing} ${NotTranslated.Comments}`;
				presenceData.state = textContent(".header-tabs .current");
			}
			break;

		case "library":
		case "history":
			presenceData.details = `${strings.viewing} ${NotTranslated.Library}`;
			presenceData.state = textContent(".header-tabs .current");
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = "Viewing";
			break;
	}

	if ((!logo || privacy) && presenceData.largeImageKey !== Assets.Logo)
		presenceData.largeImageKey = Assets.Logo;
	if (!buttons || privacy) delete presenceData.buttons;
	if (time) presenceData.startTimestamp = browsingTimestamp;
	if (privacy) delete presenceData.state;
	presence.setActivity(presenceData);
});
