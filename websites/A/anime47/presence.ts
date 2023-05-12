const presence = new Presence({
		clientId: "640990409224486971",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

let browsingTimestamp = Math.floor(Date.now() / 1000),
	title: string,
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
	if (data.iframeVideo.dur) {
		({
			iFrameVideo,
			paused,
			currTime: currentTime,
			dur: duration,
		} = data.iframeVideo);
	}
});

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
			largeImageKey: "https://i.imgur.com/Vmm3C6N.png",
			startTimestamp: browsingTimestamp,
		};

	if (
		document.querySelector(
			"body > div.container > div:nth-child(3) > div > div.movie-info > div > div.block-wrapper.page-single > div > div.block-movie-info.movie-info-box > div > div.col-6.movie-detail > h1 > span.title-1"
		)
	) {
		presenceData.details = "Đang xem:";
		presenceData.state = document.querySelector(
			"body > div.container > div:nth-child(3) > div > div.movie-info > div > div.block-wrapper.page-single > div > div.block-movie-info.movie-info-box > div > div.col-6.movie-detail > h1 > span.title-1"
		).textContent;
		presenceData.smallImageKey = Assets.Reading;
	} else if (
		document.querySelector(
			"body > div.container > ol > li:nth-child(5) > a > span"
		)
	) {
		if (iFrameVideo === true && !isNaN(duration)) {
			presenceData.smallImageKey = paused ? "pause" : "play";
			presenceData.smallImageText = paused
				? (await strings).pause
				: (await strings).play;
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;

			[presenceData.details, presenceData.state] = document
				.querySelector("head > title")
				.textContent.split("- ");

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else if (!iFrameVideo && isNaN(duration)) {
			presenceData.details = "Đang xem: ";
			title = document.querySelector("head > title").textContent;

			presenceData.state = title;
			presenceData.smallImageKey = Assets.Reading;
		}
	} else if (document.location.pathname === "/")
		presenceData.details = "Đang xem trang chủ";
	else if (document.URL.includes("/the-loai/")) {
		presenceData.details = "Đang xem danh mục:";
		presenceData.state = document
			.querySelector(
				"body > div.container > div:nth-child(5) > div > div.movie-list-index.home-v2 > h1 > span"
			)
			.textContent.split(":")[1]
			.replace(" - Anime Vietsub Online", "");
	} else {
		presenceData.details = "Đang xem:";
		presenceData.state = document.querySelector("head > title").textContent;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
