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

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

if (lastPlaybackState !== playback) {
	lastPlaybackState = playback;
	browsingTimestamp = Math.floor(Date.now() / 1000);

	enum Assets {
		Play = "https://i.imgur.com/q57RJjs.png",
		Pause = "https://i.imgur.com/mcEXiZk.png",
		Stop = "https://i.imgur.com/aLYu3Af.png",
		Search = "https://i.imgur.com/B7FxcD4.png",
		Question = "https://i.imgur.com/pIIJniP.png",
		Live = "https://i.imgur.com/0HVm46z.png",
		Reading = "https://i.imgur.com/5m10TTT.png",
		Writing = "https://i.imgur.com/Pa00qZh.png",
		Call = "https://i.imgur.com/PFdbnIf.png",
		Vcall = "https://i.imgur.com/6wG9ZvM.png",
		Downloading = "https://i.imgur.com/ryrDrz4.png",
		Uploading = "https://i.imgur.com/SwNDR5U.png",
		Repeat = "https://i.imgur.com/Ikh95KU.png",
		RepeatOne = "https://i.imgur.com/wh885z3.png",
		Premiere = "https://i.imgur.com/Zf8FSUR.png",
		PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
		Viewing = "https://i.imgur.com/fpZutq6.png",
	}
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
