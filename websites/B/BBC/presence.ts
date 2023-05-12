let presence = new Presence({
	clientId: "658230518520741915",
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
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

function setClient(options: PresenceOptions) {
	if (presence.getExtensionVersion() < 224) return;

	presence.clearActivity();
	presence = new Presence(options);
}

const browsingTimestamp = Math.floor(Date.now() / 1000),
	getStrings = (lang: string) =>
		presence.getStrings(
			{
				play: "general.playing",
				pause: "general.paused",
				live: "general.live",
				browse: "general.browsing",
				searchFor: "general.searchFor",
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
				setClient({
					clientId: "932513249327460402",
				});
				return "bbciplayer";
			case "sounds":
				setClient({
					clientId: "944257541964169287",
				});
				return "bbcsounds";
			case "sport":
				return "bbcsport";
			case "news":
				return "bbcnews";
			case "weather":
				return "bbcweather";
			default:
				setClient({
					clientId: "658230518520741915",
				});
				return "bbc";
		}
	})(),
	assets = {
		LIVE: "https://i.imgur.com/vibO5wd.gif",
	} as const;

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
	};

presence.on("iFrameData", (data: IFrameData) => {
	if (data.audio) SoundMedia = data.audio;
	if (data.video) VideoMedia = data.video;
});

presence.on("UpdateData", async () => {
	const path = document.location.pathname,
		[newLang, buttons, showSearchQuery, showCover] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("search"),
			presence.getSetting<boolean>("cover"),
		]),
		setCover = (url: string, size?: string) => {
			if (url) {
				presenceData.largeImageKey = url.replace(
					"{recipe}",
					size ?? "1280x720"
				);
			}
		},
		handleVideo = () => {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(VideoMedia.currentTime, VideoMedia.duration);

			presenceData.smallImageKey = VideoMedia.paused ? "pause" : "play";
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
		largeImageKey: `${serviceName}_logo`,
		details: strings.browse,
		startTimestamp: browsingTimestamp,
	};

	if (path.includes("/iplayer")) {
		const iPlayer = await presence.getPageletiable<IPlayerData>(
			"__IPLAYER_REDUX_STATE__"
		);

		let iPlayerVideo: HTMLVideoElement | MediaData = document
			.querySelector("smp-toucan-player")
			?.shadowRoot?.querySelector("smp-playback")
			?.shadowRoot?.querySelector<HTMLVideoElement>("video");

		if (!iPlayerVideo && VideoMedia) iPlayerVideo = VideoMedia;

		presenceData.details = strings.browse;

		if (path.includes("/iplayer/episode")) {
			if (!iPlayerVideo.duration || iPlayer.episode?.live) {
				if (iPlayer.channel?.onAir || iPlayer.episode?.live) {
					presenceData.details = (iPlayer.channel ?? iPlayer.episode).title;
					presenceData.state = strings.live;

					setCover(iPlayer.episode?.images?.standard);

					presenceData.smallImageKey = Assets.LIVE;
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
				)?.textContent;

				if (subtitle) {
					const episodeNumber = subtitle.match(/[0-9]{1,2}/g),
						episodeTitle =
							subtitle.match(/: [0-9]{1,2}. (.*)/)?.[1] ??
							subtitle.match(/: (.*)/)?.[1];

					if (/Series [0-9]{1,2}: (Episode )?[0-9]{1,2}.?/i.test(subtitle)) {
						subtitle = `S${episodeNumber[0]}${
							episodeNumber[1] ? `:E${episodeNumber[1]}` : ""
						}${episodeTitle ? ` ${episodeTitle}` : ""}`;
					}
				}

				presenceData.details = (iPlayer.episode || iPlayer.header).title;
				presenceData.state =
					subtitle || iPlayer.episode?.labels?.category || "Animation";

				setCover(iPlayer.episode?.images?.promotional);

				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(
						iPlayerVideo.currentTime,
						iPlayerVideo.duration
					);

				presenceData.smallImageKey = iPlayerVideo.paused ? "pause" : "play";
				presenceData.smallImageText = iPlayerVideo.paused
					? strings.pause
					: strings.play;

				if (iPlayer.relatedEpisodes?.count) {
					presenceData.buttons = [
						{
							label: strings.buttonViewEpisode,
							url: `https://www.bbc.co.uk/iplayer/episode/${
								document.location.pathname.split("/")[3]
							}`,
						},
						{
							label: strings.buttonViewSeries,
							url: `https://www.bbc.co.uk/iplayer/episode/${iPlayer.relatedEpisodes.episodes[0].episode.id}`,
						},
					];
				} else {
					presenceData.buttons = [
						{
							label: presenceData.state.toLocaleLowerCase().includes("film")
								? strings.buttonViewMovie
								: strings.watchVideo,
							url: `https://www.bbc.co.uk/iplayer/episode/${
								document.location.pathname.split("/")[3]
							}`,
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
		const soundData = await presence.getPageletiable<SoundData>(
			"__PRELOADED_STATE__"
		);

		presenceData.details = strings.browse;

		if (path.includes("/play/")) {
			const isLive = path.includes("live:");
			setCover(soundData.programmes.current.image_url);

			if (isLive) {
				presenceData.details =
					SoundMedia.title ?? soundData.programmes.current.titles.primary;
				presenceData.state = soundData.programmes.current.titles.secondary;
				presenceData.smallImageKey = Assets.LIVE;
			} else {
				presenceData.details =
					SoundMedia.title ?? soundData.programmes.current.titles.primary;
				presenceData.state = soundData.programmes.current.titles.secondary;
				presenceData.smallImageKey =
					SoundMedia.paused || !SoundMedia.duration ? "pause" : "play";
			}

			presenceData.smallImageText =
				SoundMedia.paused || !SoundMedia.duration
					? isLive
						? strings.live
						: strings.pause
					: strings.play;

			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(SoundMedia.currentTime, SoundMedia.duration);

			presenceData.buttons = [
				{
					label: strings.buttonListenAlong,
					url: `https://www.bbc.co.uk/sounds/play/${
						document.URL.split("/")[5]
					}`,
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
						url: document.baseURI,
					},
				];
			} else if (path.includes("/formula1/")) {
				presenceData.details = strings.readingArticle;
				presenceData.state = title;
				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: document.baseURI,
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
						url: document.baseURI,
					},
				];
			} else if (path.includes("/transfers")) {
				presenceData.details = strings.readingArticle;
				presenceData.state = title;
				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: document.baseURI,
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
						url: document.baseURI,
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
						url: document.baseURI,
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
						url: document.baseURI,
					},
				];
			}
		} else if (path.includes("/tennis")) {
			presenceData.details = strings.viewPage;
			presenceData.state = "Tennis";

			presenceData.smallImageText = "Tennis";

			if (path.includes("/live-scores")) {
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
						url: document.baseURI,
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
						url: document.baseURI,
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
						url: document.baseURI,
					},
				];
			}
		} else if (path.includes("/sport/")) {
			presenceData.details = strings.readingArticle;
			presenceData.state = title;
			presenceData.buttons = [
				{
					label: strings.buttonReadArticle,
					url: document.baseURI,
				},
			];

			if (VideoMedia.duration) {
				presenceData.details = title;
				presenceData.state = document.querySelector("time")?.textContent;

				handleVideo();

				presenceData.buttons = [
					{
						label: strings.watchVideo,
						url: document.baseURI,
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
					url: document.baseURI,
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
					details: strings.searchFor,
					state: document.querySelector<HTMLInputElement>(
						"input.location-search-input__input"
					)?.value,
					smallImageKey: "search",
				},
				"/weather/map": {
					details: strings.viewPage,
					state: "Map",
					smallImageKey: "map",
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
					smallImageKey: "reading",
					buttons: [
						{
							label: "View Weather",
							url: document.baseURI,
						},
					],
				},
				"/weather/features/([0-9])": {
					details: strings.readingArticle,
					state: title,
					smallImageKey: "reading",
					buttons: [
						{
							label: strings.buttonReadArticle,
							url: document.baseURI,
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
	} else if (path.includes("/news")) {
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
							url: document.baseURI,
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
						url: document.baseURI,
					},
				];
			} else if (path.match(/(-[0-9])/)) {
				presenceData.details = strings.readingArticle;
				presenceData.state = title;

				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: document.baseURI,
					},
				];
			}
		}
	} else if (path === "/search") {
		presenceData.details = strings.searchFor;
		presenceData.state =
			document.querySelector<HTMLInputElement>("#search-input")?.value;
		presenceData.smallImageKey = Assets.Search;
	}

	if (!buttons) delete presenceData.buttons;
	if (!showCover && presenceData.largeImageKey?.startsWith("https"))
		presenceData.largeImageKey = `${serviceName}_logo`;

	if (presenceData.details === strings.searchFor && !showSearchQuery)
		presenceData.state = "(Hidden)";

	presence.setActivity(presenceData);
});

interface IPlayerData {
	episode?: {
		title: string;
		subtitle: string;
		live: boolean;
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
	programmes: {
		current: {
			image_url: string;
			titles: {
				primary?: string;
				secondary?: string;
			};
		};
	};
	modules: {
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
