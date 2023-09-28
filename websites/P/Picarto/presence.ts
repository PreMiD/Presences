const presence = new Presence({
		clientId: "630771716058120192",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/P/Picarto/assets/logo.png",
	},
	browsingTimestamp = Math.floor(Date.now() / 1000);

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
		presenceData.largeImageKey =
			"https://cdn.rcd.gg/PreMiD/websites/P/Picarto/assets/logo.png";
		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
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
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/P/Picarto/assets/logo.png",
		});
	}
});
