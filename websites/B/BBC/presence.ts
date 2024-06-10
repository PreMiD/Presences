const presence = new Presence({
	clientId: "658230518520741915",
});

enum LogoAssets {
	BbcFuture = "https://i.imgur.com/VFLWWMc.png",
	BbciPlayer = "https://i.imgur.com/AZT47th.png",
	Bbc = "https://i.imgur.com/jeXg35x.png",
	BbcNews = "https://i.imgur.com/LJzOxK4.png",
	BbcSounds = "https://i.imgur.com/mzgbEiS.png",
	BbcSport = "https://i.imgur.com/kC4rskq.png",
	BbcWeather = "https://i.imgur.com/EAB33ye.png",
}

const browsingTimestamp = Math.floor(Date.now() / 1000),
	getStrings = (lang: string) =>
		presence.getStrings(
			{
				play: "general.playing",
				pause: "general.paused",
				Live: "general.Live",
				browse: "general.browsing",
				searchSomething: "general.searchSomething",
				viewTeam: "twitch.viewTeam",
				viewPage: "general.viewPage",
				viewMovie: "general.viewMovie",
				viewSeries: "general.viewSeries",
				watchVideo: "general.buttonWatchVideo",
				readingArticle: "general.readingArticle",
				buttonViewSeries: "general.buttonViewSeries",
				buttonViewMovie: "general.buttonViewMovie",
				buttonViewEpisode: "general.buttonViewEpisode",
				buttonListenAlong: "general.buttonListenAlong",
				buttonReadArticle: "general.buttonReadArticle",
			},
			lang
		),
	serviceName = (() => {
		switch (location.pathname.split("/")[1]) {
			case "iplayer":
				return "iPlayer";
			case "sounds":
				return "Sounds";
			case "sport":
				return "Sport";
			case "news":
				return "News";
			case "weather":
				return "Weather";
			case "future":
				return "Future";
			default:
				return "";
		}
	})();

let oldLang: string = null,
	strings: Awaited<ReturnType<typeof getStrings>>,
	VideoMedia: MediaData = {
		duration: 0,
		currentTime: 0,
		paused: true,
	},
	SoundMedia: MediaData = {
		duration: 0,
		currentTime: 0,
		paused: true,
		title: null,
	},
	iPlayer: IPlayerData,
	soundData: SoundData;

presence.on("iFrameData", (data: IFrameData) => {
	if (data.audio) SoundMedia = data.audio;
	if (data.video) VideoMedia = data.video;
});

presence.on("UpdateData", async () => {
	const path = document.location.pathname,
		[newLang, buttons, showCover, usePresenceName] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("usePresenceName"),
		]),
		{ href } = document.location,
		setCover = (url: string, size?: string) => {
			if (url) {
				presenceData.largeImageKey = url.replace(
					"{recipe}",
					size ?? "1280x720"
				);
			}
		},
		handleVideo = () => {
			presenceData.type = ActivityType.Watching;
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(VideoMedia.currentTime, VideoMedia.duration);

			presenceData.smallImageKey = VideoMedia.paused
				? Assets.Pause
				: Assets.Play;
			presenceData.smallImageText = VideoMedia.paused
				? strings.pause
				: strings.play;

			if (VideoMedia.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		};

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings(oldLang);
	}

	let presenceData: PresenceData = {
		name: `BBC ${serviceName}`,
		largeImageKey: LogoAssets[`Bbc${serviceName}`],
		details: strings.browse,
		startTimestamp: browsingTimestamp,
	};

	if (path.includes("/iplayer")) {
		presenceData.type = ActivityType.Watching;
		iPlayer ??= await presence
			.getPageVariable("__IPLAYER_REDUX_STATE__")
			.then(data => data.__IPLAYER_REDUX_STATE__);

		let iPlayerVideo: HTMLVideoElement | MediaData = document
			.querySelector("smp-toucan-player")
			?.shadowRoot?.querySelector("smp-playback")
			?.shadowRoot?.querySelector<HTMLVideoElement>("video");

		if (!iPlayerVideo && VideoMedia) iPlayerVideo = VideoMedia;

		if (path.includes("/iplayer/episode")) {
			if (!iPlayerVideo.duration || iPlayer.episode?.Live) {
				if (iPlayer.channel?.onAir || iPlayer.episode?.Live) {
					presenceData.details = (iPlayer.channel ?? iPlayer.episode).title;
					presenceData.state = strings.Live;

					setCover(iPlayer.episode?.images?.standard);

					presenceData.smallImageKey = Assets.Live;
				} else if (!iPlayer.channel) {
					setCover(
						iPlayer.episode?.images?.promotional ??
							iPlayer.header?.imageTemplate
					);

					presenceData.details =
						iPlayer.relatedEpisodes?.count || iPlayer.header?.episodeCount
							? strings.viewSeries
							: strings.viewMovie;
					presenceData.state = (iPlayer.episode || iPlayer.header).title;
					presenceData.startTimestamp = browsingTimestamp;
				}
			} else {
				let subtitle = document.querySelector(
						":is(.typo.typo--skylark.play-cta__subtitle, .typo.typo--bold.play-cta__title.typo--skylark)"
					)?.textContent,
					episodeTitle;

				if (subtitle) {
					const episodeNumber = subtitle.match(/[0-9]{1,2}/g);
					episodeTitle = episodeTitle =
						subtitle.match(/: [0-9]{1,2}. (.*)/)?.[1] ??
						subtitle.match(/: (.*)/)?.[1];

					if (/Series [0-9]{1,2}: (Episode )?[0-9]{1,2}.?/i.test(subtitle)) {
						if (usePresenceName)
							subtitle = `Season ${episodeNumber[0]}, Episode ${
								episodeNumber[1] || 1
							}`;
						else {
							subtitle = `S${episodeNumber[0]}${
								episodeNumber[1] ? `:E${episodeNumber[1]}` : ""
							}${episodeTitle ? ` ${episodeTitle}` : ""}`;
						}
					}
				}

				const { title } = iPlayer.episode || iPlayer.header,
					state = subtitle || iPlayer.episode?.labels?.category || "Animation";

				if (usePresenceName) presenceData.name = title;

				presenceData.details = usePresenceName ? episodeTitle : title;
				presenceData.state = usePresenceName ? subtitle : state;

				setCover(iPlayer.episode?.images?.promotional);

				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(
						iPlayerVideo.currentTime,
						iPlayerVideo.duration
					);

				presenceData.smallImageKey = iPlayerVideo.paused
					? Assets.Pause
					: Assets.Play;
				presenceData.smallImageText = iPlayerVideo.paused
					? strings.pause
					: strings.play;

				if (iPlayer.relatedEpisodes?.count) {
					presenceData.buttons = [
						{
							label: strings.buttonViewEpisode,
							url: href,
						},
						{
							label: strings.buttonViewSeries,
							url: href,
						},
					];
				} else {
					presenceData.buttons = [
						{
							label: state.toLocaleLowerCase().includes("film")
								? strings.buttonViewMovie
								: strings.watchVideo,
							url: href,
						},
					];
				}

				if (iPlayerVideo.paused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			}
		}
	} else if (path.includes("/sounds")) {
		presenceData.type = ActivityType.Listening;
		soundData ??= await presence
			.getPageVariable("__PRELOADED_STATE__")
			.then(data => data.__PRELOADED_STATE__);

		if (path.includes("/play/")) {
			const isLive = path.includes("Live:");
			setCover(soundData.programmes.current.image_url);

			if (isLive) {
				presenceData.details =
					SoundMedia.title ?? soundData.programmes.current.titles.primary;
				presenceData.state = soundData.programmes.current.titles.secondary;
				presenceData.smallImageKey = Assets.Live;
			} else {
				presenceData.details =
					SoundMedia.title ?? soundData.programmes.current.titles.primary;
				presenceData.state = soundData.programmes.current.titles.secondary;
				presenceData.smallImageKey =
					SoundMedia.paused || !SoundMedia.duration
						? Assets.Pause
						: Assets.Play;
			}

			presenceData.smallImageText =
				SoundMedia.paused || !SoundMedia.duration
					? isLive
						? strings.Live
						: strings.pause
					: strings.play;

			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(SoundMedia.currentTime, SoundMedia.duration);

			presenceData.buttons = [
				{
					label: strings.buttonListenAlong,
					url: href,
				},
			];

			if (SoundMedia.paused || isLive) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}
	} else if (path.includes("/sport")) {
		presenceData.details = strings.browse;
		presenceData.smallImageKey = Assets.Reading;

		const title = document.querySelector("h1")?.textContent;

		if (path.includes("/sport/formula1")) {
			presenceData.details = strings.viewPage;
			presenceData.state = "Formula 1";

			if (path.includes("/latest")) {
				presenceData.details = strings.viewPage;
				presenceData.state = title;
			} else if (path.includes("/standings")) {
				presenceData.details = strings.viewPage;
				presenceData.state = title;
			} else if (path.includes("/sport/formula1/")) {
				presenceData.details = strings.readingArticle;
				presenceData.state = title;
				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: href,
					},
				];
			} else if (path.includes("/formula1/")) {
				presenceData.details = strings.readingArticle;
				presenceData.state = title;
				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: href,
					},
				];
			}
		} else if (path.includes("/sport/football")) {
			presenceData.details = strings.viewPage;
			presenceData.state = "Football";

			if (path.includes("/averages")) {
				presenceData.details = strings.viewPage;
				presenceData.state = title;
			} else if (path.includes("/teams/")) {
				presenceData.details = strings.viewTeam;
				presenceData.state = title;
			} else if (path.includes("/gossip")) {
				presenceData.details = strings.readingArticle;
				presenceData.state = title;
				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: href,
					},
				];
			} else if (path.includes("/transfers")) {
				presenceData.details = strings.readingArticle;
				presenceData.state = title;
				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: href,
					},
				];
			} else if (path.includes("/top-scorers")) {
				presenceData.details = strings.viewPage;
				presenceData.state = title;
			} else if (path.includes("/womens")) {
				presenceData.details = strings.viewPage;
				presenceData.state = "Women's Cricket";
			} else if (path.includes("/leagues-cups")) {
				presenceData.details = strings.viewPage;
				presenceData.state = title;
			} else if (path.includes("/european")) {
				presenceData.details = strings.viewPage;
				presenceData.state = "European's Cricket";
			} else if (path.includes("/football/")) {
				presenceData.details = strings.readingArticle;
				presenceData.state = title;
				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: href,
					},
				];
			}
		} else if (path.includes("/sport/cricket")) {
			presenceData.details = strings.viewPage;
			presenceData.state = "Cricket";

			presenceData.smallImageText = "Cricket";
			if (path.includes("/averages")) {
				presenceData.details = strings.viewPage;
				presenceData.state = title;
			} else if (path.includes("/teams/")) {
				presenceData.details = strings.viewTeam;
				presenceData.state = title;
				presenceData.smallImageText = "Cricket Team";
			} else if (
				document.querySelector(
					"li.sp-c-sport-navigation__item.sp-c-sport-navigation__item--secondary-selected"
				)?.textContent === "Squad"
			) {
				presenceData.details = strings.viewPage;
				presenceData.state = title;
			} else if (path.includes("/counties")) {
				presenceData.details = strings.viewPage;
				presenceData.state = title;
			} else if (path.includes("/womens")) {
				presenceData.details = strings.viewPage;
				presenceData.state = "Women's Cricket";
			} else if (path.includes("/scorecard/")) {
				presenceData.details = "Viewing scoredcard of:";

				presenceData.state = `${
					document.querySelector(
						"span.sp-c-fixture__team.sp-c-fixture__team--time.sp-c-fixture__team--time-home.gel-long-primer > span > span"
					)?.textContent
				} & ${
					document.querySelector(
						"div.sp-c-fixture__wrapper > span.sp-c-fixture__team.sp-c-fixture__team--time.sp-c-fixture__team--time-away.gel-long-primer > span > span"
					)?.textContent
				}`;
			} else if (path.includes("/sport/cricket/")) {
				presenceData.details = strings.readingArticle;
				presenceData.state = title;
				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: href,
					},
				];
			}
		} else if (path.includes("/rugby-union")) {
			presenceData.details = strings.viewPage;
			presenceData.state = "Rugby Union";

			presenceData.smallImageText = "Rugby Union";

			if (path.includes("/teams/")) {
				presenceData.details = strings.viewTeam;
				presenceData.state = title;
				presenceData.smallImageText = "Rugby Union Team";
			} else if (path.includes("/rugby-union/")) {
				presenceData.details = strings.readingArticle;
				presenceData.state = title;
				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: href,
					},
				];
			}
		} else if (path.includes("/tennis")) {
			presenceData.details = strings.viewPage;
			presenceData.state = "Tennis";

			presenceData.smallImageText = "Tennis";

			if (path.includes("/Live-scores")) {
				presenceData.details = strings.viewPage;
				presenceData.state = title;
			} else if (path.includes("/order-of-play")) {
				presenceData.details = strings.viewPage;
				presenceData.state = title;
			} else if (path.includes("/tennis/")) {
				presenceData.details = strings.readingArticle;
				presenceData.state = title;
				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: href,
					},
				];
			}
		} else if (path.includes("/golf")) {
			presenceData.details = strings.viewPage;
			presenceData.state = "Golf";

			presenceData.smallImageText = "Golf";

			if (path.includes("/athletics/")) {
				presenceData.details = strings.readingArticle;
				presenceData.state = title;
				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: href,
					},
				];
			}
		} else if (path.includes("/cycling")) {
			presenceData.details = strings.viewPage;
			presenceData.state = "Cycling";

			presenceData.smallImageText = "Cycling";

			if (path.includes("/cycling/")) {
				presenceData.details = strings.readingArticle;
				presenceData.state = title;
				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: href,
					},
				];
			}
		} else if (path.includes("/sport/")) {
			presenceData.details = strings.readingArticle;
			presenceData.state = title;
			presenceData.buttons = [
				{
					label: strings.buttonReadArticle,
					url: href,
				},
			];

			if (VideoMedia.duration) {
				presenceData.details = title;
				presenceData.state = document.querySelector("time")?.textContent;

				handleVideo();

				presenceData.buttons = [
					{
						label: strings.watchVideo,
						url: href,
					},
				];
			}
		}

		if (path.includes("/scores-fixtures")) {
			presenceData.details = strings.viewPage;
			presenceData.state = title;
		} else if (path.includes("/table")) {
			presenceData.details = strings.viewPage;
			presenceData.state = title;
		} else if (path.includes("/results")) {
			presenceData.details = strings.viewPage;
			presenceData.state = title;
		} else if (path.includes("/calendar")) {
			presenceData.details = strings.viewPage;
			presenceData.state = title;
		} else if (path.includes("/leaderboard")) {
			presenceData.details = strings.viewPage;
			presenceData.state = title;
		} else if (path.includes("/av/") && VideoMedia.duration) {
			presenceData.details = title;
			presenceData.state = document.querySelector(
				"span.qa-status-date-output"
			)?.textContent;

			handleVideo();

			presenceData.buttons = [
				{
					label: strings.watchVideo,
					url: href,
				},
			];
		}
	} else if (path.includes("/weather")) {
		presenceData.details = strings.browse;

		const title = (
				document.querySelector("h2#wr-c-regional-forecast-slice__title") ||
				document.querySelector("h1")
			)?.textContent,
			weatherPages: {
				[key: string]: PresenceData;
			} = {
				"/weather/search": {
					details: strings.searchSomething,
					smallImageKey: Assets.Search,
				},
				"/weather/map": {
					details: strings.viewPage,
					state: "Map",
				},
				"/weather/([0-9])": {
					details: "Viewing weather of:",
					state:
						document
							.querySelector("h1#wr-location-name-id")
							?.textContent.split(" - ")[0] || null,
					smallImageText: document.querySelector(
						"div.wr-day-summary > div > span"
					)?.textContent,
					smallImageKey: Assets.Reading,
					buttons: [
						{
							label: "View Weather",
							url: href,
						},
					],
				},
				"/weather/articles/": {
					details: strings.readingArticle,
					state: title,
					smallImageKey: Assets.Reading,
					buttons: [
						{
							label: strings.buttonReadArticle,
							url: href,
						},
					],
				},
			};

		for (const [key, value] of Object.entries(weatherPages)) {
			if (path.match(key) && !VideoMedia.duration) {
				presenceData = { ...presenceData, ...value };
				break;
			} else if (VideoMedia.duration) {
				presenceData.details = title;
				presenceData.state = (
					document.querySelector("time>span") || document.querySelector("b")
				)?.textContent;

				handleVideo();
			}
		}
	} else if (path.includes("/news") || path.includes("/future")) {
		presenceData.details = strings.browse;
		presenceData.smallImageKey = Assets.Reading;

		const title = document.querySelector("h1")?.textContent,
			newsPages: {
				[key: string]: PresenceData;
			} = {
				"/have_your_say": {
					details: strings.viewPage,
					state: "Your Coronavirus Stories",
				},
				"/coronavirus": {
					details: strings.viewPage,
					state: "Coronavirus pandemic",
				},
				"(-|/)([0-9])": {
					details: strings.readingArticle,
					state: title,
					buttons: [
						{
							label: strings.buttonReadArticle,
							url: href,
						},
					],
				},
				"/in_pictures": {
					details: strings.viewPage,
					state: "In Pictures",
				},
				"/reality_check": {
					details: strings.viewPage,
					state: "Reality Check",
				},
				"/the_reporters": {
					details: strings.viewPage,
					state: "Long Reads",
				},
				"/newsbeat": {
					details: strings.readingArticle,
					state: "Newsbeat",
				},
				"/blogs": {
					details: strings.viewPage,
					state: "Blogs",
				},
				"/technology": {
					details: strings.viewPage,
					state: "Technology news",
				},
				"/science-environment": {
					details: strings.viewPage,
					state: "Technology news",
				},
				"/stories": {
					details: strings.viewPage,
					state: "Stories",
				},
				"/entertainment_and_arts": {
					details: strings.viewPage,
					state: "Entertainment and arts",
				},
				"/health": {
					details: strings.viewPage,
					state: "Health news",
				},
				"/world": {
					details: strings.viewPage,
					state: "World news",
				},
				"/business": {
					details: strings.viewPage,
					state: "Business news",
				},
			};

		for (const [key, value] of Object.entries(newsPages)) {
			if (
				path.match(key) &&
				!path.includes("/world/") &&
				!VideoMedia.duration
			) {
				presenceData = { ...presenceData, ...value };
				break;
			} else if (path.includes("/world/") && !VideoMedia.duration) {
				presenceData.details = strings.viewPage;
				presenceData.state = "World News";
			} else if (VideoMedia.duration) {
				presenceData.details = title;
				presenceData.state = document.querySelector("time")?.textContent;

				handleVideo();

				presenceData.buttons = [
					{
						label: strings.watchVideo,
						url: href,
					},
				];
			} else if (path.includes("/articles/")) {
				presenceData.details = strings.readingArticle;
				presenceData.state = title;

				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: href,
					},
				];
			}
		}
	} else if (path === "/search") {
		presenceData.details = strings.searchSomething;
		presenceData.smallImageKey = Assets.Search;
	}

	if (!buttons) delete presenceData.buttons;
	if (!showCover) presenceData.largeImageKey = LogoAssets[`Bbc${serviceName}`];

	presence.setActivity(presenceData);
});

/* eslint-disable camelcase */
// This is just to make sure that the above line is not removed by eslint
// while at the same time passing Deepscan issues.
const unused_variable = (a: number, b: number) => a + b;
unused_variable(1, 2);
interface IPlayerData {
	episode?: {
		title: string;
		subtitle: string;
		Live: boolean;
		images: {
			portrait?: string;
			standard: string;
			promotional: string;
			promotional_with_logo: string;
		};
		labels?: {
			category: string;
		};
	};
	relatedEpisodes?: {
		count: number;
		episodes: {
			episode: {
				id: string;
				title: string;
				subtile: string;
				labels?: {
					category: string;
				};
			};
		}[];
	};
	channel?: {
		title: string;
		onAir: boolean;
	};
	header?: {
		title: string;
		episodeCount: number;
		imageTemplate: string;
	};
}

interface IFrameData {
	video: {
		duration: number;
		currentTime: number;
		paused: boolean;
	};
	audio: {
		duration: number;
		currentTime: number;
		paused: boolean;
		title: string;
	};
}

interface MediaData {
	duration: number;
	currentTime: number;
	paused: boolean;
	cover?: string;
	title?: string;
}

interface SoundData {
	programmes?: {
		current: {
			image_url: string;
			titles: {
				primary?: string;
				secondary?: string;
			};
		};
	};
	modules?: {
		data: {
			data: {
				titles?: {
					primary?: string;
					secondary?: string;
					tertiary?: string;
				};
				network: {
					shortTitle: string;
				};
			}[];
		}[];
	};
}
/* eslint-enable camelcase */
