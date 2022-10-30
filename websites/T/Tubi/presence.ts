const presence = new Presence({
		clientId: "937290941285429311",
	}),
	browingTimestamp = Math.floor(Date.now() / 1000);
async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			paused: "general.paused",
			browse: "general.browsing",
			live: "general.live",
			buttonWatchVideo: "general.buttonWatchVideo",
			buttonWatchLive: "general.buttonWatchStream",
			viewCategory: "general.viewCategory",
			search: "general.searchFor",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}
enum Assets {
	Logo = "https://i.imgur.com/PfRmgZm.png",
	Live = "https://i.imgur.com/gYNKPnn.png",
	Play = "https://i.imgur.com/OLaz6JN.png",
	Paused = "https://i.imgur.com/4iyMINk.png",
	SearchImage = "https://i.imgur.com/oGQtnIY.png",
}
let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		},
		video = document.querySelector<HTMLVideoElement>("video"),
		search = document.querySelector<HTMLInputElement>('[type="search"]'),
		{ href, pathname } = document.location,
		[newLang, privacy, buttons, covers] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers"),
		]);
	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (privacy) {
		presenceData.details = strings.browse;
		return;
	}
	if (search?.value) {
		presenceData.details = strings.search;
		presenceData.state = search.value;
		presenceData.smallImageKey = Assets.SearchImage;
	} else if (pathname.includes("/category/")) {
		presenceData.details = strings.viewCategory;
		presenceData.state = document.querySelector<HTMLMetaElement>(
			'[property="og:title"]'
		).content;
	} else if (video && !isNaN(video.duration)) {
		presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
			'meta[property="og:image"]'
		).content;
		presenceData.details = document.querySelector<HTMLMetaElement>(
			'meta[property="og:title"]'
		).content;
		if (!pathname.includes("live")) {
			presenceData.smallImageKey = video.paused ? Assets.Paused : Assets.Play;
			presenceData.smallImageText = video.paused
				? strings.paused
				: strings.play;
			presenceData.endTimestamp = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			)[1];
			presenceData.buttons = [
				{
					label: strings.buttonWatchVideo,
					url: href,
				},
			];
		} else {
			presenceData.buttons = [
				{
					label: strings.buttonWatchLive,
					url: href,
				},
			];
			presenceData.smallImageText = strings.live;
			presenceData.smallImageKey = Assets.Live;
		}
		presenceData.startTimestamp = browingTimestamp;

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	} else presenceData.details = strings.browse;

	if (!buttons) delete presenceData.buttons;
	if (!covers) presenceData.largeImageKey = Assets.Logo;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
