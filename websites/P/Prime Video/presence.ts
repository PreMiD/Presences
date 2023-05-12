const presence = new Presence({
		clientId: "705139844883677224",
	}),
	strings = presence.getStrings({
		paused: "general.paused",
		playing: "general.playing",
	}),
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
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number): number[] {
	const startTime = Date.now();
	return [
		Math.floor(startTime / 1000),
		Math.floor(startTime / 1000) - videoTime + videoDuration,
	];
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = { largeImageKey: "pvid" };
	presenceData.startTimestamp = browsingTimestamp;
	const title: string =
			document.querySelector(
				".webPlayerSDKUiContainer > div > div > div > div:nth-child(2) > div > div:nth-child(4) > div > div:nth-child(2) > div:nth-child(2) > div > div > div > h1"
			)?.textContent ||
			document.querySelector(".atvwebplayersdk-title-text")?.textContent,
		title2: string =
			document.querySelector(".av-detail-section > div > h1")?.textContent ||
			document.querySelector<HTMLImageElement>(
				".av-detail-section > div > h1 > div > img"
			)?.alt;
	if (title || title2) {
		let video = document.querySelector<HTMLVideoElement>(
			".scalingVideoContainer > div.scalingVideoContainerBottom > div > video"
		);
		if (video === null || isNaN(video.duration))
			video = document.querySelector("video");

		if (video === null || isNaN(video.duration))
			video = document.querySelector("video:nth-child(2)");

		const subtitle =
			document.querySelector<HTMLElement>(
				".webPlayerSDKUiContainer > div > div > div > div:nth-child(2) > div > div:nth-child(4) > div > div:nth-child(2) > div:nth-child(2) > div > div > div > h2"
			) ||
			document.querySelector<HTMLElement>(".atvwebplayersdk-subtitle-text");

		if (video && title && !video.className.includes("tst")) {
			presenceData.details = title;
			if (
				subtitle &&
				subtitle.textContent &&
				subtitle.textContent.trim() !== title.trim()
			)
				presenceData.state = subtitle.textContent;

			if (video.paused) {
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = (await strings).paused;
				delete presenceData.startTimestamp;
			} else {
				const [startTimestamp, endTimestamp] = getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				);
				presenceData.startTimestamp = startTimestamp;
				presenceData.endTimestamp = endTimestamp;
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = (await strings).playing;
			}
		} else if (video && !video.className.includes("tst")) {
			if (title2 !== "") presenceData.details = title2;
			if (video.paused) {
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = (await strings).paused;
				delete presenceData.startTimestamp;
			} else {
				const [startTimestamp, endTimestamp] = getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				);
				presenceData.startTimestamp = startTimestamp;
				presenceData.endTimestamp = endTimestamp;
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = (await strings).playing;
			}
		} else if (title2) {
			presenceData.details = "Viewing:";
			presenceData.state = title2;
		} else if (document.location.pathname.includes("shop"))
			presenceData.details = "Browsing the store...";
		else presenceData.details = "Browsing...";
	} else if (document.location.pathname.includes("/home/"))
		presenceData.details = "Browsing...";
	else if (document.location.pathname.includes("shop"))
		presenceData.details = "Browsing the store...";
	else if (document.location.pathname.includes("/tv/"))
		presenceData.details = "Browsing TV-Series";
	else if (document.location.pathname.includes("/movie/"))
		presenceData.details = "Browsing Movies";
	else if (document.location.pathname.includes("/kids/"))
		presenceData.details = "Browsing Movies for kids";
	else if (
		document.location.pathname.includes("/search/") &&
		document.querySelector(".av-refine-bar-summaries")
	) {
		presenceData.details = "Searching for:";
		[presenceData.state] = document
			.querySelector(".av-refine-bar-summaries")
			.textContent.split(/["„]/)[1]
			.split(/[”"]/);
		presenceData.smallImageKey = Assets.Search;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
