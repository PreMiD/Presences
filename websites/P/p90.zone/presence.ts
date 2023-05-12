const presence = new Presence({
	clientId: "633714339999645737",
});

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
				largeImageKey: "https://i.imgur.com/YOmF0LY.png",
				startTimestamp: timestamps[0],
				endTimestamp: timestamps[1],
				smallImageKey: video.paused ? "pause" : "play",
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
