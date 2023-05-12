const presence = new Presence({
	clientId: "1002899869599551508",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
			browse: "general.browsing",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/wjqmEQY.png",
		},
		video = document.querySelector<HTMLVideoElement>("video"),
		{ href, pathname } = document.location,
		search = document.querySelector<HTMLInputElement>("#search-input"),
		[newLang, privacy, covers, buttons] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("covers"),
			presence.getSetting<boolean>("buttons"),
		]);
	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}
	if (privacy) presenceData.details = strings.browse;
	else if (search) {
		presenceData.details = "Searching for";
		presenceData.state = search.value;
		presenceData.smallImageKey = Assets.Search;
	} else if (video?.duration) {
		const title = document.querySelector<HTMLMetaElement>(
				'[property="og:title"]'
			),
			episodeSeason =
				document
					.querySelector('[class="vod-episode__ep-num"]')
					?.lastChild?.textContent.replace(/,/gm, "") ??
				title.content.replace(title.content.split(",")[0], "");

		presenceData.details =
			document.querySelector(
				'[class="vod-episode__title margin-bottom--xxs invert-text semi-bold"]'
			)?.textContent ??
			document.querySelector('[id="brand-page"]')?.textContent ??
			title?.content.split(",")[0];
		presenceData.state = episodeSeason
			.split("-")[0]
			.replace(/,/gm, "")
			.replace("Series", "S")
			.replace("Episode", ":E")
			.replace(/ /gm, "")
			.trim();
		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused ? strings.pause : strings.play;
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestampsfromMedia(video);
		if (covers) {
			presenceData.largeImageKey =
				document
					.querySelector('[id="longInfo"]')
					?.firstElementChild?.getAttribute("src") ??
				document.querySelector<HTMLMetaElement>('[property="og:image"]')
					.content ??
				"lm";
		}

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
		presenceData.buttons = [
			{
				label: "View Show",
				url: href,
			},
		];
	} else if (
		pathname.includes("/genre/") ||
		pathname.includes("/collections/")
	) {
		presenceData.buttons = [
			{
				label: "Browse",
				url: href,
			},
		];
		presenceData.details = "Browsing";
		presenceData.state = document.querySelector(
			'[class="dropdown-item nuxt-link-exact-active nuxt-link-active"]'
		).textContent;
	} else if (pathname.includes("/box-sets/"))
		presenceData.details = "Viewing boxsets";
	else {
		presenceData.buttons = [
			{
				label: "Browse Boxsets",
				url: href,
			},
		];
		presenceData.details = strings.browse;
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = strings.browse;
		presenceData.buttons = [
			{
				label: "Browse",
				url: href,
			},
		];
	}
	if (!buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
