const presence = new Presence({
		clientId: "943521983730171966",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let iFrameData = {
	currTime: -1,
	duration: -1,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: { currTime: number; duration: number; paused: boolean }) => {
		iFrameData = data;
	}
);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/F/FMovies/assets/logo.png",
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

	if (
		pathname.includes("/series/") ||
		pathname.includes("/tv/") ||
		pathname.includes("/watch") ||
		pathname.includes("/film/") ||
		pathname.includes("/movie/")
	) {
		delete presenceData.startTimestamp;
		const isMovie =
				href.includes("-movie") ||
				href.includes("/movie") ||
				href.includes("-film") ||
				href.includes("/film"),
			title =
				document.querySelector(
					'[aria-current="page"],[itemprop="name"],#name,.card-title fs-4,.Title'
				)?.textContent ??
				document.querySelector('[itemprop="image"]')?.getAttribute("alt") ??
				document.querySelector(".film-poster-img")?.getAttribute("title") ??
				document
					.querySelector(".lazy.img-fluid.rounded")
					?.getAttribute("alt") ??
				"Unknown";

		if (!iFrameData?.currTime || iFrameData?.currTime === -1) {
			presenceData.details = isMovie ? "Viewing movie:" : "Viewing series:";
			presenceData.state = title;

			presenceData.buttons = [
				{
					label: isMovie ? "View Movie" : "View Series",
					url: href,
				},
			];
		} else {
			if (!isMovie && title.toLowerCase().includes("season")) {
				const splitEl = title.split("-");
				presenceData.details = splitEl?.[0];
				presenceData.state = `${splitEl?.[1] ?? "Unknown season"} - ${
					splitEl?.[2]?.split(":")?.[0] ?? "unknown episode"
				}`;
			} else presenceData.details = title;

			presenceData.largeImageKey =
				document.querySelector('[itemprop="image"]')?.getAttribute("src") ??
				Assets.Logo;
			if (!iFrameData?.paused) {
				[, presenceData.endTimestamp] = presence.getTimestamps(
					iFrameData.currTime,
					iFrameData.duration
				);
				presenceData.smallImageKey = Assets.Play;
			} else presenceData.smallImageKey = Assets.Pause;
			presenceData.buttons = [
				{
					label: isMovie ? "Watch Movie" : "Watch Series",
					url: href,
				},
			];
		}
	} else if (pathname === "/user/profile")
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
