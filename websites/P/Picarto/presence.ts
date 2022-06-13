const presence = new Presence({
		clientId: "630771716058120192",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	}),
	presenceData: PresenceData = {
		largeImageKey: "logo",
	},
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const video = document.querySelector<HTMLVideoElement>(
		"#picarto-player-1_html5_api"
	);
	if (video && !isNaN(video.duration)) {
		const title = document.querySelector<HTMLElement>(".d-flex h4"),
			uploader = document.querySelector<HTMLElement>(
				"#userbar-name .d-flex .d-inline-block"
			);
		presenceData.details = title ? title.textContent : "Title not found...";
		presenceData.state = uploader
			? uploader.textContent
			: "Uploader not found...";
		presenceData.largeImageKey = "logo";
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
			largeImageKey: "logo",
		});
	}
});
