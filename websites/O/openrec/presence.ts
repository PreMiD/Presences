const presence = new Presence({
		clientId: "612652426180296849",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
		live: "presence.activity.live",
	}),
	presenceData: PresenceData = {
		largeImageKey: "logo",
	};

presence.on("UpdateData", async () => {
	const live = !!document.querySelector(".MovieTitle__Title-s181dg2v-4"),
		video = document.querySelector<HTMLVideoElement>(
			live ? ".openrec-video" : "#capture-play"
		);
	if (video && !isNaN(video.duration)) {
		const title = document.querySelector<HTMLElement>(
				live
					? ".MovieTitle__Title-s181dg2v-4"
					: ".Component__CaptureTitle-s1nip9ch-16"
			),
			game = document.querySelector<HTMLElement>(
				live ? ".TagButton__Button-otjf40-0" : ".text-hover"
			);

		presenceData.details = title ? title.textContent : "Title not found...";
		presenceData.state = game ? game.textContent : "Game not found...";
		presenceData.largeImageKey = "logo";
		presenceData.smallImageKey = live
			? "live"
			: video.paused
			? "pause"
			: "play";
		presenceData.smallImageText = live
			? (await strings).live
			: video.paused
			? (await strings).pause
			: (await strings).play;
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);

		if (video.paused || live) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (title && game) presence.setActivity(presenceData, !video.paused);
	} else {
		presence.setActivity({
			details: "Browsing..",
			largeImageKey: "logo",
		});
	}
});
