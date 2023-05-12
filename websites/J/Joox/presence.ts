const presence = new Presence({
	clientId: "715116675346989096",
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
	const player = Array.from(document.querySelectorAll("i")).find(x =>
			["playerIcon playerIcon--play", "playerIcon playerIcon--pause"].includes(
				x.className
			)
		),
		cover = await presence.getSetting<boolean>("cover");

	if (player) {
		const paused = player.className.includes("pause") === false,
			currentSong = Array.from(document.querySelectorAll("div")).find(
				x =>
					x.children.length === 2 &&
					x.children[0].tagName === "B" &&
					x.children[1].tagName === "SPAN"
			),
			title = currentSong.children[0].textContent,
			author = currentSong.children[1].textContent,
			timestamps = presence.getTimestamps(
				presence.timestampFromFormat(
					document.querySelector("#currentTime").textContent
				),
				presence.timestampFromFormat(
					document.querySelector("#currentTime").nextSibling.textContent
				)
			),
			presenceData: PresenceData = {
				details: title,
				state: author,
				largeImageKey: cover
					? document.querySelector<HTMLImageElement>(`img[alt="${title}"]`).src
					: "icon",
				smallImageKey: paused ? "pause" : "playing",
				smallImageText: paused ? "Paused" : "Playing",
				startTimestamp: timestamps[0],
				endTimestamp: timestamps[1],
			};

		if (paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (title && author) presence.setActivity(presenceData, !paused);
	} else presence.clearActivity();
});
