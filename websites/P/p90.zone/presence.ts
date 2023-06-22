const presence = new Presence({
	clientId: "633714339999645737",
});

function getTimestamps(curr: number, dura: number): number[] {
	const startTime = Math.floor(Date.now() / 1000);
	return [startTime, Math.floor(startTime - curr + dura)];
}

presence.on("UpdateData", async () => {
	const video = document.querySelector("video"),
		strings = await presence.getStrings({
			playing: "general.playing",
			paused: "general.paused",
			browsing: "general.browsing",
		});

	if (video) {
		const timestamps = getTimestamps(video.currentTime, video.duration),
			presenceData: PresenceData = {
				state: document.querySelector("body > div.menu.main > div > h2")
					.textContent,
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/P/p90.zone/assets/logo.png",
				startTimestamp: timestamps[0],
				endTimestamp: timestamps[1],
				smallImageKey: video.paused ? Assets.Pause : Assets.Play,
				smallImageText: video.paused
					? (await strings).paused
					: (await strings).playing,
			};

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		presence.setActivity(presenceData);
	} else presence.setActivity();
});
