const presence = new Presence({
		clientId: "934789855962083359",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browsing: "general.browsing",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "lm",
		},
		video = document.querySelector<HTMLVideoElement>("#video_player"),
		videoDur = document.querySelector(
			"#video_player > div.vjs-control-bar > div.vjs-duration.vjs-time-control.vjs-control > span.vjs-duration-display"
		);
	if (video && videoDur) {
		const titles = document.querySelector<HTMLMetaElement>(
				'meta[property="og:title"]'
			),
			videoDuration = presence.timestampFromFormat(
				document.querySelector(
					"#video_player > div.vjs-control-bar > div.vjs-duration.vjs-time-control.vjs-control > span.vjs-duration-display"
				).textContent
			),
			videoCurrent = presence.timestampFromFormat(
				document.querySelector(
					"#video_player > div.vjs-control-bar > div.vjs-current-time.vjs-time-control.vjs-control > span.vjs-current-time-display"
				).textContent
			),
			videoPaused = video.className;
		if (document.location.pathname.includes("/s/")) {
			presenceData.details = titles.content
				.replace("Watch show", "")
				.replace("on lookmovie for free in 1080p High Definition", "");
		} else if (document.location.pathname.includes("/m/")) {
			presenceData.details = titles.content
				.replace("Watch movie", "")
				.replace("on lookmovie in 1080p high definition", "");
		}
		presenceData.smallImageKey = videoPaused.includes("vjs-paused")
			? "pause"
			: "play";
		presenceData.smallImageText = videoPaused.includes("vjs-paused")
			? (await strings).pause
			: (await strings).play;
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				Math.floor(videoCurrent),
				Math.floor(videoDuration)
			);

		if (videoPaused.includes("vjs-paused")) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	} else {
		presenceData.details = (await strings).browsing;
		presenceData.smallImageKey = "search";
		presenceData.smallImageText = (await strings).browsing;
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
