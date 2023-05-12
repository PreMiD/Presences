const presence = new Presence({
		clientId: "614388233886760972",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

let browsingTimestamp = Math.floor(Date.now() / 1000),
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

if (document.location.pathname.includes(".html")) {
	presence.on("iFrameData", (data: IFrameData) => {
		if (data.iframeVideo.dur) {
			({
				iFrameVideo,
				paused,
				currTime: currentTime,
				dur: duration,
			} = data.iframeVideo);
		}
	});
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/xYJbv9k.png",
	};

	presenceData.startTimestamp = browsingTimestamp;

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

	if (
		document.location.pathname.includes(".html") &&
		document.location.pathname.includes("/pages/")
	) {
		presenceData.details = "Reading the FAQs";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes(".html")) {
		if (iFrameVideo === true && !isNaN(duration)) {
			presenceData.smallImageKey = paused ? "pause" : "play";
			presenceData.smallImageText = paused
				? (await strings).pause
				: (await strings).play;
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(Math.floor(currentTime), Math.floor(duration));

			const views = document.querySelector(
				"#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(7)"
			);
			presenceData.details = document.querySelector(
				"#player > div.alert.alert-info.hidden-xs > div.media > div > a > h1"
			).textContent;

			const air = document.querySelector(
					"#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(9)"
				),
				air2 = document.querySelector(
					"#player > div.alert.alert-info.hidden-xs > div.media > div > p:nth-child(8)"
				);

			if (air && air.textContent.includes("Air on:")) {
				presenceData.state = `${views.textContent.replace(
					"Status: ",
					""
				)}, ${air.textContent.replace("Air", "Aired")}`;
			} else if (air2 && air2.textContent.includes("Air on:")) {
				presenceData.state = `${views.textContent.replace(
					"Status: ",
					""
				)}, ${air2.textContent.replace("Air", "Aired")}`;
			} else presenceData.state = views.textContent;

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else if (iFrameVideo === null && isNaN(duration)) {
			presenceData.details = "Looking at: ";
			presenceData.state = document.querySelector(
				"#player > div.alert.alert-info.hidden-xs > div.media > div > a > h1"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		}
	} else {
		switch (document.location.pathname) {
			case "/": {
				presenceData.details = "Browsing through";
				presenceData.state = "the main page";
				presenceData.smallImageKey = Assets.Reading;

				break;
			}
			case "/show/latest/": {
				presenceData.details = "Browsing through";
				presenceData.state = "the latest shows";
				presenceData.smallImageKey = Assets.Reading;

				break;
			}
			case "/show/popular/": {
				presenceData.details = "Browsing through";
				presenceData.state = "the most popular shows";
				presenceData.smallImageKey = Assets.Reading;

				break;
			}
			case "/show/rated/": {
				presenceData.details = "Browsing through";
				presenceData.state = "the highest rated shows";
				presenceData.smallImageKey = Assets.Reading;

				break;
			}
			case "/show/": {
				presenceData.details = "Browsing through";
				presenceData.state = "a list of all shows";
				presenceData.smallImageKey = Assets.Reading;

				break;
			}
			default:
				if (document.location.pathname.includes("/show/")) {
					presenceData.details = "Browsing through all episodes of:";
					presenceData.state = document.querySelector(
						"#info > div.media > div > h1 > a"
					).textContent;
					presenceData.smallImageKey = Assets.Reading;

					presence.setActivity(presenceData);
				} else if (document.location.pathname.includes("/search/")) {
					presenceData.details = "Searching for:";
					presenceData.state = document.querySelector(
						"#featured > div.page-header > h3"
					).textContent;
					presenceData.smallImageKey = Assets.Search;
				}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
