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

			if (!paused) {
				[presenceData.startTimestamp, presenceData.endTimestamp] = [
					startTimestamp,
					endTimestamp,
				];
			}
		} else if (iFrameVideo === null && isNaN(duration)) {
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
		}
	} else if (search) {
		presenceData.details = "Searching for:";
		presenceData.state = search;

		presenceData.startTimestamp = browsingTimestamp;
		delete presenceData.smallImageText;
		presenceData.smallImageKey = Assets.Search;
	} else if (
		document.location.pathname.includes("/show/") &&
		document.location.pathname.includes("/reviews")
	) {
		title = document.querySelector(
			"#view-wrapper > div > div > div.reviews-header > div"
		);
		presenceData.details = "Viewing reviews of show:";
		presenceData.state = title.textContent.replace("Reviews zu ", "");

		presenceData.startTimestamp = browsingTimestamp;
		delete presenceData.smallImageText;
		delete presenceData.smallImageKey;
	} else if (document.location.pathname.includes("/show/")) {
		title = document.querySelector(
			"#view-wrapper > div.show > div > div.header-wrapper > div.show-header > div > div:nth-child(1) > div.name-wrapper > h1"
		);
		presenceData.details = "Viewing show:";
		presenceData.state = title.textContent;

		presenceData.startTimestamp = browsingTimestamp;
		delete presenceData.smallImageText;
		delete presenceData.smallImageKey;
	} else {
		switch (document.location.pathname) {
			case "/airing": {
				presenceData.details = "Viewing the calendar";
				delete presenceData.state;

				presenceData.startTimestamp = browsingTimestamp;
				delete presenceData.smallImageText;
				delete presenceData.smallImageKey;

				break;
			}
			case "/all": {
				presenceData.details = "Viewing the list";
				presenceData.state = "of all shows";

				presenceData.startTimestamp = browsingTimestamp;
				delete presenceData.smallImageText;
				delete presenceData.smallImageKey;

				break;
			}
			case "/about": {
				presenceData.details = "Viewing the about page";
				delete presenceData.state;

				presenceData.startTimestamp = browsingTimestamp;
				delete presenceData.smallImageText;
				presenceData.smallImageKey = Assets.Reading;

				break;
			}
			case "/": {
				presenceData.details = "Viewing the main page";
				delete presenceData.state;

				presenceData.startTimestamp = browsingTimestamp;
				delete presenceData.smallImageText;
				presenceData.smallImageKey = Assets.Reading;

				break;
			}
		}
	}
	if (presenceData?.endTimestamp && presenceData?.startTimestamp)
		presenceData.type = ActivityType.Watching;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
