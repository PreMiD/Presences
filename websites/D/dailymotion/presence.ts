const presence = new Presence({
		clientId: "611668948131512321",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/D/dailymotion/assets/logo.png",
	};

presence.on("UpdateData", async () => {
	const video: HTMLVideoElement = document.querySelector("#dmp_Video");
	if (video && !isNaN(video.duration)) {
		const title = document.querySelector(".VideoInfoTitle__videoTitle___3WLlw"),
			uploader = document.querySelector(".ChannelLine__channelName___3JE1B");
		presenceData.details = title
			? (title as HTMLElement).textContent
			: "Title not found...";
		presenceData.state = uploader
			? (uploader as HTMLElement).textContent
			: "Uploader not found...";
		presenceData.largeImageKey =
			"https://cdn.rcd.gg/PreMiD/websites/D/dailymotion/assets/logo.png";
		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused
			? (await strings).pause
			: (await strings).play;
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (title && uploader) presence.setActivity(presenceData, !video.paused);
	} else {
		presence.setActivity({
			details: "Browsing..",
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/D/dailymotion/assets/logo.png",
		});
	}
});
