const presence = new Presence({
		clientId: "639578071338582021",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

let browsingTimestamp = Math.floor(Date.now() / 1000),
	title: Element,
	air: Element,
	iFrameVideo: boolean,
	currentTime: number,
	duration: number,
	paused: boolean,
	lastPlaybackState: boolean = null,
	playback,
	search: HTMLInputElement;

presence.on(
	"iFrameData",
	(data: {
		iframeVideo: {
			iFrameVideo: boolean;
			currTime: number;
			dur: number;
			paused: boolean;
		};
	}) => {
		playback = !!data.iframeVideo.dur;

		if (playback) {
			({ iFrameVideo, paused } = data.iframeVideo);
			currentTime = data.iframeVideo.currTime;
			duration = data.iframeVideo.dur;
		}
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
	}
);

presence.on("UpdateData", async () => {
	const [startTimestamp, endTimestamp] = presence.getTimestamps(
			Math.floor(currentTime),
			Math.floor(duration)
		),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/12xbQOt.png",
			startTimestamp: browsingTimestamp,
		};

	if (document.location.pathname.includes("/item")) {
		if (iFrameVideo && !isNaN(duration)) {
			presenceData.smallImageKey = paused ? "pause" : "play";
			presenceData.smallImageText = paused
				? (await strings).pause
				: (await strings).play;
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;

			title = document.querySelector(
				"body > div#main-page > div.content-block.container.clearfix > div.content > div > div.content-page.anime-page > h1"
			);
			presenceData.details = title.textContent;

			air = document.querySelector(
				"body > div.content-block.container.clearfix > div.content > div > ul.content-main-info > li:nth-child(3) > font > font"
			);
			if (
				air &&
				document.querySelector(
					"body > div.web-app > div.home-bg > div > div > div.col-12.col-md-12.col-lg-9 > div > div > article > div > div:nth-child(1) > div.col-12.col-sm-6.col-lg-7 > div > div > table > tbody > tr:nth-child(5)"
				)
			) {
				air = document.querySelector(
					"body > div.web-app > div.home-bg > div > div > div.col-12.col-md-12.col-lg-9 > div > div > article > div > div:nth-child(1) > div.col-12.col-sm-6.col-lg-7 > div > div > table > tbody > tr:nth-child(5)"
				);
			}

			if (air) {
				presenceData.state = `Aired on: ${air.textContent.replace(
					"AIRED :",
					""
				)}`;
			}

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else if (!iFrameVideo && isNaN(duration)) {
			presenceData.details = "Looking at: ";
			title = document.querySelector(
				"body > div#main-page > div.content-block.container.clearfix > div.content > div > div.content-page.anime-page > h1"
			);
			presenceData.state = title.textContent;
			presenceData.smallImageKey = Assets.Reading;
		}
	} else if (document.location.pathname.includes("/movie")) {
		presenceData.details = "Browsing through";
		presenceData.state = "all movies";
	} else if (document.location.pathname.includes("/anime")) {
		presenceData.details = "Browsing through";
		presenceData.state = "all animes";
	} else if (document.URL.includes("/search")) {
		search = document.querySelector(
			"body > div.content-block.container.clearfix > div.search-block-wrapper.main-search.clearfix > form > input.search"
		);
		presenceData.details = "Searching for:";
		presenceData.state = search.value;
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname.includes("/ongoing")) {
		presenceData.details = "Browsing through";
		presenceData.state = "ongoing animes";
	} else if (document.location.pathname.includes("/anime-updates")) {
		presenceData.details = "Browsing through";
		presenceData.state = "anime updates";
	} else if (document.location.pathname.includes("/post/")) {
		presenceData.details = "Reaing post:";
		title =
			document.querySelector(
				"body > div.content-block.container.clearfix > div.content > div > div.post-title > font > font"
			) ??
			document.querySelector(
				"body > div.content-block.container.clearfix > div.content > div > div.post-title"
			);

		presenceData.state = title.textContent;
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/post"))
		presenceData.details = "Viewing posts";
	else if (document.location.pathname.includes("/top"))
		presenceData.details = "Viewing the top";
	else if (document.URL === "https://otakustream.tv/") {
		presenceData.details = "Browsing...";
		presenceData.smallImageKey = Assets.Reading;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
