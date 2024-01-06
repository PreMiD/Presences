const presence = new Presence({
		clientId: "863949633009090580",
	}),
	pages: { [k: string]: string } = {
		"/anime": "Watching an anime",
		"/genre": "Searching by genre",
		"/search": "Searching anime by name",
		"/faq": "Reading the FAQ",
		"/contact": "Reading the contacts",
		"/user/settings": "Changing the settings",
		"/user/watchlist": "Looking at their watchlist",
		"/user/import": "Importing their MAL list to Animesuge!",
		"/home": "At the homepage",
		"/": "At the homepage",
		"/newest": "Searching for the newest animes",
		"/updated": "Searching for recently updated animes",
		"/ongoing": "Searching for ongoing animes",
		"/added": "Searching recently added animes",
		"/tv": "Searching for TV animes",
		"/movie": "Searching movie animes",
		"/ova": "Searching for OVA animes",
		"/ona": "Searching for ONA animes",
		"/special": "Searching for special anime episodes",
		"/az-list": "Seaching all animes",
		"/most-watched": "Searching most watched animes",
		"/upcoming": "Searching upcoming animes",
	};

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/A/AnimeSuge/assets/logo.png",
}

let timeEnd: number, currentTime: number, paused: boolean;

presence.on(
	"iFrameData",
	async (data: { currentTime: number; timeEnd: number; paused: boolean }) => {
		({ currentTime, timeEnd, paused } = data);
	}
);

presence.on("UpdateData", async () => {
	const page = document.location.pathname,
		epNumber = page.slice(page.length - 5).replace(/^\D+/g, ""),
		presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: Math.floor(Date.now() / 1000),
		},
		search: URLSearchParams = new URLSearchParams(
			document.location.search.substring(1)
		);
	if (page in pages) {
		presenceData.details = pages[page];
		presenceData.state = "Searching animes";
	} else if (page.includes("/anime")) {
		presenceData.details = `Watching ${
			document.querySelector<HTMLElement>(
				"#body > div > div > div > div > section > div > h1"
			).textContent
		}`;

		if (epNumber === "") presenceData.state = "Full episode";
		else presenceData.state = `Episode ${epNumber}`;

		if (!paused) {
			presenceData.smallImageKey = Assets.Play;
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(currentTime, timeEnd);
		} else {
			presenceData.smallImageKey = Assets.Pause;
			presenceData.smallImageText = "Paused";
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
		presenceData.buttons = [
			{
				label: "Watch Episode",
				url: `http://animesuge.to${page}`,
			},
		];
	} else if (page.includes("/genre")) {
		const genre = page.slice("/genre/".length);
		presenceData.details = pages["/genre"];
		presenceData.state = `Searching for ${
			genre.charAt(0).toUpperCase() + genre.slice(1)
		} Animes`;
	} else if (page.includes("/search")) {
		presenceData.details = pages[page];
		presenceData.state = `Searching: "${search.get("keyword")}"`;
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = "Searching";
	} else {
		switch (page) {
			case "/faq": {
				presenceData.details = pages[page];
				presenceData.state = "Reading";
				presenceData.smallImageKey = Assets.Reading;

				break;
			}
			case "/contact": {
				presenceData.details = pages[page];
				presenceData.state = "Reading";
				presenceData.smallImageKey = Assets.Reading;

				break;
			}
			case "/user/settings": {
				presenceData.details = pages[page];
				presenceData.state = "Changing";

				break;
			}
			case "/user/watchlist": {
				const list = search.get("folder");
				presenceData.details = pages[page];
				presenceData.state = `At folder: ${list}`;
				if (list === null)
					presenceData.state = "Looking at all animes in the watch list";

				break;
			}
			case "/user/import": {
				presenceData.details = pages[page];
				presenceData.state = "Importing!";

				break;
			}
			default: {
				presenceData.details = "Looking at an unknown page";
				presenceData.state = "Unknown";
			}
		}
	}
	if (presenceData.details && presenceData.state)
		presence.setActivity(presenceData);
});
