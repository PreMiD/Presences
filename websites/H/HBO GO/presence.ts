const presence = new Presence({
		clientId: "605437254776651786",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/H/HBO%20GO/assets/logo.png",
		},
		video: HTMLVideoElement = document.querySelector(
			"#hbo-sdk--controller-container #hbo-sdk--controller-osd #hbo-sdk--vid #hbo-sdk--vid_Clpp_html5_mse_smooth_api"
		);
	if (
		(document.querySelector(
			"#hbo-sdk--controller-container #hbo-sdk--controller-osd #hbo-sdk--vid #hbo-sdk--vid_Clpp_html5_mse_smooth_api"
		) === null &&
			document.querySelector("#hbo-sdk--player-title > div.content-title") ===
				null) ||
		!video
	) {
		presenceData.details = "Browsing...";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);

		return presence.setActivity(presenceData);
	}

	if (!isNaN(video.duration)) {
		//* Get required tags
		const title: HTMLElement = document.querySelector(
			"#hbo-sdk--player-title > div.content-title"
		);
		presenceData.details = "Watching:";
		presenceData.state = title.textContent;
		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused
			? (await strings).pause
			: (await strings).play;
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);

		//* Remove timestamps if paused
		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		//* If tags are not "null"
		if (title.textContent) presence.setActivity(presenceData, !video.paused);
	} else presence.setActivity();
});
