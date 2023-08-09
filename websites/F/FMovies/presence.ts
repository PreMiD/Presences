const presence = new Presence({
		clientId: "943521983730171966",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let iFrameData: {
	currTime: number;
	duration: number;
	paused: boolean;
} = null;

presence.on(
	"iFrameData",
	(data: { currTime: number; duration: number; paused: boolean }) => {
		iFrameData = data;
	}
);

function setCommonData(
	presenceData: PresenceData,
	document: Document,
	iFrameData: { currTime: number; duration: number; paused: boolean },
	href: string
) {
	if (document) {
		delete presenceData.startTimestamp;
		presenceData.details =
			document.querySelector('[itemprop="image"]')?.getAttribute("alt") ??
			document.querySelector('[itemprop="name"]')?.textContent ??
			"Unknown";
		presenceData.largeImageKey =
			document.querySelector('[itemprop="image"]')?.getAttribute("src") ??
			Assets.Logo;
		if (iFrameData && !iFrameData.paused) {
			[, presenceData.endTimestamp] = presence.getTimestamps(
				iFrameData.currTime,
				iFrameData.duration
			);
			presenceData.smallImageKey = Assets.Play;
		} else presenceData.smallImageKey = Assets.Pause;
		presenceData.buttons = [
			{
				label: href.includes("/movie") ? "Watch Movie" : "Watch Series",
				url: href,
			},
		];
	}
	return presenceData;
}

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD//websites/F/FMovies/assets/logo.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
			largeImageKey: Assets.Logo,
		},
		{ href, pathname } = document.location,
		[buttons, image] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("image"),
		]);

	if (pathname.includes("/series/") || pathname.includes("/tv/")) {
		const season =
				document
					.querySelector(".watch[data-season]")
					?.getAttribute("data-season") || null,
			episode =
				document.querySelector(".watch[data-ep]")?.getAttribute("data-ep") ||
				null;

		if (season !== null || episode !== null) {
			presenceData.state =
				episode && season
					? `S${season}:E${episode}`
					: episode && !season
					? `Episode ${episode}`
					: !episode && season
					? `Season ${season}`
					: "";
		}
		setCommonData(presenceData, document, iFrameData, href);
	} else if (pathname.startsWith("/movie/"))
		setCommonData(presenceData, document, iFrameData, href);
	else if (pathname === "/user/profile")
		presenceData.details = "Checking Profile";
	else if (pathname === "/user/watchlist")
		presenceData.details = "Checking Watchlist";
	else {
		const genre = document.querySelector<HTMLHeadingElement>("section.bl h1");
		if (genre) {
			presenceData.details = genre.textContent;
			presenceData.smallImageKey = Assets.Search;
		} else presenceData.details = "Browsing";
	}

	if (presenceData.buttons && !buttons) delete presenceData.buttons;
	if (presenceData.largeImageKey !== Assets.Logo && !image)
		presenceData.largeImageKey = Assets.Logo;
	presence.setActivity(presenceData);
});
