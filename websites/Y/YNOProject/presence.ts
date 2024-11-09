async function fetchBlob(blob: Blob) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => resolve(String(reader.result)));
		reader.addEventListener("error", reject);
		reader.readAsDataURL(blob);
	});
}

/**
 * Read live favicon of character face in game, or the cutie one at the portal.
 * Both sizes are 16 x 16 and encoded in Base64 Data URL.
 */
async function fetchFavIcon() {
	return Promise.resolve(
		(document.querySelector("#favicon") as HTMLLinkElement | null)?.href ||
			"/favicon.ico"
	)
		.then(fetch)
		.then(rsp => rsp.blob())
		.then(fetchBlob);
}

/**
 * What will match is the game name
 * @example "Yume 2kki - YNOproject".match(it)?.[0] // Yume 2kki
 */

/** @returns The original game or fan game, or nothing at the portal */
async function fetchGameName(): Promise<string | void> {
	return (
		document.querySelector("title") as HTMLElement | null
	)?.textContent?.match(RegExp("^.+(?= -)"))?.[0];
}

/** Read current location in game */
async function fetchGameLocation(): Promise<string | void> {
	return (document.querySelector("#locationText") as HTMLElement | null)
		?.textContent;
}

class GameState {
	static game: string | void = void 0;
	static startedAt = 0;
	static resetWith(game: string | void) {
		this.game = game;
		this.startedAt = Math.floor(Date.now() / 1000);
	}
}

const presence = new Presence({ clientId: "1304833580291063848" });
// const strings = presence.getStrings({
// 	play: "presence.playback.playing",
// 	pause: "presence.playback.paused",
// });
presence.on("UpdateData", async () => {
	const gameName = await fetchGameName(),
		gameLocation = await fetchGameLocation();
	if (GameState.game !== gameName || !GameState.startedAt)
		GameState.resetWith(gameName);

	const presenceData: PresenceData = {
		name: "YNOProject",
		type: ActivityType.Playing,
		startTimestamp: GameState.startedAt,
		largeImageKey: await fetchFavIcon(),
		buttons: gameName
			? [{ label: `Play ${gameName}`, url: location.href }]
			: void 0,
		details: gameName || "Choosing a game...",
		state: await Promise.resolve(gameLocation).then(loc => {
			return loc ? `Location: ${loc}` : "Disconnected";
		}),
	};

	presence.setActivity(presenceData);
});
