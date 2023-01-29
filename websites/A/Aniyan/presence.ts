const presence = new Presence({
		clientId: "611657413350654010",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
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
			largeImageKey: "https://i.imgur.com/x5yDUF9.png",
			details: "Browsing...",
			startTimestamp: browsingTimestamp,
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
				details: videoTitle.textContent,
				state: episode.textContent,
				largeImageKey: "https://i.imgur.com/x5yDUF9.png",
				smallImageKey: video.paused ? "pause" : "play",
				smallImageText: video.paused
					? (await strings).pause
					: (await strings).play,
				startTimestamp,
				endTimestamp,
			};

		presenceData.details = videoTitle.textContent;
		presenceData.state = episode.textContent;
		presenceData.startTimestamp = browsingTimestamp;

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		presence.setActivity(presenceData, true);
	}
});
