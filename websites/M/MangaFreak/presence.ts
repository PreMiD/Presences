const presence = new Presence({ clientId: "1007662369058594937" }),
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

enum Assets {
	Logo = "https://i.imgur.com/1yBi5L5.jpg",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		[time, showButtons, showCover] = await Promise.all([
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("cover"),
		]),
		{ pathname, href } = document.location,
		pathArr = pathname.split("/"),
		page = pathArr[1],
		pageDetails = pathArr[2];

	switch (page) {
		case "":
			presenceData.details = "Viewing home";
			break;
		case "Mangalist":
		case "Latest_Releases":
			presenceData.details = `Browsing mangas ${
				page === "Mangalist" ? "mangas" : "latest releases"
			}`;
			presenceData.state = `Page ${
				document.querySelector<HTMLLinkElement>("a.active").textContent
			}`;
			break;
		case "Genre":
			presenceData.details = "Browsing mangas by genre";
			presenceData.details = pageDetails === "" ? "All" : pageDetails;
			break;
		case "History":
		case "Bookmark":
			presenceData.details = `Viewing their ${
				page === "History" ? "history" : "bookmarks"
			}`;
			break;
		case "Search":
			presenceData.details = "Searching for mangas";
			presenceData.state = pageDetails;
			presenceData.smallImageKey = Assets.Search;
			break;
		case "Manga": {
			presenceData.details = "Viewing a manga";
			const mangaData: HTMLCollection =
				document.querySelector<HTMLHeadingElement>(
					".manga_series_data"
				).children;
			presenceData.state = `${mangaData[0].textContent} (${mangaData[4].textContent})`;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				".manga_series_image > img"
			).src;

			presenceData.buttons = [{ label: "View Manga", url: href }];
			break;
		}
		default:
			presenceData.details = `Reading ${
				document.querySelector<HTMLLinkElement>(".title > a").textContent
			}`;
			presenceData.state = document.querySelector(
				'option[selected="selected"]'
			).textContent;

			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = `Page ${
				document.querySelector("option.selected").textContent
			}/${
				document
					.querySelector("div.read_selector")
					.lastChild.textContent.split(" ")[1]
			}`;

			presenceData.buttons = [{ label: "Read Chapter", url: href }];
	}

	if (!time) delete presenceData.startTimestamp;
	if (!showButtons) delete presenceData.buttons;
	if (!showCover) presenceData.largeImageKey = Assets.Logo;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
