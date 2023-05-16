const presence = new Presence({
		clientId: "697552926876368917",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

let iFrameVideo: boolean,
	currentTime: number,
	duration: number,
	paused: boolean,
	video: {
		iframeVideo: {
			duration: number;
			iFrameVideo: boolean;
			currTime: number;
			dur: number;
			paused: boolean;
		};
	},
	playback: boolean,
	title: HTMLTextAreaElement,
	browsingTimestamp: number;

presence.on(
	"iFrameData",
	(data: {
		iframeVideo: {
			duration: number;
			iFrameVideo: boolean;
			currTime: number;
			dur: number;
			paused: boolean;
		};
	}) => {
		video = data;
		playback = !!data.iframeVideo.duration;
		if (playback) {
			({ iFrameVideo, paused } = data.iframeVideo);
			currentTime = data.iframeVideo.currTime;
			duration = data.iframeVideo.dur;
		}
	}
);

presence.on("UpdateData", async () => {
	const info = await presence.getSetting<boolean>("sSI"),
		elapsed = await presence.getSetting<boolean>("sTE"),
		videoTime = await presence.getSetting<boolean>("sVT");

	if (elapsed) {
		browsingTimestamp = Math.floor(Date.now() / 1000);
		presence.info("Elapsed is on");
	} else {
		browsingTimestamp = null;
		presence.info("Elapsed Off");
	}
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/AEOuBRB.png",
	};
	if (videoTime) {
		presence.info("Video Time is On");
		if (playback) {
			// lastPlaybackState = playback;
			browsingTimestamp = Math.floor(Date.now() / 1000);
		}
	} else presence.info("Video time is off");

	if (info) {
		presence.info("Info is On.");
		switch (document.location.pathname) {
			case "/": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing home page";

				break;
			}
			case "/movies": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing the recently added movies";

				break;
			}
			case "/series": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing the recently added series";

				break;
			}
			case "/cinema-movies": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing the recently added cinema movies.";

				break;
			}
			case "/recommended-series": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing recommened series";
				//Used for the video files (Needs some work done here)

				break;
			}
			default:
				if (document.location.pathname.includes("/videos/")) {
					title = document.querySelector<HTMLTextAreaElement>(
						"#main_bg > div:nth-child(5) > div > div.video-info-left > h1"
					);
					if (title) {
						presenceData.state = title.textContent;
						if (iFrameVideo && !isNaN(duration) && title && video) {
							if (!paused) {
								presenceData.details = "Watching:";
								presenceData.smallImageKey = paused
									? Assets.Pause
									: Assets.Play;
								if (videoTime) {
									presenceData.smallImageText = paused
										? (await strings).pause
										: (await strings).play;
									[presenceData.startTimestamp, presenceData.endTimestamp] =
										presence.getTimestamps(
											Math.floor(currentTime),
											Math.floor(duration)
										);
								}
							} else if (paused) {
								delete presenceData.startTimestamp;
								delete presenceData.endTimestamp;
								presenceData.details = "Paused:";
								presenceData.smallImageKey = Assets.Pause;
								presenceData.smallImageText = (await strings).pause;
							}
						} else if (!iFrameVideo && isNaN(duration) && title) {
							presenceData.details = "Viewing:";
							presenceData.state = title.textContent;
							presenceData.startTimestamp = browsingTimestamp;
						} else {
							presenceData.details = "Error 03: Watching unknown show/movie.";
							presenceData.state = "Can't tell if playing or not.";
							presenceData.startTimestamp = browsingTimestamp;
							presenceData.smallImageKey = Assets.Search;
							presenceData.smallImageText = "Error 3";
							presence.error(
								"Can't tell what you are watching. Fix a variable or line of code."
							);
						}
					} else {
						//Can't get the basic site information
						presenceData.startTimestamp = browsingTimestamp;
						presenceData.details = "Error 02: Watching unknown show/movie.";
						presenceData.smallImageKey = Assets.Search;
						presence.error("Can't read page.");
					}
				} else if (
					document.querySelector(
						"#main_bg > div:nth-child(5) > div > div.section-header > h3"
					).textContent === " Result search"
				) {
					presence.info("Searching");
					presenceData.details = "Searching:";
					presenceData.state = document.location.href.replace(
						"https://vidcloud9.com/search.html?keyword=",
						""
					);
					presenceData.smallImageKey = Assets.Search;
					presenceData.smallImageText = "Searching";
				} else {
					//If it can't get the page it will output an error
					presenceData.startTimestamp = browsingTimestamp;
					presenceData.details = "Error 01: Can't Read Page";
					presenceData.smallImageKey = Assets.Search;
					presence.error("Can't read page. Set up a conditional.");
				}
		}
	} else {
		presenceData.details = null;
		presence.info("Info is off.");
	}

	if (!presenceData.details) {
		//This will fire if you do not set presence details

		presence.setActivity();
	} else {
		//This will fire if you set presence details
		presence.setActivity(presenceData);
	}
});
