type Functionlize<T> = {
	[P in keyof T]: () => T[P];
};

interface Route extends Functionlize<Partial<PresenceData>> {
	path: RegExp;
	playback?(): boolean;
	run?(): PresenceData;
}

enum Settings {
	TIMESTAMP = "timestamp",
	BUTTONS = "buttons",
	LOGO = "logo",
}

enum Icons {
	NEWS = "news",
	TEAM = "team",
	MANGA = "manga",
	READING = "reading",
	LIBRARY = "library",
	SEARCHING = "searching",
	DISCOVERY = "discovery",
	PAINTINGS = "paintings",
}

enum Logos {
	LIGHT = "light-logo",
	DARK = "dark-logo",
}

const presence = new Presence({
		clientId: "862700890414776370",
	}),
	AVERAGE_READING_TIME = 12000,
	searchInput = document.querySelector("#quickSearch"),
	startTimestamp: number = Math.floor(Date.now() / 1000),
	router = ({ path, data }: { path: string; data: PresenceData }): Route => {
		const routes: Route[] = [
			{ path: /^\/$/, details: () => "On Homepage" },
			{
				path: /^\/(mangas|mangas\/featured|mangas\/latest|)$/,
				smallImageKey: () => Icons.DISCOVERY,
				smallImageText: () => "Browsing",
				details: () => "Browsing for Manga",
				buttons: () => [{ label: "Browse", url: location.href }],
			},
			{
				path: /^\/mangas\/\d+\/(.*)+\/[0-9.]+\/(.*)$/,
				run: () => {
					const endTimestamp =
						document.querySelectorAll('[id^="page_"]').length *
							AVERAGE_READING_TIME +
						Date.now();

					data.endTimestamp = endTimestamp / 1000;

					if (Date.now() > endTimestamp) delete data.endTimestamp;

					return data;
				},
				playback: () => !!data.endTimestamp,
				smallImageKey: () => Icons.READING,
				smallImageText: () => "Reading",
				state: () => document.querySelector(".white-link").textContent,
				details: () =>
					`Chapter: ${
						document.querySelector(".reader-dropdown .text").textContent
					}`,
				buttons: () => [
					{ label: "Read Chapter", url: location.href },
					{
						label: "Manga Page",
						url: `https://${location.hostname}${document
							.querySelector(".white-link")
							.getAttribute("href")}`,
					},
				],
			},
			{
				path: /^\/mangas\/\d+\/(.*)+$/,
				details: () => "Viewing a manga",
				state: () => document.querySelector("h1.header").textContent,
				smallImageKey: () => Icons.MANGA,
				smallImageText: () => "Viewing",
				buttons: () => [
					{ label: "View Manga", url: location.href },
					{
						label: "Last Chapter",
						url: `https://${location.hostname}${document
							.querySelector("a.primary.button")
							?.getAttribute("href")}`,
					},
				],
			},
			{
				path: /^\/news+/,
				smallImageKey: () => Icons.NEWS,
				smallImageText: () => "Reading",
				details: () => "Reading News",
				state: () => document.querySelector("h1.header")?.textContent,
				buttons: () => [{ label: "Read News", url: location.href }],
			},
			{
				path: /\/colorings$/,
				smallImageKey: () => Icons.PAINTINGS,
				smallImageText: () => "Viewing",
				details: () => "Viewing Paintings",
				state: () =>
					document
						.querySelector("h1.header")
						.textContent.replace("تلوينات ", ""),
				buttons: () => [{ label: "View Paintings", url: location.href }],
			},
			{
				path: /^\/teams/,
				smallImageKey: () => Icons.TEAM,
				smallImageText: () => "Viewing",
				details: () => "Viewing a Team",
				state: () => document.querySelector("h2.header").textContent,
				buttons: () => [{ label: "View Team", url: location.href }],
			},
			{
				path: /^\/members/,
				smallImageKey: () => Icons.LIBRARY,
				smallImageText: () => "Viewing",
				details: () => "Viewing a User",
				state: () => document.querySelector("h2.header").textContent,
				buttons: () => [{ label: "View User", url: location.href }],
			},
		];

		return routes.find(route => route.path.test(path));
	};

let searchData: Partial<PresenceData> = {};

if (searchInput) {
	searchInput.addEventListener("input", function () {
		if (!this.value) {
			searchData = {};
			return;
		}

		searchData.smallImageKey = Icons.SEARCHING;
		searchData.smallImageText = "Searching";
		searchData.state = `Searching: ${this.textContent}`;
	});
}

presence.on("UpdateData", async () => {
	const showTimestamp = await presence.getSetting<boolean>(Settings.TIMESTAMP),
		showButtons = await presence.getSetting<boolean>(Settings.BUTTONS),
		logo = await presence.getSetting<number>(Settings.LOGO);
	let presenceData: PresenceData = {
		largeImageKey: [Logos.LIGHT, Logos.DARK][logo] || Logos.LIGHT,
	};

	if (showTimestamp) presenceData.startTimestamp = startTimestamp;

	const route = router({
		data: presenceData,
		path: location.href.replace(`https://${location.hostname}`, ""),
	});

	if (!route) return presence.setActivity(presenceData);

	if (route.run) presenceData = route.run();
	if (route.details) presenceData.details = route.details();
	if (route.buttons && showButtons) presenceData.buttons = route.buttons();
	if (route.largeImageKey) presenceData.largeImageKey = route.largeImageKey();

	if (route.endTimestamp && showTimestamp)
		presenceData.endTimestamp = route.endTimestamp();

	if (searchData.state || route.state)
		presenceData.state = searchData.state || route.state();

	if (searchData.smallImageKey || route.smallImageKey) {
		presenceData.smallImageKey =
			searchData.smallImageKey || route.smallImageKey();
	}

	if (searchData.smallImageText || route.smallImageText) {
		presenceData.smallImageText =
			searchData.smallImageText || route.smallImageText();
	}

	presence.setActivity(presenceData, route.playback ? route.playback() : false);
});
