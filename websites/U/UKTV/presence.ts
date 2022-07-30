const presence = new Presence({
		clientId: "1002899869599551508",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browsing: "general.browsing",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/wjqmEQY.png",
		},
		video = document.querySelector<HTMLVideoElement>(
			"video[id='video-content_html5_api']"
		),
		{ href, pathname } = document.location,
		search = document.querySelector<HTMLInputElement>("#search-input"),
		[privacy, covers, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("covers"),
			presence.getSetting<boolean>("buttons"),
		]);
	if (privacy) presenceData.details = (await strings).browsing;
	else if (search) {
		presenceData.details = "Searching for";
		presenceData.state = search.value;
		presenceData.smallImageKey = "search";
	} else if (video && video.duration) {
		const titles = document.querySelector(
			'[class="vod-episode__title margin-bottom--xxs invert-text semi-bold"]'
		)?.textContent;
		presenceData.details = titles;

		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused
			? (await strings).pause
			: (await strings).play;
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
		presenceData.details = (await strings).browsing;
		presenceData.smallImageKey = "search";
		presenceData.smallImageText = (await strings).browsing;
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
