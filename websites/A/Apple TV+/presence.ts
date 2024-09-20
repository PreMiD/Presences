class AppleTV extends Presence {
	constructor(presenceOptions: PresenceOptions) {
		super(presenceOptions);
	}

	getVideo() {
		return document.querySelector<HTMLMediaElement>(
			".video-player__content #apple-music-video-player"
		);
	}

	getVideoType() {
		return this.getEpisodeTitle() ? "show" : "movie";
	}

	getTitle(eyebrow = false) {
		if (this.isWatching() && eyebrow) return this.getVideoTitle();

		const title = document.querySelector(
			"div.product-header__image-logo.clr-primary-text-on-dark > span"
		)?.textContent;

		return (
			title ??
			document.querySelector(".review-card__title.typ-headline-emph > span")
				?.textContent ??
			document.querySelector(
				"div.product-header__image-logo__show-title.typ-headline"
			)?.textContent ??
			"Unknown"
		);
	}

	getEpisodeTitle() {
		return document.querySelector(
			".video-player__content .scrim__footer .scrim-footer__info-subtitle-text"
		)?.textContent;
	}

	getVideoTitle() {
		return document.querySelector(
			".video-player__content .scrim__footer #video-player-title"
		)?.textContent;
	}

	isWatching() {
		return !!this.getVideoTitle();
	}
}

const presence = new AppleTV({
		clientId: "835157562432290836",
	}),
	data: {
		startedSince: number;
		settings?: {
			id: string;
			delete?: boolean;
			data: string[];
		}[];
		presence: {
			[key: string]: {
				setPresenceData?: () => void;
			};
		};
	} = {
		presence: {},
		startedSince: Math.floor(Date.now() / 1000),
	};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/A/Apple%20TV+/assets/logo.png",
		details: "Browsing...",
		smallImageKey: Assets.Search,
		startTimestamp: data.startedSince,
	};

	data.presence = {
		"/(show|episode)/([a-zA-Z0-9-]+)": {
			setPresenceData() {
				if (presence.isWatching()) {
					const video = presence.getVideo();
					[presenceData.startTimestamp, presenceData.endTimestamp] =
						presence.getTimestampsfromMedia(video);

					const title = presence.getTitle(),
						videoTitle = presence.getTitle(true),
						ep = presence.getEpisodeTitle();
					presenceData.details = videoTitle || title;
					presenceData.state = ep
						? `${ep}`
						: `Trailer • ${videoTitle || title}`;

					presenceData.smallImageText = video.paused ? "Paused" : "Playing";
					presenceData.smallImageKey = video.paused
						? Assets.Pause
						: Assets.Play;

					presenceData.buttons = [
						{
							label: "Watch Show",
							url: document.URL,
						},
					];

					if (video.paused) {
						delete presenceData.startTimestamp;
						delete presenceData.endTimestamp;
					}
				} else {
					presenceData.details = "Viewing show:";
					presenceData.state = presence.getTitle();

					presenceData.buttons = [
						{
							label: "View Show",
							url: document.URL,
						},
					];
				}
			},
		},
		"/movie/([a-zA-Z0-9-]+)": {
			setPresenceData() {
				if (presence.isWatching()) {
					const video = presence.getVideo();
					[presenceData.startTimestamp, presenceData.endTimestamp] =
						presence.getTimestampsfromMedia(video);

					presenceData.details = presence.getTitle();
					presenceData.state = "Movie";

					presenceData.smallImageText = video.paused ? "Paused" : "Playing";
					presenceData.smallImageKey = video.paused
						? Assets.Pause
						: Assets.Play;

					presenceData.buttons = [
						{
							label: "Watch Movie",
							url: document.URL,
						},
					];

					if (video.paused) {
						delete presenceData.startTimestamp;
						delete presenceData.endTimestamp;
					}
				} else {
					presenceData.details = "Viewing movie:";
					presenceData.state = presence.getTitle();

					presenceData.buttons = [
						{
							label: "View Movie",
							url: document.URL,
						},
					];
				}
			},
		},
		"/person/([a-zA-Z0-9-]+)": {
			setPresenceData() {
				presenceData.details = "Viewing person:";
				presenceData.state = document.querySelector(
					"div.person-header__bio > h1"
				)?.textContent;
			},
		},
		"/settings": {
			setPresenceData() {
				presenceData.details = "Viewing their settings";
			},
		},
	};

	data.settings = [
		{
			id: "timestamp",
			delete: true,
			data: ["startTimestamp", "endTimestamp"],
		},
		{
			id: "buttons",
			delete: true,
			data: ["buttons"],
		},
		{
			id: "smallImage",
			delete: true,
			data: ["smallImageKey"],
		},
	];

	let presenceSelect;

	for (const [pathname, PData] of Object.entries(data.presence)) {
		if (new RegExp(pathname).test(document.location.pathname)) {
			presenceSelect = pathname;
			PData.setPresenceData();
		}
	}

	if (!presenceSelect && presence.isWatching()) {
		data.presence[
			presence.getVideoType() === "movie"
				? "/movie/([a-zA-Z0-9-]+)"
				: "/(show|episode)/([a-zA-Z0-9-]+)"
		].setPresenceData();
	}

	for (const setting of data.settings) {
		const settingValue = await presence.getSetting<boolean>(setting.id);

		if (!settingValue && setting.delete) {
			for (const PData of setting.data)
				delete presenceData[PData as keyof PresenceData];
		}
	}

	presence.setActivity(presenceData);
});
