const presence = new Presence({
		clientId: "630771716058120192",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/dGFsGyk.png",
	},
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

presence.on("UpdateData", async () => {
	const video = document.querySelector<HTMLVideoElement>(".mistvideo-video");
	if (video && !isNaN(video.duration)) {
		const title = document.querySelector<HTMLElement>(
				".styled__StreamTitle-sc-sf47ty-9"
			),
			uploader = document.querySelector<HTMLElement>(
				".ChannelToolbarTitle__ChannelTitle-sc-146631g-3"
			);
		presenceData.details = title ? title.textContent : "Title not found...";
		presenceData.state = uploader
			? uploader.textContent
			: "Uploader not found...";
		presenceData.largeImageKey = "https://i.imgur.com/dGFsGyk.png";
		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused
			? (await strings).pause
			: (await strings).play;
		presenceData.startTimestamp = browsingTimestamp;

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (title && uploader) presence.setActivity(presenceData, !video.paused);
	} else {
		presence.setActivity({
			details: "Browsing..",
			largeImageKey: "https://i.imgur.com/dGFsGyk.png",
		});
	}
});
