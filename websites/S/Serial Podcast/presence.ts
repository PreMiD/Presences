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
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

enum Assets {
	Logo = "https://i.imgur.com/ihSM2fy.png",
	Pause = "https://i.imgur.com/NyZsbVO.png",
	Play = "https://i.imgur.com/Y1m0KVP.png",
	Searching = "https://i.imgur.com/oGQtnIY.png",
	Reading = "https://i.imgur.com/8vMPNni.png",
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		details: "Unsupported page",
		smallImageKey: Assets.Reading,
	},

	 {href, pathname} = document.location,
		[showTimestamp, showButtons, newLang, showCovers, privacy] =
			await Promise.all([
				presence.getSetting<boolean>("timestamp"),
				presence.getSetting<boolean>("buttons"),
				presence.getSetting<string>("lang").catch(() => "en"),
				presence.getSetting<boolean>("covers"),
				presence.getSetting<boolean>("privacy")
			]),
		podcast: HTMLAudioElement = document.querySelector("audio#jp_audio_0"),
		otherInfoPages = document.querySelector("div.node.node-page > div.inner > h1")?.textContent ?? document.querySelector("header.node-header > h1")?.textContent;

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (privacy) {
		presenceData.details = strings.browse;
		presence.setActivity(presenceData);
		return;
	}

	if (pathname === "/") presenceData.details = strings.viewHome;
	else if (pathname.includes("/season") && !((pathname.endsWith("/about")) || pathname.endsWith("/maps") || pathname.endsWith("/posts") || pathname.endsWith("/artwork") || pathname.endsWith("/music"))) {
		presenceData.details = strings.viewEpisode;
		presenceData.state = document.querySelector("div.inner > h1")?.textContent?.trim();
		presenceData.smallImageText = document.querySelector("div.inner > div.episode")?.textContent?.trim();
		presenceData.buttons = [
			{
				label: "View Episode",
				url: href
			}
		];
	} else if (otherInfoPages && pathname.startsWith("/season")) {
		const seasonInfo = document.querySelector("h2.block-title > span")?.textContent;
		presenceData.details = strings.viewing;
		presenceData.state = `${(seasonInfo ? `${seasonInfo} -` : `Season ${otherInfoPages.split("Season")[1]}`)} ${otherInfoPages.includes("About") ? "- About" : otherInfoPages.includes("Music") ? "- Music" : otherInfoPages}`;
		presenceData.buttons = [
			{
				label: strings.buttonViewPage,
				url: href
			}
		];
	} else if (pathname.includes("/posts") && !pathname.startsWith("/season")) {
		presenceData.details = strings.readingPost;
		presenceData.state = document.querySelector("div.title > h1")?.textContent;
		presenceData.smallImageText = `${document.querySelector("div.date")?.textContent}`;
		presenceData.buttons = [
			{
				label: "View Post",
				url: href
			}
		];
	}
	
	if ((!isNaN(podcast.duration))) {
		const [startTimestamp, endTimestamp] = presence.getTimestamps(
			Math.floor(podcast.currentTime),
			Math.floor(podcast.duration)
		),
		episodeTitle = document.querySelector("div.player-header > div.title")?.textContent?.trim();
		presenceData.details = strings.listeningTo?.replace("{0}", " ")?.replace("{1}", document.querySelector("div.player-header > div.episode")?.textContent?.trim());
		presenceData.state = episodeTitle;
		presenceData.smallImageKey = podcast.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = podcast.paused ? strings.pause : strings.play;
		presenceData.buttons = [
			{
				label: strings.buttonListenAlong,
				url: `https://serialpodcast.org/${document.querySelector("div.player-header > div.episode")?.textContent?.trim()?.replace(" ", "-")?.replace(":", "/")?.replace(" ", "").toLowerCase()?.replace("episode", "")?.replace(" ", "")?.replace("0", "")}/${episodeTitle?.replace(" ", "-").toLowerCase()}`
			}
		];

		if (showTimestamp) {
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;
		}

		if (podcast.paused) delete presenceData.endTimestamp;
	}

	if (!showCovers && presenceData.largeImageKey) presenceData.largeImageKey = Assets.Logo;
	if (!showButtons && presenceData.buttons) delete presenceData.buttons;
	if (
		(showTimestamp && !presenceData.startTimestamp) ||
		!presenceData.endTimestamp
	)
		presenceData.startTimestamp = browsingTimestamp;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
