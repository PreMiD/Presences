const presence = new Presence({
		clientId: "1144333935967473685",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	slideshow = presence.createSlideshow();

let oldLang: string,
	strings: Awaited<ReturnType<typeof presence.getStrings>>,
	oldPath: string;

const enum Assets {
	Logo = "https://i.imgur.com/RAxM8Tw.png",
}

function getImportantPath(): string[] {
	const pathList = document.location.pathname.split("/").filter(Boolean);
	if (pathList[0] === "en") pathList.shift();
	if (pathList[pathList.length - 1] !== "") pathList.push("");
	return pathList;
}

function getTitle(): string {
	const split = document.title.match(/(.*) [|-]/);
	return split ? split[1].trim() : document.title;
}

function applyCharacterSlideshow(presenceData: PresenceData): void {
	const characters = [
		...document.querySelectorAll<HTMLAnchorElement>(
			"a[href*='/characters/']:nth-of-type(1)"
		),
	].map(link => link.parentElement);
	for (const character of characters) {
		const slide = Object.assign({}, presenceData),
			imageUrl = character.querySelector<HTMLDivElement>(
				"[data-background-image-url]"
			).dataset.backgroundImageUrl;
		slide.largeImageKey = imageUrl;
		slide.smallImageText =
			character.children[1].firstElementChild.childNodes[0].textContent;
		try {
			slide.smallImageKey = character.children[3].querySelector<HTMLDivElement>(
				"[data-background-image-url]"
			).dataset.backgroundImageUrl;
		} catch {
			/* ignore */
		}
		slideshow.addSlide(imageUrl, slide, 5000);
	}
}

function applyArtworkSlideshow(presenceData: PresenceData): void {
	const artworks = [
		...document.querySelectorAll<HTMLAnchorElement>(
			"a[href*='/artworks/']:nth-of-type(1)"
		),
	].map(link => link.parentElement);
	for (const artwork of artworks) {
		const slide = Object.assign({}, presenceData),
			imageUrl = artwork.querySelector<HTMLDivElement>(
				"[data-background-image-url]"
			).dataset.backgroundImageUrl;
		slide.largeImageKey = imageUrl;
		slideshow.addSlide(imageUrl, slide, 5000);
	}
}

let fetchingStrings = false,
	lastFetchAttempt = 0;
function getStrings(lang: string): Promise<Record<string, string>> {
	return new Promise((resolve, reject) => {
		const timeout = setTimeout(() => {
			if (Date.now() - lastFetchAttempt > 5e3) {
				presence.error("Fetching strings timed out. Retrying...");
				fetchingStrings = false;
				lastFetchAttempt = Date.now();
			}
			reject();
		}, 5e3);
		if (fetchingStrings) {
			if (strings) {
				presence.info("Fetching new strings, but using old ones.");
				clearTimeout(timeout);
				resolve(strings);
			}
			return;
		}
		fetchingStrings = true;
		presence.info("Fetching new strings.");
		presence
			.getStrings(
				{
					browsing: "general.browsing",
					buttonReadArticle: "general.buttonReadArticle",
					buttonViewPage: "general.buttonViewPage",
					buttonViewProfile: "general.buttonViewProfile",
					readingAbout: "general.readingAbout",
					readingAPost: "general.readingAPost",
					readingAnArticle: "general.readingAnArticle",
					viewAProduct: "general.viewAProduct",
					viewAProfile: "general.viewAProfile",
					viewCategory: "general.viewCategory",
					viewHome: "general.viewHome",
					viewList: "general.viewList",
					viewing: "general.viewing",
				},
				lang
			)
			.then(result => {
				clearTimeout(timeout);
				fetchingStrings = false;
				presence.info("Fetched new strings.");
				resolve(result);
			})
			.catch(() => {
				presence.error(
					"Fetching strings failed. Likely a network issue. Retrying..."
				);
				fetchingStrings = false;
				clearTimeout(timeout);
				reject();
			});
	});
}

let fetchingSetting = false,
	lastSettingFetchAttempt = 0;
function getSetting<E extends string | boolean | number>(
	setting: string
): Promise<E> {
	return new Promise(resolve => {
		const timeout = setTimeout(() => {
			if (Date.now() - lastSettingFetchAttempt > 5e3) {
				presence.error("Fetching setting timed out. Retrying...");
				fetchingSetting = false;
				lastSettingFetchAttempt = Date.now();
			}
			resolve(null);
		}, 5e3);
		if (fetchingSetting) return;
		fetchingSetting = true;
		presence
			.getSetting<E>(setting)
			.then(result => {
				clearTimeout(timeout);
				fetchingSetting = false;
				resolve(result);
			})
			.catch(() => null);
	});
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		lang = await getSetting<string>("language"),
		pathList = getImportantPath(),
		{ hostname, href, pathname } = document.location;

	if (!lang) {
		presence.info("Failed to fetch language, trying again.");
		return;
	}

	if (pathname !== oldPath) {
		oldPath = pathname;
		slideshow.deleteAllSlides();
	}

	if (lang !== oldLang) {
		try {
			strings = await getStrings(lang);
			oldLang = lang;
		} catch {
			return;
		}
	}

	switch (hostname) {
		case "developer.vroid.com": {
			if (pathList[1] === "docs") {
				presenceData.details = `VRoid SDK - ${strings.readingAbout}`;
				presenceData.state = document.querySelector("h1").textContent.trim();
			} else presenceData.details = `VRoid SDK - ${strings.browsing}`;
			break;
		}
		case "hub.vroid.com": {
			switch (pathList[0]) {
				case "": {
					presenceData.details = `VRoid Hub - ${strings.browsing}`;
					break;
				}
				case "capture-application":
				case "apps": {
					const [selectedTab] = [
							...document.querySelectorAll<HTMLAnchorElement>("[role=nav] a"),
						].sort((a, b) => {
							return +![...a.classList].every(name =>
								[...b.classList].includes(name)
							);
						}),
						appTitle =
							document.querySelector<HTMLHeadingElement>(
								"header > h1"
							).textContent;
					if (pathList[1]) {
						presenceData.details = `VRoid Hub - ${strings.viewAProduct}`;
						presenceData.buttons = [
							{ label: strings.buttonViewPage, url: href },
						];
						switch (pathList[2]) {
							case "": {
								presenceData.state = appTitle;
								break;
							}
							case "character_models": {
								presenceData.state = `${appTitle} - ${selectedTab.textContent}`;
								applyCharacterSlideshow(presenceData);
								break;
							}
							case "artworks": {
								presenceData.state = `${appTitle} - ${selectedTab.textContent}`;
								applyArtworkSlideshow(presenceData);
								break;
							}
						}
					} else {
						presenceData.details = `VRoid Hub - ${strings.viewing}`;
						presenceData.state = getTitle();
					}
					break;
				}
				case "characters": {
					const container =
						document.querySelector<HTMLImageElement>(
							"canvas + div img"
						).parentElement;
					presenceData.details = `VRoid Hub - ${strings.viewAProduct}`;
					presenceData.state = `${container.querySelector("a").textContent} / ${
						container.nextElementSibling.textContent
					}`;
					presenceData.largeImageKey = container.querySelector("img").src;
					presenceData.buttons = [{ label: strings.buttonViewPage, url: href }];
					break;
				}
				case "artworks": {
					presenceData.details = `VRoid Hub - ${strings.readingAPost}`;
					presenceData.buttons = [{ label: strings.buttonViewPage, url: href }];
					applyArtworkSlideshow(presenceData);
					break;
				}
				case "model_assets": {
					const container = document.querySelector<HTMLDivElement>(
						"header > div[style]"
					).parentElement;
					presenceData.details = `VRoid Hub - ${strings.viewAProduct}`;
					presenceData.state = container.querySelector<HTMLDivElement>(
						"div:nth-of-type(2) > div > div"
					).textContent;
					presenceData.largeImageKey = getComputedStyle(
						container.querySelector<HTMLDivElement>("div[style]")
					).backgroundImage.match(/url\("(.*)"\)/)[1];
					presenceData.buttons = [{ label: strings.buttonViewPage, url: href }];
					break;
				}
				case "models": {
					presenceData.details = `VRoid Hub - ${strings.viewList}`;
					presenceData.state =
						document.querySelector<HTMLHeadingElement>(
							"header > h1"
						).textContent;
					applyCharacterSlideshow(presenceData);
					break;
				}
				case "tags": {
					presenceData.details = `VRoid Hub - ${strings.viewCategory}`;
					presenceData.state = `#${pathList[1]} - ${
						(pathList[2] === "artworks"
							? document.querySelector<HTMLAnchorElement>(
									"section + div a:nth-of-type(2)"
							  )
							: document.querySelector<HTMLAnchorElement>(
									"section + div a:nth-of-type(1)"
							  )
						).textContent
					}`;
					if (pathList[2] === "artworks") applyArtworkSlideshow(presenceData);
					else applyCharacterSlideshow(presenceData);
					break;
				}
				case "users": {
					const username =
						document.querySelector<HTMLHeadingElement>("a > h1").textContent;
					presenceData.details = `VRoid Hub - ${strings.viewAProfile}`;
					presenceData.state = username;
					presenceData.smallImageKey = document
						.querySelector<HTMLDivElement>("header > a > div[style]")
						.style.backgroundImage.match(/url\("(.*)"\)/)[1];
					presenceData.smallImageText = username;
					presenceData.buttons = [
						{ label: strings.buttonViewProfile, url: href },
					];
					if (pathList[2] === "artworks") {
						presenceData.state += ` - ${
							document.querySelector<HTMLAnchorElement>(
								"header + div header + div a:nth-of-type(2)"
							).textContent
						}`;
						applyArtworkSlideshow(presenceData);
					} else applyCharacterSlideshow(presenceData);
					break;
				}
				case "hearts": {
					presenceData.details = `VRoid Hub - ${strings.viewList}`;
					presenceData.state = [
						...document.querySelector<HTMLHeadingElement>("header + div h1")
							.childNodes,
					]
						.map(node => {
							return node.nodeName === "svg" ? "❤️" : node.textContent;
						})
						.join("");
					if (pathList[1] === "artworks") applyArtworkSlideshow(presenceData);
					else applyCharacterSlideshow(presenceData);
					break;
				}
			}
			break;
		}
		default: {
			switch (pathList[0]) {
				case "": {
					presenceData.details = strings.viewHome;
					break;
				}
				case "studio": {
					presenceData.details = strings.readingAbout;
					presenceData.state = "VRoid Studio";
					break;
				}
				case "mobile": {
					presenceData.details = strings.readingAbout;
					presenceData.state = "VRoid Mobile";
					break;
				}
				case "wear": {
					if (pathList[1]) {
						presenceData.details = strings.viewing;
						presenceData.state = getTitle();
					} else {
						presenceData.details = strings.readingAbout;
						presenceData.state = "VRoid Wear";
					}
					break;
				}
				case "news": {
					if (pathList[1]) {
						presenceData.details = strings.readingAnArticle;
						presenceData.state =
							document.querySelector<HTMLHeadingElement>(
								"article h1"
							).textContent;
						presenceData.largeImageKey =
							document.querySelector<HTMLImageElement>("article img").src;
						presenceData.buttons = [
							{ label: strings.buttonReadArticle, url: href },
						];
					} else {
						presenceData.details = strings.readingAnArticle;
						presenceData.state =
							document.querySelector<HTMLImageElement>("h1 > img").alt;
					}
					break;
				}
			}
		}
	}

	const slides = slideshow.getSlides();
	if (slides.length) {
		if (!slideshow.currentSlide.details)
			slideshow.currentSlide = slides[0].data;
		presence.setActivity(slideshow);
	} else if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
