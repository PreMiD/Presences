const presence = new Presence({
		clientId: "1190374591995060234",
	}),
	browsingTimestamp = Math.round(Date.now() / 1000),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/D/Doodstreams/assets/logo.png",
		},
		{ pathname } = document.location,
		video = document.querySelector<HTMLVideoElement>("video"),
		title = document.querySelector("title")?.textContent;

	if (pathname.includes("/e/")) {
		delete presenceData.startTimestamp;
		presenceData.details = title?.split(" S0")?.[0] ?? title;
		presenceData.state = title?.match(/S[0-9]*E[0-9]* /gm)?.[0];

		if (!isNaN(video?.duration)) {
			if (!video.paused)
				[, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video);
			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = video.paused
				? (await strings).pause
				: (await strings).play;
		}
	}

	presence.setActivity(presenceData);
});
