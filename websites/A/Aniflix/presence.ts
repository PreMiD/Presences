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

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/A/Aniflix/assets/logo.png",
}

presence.on("UpdateData", async () => {
	if (lastPlaybackState !== playback) {
		lastPlaybackState = playback;
		browsingTimestamp = Math.floor(Date.now() / 1000);
	}
	const [startTimestamp, endTimestamp] = presence.getTimestamps(
			Math.floor(currentTime),
			Math.floor(duration)
		),
		presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			smallImageKey: paused ? Assets.Pause : Assets.Play,
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
