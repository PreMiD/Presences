const presence = new Presence({
		clientId: "641402862961950733",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
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

let video: HTMLVideoElement;

presence.on("iFrameData", (data: { iframeVideo: HTMLVideoElement }) => {
	video = data.iframeVideo;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/B8evsEL.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname === "/")
		presenceData.details = "Viewing home page";
	else if (document.location.pathname.includes("/Drama/")) {
		const dramaTitle = document.querySelector(".barContent > div > .bigChar"),
			videoTitle = document.querySelector(".heading > h3"),
			selectEpisode = document.querySelector("#selectEpisode > [selected]");
		if (dramaTitle) {
			presenceData.details = "Viewing drama:";
			presenceData.state = dramaTitle.textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (!isNaN(video?.duration) && (videoTitle || selectEpisode)) {
			delete presenceData.startTimestamp;
			if (videoTitle) {
				[presenceData.details, presenceData.state] =
					videoTitle.textContent.split(" » ");
			} else {
				presenceData.details = document
					.querySelector("#navsubbar > p > a")
					.textContent.split("\n")[2]
					.trim();
				presenceData.state = selectEpisode.textContent.trim();
			}
			presenceData.smallImageKey = video.paused ? "pause" : "play";
			presenceData.smallImageText = video.paused
				? (await strings).pause
				: (await strings).play;
			[, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video);
			if (video.paused) delete presenceData.endTimestamp;
		}
	} else if (document.location.pathname.includes("/DramaList")) {
		presenceData.details = "Viewing drama list";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("AreYouHuman"))
		presenceData.details = "Completing a captcha...";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
