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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/F/FMovies/assets/logo.png",
		},
		{ pathname, href } = document.location,
		[buttons, image] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("image"),
		]);

	if (pathname === "/home") presenceData.details = "Browsing";
	else if (pathname.startsWith("/series/")) {
		const title = document.querySelector<HTMLHeadingElement>(
				"#watch > div.container > div.watch-extra > div.bl-1 > section.info > div.info > h1"
			),
			season = document.querySelector<HTMLSpanElement>(".value"),
			episode = document.querySelector<HTMLAnchorElement>("a.active");
		if (title) presenceData.details = title.textContent;
		if (season) {
			presenceData.state = season.textContent.split("-")[0].trim();
			if (episode) presenceData.state += ` - ${episode.textContent.trim()}`;
		}
		if (image) {
			presenceData.largeImageKey = document
				.querySelector("meta[property='og:image']")
				.getAttribute("content");
		}
		if (!iFrameData?.paused) {
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
			"#watch > div.container > div.watch-extra > div.bl-1 > section.info > div.info > h1"
		);
		if (title) presenceData.details = title.textContent;
		if (image) {
			presenceData.largeImageKey = document
				.querySelector("meta[property='og:image']")
				.getAttribute("content");
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
