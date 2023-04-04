const presence = new Presence({
		clientId: "607881666836561930",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

let lastPlaybackState = null,
	playback: boolean,
	browsingTimestamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState !== playback) {
	lastPlaybackState = playback;
	browsingTimestamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
	playback = !!document.querySelector(".AT-player video");

	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/QUWUPTI.jpg",
	};

	if (!playback) {
		presenceData.details = "Browsing...";
		presenceData.startTimestamp = browsingTimestamp;

		delete presenceData.state;
		delete presenceData.smallImageKey;

		presence.setActivity(presenceData, true);
	}

	const video = document.querySelector<HTMLVideoElement>(".AT-player video");

	if (video && !isNaN(video.duration)) {
		const videoTitle =
				document.querySelector<HTMLElement>(".series-title span")?.textContent,
			[startTimestamp, endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);

		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused
			? (await strings).pause
			: (await strings).play;
		presenceData.startTimestamp = startTimestamp;
		presenceData.endTimestamp = endTimestamp;

		presenceData.details = videoTitle ?? "Title not found...";
		presenceData.state =
			document.querySelector<HTMLElement>(".series-episode")?.textContent ??
			"Episode not found...";

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (videoTitle) presence.setActivity(presenceData);
	}
});
