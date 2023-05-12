const presence = new Presence({
		clientId: "630093952342687794", // CLIENT ID FOR YOUR PRESENCE
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

let browsingTimestamp = Math.floor(Date.now() / 1000),
	title: HTMLElement,
	views: HTMLElement,
	air: HTMLElement,
	search: string,
	iFrameVideo: boolean,
	currentTime: number,
	duration: number,
	paused: boolean,
	lastPlaybackState: boolean,
	playback: boolean;

interface IFrameData {
	iframeVideo: {
		dur: number;
		iFrameVideo: boolean;
		paused: boolean;
		currTime: number;
	};
}

if (
	document.querySelector("#view-wrapper > div:nth-child(2) > div > div.episode")
) {
	presence.on("iFrameData", (data: IFrameData) => {
		if (data.iframeVideo.dur) {
			({ iFrameVideo, paused } = data.iframeVideo);
			currentTime = data.iframeVideo.currTime;
			duration = data.iframeVideo.dur;
		}
	});
}

presence.on("UpdateData", async () => {
	if (lastPlaybackState !== playback) {
		lastPlaybackState = playback;
		browsingTimestamp = Math.floor(Date.now() / 1000);

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
	}
	const [startTimestamp, endTimestamp] = presence.getTimestamps(
			Math.floor(currentTime),
			Math.floor(duration)
		),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/lza7ROE.png",
			smallImageKey: paused ? "pause" : "play",
			smallImageText: paused ? (await strings).pause : (await strings).play,
			startTimestamp,
			endTimestamp,
		};

	search = document.querySelector<HTMLInputElement>(
		"#searchbar > div > input[type=text]"
	).value;
	if (
		document.querySelector(
			"#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > h1"
		)
	) {
		if (iFrameVideo === true && !isNaN(duration)) {
			title = document.querySelector(
				"#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > div > a"
			);
			views = document.querySelector(
				"#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > div > div.episode-number"
			);
			presenceData.state = `${title.textContent} (${views.textContent})`;

			air = document.querySelector(
				"#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > h1"
			);
			presenceData.details = air.textContent;

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}

			presence.setActivity(presenceData);
		} else if (iFrameVideo === null && isNaN(duration)) {
			delete presenceData.endTimestamp;
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Looking at: ";
			title = document.querySelector(
				"#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > div > a"
			);
			views = document.querySelector(
				"#view-wrapper > div:nth-child(2) > div > div.episode > div.infos > div:nth-child(1) > div > div.episode-number"
			);
			presenceData.state = `${title.textContent} (${views.textContent})`;
			delete presenceData.smallImageText;
			presenceData.smallImageKey = Assets.Reading;

			presence.setActivity(presenceData);
		}
	} else if (search !== "" && search.length >= 2) {
		presenceData.details = "Searching for:";
		presenceData.state = search;
		delete presenceData.endTimestamp;
		presenceData.startTimestamp = browsingTimestamp;
		delete presenceData.smallImageText;
		presenceData.smallImageKey = Assets.Search;
		presence.setActivity(presenceData);
	} else if (
		document.location.pathname.includes("/show/") &&
		document.location.pathname.includes("/reviews")
	) {
		title = document.querySelector(
			"#view-wrapper > div > div > div.reviews-header > div"
		);
		presenceData.details = "Viewing reviews of show:";
		presenceData.state = title.textContent.replace("Reviews zu ", "");
		delete presenceData.endTimestamp;
		presenceData.startTimestamp = browsingTimestamp;
		delete presenceData.smallImageText;
		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else if (document.location.pathname.includes("/show/")) {
		title = document.querySelector(
			"#view-wrapper > div.show > div > div.header-wrapper > div.show-header > div > div:nth-child(1) > div.name-wrapper > h1"
		);
		presenceData.details = "Viewing show:";
		presenceData.state = title.textContent;
		delete presenceData.endTimestamp;
		presenceData.startTimestamp = browsingTimestamp;
		delete presenceData.smallImageText;
		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else {
		switch (document.location.pathname) {
			case "/airing": {
				presenceData.details = "Viewing the calendar";
				delete presenceData.state;
				delete presenceData.endTimestamp;
				presenceData.startTimestamp = browsingTimestamp;
				delete presenceData.smallImageText;
				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);

				break;
			}
			case "/all": {
				presenceData.details = "Viewing the list";
				presenceData.state = "of all shows";
				delete presenceData.endTimestamp;
				presenceData.startTimestamp = browsingTimestamp;
				delete presenceData.smallImageText;
				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);

				break;
			}
			case "/about": {
				presenceData.details = "Viewing the about page";
				delete presenceData.state;
				delete presenceData.endTimestamp;
				presenceData.startTimestamp = browsingTimestamp;
				delete presenceData.smallImageText;
				presenceData.smallImageKey = Assets.Reading;

				presence.setActivity(presenceData);

				break;
			}
			case "/": {
				presenceData.details = "Viewing the main page";
				delete presenceData.state;
				delete presenceData.endTimestamp;
				presenceData.startTimestamp = browsingTimestamp;
				delete presenceData.smallImageText;
				presenceData.smallImageKey = Assets.Reading;

				presence.setActivity(presenceData);

				break;
			}
			default:
				presence.setActivity();
		}
	}
});
