const presence = new Presence({
		clientId: "696085711148941344",
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
	browsingTimestamp: number,
	title: HTMLTextAreaElement,
	firstVideo: string,
	childLength: number;

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
		playback = !!data.iframeVideo.duration;
		if (playback) {
			({ iFrameVideo, paused } = data.iframeVideo);
			currentTime = data.iframeVideo.currTime;
			duration = data.iframeVideo.dur;
			video = data;
		}
	}
);

presence.on("UpdateData", async () => {
	const info = await presence.getSetting<boolean>("sSI"),
		elapsed = await presence.getSetting<boolean>("sTE"),
		videoTime = await presence.getSetting<boolean>("sVT"),
		buttons = await presence.getSetting<boolean>("buttons");

	if (elapsed) browsingTimestamp = Math.floor(Date.now() / 1000);

	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/V/Vidstreaming/assets/logo.png",
	};
	if (info) {
		switch (document.location.pathname) {
			case "/": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing home page or recently subbed";

				break;
			}
			case "/recently-added-raw": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing the recently added raw";

				break;
			}
			case "/recently-added-dub": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing the recently added dub";

				break;
			}
			case "/movies": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing the anime movies";

				break;
			}
			case "/new-season": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing the new anime seasons.";

				break;
			}
			case "/popular": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing the popular anime.";

				break;
			}
			case "/ongoing-series": {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing the ongoing series.";

				break;
			}
			default:
				if (document.location.pathname.includes("/videos/")) {
					//Used for the video files (Needs some work done here)
					title = document.querySelector(
						"body > #wrapper_bg > #wrapper > #main_bg > div > div > div.video-info-left > h1"
					);
					if (title) {
						presenceData.state = title.textContent;
						if (buttons) {
							childLength = document.querySelector(
								"#main_bg > div:nth-child(5) > div > div.video-info-left > ul"
							).children.length;
							firstVideo = document
								.querySelector(
									`#main_bg > div:nth-child(5) > div > div.video-info-left > ul > li:nth-child(${
										childLength - 1
									})`
								)
								.firstElementChild.getAttribute("href");
							presenceData.buttons = [
								{
									label: "Current Episode",
									url: document.location.href,
								},
								{
									label: "First Episode",
									url: `https://gogo-stream.com${firstVideo}`,
								},
							];
						}
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
							}
						} else if (!iFrameVideo && isNaN(duration) && title) {
							presenceData.details = "Viewing:";
							presenceData.state = title.textContent;
							presenceData.startTimestamp = browsingTimestamp;
						} else {
							presenceData.details = "Error 03: Watching unknown anime.";
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
						presenceData.details = "Error 02: Watching unknown anime.";
						presenceData.smallImageKey = Assets.Search;
						presence.error("Watching an unknown show.");
					}
				} else if (
					document.querySelector(
						"#main_bg > div:nth-child(5) > div > div.section-header > h3"
					).textContent === " Result search"
				) {
					presenceData.details = "Searching:";
					presenceData.state = document.location.href
						.replace("https://gogo-stream.com/search.html?keyword=", "")
						.split("%20")
						.join(" ");
					presenceData.smallImageKey = Assets.Search;
					presenceData.smallImageText = "Searching";
				} else {
					//If it can't get the page it will output an error
					presenceData.startTimestamp = browsingTimestamp;
					presenceData.details = "Error 01: Can't Read Page";
					presenceData.smallImageKey = Assets.Search;
					presence.error("Can't read page.");
				}
		}
	}
	if (!presenceData.details) {
		//This will fire if you do not set presence details

		presence.setActivity();
	} else {
		//This will fire if you set presence details
		presence.setActivity(presenceData);
	}
});
