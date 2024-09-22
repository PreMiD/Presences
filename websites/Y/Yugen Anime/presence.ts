const presence = new Presence({
		clientId: "1056816638466457613",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	shortenedURLs: Record<string, string> = {};

async function getShortURL(url: string) {
	if (!url || url.length < 256) return url;
	if (shortenedURLs[url]) return shortenedURLs[url];
	try {
		const pdURL = await (
			await fetch(`https://pd.premid.app/create/${url}`)
		).text();
		shortenedURLs[url] = pdURL;
		return pdURL;
	} catch (err) {
		presence.error(err);
		return url;
	}
}

async function getStrings() {
	return presence.getStrings(
		{
			viewHome: "general.viewHome",
			viewAnime: "general.viewAnime",
			browse: "general.browsing",
			play: "general.playing",
			pause: "general.paused",
			buttonViewEpisode: "general.buttonViewEpisode",
			buttonViewSeries: "general.buttonViewSeries",
			buttonWatchMovie: "general.buttonWatchMovie",
			watchingMovie: "general.watchingMovie",
			buttonViewPage: "general.buttonViewPage",
			viewing: "general.viewing",
			searchFor: "general.searchFor",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let video = {
		duration: 0,
		currentTime: 0,
		paused: true,
	},
	strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/Y/Yugen%20Anime/assets/logo.png",
}

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		details: "Unsupported page",
		smallImageKey: Assets.Reading,
	};
	const { href, pathname, search } = document.location,
		[showTimestamp, showButtons, newLang, privacy, showCovers] =
			await Promise.all([
				presence.getSetting<boolean>("timestamp"),
				presence.getSetting<boolean>("buttons"),
				presence.getSetting<string>("lang").catch(() => "en"),
				presence.getSetting<boolean>("privacy"),
				presence.getSetting<boolean>("covers"),
			]),
		discoverPage = document.querySelector(
			"nav.pagination > ul.pagination > li > div.btn-default"
		),
		pageNav =
			document.querySelector(
				"nav.pagination > ul.pagination > li > a.btn-default"
			) ?? discoverPage;

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	presenceData.smallImageText = strings.browse;

	if (privacy) {
		presenceData.details = strings.browse;
		presence.setActivity(presenceData);
		return;
	}
	const pages: Record<string, PresenceData> = {
		"/settings": {
			details: "Viewing settings",
		},
		"/schedule": {
			details: "Viewing schedule",
			buttons: [
				{
					label: strings.buttonViewPage,
					url: href,
				},
			],
		},
		"/trending": {
			details: "Viewing trending anime",
			buttons: [
				{
					label: strings.buttonViewPage,
					url: href,
				},
			],
		},
		"/history": {
			details: "Viewing watch history",
			buttons: [
				{
					label: strings.buttonViewPage,
					url: href,
				},
			],
		},
	};

	for (const [path, data] of Object.entries(pages))
		if (pathname.includes(path)) presenceData = { ...presenceData, ...data };

	if (pathname === "/") presenceData.details = strings.viewHome;
	else if (pageNav && !pathname.includes("/watch" ?? "/anime")) {
		presenceData.details = discoverPage
			? "Discovering anime"
			: `${strings.viewing} ${pathname.replaceAll("/", "")} anime`;
		presenceData.state = `Page ${pageNav.textContent}`;
		presenceData.buttons = [
			{
				label: strings.buttonViewPage,
				url: href,
			},
		];
	} else if (pathname.includes("/anime")) {
		presenceData.details = strings.viewAnime;
		presenceData.state = document
			.querySelector("div.content > h1.p-10-t")
			?.textContent.trim();
		presenceData.largeImageKey = await getShortURL(
			document
				.querySelector("div.page-cover-inner > div > img")
				?.getAttribute("src")
		);
		presenceData.buttons = [
			{
				label: strings.buttonViewSeries,
				url: href,
			},
		];
	} else if (pathname.includes("/watch") && !pathname.endsWith("/watch/")) {
		const [startTimestamp, endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			),
			jsonIt = JSON.parse(
				document.querySelector('script[id="syncData"]')?.innerHTML
			),
			isMovie = pathname.includes("movie");
		presenceData.details = isMovie ? strings.watchingMovie : jsonIt?.name;
		presenceData.state =
			document.querySelector("div.box.m-10-b > h1.m-5-b")?.textContent.trim() ??
			document.querySelector('[class="ep-title"]')?.textContent ??
			`Episode ${jsonIt.episode}`;
		presenceData.largeImageKey = await getShortURL(
			document.querySelector("div.img-icon > img")?.getAttribute("src") ??
				Assets.Logo
		);
		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused ? strings.pause : strings.play;
		presenceData.buttons = [
			{
				label: isMovie ? strings.buttonWatchMovie : strings.buttonViewEpisode,
				url: href,
			},
		];

		if (!isMovie) {
			presenceData.buttons.push({
				label: strings.buttonViewSeries,
				url: `https://yugen.to${document
					.querySelector("div.col.justify-center.m-15-l > a")
					?.getAttribute("href")}`,
			});
		}

		if (showTimestamp) {
			[presenceData.startTimestamp, presenceData.endTimestamp] = [
				startTimestamp,
				endTimestamp,
			];
		}

		if (video.paused) delete presenceData.endTimestamp;
	} else if (pathname.includes("/mylist")) {
		presenceData.details = "Viewing my list";
		presenceData.state = `Tab: ${search
			.split("?status=")[1]
			?.replace("1", "Currently Watching")
			?.replace("3", "Completed")
			?.replace("4", "On Hold")
			?.replace("5", "Dropped")
			?.replace("2", "Plan to Watch")}`;
		presenceData.buttons = [
			{
				label: strings.buttonViewPage,
				url: href,
			},
		];
	} else if (pathname.includes("/search")) {
		const searchContent = document
			.querySelector("h2.ya-title")
			?.textContent.split("for");
		presenceData.details = strings.searchFor;
		presenceData.state = searchContent?.[1];
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = searchContent?.[0];
	} else if (pathname.includes("/review")) {
		presenceData.details = "Viewing a review";
		presenceData.state = `on ${document.querySelector("a.text")?.textContent}`;
		presenceData.largeImageKey = await getShortURL(
			document
				.querySelector("div.banner")
				?.getAttribute("style")
				.split("url(")[1]
				.split(")")[0]
				?.replaceAll("'", "")
		);
		presenceData.smallImageText = `By ${document
			.querySelector("a.author")
			?.textContent.replace("a review by", "")}`;
		presenceData.buttons = [
			{
				label: strings.buttonViewPage,
				url: href,
			},
		];
	}

	if (!showButtons && presenceData.buttons) delete presenceData.buttons;
	if (
		(showTimestamp && !presenceData.startTimestamp) ||
		!presenceData.endTimestamp
	)
		presenceData.startTimestamp = browsingTimestamp;

	if (!showCovers && presenceData.largeImageKey)
		presenceData.largeImageKey = Assets.Logo;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
