const presence = new Presence({
		clientId: "934789855962083359",
	}),
	browingTimestamp = Math.floor(Date.now() / 1000);
async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			paused: "general.paused",
			browse: "general.browsing",
			buttonWatchVideo: "general.buttonWatchVideo",
			viewCategory: "general.viewCategory",
			search: "general.searchFor",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/L/LookMovie/assets/logo.png",
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browingTimestamp,
		},
		video = document.querySelector<HTMLVideoElement>("video"),
		search = document.querySelector<HTMLInputElement>('[id="search_input"]'),
		{ pathname, href } = document.location,
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
		presence.setActivity(presenceData);
		return;
	}
	if (search?.value) {
		presenceData.details = strings.search;
		presenceData.state = search.value;
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.includes("/view/")) {
		presenceData.details = `Viewing ${document
			.querySelector('[class*="active"]')
			.textContent.trim()
			.slice(0, -1)}`;
		presenceData.state = document
			.querySelector<HTMLMetaElement>('[property="og:title"]')
			.content.split("-")[0];
		presenceData.largeImageKey =
			document
				.querySelector('[class="movie-img"]')
				.firstElementChild.getAttribute("data-background-image") ?? Assets.Logo;
	} else if (video?.duration) {
		delete presenceData.startTimestamp;
		presenceData.details =
			document.querySelector('[class="bd-hd"]')?.textContent ??
			document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
				?.content ??
			document
				.querySelector("head > title")
				?.textContent.replace(" | LookMovie", "");

		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused ? strings.paused : strings.play;
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestampsfromMedia(video);
		presenceData.largeImageKey =
			document
				.querySelector('[id="longInfo"]')
				?.firstElementChild?.getAttribute("src") ??
			document.querySelector<HTMLMetaElement>('[property="og:image"]')
				.content ??
			Assets.Logo;
		presenceData.buttons = [
			{
				label: strings.buttonWatchVideo,
				url: href,
			},
		];

		if (video.paused) delete presenceData.endTimestamp;
	} else {
		presenceData.buttons = [
			{
				label: "Browse",
				url: href,
			},
		];
		presenceData.details = strings.browse;
	}
	if (!buttons) delete presenceData.buttons;
	if (!covers) presenceData.largeImageKey = Assets.Logo;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
