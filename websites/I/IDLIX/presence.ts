const presence = new Presence({
		clientId: "1052119362015866882",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

async function getStrings() {
	return presence.getStrings(
		{
			browse: "general.browsing",
			buttonViewEpisode: "general.buttonViewEpisode",
			buttonViewMovie: "general.buttonViewMovie",
			buttonViewPage: "general.buttonViewPage",
			buttonWatchMovie: "general.buttonWatchVideo",
			paused: "general.paused",
			play: "general.playing",
			search: "general.searchFor",
			viewHome: "general.viewHome",
			viewMovie: "general.viewMovie",
			viewShow: "general.viewShow",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}
const enum Assets {
	Ad = "https://cdn.rcd.gg/PreMiD/websites/I/IDLIX/assets/0.png",
	Logo = "https://cdn.rcd.gg/PreMiD/websites/I/IDLIX/assets/logo.png",
}
let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null,
	current: number,
	duration: number,
	paused: boolean,
	isVideo: boolean,
	playingAds: boolean;

presence.on(
	"iFrameData",
	(data: {
		current: number;
		duration: number;
		paused: boolean;
		isVideo: boolean;
		playingAds: boolean;
	}) => {
		({ current, duration, paused, isVideo, playingAds } = data);
	}
);

presence.on("UpdateData", async () => {
	// Check to see if the site name includes idlix if not then return
	if (
		!document
			.querySelector('[property="og:site_name"]')
			?.getAttribute("content")
			.toLowerCase()
			.includes("idlix")
	)
		return;
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location,
		[newLang, privacy, buttons, covers] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers"),
		]),
		category =
			document
				.querySelector('[class="content right full"]')
				?.querySelector("h2")
				?.textContent?.toLowerCase() ??
			document
				.querySelector('[class="content right full"]')
				?.querySelector("h1")
				?.textContent?.toLowerCase(),
		heading = document
			.querySelector('[class="heading-archive"]')
			?.textContent?.toLowerCase(),
		search = document.querySelector<HTMLInputElement>('input[type="text"]');
	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (privacy) {
		presenceData.details = strings.browse;
		presence.setActivity(presenceData);
		return;
	}
	if (search?.value || pathname.includes("search")) {
		presenceData.details = strings.search;
		presenceData.state =
			search?.value ||
			document
				.querySelector(
					"body > div.container.main-container.min-vh-100.px-3 > h3"
				)
				?.textContent.split('"')[1] ||
			"Nothing";
		presenceData.smallImageKey = Assets.Search;
		presence.setActivity(presenceData);
		return;
	}
	switch (pathname.split("/")[1]) {
		case "": {
			presenceData.details = strings.viewHome;
			break;
		}
		case "movie": {
			delete presenceData.startTimestamp;
			const title = document
				.querySelector('[property="og:title"]')
				?.getAttribute("content")
				?.replace(" - Subtitle Indonesia - IDLIX", "");
			presenceData.largeImageKey = document
				.querySelector('[class="poster"]')
				?.querySelector("img")
				?.getAttribute("src");
			if (isVideo && !isNaN(duration)) {
				presenceData.details = title;
				presenceData.buttons = [
					{
						label: strings.buttonWatchMovie,
						url: href,
					},
				];
				if (playingAds) {
					presenceData.smallImageKey = Assets.Ad;
					presenceData.smallImageText = "Watching an ad";
				} else {
					presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play;
					presenceData.smallImageText = paused ? strings.paused : strings.play;
				}
				if (!paused) {
					[, presenceData.endTimestamp] = presence.getTimestamps(
						current,
						duration
					);
				}
			} else {
				presenceData.details = strings.viewMovie;
				presenceData.state = title;
				presenceData.buttons = [
					{
						label: strings.buttonViewMovie,
						url: href,
					},
				];
			}
			break;
		}
		case "episode":
		case "tvseries": {
			delete presenceData.startTimestamp;
			const title =
				document
					.querySelector('[class="pag_episodes"]')
					?.querySelectorAll("a")[1]
					?.getAttribute("title") ??
				document.querySelector('[class="epih1"]')?.textContent ??
				document.querySelector('[class="data"]').firstElementChild?.textContent;
			presenceData.largeImageKey =
				document
					.querySelector('[class="poster"]')
					?.querySelector("img")
					?.getAttribute("src") ??
				document
					.querySelector('[class="owl-wrapper"]')
					?.querySelector("img")
					?.getAttribute("src") ??
				Assets.Logo;
			if (isVideo && !isNaN(duration)) {
				presenceData.details = title;
				presenceData.state =
					document.querySelector('[class="epih3"]')?.textContent;
				presenceData.buttons = [
					{
						label: strings.buttonViewEpisode,
						url: href,
					},
				];
				if (playingAds) {
					presenceData.smallImageKey = Assets.Ad;
					presenceData.smallImageText = "Watching an ad";
				} else {
					presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play;
					presenceData.smallImageText = paused ? strings.paused : strings.play;
				}
				if (!paused) {
					[, presenceData.endTimestamp] = presence.getTimestamps(
						current,
						duration
					);
				}
			} else {
				presenceData.details = strings.viewShow;
				presenceData.state = title;
				presenceData.buttons = [
					{
						label: "View Show",
						url: href,
					},
				];
			}
			break;
		}
		case "trending":
		case "genre": {
			presenceData.buttons = [
				{
					label: "Browse",
					url: href,
				},
			];
			if (pathname === "genre") presenceData.details = "Browsing all genres";
			else {
				presenceData.details = `Viewing shows in the ${
					heading ?? "trending"
				} genre`;
			}

			break;
		}
		default: {
			if (heading && category) {
				presenceData.details = `Viewing ${heading} ${category}`;
				presenceData.state = `Viewing page ${
					document.querySelector('[class="current"]')?.textContent
				}`;
				presenceData.buttons = [
					{
						label: strings.buttonViewPage,
						url: href,
					},
				];
			} else presenceData.details = strings.browse;
		}
	}
	if (!buttons && presenceData.buttons) delete presenceData.buttons;
	if (!covers && presenceData.largeImageKey !== Assets.Logo)
		presenceData.largeImageKey = Assets.Logo;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
