/** We still need this function for inspecting what format the image is in */
async function blob2dataurl(blob: Blob) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => resolve(String(reader.result)));
		reader.addEventListener("error", reject);
		reader.readAsDataURL(blob);
	});
}

/**
 * Read live favicon of character face in game.
 * Size is 16 x 16 and encoded in Base64 Data URL.
 *
 * @returns Base64 URL or nothing at the portal
 */
async function fetchFavIcon(): Promise<string | void> {
	const el = document.querySelector("#favicon") as HTMLLinkElement | null;
	return el?.href ? blob2dataurl(await (await fetch(el.href)).blob()) : void 0;
}

/**
 * What is the name of playing game, or nothing at the portal
 * @example "Yume 2kki Online - YNOproject".match(it)?.[0] // Yume 2kki
 */
async function fetchGameName(): Promise<string | void> {
	return (
		document.querySelector("title") as HTMLElement | null
	)?.textContent?.match(RegExp("^.+(?= Online -)"))?.[0];
}

/**
 * Read current location within the game.
 */
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

const PresenceAssets = {
		Name: "YNOProject",
		Logo: "https://imgur.com/2LD3PQV.png",
	},
	presence = new Presence({ clientId: "1304833580291063848" });
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
		name: PresenceAssets.Name,
		type: ActivityType.Playing,
		startTimestamp: GameState.startedAt,
		largeImageKey: await fetchFavIcon().then(url => url || PresenceAssets.Logo),
		details: gameName || "Choosing a game...",
		buttons: gameName
			? [{ label: `Play ${gameName}`, url: location.href }]
			: void 0,
		state: await Promise.resolve(gameLocation).then(loc => {
			return loc ? `Location: ${loc}` : "Disconnected";
		}),
	};

	// presence.success(String(JSON.stringify(presenceData)));

	presence.setActivity(presenceData);
});
