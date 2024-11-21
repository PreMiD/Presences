const presence = new Presence({
		clientId: "813038241451343882",
	}),
	startsTime = Math.floor(Date.now() / 1000),
	ShowData = {
		title: "",
		ep: "",
		duration: 0,
		currentTime: 0,
		paused: true,
	},
	getStrings = async () =>
		presence.getStrings(
			{
				play: "general.playing",
				paused: "general.paused",
				browse: "general.browsing",
				episode: "general.episode",
				searchFor: "general.searchFor",
				searching: "general.search",
				viewSeriesButton: "general.buttonViewSeries",
				viewEpisode: "general.buttonViewEpisode",
				viewSeries: "general.viewSeries",
				reading: "general.reading",
				viewPage: "general.viewPage",
			},
			await presence.getSetting<string>("lang").catch(() => "en")
		);
let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("iFrameData", (data: Data) => {
	ShowData.duration = data.iframeVideo.duration;
	ShowData.paused = data.iframeVideo.paused;
	ShowData.currentTime = data.iframeVideo.currentTime;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/D/DramaCool/assets/logo.png",
			details: "Browsing",
			smallImageText: "Browsing",
			smallImageKey: Assets.Reading,
			startTimestamp: startsTime,
			type: ActivityType.Watching,
		},
		[buttons, newLang] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<string>("lang").catch(() => "en"),
		]),
		{ pathname, search, href } = document.location;

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (pathname.includes("/drama-detail")) {
		presenceData.smallImageText = strings.reading;

		presenceData.details = strings.viewSeries;
		presenceData.state = document.querySelector("h1").textContent;

		presenceData.buttons = [
			{
				label: strings.viewSeriesButton,
				url: document.URL,
			},
		];
	} else if (pathname.includes("/search")) {
		presenceData.details = strings.searchFor;
		presenceData.state = search.includes("movies") ? "Movies" : "Stars";

		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = strings.searching;
	} else if (pathname.match("/([a-z0-9-]+)-episode-([0-9]+)")) {
		ShowData.title =
			document.querySelector("div.category a")?.textContent ??
			JSON.parse(
				document
					.querySelector('[class="yoast-schema-graph"]')
					.innerHTML.replace(/@/gm, "")
			).graph[3].itemListElement[1].name.replace(/Episode [0-9]*/gm, "");
		if (ShowData.duration) {
			ShowData.ep = (document.title.match(
				/Episode ?([1-9][0-9]?[0-9]?)?( & )?([1-9][0-9]?[0-9]?)/g
			) || document.URL.match(/episode-?([1-9][0-9]?[0-9]?)/g))[0].replace(
				/(episode)(-)?/i,
				""
			);

			presenceData.smallImageKey = ShowData.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = ShowData.paused
				? strings.paused
				: strings.play;

			presenceData.details = ShowData.title;
			presenceData.state = `${strings.episode} ${ShowData.ep}`;

			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(ShowData.currentTime, ShowData.duration);

			presenceData.buttons = [
				{
					label: strings.viewEpisode,
					url: href,
				},
				{
					label: strings.viewSeriesButton,
					url: document.querySelector<HTMLAnchorElement>(".category a").href,
				},
			];

			if (ShowData.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else if (ShowData.title) {
			presenceData.smallImageText = strings.reading;

			presenceData.details = strings.viewSeries;
			presenceData.state = ShowData.title;

			presenceData.buttons = [
				{
					label: strings.viewSeriesButton,
					url: document.URL,
				},
			];
		}
	} else if (pathname.includes("movie-watch")) {
		presenceData.details =
			document.querySelector("div.category a")?.textContent;
		presenceData.state = "Movie";

		presenceData.smallImageKey = ShowData.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = ShowData.paused
			? strings.paused
			: strings.play;

		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(ShowData.currentTime, ShowData.duration);
	} else if (pathname.includes("/calendar")) {
		presenceData.details = strings.viewPage;

		presenceData.state = "Calendar";
		presenceData.buttons = [
			{
				label: "View Calendar",
				url: document.URL,
			},
		];
	}

	if (!buttons && presenceData.buttons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});

interface Data {
	iframeVideo: {
		currentTime: number;
		paused: boolean;
		duration: number;
	};
}
