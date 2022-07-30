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
		video =
			document.querySelector<HTMLVideoElement>("video[class*='video']") ??
			document.querySelector<HTMLVideoElement>("video[id*='video']"),
		cover = await presence.getSetting<boolean>("cover");
	if (video && video.duration) {
		const titles =
			document.querySelector('[class="bd-hd"]')?.textContent ??
			document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
				?.content ??
			document
				.querySelector("head > title")
				?.textContent.replace(" | LookMovie", "");
		presenceData.details = titles;

		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused
			? (await strings).pause
			: (await strings).play;
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestampsfromMedia(video);
		if (cover) {
			presenceData.largeImageKey =
				document
					.querySelector('[id="longInfo"]')
					?.firstElementChild?.getAttribute("src") ??
				document.querySelector<HTMLMetaElement>('[property="og:image"]')
					.content ??
				"lm";
		}

		if (video.paused) {
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
