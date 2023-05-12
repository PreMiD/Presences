const presence = new Presence({
	clientId: "936448491373359105",
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

presence.on("UpdateData", async () => {
	if (document.querySelector<HTMLAnchorElement>("a.as-logo")) {
		const [songDetail, songState, time] = await Promise.all([
				presence.getSetting<string>("songDetail"),
				presence.getSetting<string>("songState"),
				presence.getSetting<number>("time"),
			]),
			title =
				document.querySelector<HTMLDivElement>("#as-player-title").textContent,
			artist = document
				.querySelector<HTMLDivElement>("#as-player-artist")
				.textContent.split(" - ", 1)[0],
			// Matches the whitespace character literally to eliminate as most false positives as possible
			[, album] = document
				.querySelector<HTMLDivElement>("#as-player-artist")
				.textContent.split(/(?: - )(.+)/),
			volume = document
				.querySelector<HTMLDivElement>("div.mejs-horizontal-volume-current")
				.style.width.replace("px", "") as unknown as number,
			timeElapsed = presence.timestampFromFormat(
				document.querySelector<HTMLSpanElement>("span.mejs-currenttime")
					.textContent
			),
			presenceData: PresenceData = {
				largeImageKey: "https://i.imgur.com/rLh25vA.png",
			},
			paused = document
				.querySelector<HTMLAnchorElement>("#as-player-play")
				.className.includes("fa-play");
		presenceData.details = songDetail
			.replace("%title%", title)
			.replace("%artist%", artist)
			.replace("%album%", album);
		presenceData.state = songState
			.replace("%title%", title)
			.replace("%artist%", artist)
			.replace("%album%", album);
		if (!paused && time === 1) {
			presenceData.endTimestamp =
				Date.now() / 1000 +
				presence.timestampFromFormat(
					document.querySelector<HTMLSpanElement>("span.mejs-duration")
						.textContent
				) -
				timeElapsed;
		} else if (!paused && time === 2)
			presenceData.startTimestamp = Date.now() / 1000 - timeElapsed;

		presenceData.smallImageKey = paused ? "pause" : "play";
		presenceData.smallImageText = paused
			? "Paused"
			: `Playing at ${volume * 2}%`;

		presence.setActivity(presenceData);
	}
});
