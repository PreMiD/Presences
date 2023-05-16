const presence = new Presence({
		clientId: "605861238852943988",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

presence.on("UpdateData", async () => {
	const video = document.querySelector<HTMLVideoElement>(
		".mhp1138_videoWrapper video"
	);
	if (video && !isNaN(video.duration)) {
		//* Get required tags
		const title = document.querySelector<HTMLHeadingElement>(".video_title"),
			uploader = document.querySelector(".video-infobox-link"),
			timestamps = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			),
			presenceData: PresenceData = {
				details: title?.textContent ?? "Title not found...",
				state: uploader?.textContent ?? "Uploader not found...",
				largeImageKey: "https://i.imgur.com/YrWWEZC.png",
				smallImageKey: video.paused ? Assets.Pause : Assets.Play,
				smallImageText: video.paused
					? (await strings).pause
					: (await strings).play,
				startTimestamp: timestamps[0],
				endTimestamp: timestamps[1],
			};

		//* Remove timestamps if paused
		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		//* If tags are not "null"
		if (title && uploader) presence.setActivity(presenceData, !video.paused);
	} else presence.setActivity();
});
