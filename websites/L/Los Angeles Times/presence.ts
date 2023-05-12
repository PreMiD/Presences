const presence = new Presence({
		clientId: "1005501034191409153",
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
	const title = document.title.replace(" - Los Angeles Times", ""),
		[privacyMode, showButtons, showArticleAuthor, showMoreDetails] =
			await Promise.all([
				presence.getSetting<boolean>("privacy"),
				presence.getSetting<boolean>("buttons"),
				presence.getSetting<boolean>("articleAuthor"),
				presence.getSetting<boolean>("moreDetails"),
			]),
		{ pathname, href, search } = window.location,
		path = pathname.split("/"),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/Z6MOTZp.jpg",
			startTimestamp: browsingTimestamp,
		};

	if (showButtons && !privacyMode) {
		presenceData.buttons = [
			{
				label: "View Page",
				url: href,
			},
		];
	}

	if (!path[1]) {
		presenceData.details = "Viewing Home Page";
		delete presenceData.buttons;
	} else if (pathname.includes("/topic/")) {
		presenceData.details = "Viewing a Topic";
		if (!privacyMode) presenceData.state = title;
	} else if (pathname.includes("/search")) {
		presenceData.details = privacyMode ? "Searching" : "Searching for";
		if (!privacyMode) presenceData.state = new URLSearchParams(search).get("q");

		if (showButtons && !privacyMode) {
			presenceData.buttons = [
				{
					label: "Show Search Results",
					url: href,
				},
			];
		}
	} else if (path[1] === "people" && path[2]) {
		const author = {
			name:
				document.querySelector("h1.author-name")?.textContent ??
				title ??
				"Unknown",
			title: document.querySelector("p.author-title")?.textContent,
			avatar: document.querySelector<HTMLImageElement>(
				"div.author-avatar > picture > img"
			),
		};

		presenceData.details = "Viewing an Author";
		presenceData.state = `${author.name}${
			author.title ? ` (${author.title})` : ""
		}`;

		if (author.avatar) {
			presenceData.smallImageKey = await getShortURL(author.avatar.src);
			presenceData.smallImageText = author.name;
		}
	} else if (hasDatePath(pathname) && path[4]) {
		const author = {
				img: document.querySelector<HTMLImageElement>(
					"div.author-avatar a > img"
				),
				name: document.querySelector("div.author-avatar a")?.ariaLabel.trim(),
			},
			authors = document.querySelector("div.authors > div.author-name"),
			headline = document.querySelector("h1.headline")?.textContent ?? title;

		presenceData.details = !showMoreDetails ? "Reading an Article" : headline;

		if (!privacyMode) {
			presenceData.state = showMoreDetails
				? `${authors?.textContent.trim() ?? `By ${author.name}`}, ${
						document.querySelector("time span")?.textContent
				  }`
				: headline;
		}

		if (showButtons && !privacyMode) {
			presenceData.buttons = [
				{
					label: "Read Article",
					url: href,
				},
			];
		}

		if (showArticleAuthor && !privacyMode && author.name) {
			presenceData.smallImageKey = await getShortURL(author.img?.src);
			presenceData.smallImageText =
				authors?.textContent.trim() ?? `By ${author.name}`;
		}
	} else if (path[1] === "projects" && path[2]) {
		presenceData.details = "Viewing a Project";
		if (!privacyMode) {
			presenceData.state = title;

			if (showButtons) {
				presenceData.buttons = [
					{
						label: "View Project",
						url: href,
					},
				];
			}
		}
	} else {
		switch (path[1]) {
			case "bestcovery": {
				const categories = [
						"auto",
						"home",
						"lifestyle",
						"electronics",
						"tech",
						"health-beauty",
						"fashion",
						"sports",
						"music",
						"kids-babies",
						"streaming",
					],
					title = document.title.replace(" - Bestcovery", "");

				presenceData.largeImageKey = "bestcovery";
				presenceData.smallImageKey = "logo-small";
				presenceData.smallImageText = "Bestcovery powered by L.A. Times";

				if (categories.includes(path[2])) {
					presenceData.details = "Viewing a Category";
					presenceData.buttons[0].label = "View Category";

					if (!privacyMode) presenceData.state = title;
				} else {
					presenceData.details = "Reading a Review";
					presenceData.state = title.replace(" | Review by Bestcovery", "");
					presenceData.buttons[0].label = "Read Article";
				}

				break;
			}

			case "coupon-codes": {
				presenceData.details = "Viewing Coupon Codes";
				break;
			}

			case "games": {
				presenceData.details = "Viewing Games";

				if (!privacyMode && path[2]) {
					presenceData.details = "Playing a Game";
					presenceData.state =
						document.querySelector("h2.subhead")?.textContent;
					presenceData.buttons[0].label = "View Game";
				}

				break;
			}

			default:
				if (path[1]) {
					presenceData.details = "Viewing a Category";

					if (!privacyMode) presenceData.state = title;
				}
		}
	}

	if (!presenceData.state) delete presenceData.state;
	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});

const shortenedURLs: Record<string, string> = {};
async function getShortURL(url: string) {
	if (!url || url.length < 256) return url;
	if (shortenedURLs[url]) return shortenedURLs[url];
	try {
		const pdURL = await (
			await fetch(`https://pd.premid.app/create/${url}`)
		).text();
		shortenedURLs[url] = pdURL;
		return pdURL;
	} catch (err) {
		presence.error(err);
		return url;
	}
}

function hasDatePath(pathname: string) {
	return /[0-9]{4}-[0-9]{2}-[0-9]{2}/g.test(pathname);
}
