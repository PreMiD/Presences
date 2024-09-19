const presence = new Presence({
		clientId: "1191396494381694976",
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
				"https://cdn.rcd.gg/PreMiD/websites/V/Vidoza/assets/logo.png",
		},
		{ pathname } = document.location,
		video = document.querySelector<HTMLVideoElement>("video");

	if (pathname.includes("embed-")) {
		delete presenceData.startTimestamp;
		const el = document
				.querySelector(".body-container")
				.querySelectorAll('[type="text/javascript"]'),
			title = el[el.length - 1].innerHTML
				.split("var curFileName =")?.[1]
				?.replace(/([.])/gm, " ")
				.replace('"', "");

		presenceData.details = title?.split(" S0")?.[0] ?? title;
		presenceData.state = title?.match(/S[0-9]*E[0-9]* /gm)?.[0];

		if (!isNaN(video?.duration)) {
			if (!video.paused) {
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestampsfromMedia(video);
			}
			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = video.paused
				? (await strings).pause
				: (await strings).play;
		}
	}

	presence.setActivity(presenceData);
});
