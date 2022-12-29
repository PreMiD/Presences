const presence = new Presence({
		clientId: "1056975576499499088",
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

function capitaliseFirstLetter(string: string) {
	return (
		string?.trim().charAt(0).toUpperCase() +
		string?.trim().slice(1).toLowerCase()
	);
}

async function getStrings() {
	return presence.getStrings(
		{
			viewHome: "general.viewHome",
			browse: "general.browsing",
			play: "general.playing",
			pause: "general.paused",
			buttonViewEpisode: "general.buttonViewEpisode",
			buttonViewPage: "general.buttonViewPage",
			viewEpisode: "general.viewEpisode",
			searchFor: "general.searchFor",
			listeningTo: "general.listeningTo",
			episode: "general.episode",
			season: "general.season",
			viewing: "general.viewing",
			readingPost: "general.readingPost",
			buttonListenAlong: "general.buttonListenAlong",
			reading: "general.reading",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

enum Assets {
	Logo = "https://i.imgur.com/z271J2A.jpg",
	Pause = "https://i.imgur.com/NyZsbVO.png",
	Play = "https://i.imgur.com/Y1m0KVP.png",
	Searching = "https://i.imgur.com/oGQtnIY.png",
	Reading = "https://i.imgur.com/8vMPNni.png",
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const { href, pathname } = document.location,
		[showTimestamp, showButtons, newLang, showCovers, privacy] =
			await Promise.all([
				presence.getSetting<boolean>("timestamp"),
				presence.getSetting<boolean>("buttons"),
				presence.getSetting<string>("lang").catch(() => "en"),
				presence.getSetting<boolean>("covers"),
				presence.getSetting<boolean>("privacy"),
			]),
		podcast: HTMLAudioElement = document.querySelector("audio#jp_audio_0"),
		otherInfoPages =
			document.querySelector("div.node.node-page > div.inner > h1")
				?.textContent ??
			document.querySelector("header.node-header > h1")?.textContent;

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	let presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		details: "Unsupported page",
		smallImageKey: Assets.Reading,
		smallImageText: strings.reading,
	};

	if (privacy) {
		presenceData.details = strings.browse;
		presence.setActivity(presenceData);
		return;
	}
	
	const pages: Record<string, PresenceData> = {
		"/about": {
			details: strings.viewing,
			state: "About Serial Podcast",
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
	else if (
		pathname.includes("/season") &&
		pathname.match(/([0-9]|[1-9][0-9]|[1-9][0-9][0-9])/gm)
	) {
		const bgImage = document
			.querySelector("div.video-wrapper")
			?.getAttribute("data-background-mobile");
		presenceData.details = strings.viewEpisode;
		presenceData.state =
			document.querySelector("div.inner > h1")?.textContent?.trim() ??
			document.querySelector("div.wrapper > header > h1")?.textContent.trim() ??
			capitaliseFirstLetter(
				document
					.querySelector("div.inner > div.inner-inner > h1")
					?.textContent?.trim()
			);
		if (bgImage) {
			presenceData.largeImageKey = await getShortURL(bgImage);
			presenceData.smallImageKey = Assets.Logo;
		}
		presenceData.smallImageText = pathname.includes("season-three")
			? document
					.querySelector<HTMLElement>("header > div.episode")
					?.outerText.trim()
					?.replace("SEASON THREE", "Season Three:")
					?.replace("EPISODE", "Episode")
			: document
					.querySelector("div.inner > div.episode")
					?.textContent?.trim() ??
			  document
					.querySelector("div.inner > div.inner-inner > div.episode")
					?.textContent.trim();
		presenceData.buttons = [
			{
				label: "View Episode",
				url: href,
			},
		];
	} else if (
		pathname.includes("/season") &&
		!pathname.match(/([0-9]|[1-9][0-9]|[1-9][0-9][0-9])/gm) &&
		!(
			pathname.includes("/about") ||
			pathname.includes("/music") ||
			pathname.includes("/art") ||
			pathname.includes("/artwork") ||
			pathname.includes("/maps") ||
			pathname.includes("/posts")
		)
	) {
		presenceData.details = strings.viewing;
		presenceData.state = `${strings.season} ${(
			document.querySelector("article.node > div.wrapper > h1")?.textContent ??
			document.querySelector("article.node > h1")?.textContent
		)
			?.split("About Season")[1]
			.trim()}`;
		presenceData.smallImageText = `${
			document.querySelectorAll("div.cards > div.node-episode").length
		} Episodes`;
		presenceData.buttons = [
			{
				label: "View Season",
				url: href,
			},
		];
	} else if (otherInfoPages && pathname.startsWith("/season")) {
		presenceData.details = strings.viewing;
		presenceData.state = `${strings.season} ${capitaliseFirstLetter(
			pathname.split("-")[1]?.split("/")[0]
		)} - ${capitaliseFirstLetter(pathname.split("/")[2])}`;
		presenceData.buttons = [
			{
				label: strings.buttonViewPage,
				url: href,
			},
		];
	} else if (pathname.startsWith("/posts")) {
		presenceData.details = strings.readingPost;
		presenceData.state =
			document.querySelector("div.title > h1")?.textContent ??
			document.querySelector("header > h1")?.textContent.trim();
		presenceData.smallImageText =
			document.querySelector("div.date")?.textContent ??
			document
				.querySelector<HTMLElement>("div.submitted")
				?.outerText?.split("\n")[1]
				?.split(",")[0];
		presenceData.buttons = [
			{
				label: "View Post",
				url: href,
			},
		];
	} else if (pathname.startsWith("/maps")) {
		presenceData.details = strings.viewing;
		presenceData.state = document.querySelector("header > h1")?.textContent;
		switch (
			document.querySelector("div.field-items > div.field-item")?.textContent
		) {
			case "Document": {
				presenceData.buttons = [
					{
						label: "View Document",
						url: href,
					},
				];

				break;
			}
			case "Interactive": {
				presenceData.buttons = [
					{
						label: "View Interactive",
						url: href,
					},
				];

				break;
			}
			case "Video": {
				presenceData.buttons = [
					{
						label: "View Video",
						url: href,
					},
				];

				break;
			}
			case "Photo": {
				presenceData.buttons = [
					{
						label: "View Photo",
						url: href,
					},
				];

				break;
			}
			case "Audio Extra": {
				presenceData.buttons = [
					{
						label: "View Audio",
						url: href,
					},
				];

				break;
			}
			case "Map": {
				presenceData.buttons = [
					{
						label: "View Map",
						url: href,
					},
				];

				break;
			}
			case "Timeline": {
				presenceData.buttons = [
					{
						label: "View Timeline",
						url: href,
					},
				];

				break;
			}
		}
	}

	if (!isNaN(podcast.duration)) {
		const [startTimestamp, endTimestamp] = presence.getTimestamps(
				Math.floor(podcast.currentTime),
				Math.floor(podcast.duration)
			),
			episodeTitle = document.querySelector(
				"div.player-header > div.title"
			)?.textContent,
			seasonInfo = document.querySelector(
				"div.player-header > div.episode"
			)?.textContent;
		presenceData.details = strings.listeningTo
			?.replace("{0}", " ")
			?.replace("{1}", seasonInfo);
		presenceData.state = capitaliseFirstLetter(episodeTitle);
		presenceData.largeImageKey = Assets.Logo;
		presenceData.smallImageKey = podcast.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = podcast.paused ? strings.pause : strings.play;
		presenceData.buttons = [
			{
				label: strings.buttonListenAlong,
				url: `https://serialpodcast.org/${seasonInfo
					?.replace(" ", "-")
					?.replace(":", "/")
					?.replace(" ", "")
					.toLowerCase()
					?.replace("episode", "")
					?.replace(" ", "")
					?.replace("0", "")}/${episodeTitle
					?.replaceAll(" ", "-")
					.toLowerCase()}`,
			},
		];

		if (showTimestamp) {
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;
		}

		if (podcast.paused) delete presenceData.endTimestamp;
	}

	if (!showCovers && presenceData.largeImageKey)
		presenceData.largeImageKey = Assets.Logo;
	if (!showButtons && presenceData.buttons) delete presenceData.buttons;
	if (
		(showTimestamp && !presenceData.startTimestamp) ||
		!presenceData.endTimestamp
	)
		presenceData.startTimestamp = browsingTimestamp;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
