const presence = new Presence({
		clientId: "640253556078673951",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

let browsingTimestamp = Math.floor(Date.now() / 1000),
	title: HTMLElement,
	air: HTMLInputElement,
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

presence.on("iFrameData", (data: IFrameData) => {
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
	playback = data.iframeVideo.dur !== null ? true : false;

	if (playback) {
		({ iFrameVideo, paused } = data.iframeVideo);
		currentTime = data.iframeVideo.currTime;
		duration = data.iframeVideo.dur;
	}
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/0oTbCN4.png",
	};

	if (
		document.querySelector("#adsIfrme > div > div > div > h1 > strong") !== null
	) {
		if (iFrameVideo === true && !isNaN(duration)) {
			presenceData.smallImageKey = paused ? "pause" : "play";
			presenceData.smallImageText = paused
				? (await strings).pause
				: (await strings).play;
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(Math.floor(currentTime), Math.floor(duration));

			title = document.querySelector(
				"#adsIfrme > div > div > div > h1 > strong"
			);
			presenceData.details = title.textContent;

			air = document.querySelector("#selectServer");

			presenceData.state = `Server: ${air.value}`;

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else if (iFrameVideo === null && isNaN(duration)) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Looking at: ";
			title = document.querySelector(
				"#adsIfrme > div > div > div > h1 > strong"
			);

			presenceData.state = title.textContent;
			presenceData.smallImageKey = Assets.Reading;
		}
	} else if (document.location.pathname === "/") {
		presenceData.details = "Viewing main page";
		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/CartoonList")) {
		presenceData.details = "Viewing cartoonlist";
		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/Genre")) {
		presenceData.details = "Viewing genres";
		presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname.includes("/Cartoon")) {
		presenceData.details = "Viewing cartoon:";
		presenceData.state = document.querySelector(
			"#leftside > div:nth-child(1) > div.barContent.full > div > div.right_movie > h1 > a"
		).textContent;
		presenceData.startTimestamp = browsingTimestamp;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
