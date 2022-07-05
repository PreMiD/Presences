const presence = new Presence({
		clientId: "844107447933075498",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
		live: "presence.activity.live",
	});

presence.on("UpdateData", async () => {
	const video = document.querySelector<HTMLVideoElement>(
			"#main-container > div > video"
		),
		presenceData: PresenceData = {
			largeImageKey: "logo",
		};

	let description;

	if (video && !isNaN(video.duration)) {
		const title = document.querySelector(
			"#player-video-overlay .player-title .player-title-name"
		).textContent;
		if (document.location.pathname.includes("/live")) {
			description = document.querySelector(
				"#player-video-overlay .player-title div span"
			).textContent;
		} else {
			description = document.querySelector(
				"#player-video-overlay .player-title div"
			).textContent;
		}

		if (description === null || description.trim() === title)
			description = "Movie";

		let [, endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			),
			currentState: string,
			smallImageKey: string,
			smallImageText: string;

		if (description.includes("ON NOW")) {
			currentState = "Live TV";
			endTimestamp = 0;
			smallImageKey = "live";
			smallImageText = (await strings).live;
		} else {
			currentState = description.substring(description.lastIndexOf("  ") + 1);
			smallImageKey = video.paused ? "pause" : "play";
			smallImageText = video.paused
				? (await strings).pause
				: (await strings).play;
		}

		presenceData.details = title;
		presenceData.state = currentState;
		presenceData.smallImageKey = smallImageKey;
		presenceData.smallImageText = smallImageText;
		presenceData.endTimestamp = endTimestamp;

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	} else presenceData.details = "Browsing...";

	if (presenceData.details) presence.setActivity(presenceData);
});
