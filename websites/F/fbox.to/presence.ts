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
		]),
		search = document.querySelector<HTMLInputElement>('[type="text"]');

	if (search?.value) {
		presenceData.details = "Searching for:";
		presenceData.state = search.value;
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname === "/home" || pathname === "/")
		presenceData.details = "Browsing";
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
			presenceData.largeImageKey =
				document
					.querySelector("meta[property='og:image']")
					?.getAttribute("content") ?? Assets.Logo;
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
			"#watch > div.container > div.watch-extra > div.bl-1 > section.info > div.info > h1"
		);
		if (title) presenceData.details = title.textContent;
		if (image) {
			presenceData.largeImageKey =
				document
					.querySelector("meta[property='og:image']")
					?.getAttribute("content") ?? Assets.Logo;
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
