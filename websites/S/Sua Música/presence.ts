const presence = new Presence({
	clientId: "692230804402864148",
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

/**
 * Transforms the first letter of the string to uppercase.
 */
function firstLetterUp(str: string): string {
	return str.toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase());
}

presence.on("UpdateData", async () => {
	const details = document.querySelector("#trackInfo > a"),
		state = document.querySelector("#trackInfo > span > a"),
		presenceData = {
			largeImageKey: "https://i.imgur.com/MkYz91m.png",
			smallImageKey: document.querySelector("a.btnPlayer.playPause.pause")
				? "play"
				: "pause",
			smallImageText: "suamusica.com.br",
			details:
				details && details.textContent.length
					? `🎧  ${firstLetterUp(details.textContent)}`
					: "📀 Navegando...",
			state:
				state && state.textContent !== " - "
					? `🎤  ${firstLetterUp(state.textContent)}`
					: "🇧🇷 suamusica.com.br",
			startTimestamp: 0,
			endTimestamp: 0,
		};

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
