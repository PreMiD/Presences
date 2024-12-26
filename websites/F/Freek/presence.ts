const presence = new Presence({
		clientId: "1321328844497752124",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/wmHltUl.png",
}

let video = {
	duration: 0,
	currentTime: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
		type: ActivityType.Watching,
		details: "Unsupported  Page",
	};

	const { href, pathname } = document.location,
		[showTimestamp, showButtons, privacy] = await Promise.all([
			presence.getSetting<boolean>("timestamp"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("privacy"),
		]);

	if (privacy) {
		presenceData.details = "Watching Freek";
		presence.setActivity(presenceData);
		return;
	}

	const pages: Record<string, PresenceData> = {
		"/": {
			details: "Browsing Home",
			smallImageKey: Assets.Viewing,
		},
		"/watchlist": {
			details: "Browsing Watchlist",
			smallImageKey: Assets.Viewing,
		},
		"/history": {
			details: "Browsing History",
			smallImageKey: Assets.Viewing,
		},
	};

	for (const [path, data] of Object.entries(pages))
		if (pathname.includes(path)) presenceData = { ...presenceData, ...data };

	const pageNumber = href.includes("?page=") ? href.split("?page=")[1] : 1,
		searchInput = document.querySelector("input")
			? document.querySelector("input").getAttribute("value")
			: null,
		searchResults = document.querySelector(
			"div.flex.items-center.justify-between > span.flex.items-center.gap-1"
		)?.textContent,
		steamTitle = document.querySelector("div#right-header > div")
			? document.querySelector("div#right-header > div")?.textContent
			: document.querySelector("div.flex > span.flex-grow")?.textContent;

	if (pathname.includes("/watch/")) {
		const [startTimestamp, endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			),
			episodeName = document.querySelector(
				"div.pointer-events-none > button > div > span.font-light"
			),
			episodeNumber = href.includes("?ep=") ? href.split("?ep=")[1] : 1;

		switch (pathname.split("/watch")[1].split("/")[1]) {
			case "movie":
				presenceData.details = steamTitle;
				presenceData.state = `⭐ ${
					document.querySelector("div.flex > div.false > span.rounded-md")
						?.textContent
				} 🗓️ ${
					document.querySelectorAll("div.flex.flex-col > span")[3]?.textContent
				}`;
				presenceData.largeImageKey = document
					.querySelector(
						"div.flex > div.false > span.lazy-load-image-background > img"
					)
					?.getAttribute("src");
				presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
				presenceData.smallImageText = video.paused ? "Paused" : "Playing";
				presenceData.buttons = [
					{
						label: "Watch Movie",
						url: href,
					},
				];
				break;
			case "tv":
			case "anime":
				presenceData.details = steamTitle;
				presenceData.state = `📺 ${
					episodeName
						? `${episodeNumber}. ${episodeName?.textContent}`
						: `Episode ${episodeNumber}`
				}`;
				presenceData.largeImageKey = document
					.querySelector(
						"div.flex > div.false > span.lazy-load-image-background > img"
					)
					?.getAttribute("src");
				presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
				presenceData.smallImageText = video.paused ? "Paused" : "Playing";
				presenceData.buttons = [
					{
						label: "Watch Episode",
						url: href,
					},
				];
				break;
			default:
				presenceData.details = "Watching a Video";
				break;
		}

		if (showTimestamp) {
			[presenceData.startTimestamp, presenceData.endTimestamp] = [
				startTimestamp,
				endTimestamp,
			];
		}

		if (video.paused) delete presenceData.endTimestamp;
	} else if (pathname.includes("/explore")) {
		presenceData.state = `Page ${pageNumber} - ${searchResults}`;
		presenceData.smallImageKey = Assets.Viewing;

		if (searchInput) {
			presenceData.state = `Query: ${searchInput}`;
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = `Page ${pageNumber} - ${searchResults}`;
		}
		switch (pathname.split("/explore/")[1]) {
			case "movie":
				presenceData.details = "Exploring Movies";

				if (searchInput) presenceData.details = "Searching for Movies";

				break;
			case "tv":
				presenceData.details = "Exploring TV Shows";

				if (searchInput) presenceData.details = "Searching for TV Shows";
				break;
			case "anime":
				presenceData.details = "Exploring Anime";
				if (searchInput) presenceData.details = "Searching for Anime";
				break;
			default:
				presenceData.details = "Exploring";
				break;
		}
	} else if (pathname.includes("/search")) {
		presenceData.details = `Searching for ${
			href.includes("type=") ? href.split("type=")[1] : "movie"
		}`;
		presenceData.state = `Query: ${document
			.querySelector("input")
			.getAttribute("value")}`;
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = `Page ${
			href.includes("page=") ? href.split("page=")[1].split("&type")[0] : 1
		} - ${searchResults}`;
	}

	if (!showButtons && presenceData.buttons) delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
