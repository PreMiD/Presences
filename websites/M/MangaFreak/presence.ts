const presence = new Presence({ clientId: "1007662369058594937" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/M/MangaFreak/assets/logo.jpg",
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
