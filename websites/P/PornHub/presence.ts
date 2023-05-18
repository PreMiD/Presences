const presence = new Presence({
		clientId: "607352899214901248",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

presence.on("UpdateData", async () => {
	//* If user is on /view_video...
	if (window.location.pathname === "/view_video.php") {
		const video: HTMLVideoElement =
				document.querySelector(".mgp_videoWrapper video") ?? null,
			showTime = await presence.getSetting<boolean>("time");

		if (video && !isNaN(video.duration)) {
			//* Get required tags
			const title: HTMLElement = document.querySelector(
					".video-wrapper .title-container .title"
				),
				uploader: HTMLElement = document.querySelector(
					".video-actions-container .video-info-row .usernameWrap a"
				),
				presenceData: PresenceData = {
					details: title ? title.textContent : "Title not found...",
					state: uploader ? uploader.textContent : "Uploader not found...",
					largeImageKey: "https://i.imgur.com/ey3BiTYl.jpg",
					smallImageKey: video.paused ? Assets.Pause : Assets.Play,
					smallImageText: video.paused
						? (await strings).pause
						: (await strings).play,
					endTimestamp: presence.getTimestampsfromMedia(video)[1],
				};

			//* Remove timestamps if paused or not show timestamps
			if (video.paused || !showTime) delete presenceData.endTimestamp;

			//* If tags are not "null"
			if (title && uploader) presence.setActivity(presenceData, !video.paused);
			else presence.setActivity();
		}
	} else presence.setActivity();
});
