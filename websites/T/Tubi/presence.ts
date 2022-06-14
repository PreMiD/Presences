const presence = new Presence({
		clientId: "937290941285429311",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "tubi-logo",
		},
		video: HTMLVideoElement = document.querySelector(
			"video#videoPlayerComponent"
		);
	if (video && !isNaN(video.duration)) {
		const [startTimestamp, endTimestamp] = presence.getTimestamps(
			Math.floor(video.currentTime),
			Math.floor(video.duration)
		);
		presenceData.details = document
			.querySelector('meta[property="og:title"]')
			.getAttribute("content");
		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused
			? (await strings).pause
			: (await strings).play;
		presenceData.startTimestamp = startTimestamp;
		presenceData.endTimestamp = endTimestamp;

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (presenceData.details) presence.setActivity(presenceData, !video.paused);
	} else {
		presenceData.details = "Browsing...";
		presence.setActivity(presenceData);
	}
});
