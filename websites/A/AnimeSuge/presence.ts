const presence = new Presence({
		clientId: "863949633009090580",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/A/AnimeSuge/assets/logo.png",
}

let timeEnd: number,
	currentTime: number,
	paused = true;

presence.on(
	"iFrameData",
	async (data: { currentTime: number; timeEnd: number; paused: boolean }) => {
		({ currentTime, timeEnd, paused } = data);
	}
);

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	};
	const { pathname, href } = document.location,
		epNumber = pathname.slice(pathname.length - 5).replace(/^\D+/g, ""),
		search: URLSearchParams = new URLSearchParams(
			document.location.search.substring(1)
		),
		pages: Record<string, PresenceData> = {
			"/genre": {
				details: "Searching by genre",
				state: `Searching for ${document
					.querySelector(".heading > h2")
					?.textContent?.toLowerCase()}s`,
			},
			"/search": {
				details: "Searching anime by name",
				state: `Searching: "${search.get("keyword")}"`,
				smallImageKey: Assets.Search,
				smallImageText: "Searching",
			},
			"/faq": {
				details: "Reading the FAQ",
				state: "Reading",
				smallImageKey: Assets.Reading,
			},
			"/contact": {
				details: "Reading the contacts",
				state: "Reading",
				smallImageKey: Assets.Reading,
			},
			"/user/settings": { details: "Changing the settings", state: "Changing" },
			"/user/watchlist": {
				details: "Looking at their watchlist",
				state: search.get("folder")
					? `In folder: ${search.get("folder")}`
					: "In all folders",
			},
			"/user/import": {
				details: "Importing their MAL list to Animesuge!",
				state: "Importing",
				smallImageKey: Assets.Uploading,
			},
			"/newest": { details: "Searching for the newest animes" },
			"/updated": { details: "Searching for recently updated animes" },
			"/ongoing": { details: "Searching for ongoing animes" },
			"/added": { details: "Searching recently added animes" },
			"/tv": { details: "Searching for TV animes" },
			"/movie": { details: "Searching movie animes" },
			"/ova": { details: "Searching for OVA animes" },
			"/ona": { details: "Searching for ONA animes" },
			"/special": { details: "Searching for special anime episodes" },
			"/az-list": { details: "Seaching all animes" },
			"/most-watched": { details: "Searching most watched animes" },
			"/upcoming": { details: "Searching upcoming animes" },
			"/home": { details: "At the homepage" },
		};

	if (pathname.includes("/anime/")) {
		delete presenceData.startTimestamp;
		presenceData.details = `Watching ${
			document.querySelector('[itemprop="name"]')?.textContent
		}`;

		if (epNumber === "") presenceData.state = "Full episode";
		else presenceData.state = `Episode ${epNumber}`;

		if (!paused) {
			presenceData.smallImageKey = Assets.Play;
			[, presenceData.endTimestamp] = presence.getTimestamps(
				currentTime,
				timeEnd
			);
		} else {
			presenceData.smallImageKey = Assets.Pause;
			presenceData.smallImageText = "Paused";
		}
		presenceData.buttons = [
			{
				label: "Watch Episode",
				url: href,
			},
		];
	} else if (pathname === "/") presenceData.details = "Viewing the homepage";
	else {
		for (const [path, data] of Object.entries(pages)) {
			if (pathname !== "/" && pathname.includes(path))
				presenceData = { ...presenceData, ...data };
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
});
