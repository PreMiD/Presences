const presence = new Presence({
		clientId: "767402228825980929"
	}),
	newStrings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		live: "general.live"
	}),
	elapsed = Math.floor(Date.now() / 1000);

let strings: Awaited<typeof newStrings>;

presence.on("UpdateData", async () => {
	let extra = "...";

	const path = window.location.pathname,
		presenceData: PresenceData = {
			largeImageKey: "peacock",
			startTimestamp: elapsed
		};

	strings ??= await newStrings;

	if (path.includes("/movies/highlights")) extra = " Movies";
	else if (path.includes("/watch/tv/highlights")) extra = " TV Shows";
	else if (path.includes("/watch/kids/highlights")) extra = " Kids";
	else if (path.includes("/watch/sports/highlights")) extra = " Sports";
	else if (path.includes("/watch/latino/highlights")) extra = " Latino";

	presenceData.details = `Browsing${extra}`;

	if (path.includes("/watch/search")) presenceData.details = "Searching...";

	if (path.includes("/watch/playback") || path.includes("/watch/asset")) {
		const video = document.querySelector<HTMLVideoElement>(
			".video-player-component video"
		);
		if (video) {
			const title =
					document.querySelector(".playback-header__title") ||
					document.querySelector(".playback-metadata__container-title"),
				timestamps = presence.getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				),
				live = timestamps[1] === Infinity,
				desc =
					document.querySelector(
						".playback-metadata__container-episode-metadata-info"
					) ||
					document.querySelector(".playback-metadata__container-description") ||
					document.querySelector(
						".swiper-slide-active .playlist-item-overlay__container-title"
					);

			if (desc) presenceData.state = desc.textContent;

			if (title) {
				presenceData.details = title.textContent;
				if (path.includes("/watch/playback/playlist"))
					presenceData.details += "Playlist";
			}

			presenceData.smallImageKey = live
				? "live"
				: video.paused
				? "pause"
				: "play";
			presenceData.smallImageText = live
				? strings.live
				: video.paused
				? strings.pause
				: strings.play;

			if (!live)
				[presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

			if (video.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}
	}

	presence.setActivity(presenceData);
});
