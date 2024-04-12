const presence = new Presence({
		clientId: "861567034706100234",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/F/fbox.to/assets/logo.png",
}

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
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
			largeImageKey: Assets.Logo,
		},
		{ pathname, href } = document.location,
		[buttons, image] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("image"),
		]);

	if (pathname === "/home" || pathname === "/")
		presenceData.details = "Browsing";
	else if (pathname.startsWith("/tv/")) {
		const title = document.querySelector<HTMLHeadingElement>(
				"section#w-info > div.info > h1.name"
			),
			{ season, episode } = extractSeasonEpisode(pathname);
		if (title) presenceData.details = title.textContent;
		if (season) {
			presenceData.state = `Season ${season}`;
			if (episode) presenceData.state += ` Episode ${episode}`;
		}
		if (image) {
			presenceData.largeImageKey =
				document
					.querySelector("meta[property='og:image']")
					?.getAttribute("content") ??
				document
					.querySelector('[class="poster"] > [itemprop="image"]')
					?.getAttribute("src") ??
				Assets.Logo;
		}
		if (iFrameData && !iFrameData.paused) {
			[, presenceData.endTimestamp] = presence.getTimestamps(
				iFrameData.currTime,
				iFrameData.duration
			);
			presenceData.smallImageKey = Assets.Play;
		} else presenceData.smallImageKey = Assets.Pause;
		if (buttons) {
			presenceData.buttons = [
				{
					label: "Watch Series",
					url: href,
				},
			];
		}
	} else if (pathname.startsWith("/movie/")) {
		const title = document.querySelector<HTMLHeadingElement>(
			"section#w-info > div.info > h1.name"
		);
		if (title) presenceData.details = title.textContent;
		if (image) {
			presenceData.largeImageKey =
				document
					.querySelector("meta[property='og:image']")
					?.getAttribute("content") ??
				document
					.querySelector('[class="poster"] > [itemprop="image"]')
					?.getAttribute("src") ??
				Assets.Logo;
		}
		if (iFrameData && !iFrameData.paused) {
			[, presenceData.endTimestamp] = presence.getTimestamps(
				iFrameData.currTime,
				iFrameData.duration
			);
			presenceData.smallImageKey = Assets.Play;
		} else presenceData.smallImageKey = Assets.Pause;
		if (buttons) {
			presenceData.buttons = [
				{
					label: "Watch Movie",
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
		}
	}

	presence.setActivity(presenceData);
});

function extractSeasonEpisode(url: string): {
	season: number;
	episode: number;
} {
	// This regular expression matches URLs that follow the pattern /tv/show-name/season-number-episode-number
	// It captures the season number and episode number from the URL
	const match = url.match(/\/tv\/[^/]+\/(\d+)-(\d+)/);
	if (match) {
		return {
			season: parseInt(match[1], 10),
			episode: parseInt(match[2], 10),
		};
	}
	return { season: 0, episode: 0 };
}
