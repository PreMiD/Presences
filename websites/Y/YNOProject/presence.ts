const { Name, Logo } = {
		Name: "YNOProject",
		Logo: "https://imgur.com/2LD3PQV.png",
	},
	presence = new Presence({ clientId: "1304833580291063848" });
presence.on("UpdateData", async () => {
	const gameName = await fetchGameName(),
		gameLocation = await fetchGameLocation();
	if (GameState.game !== gameName || !GameState.startedAt)
		GameState.resetWith(gameName);

	const presenceData: PresenceData = {
		name: Name,
		type: ActivityType.Playing,
		startTimestamp: GameState.startedAt,
		largeImageText: gameName || void 0,
		largeImageKey: await fetchCharacterFace().then(url => url || Logo),
		smallImageKey: await fetchBadge().then(url => url || void 0),
		details: gameName || "Choosing a game...",
		state: gameName ? gameLocation || "Disconnected" : void 0,
		buttons: gameName
			? [{ label: `Play ${gameName}`, url: document.location.href }]
			: void 0,
	};

	presence.setActivity(presenceData);
});

/**
 * Cache store of images, will clear on reset game.
 * Consists of characters' faces urls start with "blob",
 * and regular urls start with "http|https".
 *
 * Clear on reset game.
 */
const imageCaches = new Map<string, string>();

/**
 * Read live favicon of character face in game.
 * Size is scaled up from 16 to 40 to be sharper
 * and encoded in Data URL (~800 bytes).
 *
 * @returns Data URL or nothing at the portal
 */
async function fetchCharacterFace(): Promise<string | void> {
	const url = document.querySelector<HTMLLinkElement>("#favicon")?.href;
	if (url && imageCaches.has(url)) return imageCaches.get(url);
	else if (url) {
		return await SingleTaskExecutor.shared.postIfAbsent(url, async () => {
			const blob = await fetchWithResizePixelatedImage(url, 40, 40);
			if (blob) {
				return blob2dataurl(blob).then(optimizedImage => {
					imageCaches.set(url, optimizedImage);
					return optimizedImage;
				});
			}
		});
	}
}

/**
 * Read equipped badge of current sign-in player.
 * Size is 37 and encoded in Data URL.
 * (Surprisingly Discord supports GIFs in small image so it's no need to resample)
 *
 * @example 'url("star-transparent.gif")'.match(it)?.[2] // star-transparent.gif
 * @example "url('https://example.org/me.png')".match(it)?.[2] // https://example.org/me.png
 * @returns Entire URL or nothing for guest player
 */
async function fetchBadge(): Promise<string | void> {
	if (!document.querySelector("#content")?.classList?.contains("loggedIn"))
		return;
	const badgeEl = document.querySelector<HTMLElement>("#badgeButton .badge"),
		url = badgeEl?.style?.backgroundImage; // Gives path as segmented url only
	if (url && imageCaches.has(url)) return imageCaches.get(url);
	else if (url) {
		return await SingleTaskExecutor.shared.postIfAbsent(url, async () => {
			const fullUrl = window
				.getComputedStyle(badgeEl)
				.backgroundImage.match(
					RegExp("(?:url)\\((\"|')([^\\1\\s]+)\\1\\)")
				)?.[2];
			imageCaches.set(url, fullUrl);
			return fullUrl;
		});
	}
}

/**
 * The name of playing game, or nothing at the portal
 * @example "Yume 2kki Online - YNOproject".match(it)?.[0] // Yume 2kki
 */
async function fetchGameName(): Promise<string | void> {
	return document
		.querySelector<HTMLElement>("title")
		?.textContent?.match(RegExp("^.+(?= Online -)"))?.[0];
}

/**
 * Read current location within the game.
 */
async function fetchGameLocation(): Promise<string | void> {
	return document.querySelector<HTMLElement>("#locationText")?.textContent;
}

class GameState {
	static game: string | void = void 0;
	static startedAt = 0;
	static resetWith(game: string | void) {
		this.game = game;
		this.startedAt = Math.floor(Date.now() / 1000);
		imageCaches.clear();
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
		// Force cast, don't result different types on the same key
		let runningJob = this.map.get(key) as Promise<T>;
		if (runningJob) return runningJob;
		this.map.set(
			key,
			(runningJob = beginHeavyJob().finally(() => this.map.delete(key)))
		);
		return runningJob;
	}
}
