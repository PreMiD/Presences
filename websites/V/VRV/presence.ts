const presence = new Presence({
		clientId: "640150336547454976",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/V/VRV/assets/logo.png",
}

async function getStrings() {
	return presence.getStrings(
		{
			viewing: "general.viewing",
			play: "general.playing",
			pause: "general.paused",
			viewHome: "general.viewHome",
			viewSeries: "general.viewSeries",
			buttonViewSeries: "general.buttonViewSeries",
			buttonViewEpisode: "general.buttonViewEpisode",
			searchFor: "general.searchFor",
			search: "general.search",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null,
	iFrameVideo: boolean,
	currentTime: number,
	duration: number,
	paused: boolean,
	lastPlaybackState: boolean,
	playback: boolean;

interface IFrameData {
	iframeVideo: {
		iFrameVideo: boolean;
		currentTime: number;
		duration: number;
		paused: boolean;
	};
}
presence.on("iFrameData", (data: IFrameData) => {
	playback = data.iframeVideo.duration !== null ? true : false;

	if (playback)
		({ iFrameVideo, currentTime, duration, paused } = data.iframeVideo);

	if (lastPlaybackState !== playback) lastPlaybackState = playback;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ href, pathname } = document.location,
		[newLang, time, showCover, showButtons, showSearch] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("search"),
		]);

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	switch (pathname.split("/")[1]) {
		case "watch": {
			presenceData.details = strings.viewing;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>("img.c-content-image")?.src ??
				Assets.Logo;

			presenceData.buttons = [{ label: strings.buttonViewEpisode, url: href }];

			const seriesName: string =
					document.querySelector("span.series").textContent,
				episode: string = document.querySelector("h2.title").textContent,
				season: HTMLSpanElement = document.querySelector("span.season");

			presenceData.state = season
				? `${seriesName} - S${season.textContent.split(" ")[1]} ${episode}`
				: `${seriesName} - ${episode}`;

			if (iFrameVideo && !isNaN(duration)) {
				presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play;
				presenceData.smallImageText = paused ? strings.pause : strings.play;
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(Math.floor(currentTime), Math.floor(duration));

				presenceData.details = season
					? `${seriesName} - S${season.textContent.split(" ")[1]} ${episode}`
					: seriesName;
				presenceData.state = season ? episode.split(" - ")[1] : episode;

				if (paused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			}
			break;
		}
		case "series":
			presenceData.details = strings.viewSeries;
			presenceData.state =
				document.querySelector("div.series-title").textContent;
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>("img.c-content-image")?.src ??
				Assets.Logo;
			presenceData.buttons = [{ label: strings.buttonViewSeries, url: href }];
			break;
		case "watchlist":
			presenceData.details = "Viewing their watchlist";
			presenceData.smallImageKey = Assets.Reading;
			break;
		case "":
			presenceData.details = strings.viewHome;
			presenceData.smallImageKey = Assets.Reading;
			break;
		default:
			if (document.querySelector(".item-type")?.textContent === "Channel") {
				presenceData.details = "Viewing channel:";
				presenceData.state = document.querySelector(".item-title").textContent;
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>("img").src;
			}
	}

	if (href.includes("?q=") && showSearch) {
		presenceData.details = strings.searchFor;
		presenceData.state = href.split("?q=")[1];
		presenceData.startTimestamp = browsingTimestamp;
		delete presenceData.endTimestamp;
		presenceData.largeImageKey = Assets.Logo;
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = strings.search;
		delete presenceData.buttons;
	}

	if (!showCover) presenceData.largeImageKey = Assets.Logo;
	if (!showButtons) delete presenceData.buttons;
	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
