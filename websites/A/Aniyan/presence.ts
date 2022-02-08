const presence = new Presence({
		clientId: "611657413350654010"
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused"
	});

let lastPlaybackState = null,
	playback,
	browsingTimestamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState !== playback) {
	lastPlaybackState = playback;
	browsingTimestamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
	const video = document.querySelector<HTMLVideoElement>(
		"#player > div.jw-media.jw-reset > video"
	);

	playback = video !== null ? true : false;

	if (!playback) {
		const presenceData: PresenceData = {
			largeImageKey: "lg",
			details: "Browsing...",
			startTimestamp: browsingTimestamp
		};

		delete presenceData.state;
		delete presenceData.smallImageKey;

		presence.setActivity(presenceData, true);
	}

	if (playback) {
		const videoTitle = document.querySelector<HTMLDivElement>(
				"div > div.episodeInfo > div.nomeAnime"
			),
			episode = document.querySelector<HTMLDivElement>(
				"div > div.episodeInfo > div.epInfo"
			),
			[startTimestamp, endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			),
			presenceData: PresenceData = {
				details: videoTitle.innerText,
				state: episode.innerText,
				largeImageKey: "lg",
				smallImageKey: video.paused ? "pause" : "play",
				smallImageText: video.paused
					? (await strings).pause
					: (await strings).play,
				startTimestamp,
				endTimestamp
			};

		presenceData.details = videoTitle.innerText;
		presenceData.state = episode.innerText;
		presenceData.startTimestamp = browsingTimestamp;

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		presence.setActivity(presenceData, true);
	}
});
