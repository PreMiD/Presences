const presence = new Presence({
	clientId: "692230804402864148",
});

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
