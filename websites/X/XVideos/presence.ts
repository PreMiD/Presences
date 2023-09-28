const presence = new Presence({
		clientId: "605119835751579649",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

presence.on("UpdateData", async () => {
	const video = document.querySelector<HTMLVideoElement>(".video-bg-pic video");
	if (video && !isNaN(video.duration)) {
		const title = document.querySelector<HTMLElement>(
				".video-page #main .page-title"
			)?.textContent,
			uploader = document.querySelector(
				".video-page #main .video-metadata .uploader-tag .name"
			),
			[startTimestamp, endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			),
			presenceData: PresenceData = {
				details: title ?? "Title not found...",
				state: uploader ? uploader.textContent : "Uploader not found...",
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/X/XVideos/assets/logo.png",
				smallImageKey: video.paused ? Assets.Pause : Assets.Play,
				smallImageText: video.paused
					? (await strings).pause
					: (await strings).play,
				startTimestamp,
				endTimestamp,
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
