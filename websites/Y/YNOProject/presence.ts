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
 * Read live favicon of character face in game.
 * Size is scaled up from 16 to 40 to be sharper
 * and encoded in Data URL (~800 bytes).
 *
 * @returns Data URL or nothing at the portal
 */
async function fetchCharacterFace(): Promise<string | void> {
	const url = document.querySelector<HTMLLinkElement>("#favicon")?.href;
	if (url && characterFacesCache.has(url)) return characterFacesCache.get(url);
	else if (url) {
		return await SingleTaskExecutor.shared.postIfAbsent(url, async () => {
			const blob = await fetchWithResizePixelatedImage(url, 40, 40);
			if (blob) {
				return blob2dataurl(blob).then(optimizedImage => {
					characterFacesCache.set(url, optimizedImage);
					return optimizedImage;
				});
			}
		});
	}
}

/**
 * Read equipped badge of current sign-in player, size is squared 37.
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
	if (url && badgesCache.has(url)) return badgesCache.get(url);
	else if (url) {
		return await SingleTaskExecutor.shared.postIfAbsent(url, async () => {
			const fullUrl = window
				.getComputedStyle(badgeEl)
				.backgroundImage.match(
					RegExp("(?:url)\\((\"|')([^\\1\\s]+)\\1\\)")
				)?.[2];
			if (fullUrl) badgesCache.set(url, fullUrl);
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
		.querySelector("title")
		?.textContent?.match(RegExp("^.+(?= Online -)"))?.[0];
}

/**
 * Read current location within the game.
 */
async function fetchGameLocation(): Promise<string | void> {
	return document.querySelector("#locationText")?.textContent;
}

class GameState {
	static game: string | void = void 0;
	static startedAt = 0;
	static resetWith(game: string | void) {
		this.game = game;
		this.startedAt = Math.floor(Date.now() / 1000);
		characterFacesCache.clear();
		badgesCache.clear();
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
		img.onload = resolve;
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

type LRUKey = string | number | symbol;
/**
 * @example
 * ```js
 * it = new SimpleLRU(2)
 * it.set("game", "Yume Nikki")
 * it.set("name", "Madotsuki")
 * it.set("age", 12)
 *
 * it.get("game") // undefined cuz already been evicted
 * it.get("name") // Madotsuki
 * it.get("age") // 12
 * ```
 */
class SimpleLRU<V = unknown> {
	protected queue: LRUKey[];
	protected map = new Map<LRUKey, V>();
	constructor(protected cap: number) {
		this.clear();
	}
	protected bubbleUp(key: LRUKey) {
		if (key === this.queue.at(0)) return;
		this.queue.sort(a => (a === key ? -1 : 0));
	}
	has(key: LRUKey) {
		return this.map.has(key);
	}
	set(key: LRUKey, value: V) {
		if (this.map.has(key)) this.bubbleUp(key);
		else {
			const lastKey = this.queue.at(-1);
			this.bubbleUp(lastKey);
			this.map.delete(lastKey);
			this.queue[0] = key;
		}
		this.map.set(key, value);
		return this;
	}
	get(key: LRUKey): V {
		const result = this.map.get(key);
		if (result) this.bubbleUp(key);
		return result;
	}
	clear() {
		this.queue = Array.from(Array(this.cap).keys()).map(() => Symbol());
		this.map.clear();
	}
}

/**
 * Cache store for cuties' faces, will clear on reset game.
 * Keys stand for characters' faces urls start with "blob",
 * and the values are their faces but large-scaled in Data URLs
 *
 * In case of something glitches on re-sampling...
 * Switching to other effects for 5 times or taking any animated actions
 * to let the oldest cache is re-generated.
 */
const characterFacesCache = new SimpleLRU<string>(5),
	/**
	 * Badges are not frequently swithed normally.
	 * Keys stand for url segments and values are entire urls from computed styles.
	 */
	badgesCache = new SimpleLRU<string>(2);
