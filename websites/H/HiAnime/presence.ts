const presence = new Presence({
		clientId: "1127962521609973881",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let data: {
	currTime: number;
	duration: number;
	paused: boolean;
} = null;

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/A/AniWatch/assets/3.png",
	Settings = "https://cdn.rcd.gg/PreMiD/websites/A/AniWatch/assets/1.png",
	Notifications = "https://cdn.rcd.gg/PreMiD/websites/A/AniWatch/assets/2.png",
}

presence.on(
	"iFrameData",
	async (recievedData: {
		currTime: number;
		duration: number;
		paused: boolean;
	}) => {
		data = recievedData;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			name: "HiAnime",
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location,
		buttons = await presence.getSetting<boolean>("buttons");

	if (pathname === "/" || pathname === "/home")
		presenceData.details = "Exploring HiAnime.to";
	else if (
		/\/(most-favorite|most-popular|movie|recently-added|recently-updated|tv|top-airing|top-upcoming|ona|ova|special|(genre\/.*))/.test(
			pathname
		)
	) {
		const heading = document.querySelector<HTMLHeadElement>("h2.cat-heading");
		if (heading) presenceData.details = `Looking at ${heading.textContent}`;
	} else if (pathname.startsWith("/news")) {
		presenceData.details = "Looking at Anime news";
		if (pathname !== "/news") {
			const title = document.querySelector<HTMLHeadingElement>("h2.news-title");
			if (title) presenceData.state = title.textContent;
		}
	} else if (pathname.startsWith("/community/user")) {
		const profile = document.querySelector<HTMLSpanElement>(
			"#main-wrapper > div.container > div > div.ai_-welcome.text-center > span"
		);
		if (profile) presenceData.details = `Viewing User: ${profile.textContent}`;
		presenceData.smallImageKey = Assets.Viewing;
	} else if (pathname.startsWith("/producer")) {
		const name = document.querySelector(
			"#main-content > section > div.block_area-header.block_area-header-tabs > div.float-left.bah-heading.mr-4 > h2"
		)?.textContent;

		presenceData.details = name;
		if (buttons) {
			presenceData.buttons = [
				{
					label: "Go to Production Page",
					url: href,
				},
			];
		}
	} else if (
		pathname.startsWith("/people") ||
		pathname.startsWith("/character")
	) {
		const name = document.querySelector<HTMLHeadingElement>("h4.name"),
			isCharacterPage = pathname.startsWith("/character");
		if (name) {
			presenceData.details = `Looking at ${
				!isCharacterPage ? "people" : "characters"
			}`;
			presenceData.state = name.textContent;
		}
		presenceData.smallImageKey = Assets.Viewing;
		if (buttons) {
			presenceData.buttons = [
				{
					label: `Go to ${
						name || isCharacterPage ? "Character" : "People"
					} Page`,
					url: href,
				},
			];
		}
	} else if (pathname.startsWith("/az-list")) {
		presenceData.details = "Looking at Anime list";
		if (pathname !== "/az-list") {
			presenceData.state = `Titles starting with ${
				pathname.substring(9) === "other"
					? "Other characters"
					: `${pathname.substring(9)}`
			}`;
		}
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.startsWith("/watch2gether/")) {
		if (pathname === "/watch2gether/")
			presenceData.details = "Looking for anime rooms";
		else {
			const filmName =
					document.querySelector<HTMLHeadingElement>("h2.film-name"),
				thumbnail = document.querySelector<HTMLImageElement>(
					".anis-watch-detail > .anis-content > .anisc-poster > .film-poster > img.film-poster-img"
				)?.src;

			presenceData.largeImageKey = thumbnail;
			presenceData.details = "In a room";
			if (filmName) presenceData.state = `Watching ${filmName.textContent}`;
			if (data && !data.paused) {
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(data.currTime, data.duration);
			}
			if (buttons) {
				presenceData.buttons = [
					{
						label: "Join Room",
						url: href,
					},
				];
			}
		}
	} else if (pathname.startsWith("/watch")) {
		const title = document.querySelector<HTMLDataListElement>(
				"li.breadcrumb-item.dynamic-name.active"
			),
			episode = document.querySelector<HTMLSpanElement>(
				"a.ep-item.active div.ssli-order"
			),
			thumbnail = document.querySelector<HTMLImageElement>(
				".anis-watch-detail > .anis-content > .anisc-poster > .film-poster > img.film-poster-img"
			)?.src;

		presenceData.largeImageKey = thumbnail;
		if (title) presenceData.details = title.textContent;
		if (episode) presenceData.state = `Episode ${episode.textContent}`;
		if (data && !data.paused) {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(data.currTime, data.duration);
			presenceData.smallImageKey = Assets.Play;
		} else if (data) presenceData.smallImageKey = Assets.Pause;

		if (buttons) {
			presenceData.buttons = [
				{
					label: "Watch Episode",
					url: href,
				},
			];
		}
	} else if (pathname.startsWith("/event/")) {
		const title = document.querySelector<HTMLDivElement>("div.title"),
			description = document.querySelector<HTMLDivElement>("div.description");
		if (title) presenceData.details = `Event: ${title.textContent}`;
		if (description) presenceData.state = description.textContent;
	} else if (pathname.startsWith("/community")) {
		presenceData.details = "Community Post";
		presenceData.state = document.title;
		presenceData.smallImageKey = Assets.Question;
	} else {
		switch (pathname) {
			case "/search": {
				presenceData.details = "Searching";

				const query = document.querySelector(
					"#main-content > section > div.block_area-header.block_area-header-tabs > div.float-left.bah-heading.mr-4 > h2 > i"
				)?.textContent;

				presenceData.state = query;
				presenceData.smallImageKey = Assets.Search;
				break;
			}
			case "/events": {
				presenceData.details = "Looking at events";
				break;
			}
			case "/contact": {
				presenceData.details = "Contact Us";
				break;
			}
			case "/dmca": {
				presenceData.details = "DMCA";
				break;
			}
			case "/terms": {
				presenceData.details = "Terms of Service";
				break;
			}
			case "/user/profile": {
				const username = document
					.querySelector(
						"#main-wrapper > div.profile-header > div.container > div.ph-title"
					)
					.textContent.substring(3);
				presenceData.details = `Viewing profile ${username}`;
				presenceData.smallImageKey = Assets.Viewing;
				break;
			}
			case "/user/settings": {
				presenceData.details = "Changing Settings";
				presenceData.smallImageKey = Assets.Settings;
				break;
			}
			case "/user/notification": {
				presenceData.details = "Looking at Notifications";
				presenceData.smallImageKey = Assets.Notifications;
				break;
			}
			case "/user/watch-list": {
				presenceData.details = "Checking WatchList";
				presenceData.smallImageKey = Assets.Reading;

				const title = document.querySelector(
					"#main-wrapper > div.profile-content > div.container > div > div.fav-tabs.mb-4 > ul > li > a.active"
				);

				presenceData.state = title.textContent;
				break;
			}
			case "/user/continue-watching": {
				presenceData.details = "Continue Watching";
				presenceData.smallImageKey = Assets.Reading;
				break;
			}
			case "/user/mal": {
				presenceData.details = "MAL Import/Export";
				presenceData.smallImageKey = Assets.Downloading;
				break;
			}
			default: {
				const title = document.querySelector<HTMLHeadingElement>(
					"h2.film-name.dynamic-name"
				);
				if (title) {
					const thumbnail = document.querySelector<HTMLImageElement>(
						"#ani_detail > div > div > div.anis-content > div.anisc-poster > div > img"
					)?.src;

					presenceData.largeImageKey = thumbnail;
					presenceData.details = "Checking Synopsis";
					presenceData.state = title.textContent;
					if (buttons) {
						presenceData.buttons = [
							{
								label: "Check Synopsis",
								url: href,
							},
						];
					}
				}
			}
		}
	}

	presence.setActivity(presenceData);
});
