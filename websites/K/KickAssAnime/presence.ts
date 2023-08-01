const presence = new Presence({
	clientId: "802964241179082822",
});
const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/K/KickAssAnime/assets/logo.png",
}

async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
			viewSeries: "general.buttonViewSeries",
			viewMovie: "general.buttonViewMovie",
			watchEpisode: "general.buttonViewEpisode",
			viewing: "general.viewing",
			searching: "general.searchFor",
			episode: "general.episode",
			browse: "general.browsing",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let browsingTimestamp = Math.floor(Date.now() / 1000),
	video = {
		exists: false,
		duration: 0,
		currentTime: 0,
		paused: true,
	},
	lastPlaybackState: boolean = null,
	playback: boolean,
	strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on(
	"iFrameData",
	(data: {
		exists: boolean;
		duration: number;
		currentTime: number;
		paused: boolean;
	}) => {
		video = data;
		playback = video.duration !== null ? true : false;

		if (lastPlaybackState !== playback) {
			lastPlaybackState = playback;
			browsingTimestamp = Math.floor(Date.now() / 1000);
		}
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		[buttons, newLang, cover] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<string>("lang"),
			presence.getSetting<boolean>("episode-cover"),
		]),
		{ pathname, hostname, href } = document.location,
		fullUrl = (string: string) =>
			string ? `https://${hostname}${string}` : Assets.Logo;

	if (oldLang !== newLang) {
		oldLang = newLang;
		strings = await getStrings();
	}
	switch (true) {
		case video.exists: {
			if (playback && !isNaN(video.duration)) {
				presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
				presenceData.smallImageText = video.paused ? "Paused" : "Playing";
				if (!video.paused) {
					[, presenceData.endTimestamp] = presence.getTimestamps(
						video.currentTime,
						video.duration
					);
				}
				presenceData.buttons = [
					{
						label: "Watch Video",
						url: href,
					},
				];
			}
			delete presenceData.startTimestamp;
			presenceData.details =
				document
					.querySelector('[name="og:title"]')
					?.getAttribute("content")
					?.split("-")[1] ??
				document
					.evaluate(
						"//script[contains(., 'layout:')]",
						document,
						null,
						XPathResult.ANY_TYPE,
						null
					)
					?.iterateNext()
					?.textContent?.match(/title_en:".{1,256}",/gm)?.[0]
					?.replace(/(title_en:")|(",)/gm, "");
			presenceData.state = document
				.querySelector('[name="og:title"]')
				?.getAttribute("content")
				?.split("-")[2];
			presenceData.largeImageKey = fullUrl(
				document.querySelector('[name="og:image"]')?.getAttribute("content")
			);
			presenceData.buttons = [
				{
					label: strings.viewSeries,
					url: href,
				},
			];
			break;
		}
		case pathname.includes("schedule"): {
			presenceData.details = strings.viewing;
			presenceData.state = "The schedule";
			break;
		}
		case pathname.includes("recent"): {
			presenceData.details = strings.viewing;
			presenceData.state = "Recently added anime";
			break;
		}
		case pathname.includes("popular"): {
			presenceData.details = strings.viewing;
			presenceData.state = "Popular anime";
			break;
		}
		case pathname.includes("anime"): {
			presenceData.details = strings.viewing;
			presenceData.state = "All anime";
			break;
		}
		case pathname.includes("trending"): {
			presenceData.details = strings.viewing;
			presenceData.state = "Trending anime";
			break;
		}
		default: {
			presenceData.details = strings.browse;
			break;
		}
	}

	if (!buttons && presenceData.buttons) delete presenceData.buttons;
	if (!cover && presenceData.largeImageKey !== Assets.Logo)
		presenceData.largeImageKey = Assets.Logo;
	presence.setActivity(presenceData);
});
