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
		state: gameName ? gameLocation || "Disconnected" : void 0,
		buttons: gameName
			? [{ label: `Play ${gameName}`, url: location.href }]
			: void 0,
	};

	// presence.success(String(JSON.stringify(presenceData)));

	presence.setActivity(presenceData);
});

/** Cache store of characters' faces, will clear on reset game */
const characterFaceCaches = new Map<string, string>();

/**
 * Read live favicon of character face in game.
 * Size is scaled up from 16 to 40 to be sharper
 * and encoded in Data URL.
 *
 * @returns Data URL or nothing at the portal
 */
async function fetchFavIcon(): Promise<string | void> {
	const url = (
		document.querySelector("#favicon") as HTMLLinkElement | undefined
	)?.href;
	if (url && characterFaceCaches.has(url)) {
		// cache hit
		return characterFaceCaches.get(url);
	} else if (url) {
		// build cahe
		await SingleTaskExecutor.shared.postIfAbsent(url, async () => {
			// presence.success(String("begin fetchWithResizePixelatedImage with " + url));

			const blob = await fetchWithResizePixelatedImage(url, 40, 40);
			if (blob) characterFaceCaches.set(url, await blob2dataurl(blob));
		});
		return characterFaceCaches.get(url);
	}
}

/**
 * The name of playing game, or nothing at the portal
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
		characterFaceCaches.clear();
	}
}

/**
 * Resize pixelated image. Beware of high perf cost.
 * @param href url
 * @param dw destination width
 * @param dh destination height
 */
async function fetchWithResizePixelatedImage(
	href: string,
	dw: number,
	dh: number
) {
	const img = document.createElement("img"),
		canvas = document.createElement("canvas");
	return new Promise((resolve, reject) => {
		img.style.imageRendering = "pixelated";
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = href;
	}).then(() => {
		canvas.width = dw;
		canvas.height = dh;
		const g = canvas.getContext("2d");
		g.imageSmoothingEnabled = false;
		g.drawImage(img, 0, 0, img.width, img.height, 0, 0, dw, dh);
		return new Promise<Blob>(resolve => canvas.toBlob(resolve, "image/png"));
	});
}

/** We still need this function for inspecting what format the image is in */
async function blob2dataurl(blob: Blob) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => resolve(String(reader.result)));
		reader.addEventListener("error", reject);
		reader.readAsDataURL(blob);
	});
}

class SingleTaskExecutor {
	static shared = new SingleTaskExecutor();
	protected map = new Map<string, Promise<unknown>>();
	postIfAbsent<T>(key: string, beginHeavyJob: () => Promise<T>) {
		let runningJob = this.map.get(key);
		if (runningJob) return runningJob;
		this.map.set(
			key,
			(runningJob = beginHeavyJob().finally(() => this.map.delete(key)))
		);
		return runningJob;
	}
}
