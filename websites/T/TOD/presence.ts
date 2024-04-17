class TOD extends Presence {
	constructor(presenceOptions: PresenceOptions) {
		super(presenceOptions);
	}

	getVideo() {
		return document.querySelector<HTMLMediaElement>(
			"video"
		);
	}

	getVideoType() {
		if (this.getVideoTitle().match(/S\d+\s*\|\s*E\d+/i) || this.getVideoTitle().match(/EP\s*\d+/i))
			return "show";
		 else 
			return "movie";
	}

	getTitle(eyebrow = false) {
		if (this.isWatching() && eyebrow) return this.getVideoTitle();

		const title = document.querySelector("div.bein-dh1-hero__head-container > h1.bein-dh1-hero__title.heading-shadow")?.textContent;

		return (
			title ??
			this.getVideoTitle().replace(/\d+\s*-\s*\d+/ as RegExp, "vs") ??
			"Unknown"
		);
	}

	getVideoTitle() {
		return document.querySelector(
			"div.diva-standard-title"
		)?.textContent;
	}

	isWatching() {
		return !!this.getVideoTitle();
	}

	isLive() {
		if (document.querySelector("span.diva-live-now"))
			return true;
		else
			return false;
	}

	isTrailer() {
		return this.getVideoTitle().includes("Trailer") ? true : false;
	}
}

const enum Assets {
	Logo = "https://i.imgur.com/2euETKm.png",
}

const presence = new TOD({
		clientId: "1229087342787039334",
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
		type: ActivityType.Watching,
		smallImageKey: Assets.Search,
		smallImageText: "Browsing",
		largeImageKey: Assets.Logo,
		details: "Browsing...",
		startTimestamp: data.startedSince,
	};

	data.presence = {
		"/movie/([a-zA-Z0-9-]+)": {
			setPresenceData() {
				if (presence.isWatching()) {
					const video = presence.getVideo();

					[, presenceData.endTimestamp] =
						presence.getTimestampsfromMedia(video);

						if (presence.isTrailer()) {
							presenceData.details = "Watching a trailer";
							presenceData.state = presence.getVideoTitle().replace(/- (.+)/, "");

							presenceData.smallImageText = video.paused ? "Paused" : "Playing";
							presenceData.smallImageKey = video.paused
								? Assets.Pause
								: Assets.Play;

							presenceData.buttons = [
								{
									label: "Watch Trailer",
									url: document.URL,
								},
							];
						} else {
							presenceData.details = `Watching ${presence.getVideoType() === "show" ? "show" : presence.getVideoType() === "movie" ? "movie" : "Unknown"}:`;
							presenceData.state = presence.getVideoTitle();

							presenceData.smallImageText = video.paused ? "Paused" : "Playing";
							presenceData.smallImageKey = video.paused
								? Assets.Pause
								: Assets.Play;

							presenceData.buttons = [
								{
									label: `Watch ${presence.getVideoType() === "show" ? "Show" : presence.getVideoType() === "movie" ? "Movie" : "Unknown"}`,
									url: document.URL,
								},
					];
						}

					if (video.paused) {
						delete presenceData.startTimestamp;
						delete presenceData.endTimestamp;
					}
				} else {
					presenceData.details = `Viewing ${presence.getVideoType() === "show" ? "show" : presence.getVideoType() === "movie" ? "movie" : "Unknown"}:`;
					presenceData.state = presence.getVideoTitle().replace(/(.+)/, "");

					presenceData.buttons = [
						{
							label: `View ${presence.getVideoType() === "show" ? "Show" : presence.getVideoType() === "movie" ? "Movie" : "Unknown"}`,
							url: document.URL,
						},
					];
				}
			},
		},
		"/watch/(soccer|multisports)-([a-zA-Z0-9-]+)": {
			setPresenceData() {
				if (presence.isWatching()) {
					const video = presence.getVideo();
					if(presence.isLive()) {
						presenceData.smallImageText = video.paused ? "Paused" : "Live";
						presenceData.smallImageKey = video.paused
							? Assets.Pause
							: Assets.Live;

					} else {
						[, presenceData.endTimestamp] =
						presence.getTimestampsfromMedia(video);

						presenceData.smallImageText = video.paused ? "Paused" : "Playing";
						presenceData.smallImageKey = video.paused
							? Assets.Pause
							: Assets.Play;
					}

					presenceData.details = presence.getTitle();
					presenceData.state = "Match";

					presenceData.buttons = [
						{
							label: "Watch Match",
							url: document.URL,
						},
					];

					if (video.paused) {
						delete presenceData.startTimestamp;
						delete presenceData.endTimestamp;
					}
				} else {
					presenceData.details = "Watching match:";
					presenceData.state = presence.getTitle();

					presenceData.buttons = [
						{
							label: "Watch Match",
							url: document.URL,
						},
					];
				}
			},
		},
		"/sports/event/soccer-([a-zA-Z0-9-]+)": {
			setPresenceData() {
				if (presence.isWatching()) {
					const video = presence.getVideo();
					[, presenceData.endTimestamp] =
						presence.getTimestampsfromMedia(video);

					presenceData.details = presence.getTitle();
					presenceData.state = "Match";

					presenceData.smallImageText = video.paused ? "Paused" : "Playing";
					presenceData.smallImageKey = video.paused
						? Assets.Pause
						: Assets.Play;

					presenceData.buttons = [
						{
							label: "Preview Match",
							url: document.URL,
						},
					];

					if (video.paused) {
						delete presenceData.startTimestamp;
						delete presenceData.endTimestamp;
					}
				} else {
					presenceData.smallImageKey = Assets.Viewing;
					presenceData.smallImageText = "Viewing";
					presenceData.details = "Previewing match:";
					presenceData.state = presence.getTitle();

					presenceData.buttons = [
						{
							label: "Preview Match",
							url: document.URL,
						},
					];
				}
			},
		},
		"/account": {
			setPresenceData() {
				presenceData.details = "Viewing their settings";
			},
		},
	};

	data.settings = [
		{
			id: "timestamp",
			data: ["startTimestamp", "endTimestamp"],
		},
		{
			id: "buttons",
			data: ["buttons"],
		},
		{
			id: "smallImage",
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
    const videoType = presence.getVideoType();
    const presenceKey = videoType === "movie" || videoType === "show" ? "/movie/([a-zA-Z0-9-]+)" : "Unknown";
    data.presence[presenceKey].setPresenceData();
}


	for (const setting of data.settings) {
		const settingValue = await presence.getSetting<boolean>(setting.id);

		if (!settingValue) {
			for (const PData of setting.data)
				delete presenceData[PData as keyof PresenceData];
		}
	}

	presence.setActivity(presenceData);
});