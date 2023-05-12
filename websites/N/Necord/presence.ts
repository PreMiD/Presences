enum SmallImageKeys {
	Idle = "https://i.imgur.com/6A9pxAR.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Read = "https://i.imgur.com/ULFqucm.png",
}

const presence = new Presence({
		clientId: "1081479845940314114",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	IDLE_TIMEOUT = 10 * 60 * 1000,
	settings = [
		"search",
		"docs-page",
		"docs-page-content",
		"docs-page-sidebar",
		"idling",
	];

let sidebar: string = null,
	lastActivity: number = Date.now();

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
			largeImageKey: "https://i.imgur.com/LY804vK.png",
			startTimestamp: browsingTimestamp,
		},
		{ href, pathname, search } = document.location,
		title = document.title.split(" | ")[0],
		privacy = await presence.getSetting("privacy"),
		[
			isSearchPublic,
			isCurrentPagePublic,
			isCurrentContentPublic,
			isSidebarPublic,
			isIdlingPublic,
		] = await Promise.all(
			!privacy
				? settings.map(setting => presence.getSetting(setting))
				: Array(settings.length).fill(false)
		);

	switch (true) {
		case lastActivity + IDLE_TIMEOUT < Date.now() && isIdlingPublic: {
			presenceData.smallImageKey = SmallImageKeys.Idle;
			presenceData.smallImageText = "Idling";
			presenceData.details = "Idling at page: ";
			presenceData.state = title;
			presenceData.startTimestamp = Math.floor(lastActivity / 1000);

			break;
		}

		case pathname.startsWith("/search"): {
			presenceData.smallImageKey = SmallImageKeys.Search;
			presenceData.smallImageText = "Searching";
			presenceData.details = "Searching for something";

			if (search && isSearchPublic) {
				presenceData.details = "Searching for:";
				presenceData.state = [
					search.split("q=")[1],
					`(${
						document.querySelector<HTMLDivElement>("main")?.childElementCount ??
						0
					} results)`,
				].join(" ");

				presenceData.buttons = [
					{
						label: "Show Results",
						url: href,
					},
				];
			}

			break;
		}

		case !!sidebar && isSidebarPublic: {
			presenceData.smallImageKey = SmallImageKeys.Search;
			presenceData.smallImageText = "Searching";
			presenceData.details = "Selecting a category:";
			presenceData.state = sidebar;

			break;
		}

		default: {
			const topmostElem =
				document.querySelector<HTMLLinkElement>(
					".table-of-contents__link--active"
				) ??
				document.querySelector<HTMLLinkElement>(".table-of-contents__link");

			presenceData.smallImageKey = SmallImageKeys.Read;
			presenceData.smallImageText = "Reading";
			presenceData.details = `Reading ${
				isCurrentPagePublic ? title : "a"
			} page${isCurrentContentPublic ? ":" : ""}`;
			presenceData.state = isCurrentContentPublic
				? `${topmostElem.textContent} (${getScrollPercentage().toFixed(2)}%)`
				: null;
			presenceData.buttons = [
				{
					label: "Read Page",
					url: topmostElem.href,
				},
			];

			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});

document.addEventListener("mouseover", e => {
	const target = e.target as HTMLElement;

	if (target.classList.contains("menu__link")) sidebar = target.textContent;
	else if (!target.classList.contains("menu")) sidebar = null;

	lastActivity = Date.now();
});

function getScrollPercentage() {
	const { scrollY, innerHeight } = window,
		{ scrollHeight } = document.body,
		percentage = (scrollY / (scrollHeight - innerHeight)) * 100;

	return percentage === 0 ? 0 : percentage || 100;
}
