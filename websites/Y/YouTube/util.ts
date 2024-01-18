export const presence = new Presence({
	clientId: "463097721130188830",
});

let cachedTime = 0;
export function adjustTimeError(time: number, acceptableError: number): number {
	if (Math.abs(time - cachedTime) > acceptableError) cachedTime = time;
	return cachedTime;
}

export function truncateAfter(str: string, pattern: string): string {
	return str.slice(0, str.indexOf(pattern));
}

export interface Resolver {
	isActive(): boolean;
	getTitle(): string;
	getUploader(): string;
}

const stringMap = {
	play: "general.playing",
	pause: "general.paused",
	live: "general.live",
	ad: "youtube.ad",
	search: "general.searchFor",
	browsingTypeVideos: "youtube.browsingTypeVideos",
	browseShorts: "youtube.browsingShorts",
	browsingVid: "youtube.browsingVideos",
	browsingPlayl: "youtube.browsingPlaylists",
	viewCPost: "youtube.viewingCommunityPost",
	ofChannel: "youtube.ofChannel",
	readChannel: "youtube.readingChannel",
	searchChannel: "youtube.searchChannel",
	trending: "youtube.trending",
	browsingThrough: "youtube.browsingThrough",
	subscriptions: "youtube.subscriptions",
	library: "youtube.library",
	history: "youtube.history",
	purchases: "youtube.purchases",
	reports: "youtube.reportHistory",
	upload: "youtube.upload",
	viewChannel: "general.viewChannel",
	viewAllPlayL: "youtube.viewAllPlaylist",
	viewEvent: "youtube.viewLiveEvents",
	viewLiveDash: "youtube.viewLiveDashboard",
	viewAudio: "youtube.viewAudioLibrary",
	studioVid: "youtube.studio.viewContent",
	studioEdit: "youtube.studio.editVideo",
	studioAnaly: "youtube.studio.videoAnalytics",
	studioComments: "youtube.studio.videoComments",
	studioTranslate: "youtube.studio.videoTranslations",
	studioTheir: "youtube.studio.viewTheir",
	studioCAnaly: "youtube.studio.channelAnalytics",
	studioCComments: "youtube.studio.channelComments",
	studioCTranslate: "youtube.studio.channelTranslations",
	studioArtist: "youtube.studio.artistPage",
	studioDash: "youtube.studio.dashboard",
	viewPlaylist: "general.viewPlaylist",
	readAbout: "general.readingAbout",
	viewAccount: "general.viewAccount",
	viewHome: "general.viewHome",
	watchVid: "general.watchingVid",
	watchLive: "general.watchingLive",
	browsing: "general.browsing",
	searchSomething: "general.searchSomething",
	watchStreamButton: "general.buttonWatchStream",
	watchVideoButton: "general.buttonWatchVideo",
	viewChannelButton: "general.buttonViewChannel",
	videos: "youtube.videos",
};

export let strings: Awaited<
	ReturnType<typeof presence.getStrings<typeof stringMap>>
> = null;

let oldLang: string = null,
	currentTargetLang: string = null,
	fetchingStrings = false,
	stringFetchTimeout: number = null;

function fetchStrings() {
	if (oldLang === currentTargetLang && strings) return;
	if (fetchingStrings) return;
	const targetLang = currentTargetLang;
	fetchingStrings = true;
	stringFetchTimeout = setTimeout(() => {
		presence.error(`Failed to fetch strings for ${targetLang}.`);
		fetchingStrings = false;
	}, 5e3);
	presence.info(`Fetching strings for ${targetLang}.`);
	presence
		.getStrings(stringMap, targetLang)
		.then(result => {
			if (targetLang !== currentTargetLang) return;
			clearTimeout(stringFetchTimeout);
			strings = result;
			fetchingStrings = false;
			oldLang = targetLang;
			presence.info(`Fetched strings for ${targetLang}.`);
		})
		.catch(() => null);
}

setInterval(fetchStrings, 3000);
fetchStrings();

/**
 * Sets the current language to fetch strings for and returns whether any strings are loaded.
 */
export function checkStringLanguage(lang: string): boolean {
	currentTargetLang = lang;
	return !!strings;
}

const settingsFetchStatus: Record<string, number> = {},
	cachedSettings: Record<string, unknown> = {};

function startSettingGetter(setting: string) {
	if (!settingsFetchStatus[setting]) {
		let success = false;
		settingsFetchStatus[setting] = setTimeout(() => {
			if (!success)
				presence.error(`Failed to fetch setting '${setting}' in time.`);
			delete settingsFetchStatus[setting];
		}, 2000);
		presence
			.getSetting(setting)
			.then(result => {
				cachedSettings[setting] = result;
				success = true;
			})
			.catch(() => null);
	}
}

export function getSetting<E extends string | boolean | number>(
	setting: string,
	fallback: E = null
): E {
	startSettingGetter(setting);
	return (cachedSettings[setting] as E) ?? fallback;
}

type VPArray = { href: string; ttl: number }[];

let perVideoPrivacyArray: VPArray =
		JSON.parse(localStorage.getItem("pmdEnablePrivacy")) ?? [],
	perVideoNonPrivacyArray: VPArray =
		JSON.parse(localStorage.getItem("pmdDisablePrivacy")) ?? [];
export function pvPrivacyUI(privacy: boolean, href: string): boolean {
	let perVideoPrivacy = false;

	const isHrefInArray = (href: string, array: VPArray) => {
		return array.findIndex(entry => entry.href === href) !== -1;
	};

	try {
		perVideoPrivacy = isHrefInArray(href, perVideoPrivacyArray);

		if (!document.querySelector("#pmdEnablePrivacy")) {
			const button = document.createElement("div"),
				tooltip = document.createElement("div"),
				p1 = document.createElement("p"),
				p2 = document.createElement("p"),
				parent = document.querySelector("#owner");

			button.id = "pmdEnablePrivacy";
			button.style.marginLeft = "8px";
			button.style.minWidth = "min-content";
			button.style.maxWidth = "min-content";

			button.style.backgroundImage =
				"linear-gradient(to right, #b55fd3, #18b7d2)";
			button.className =
				"yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading";
			button.addEventListener("click", () => {
				const { href } = document.location,
					ttl = Date.now() + 3 * 60 * 60 * 1000;
				if (localStorage.getItem("pmdPrivacyEnabled") === "true") {
					isHrefInArray(href, perVideoNonPrivacyArray)
						? (perVideoNonPrivacyArray = perVideoNonPrivacyArray.filter(
								e => e.href !== href
						  ))
						: perVideoNonPrivacyArray.push({ href, ttl });
					localStorage.setItem(
						"pmdDisablePrivacy",
						JSON.stringify(perVideoNonPrivacyArray)
					);
				} else {
					isHrefInArray(href, perVideoPrivacyArray)
						? (perVideoPrivacyArray = perVideoPrivacyArray.filter(
								e => e.href !== href
						  ))
						: perVideoPrivacyArray.push({ href, ttl });
					localStorage.setItem(
						"pmdEnablePrivacy",
						JSON.stringify(perVideoPrivacyArray)
					);
				}
			});
			p1.textContent = "Overwrite your privacy mode for this video";
			p2.textContent = "This is part of the PreMiD YouTube presence";
			p2.style.fontStyle = "italic";
			tooltip.appendChild(p1);
			tooltip.appendChild(p2);
			button.innerHTML =
				'<svg id="pmdPrivacyEnabled" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="21" width="23" viewBox="0 0 640 512" style="display: inline-block;"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"></path></svg><svg id="pmdPrivacyDisabled" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="21" width="23" viewBox="0 0 576 512" style="display: none;"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>';
			parent.appendChild(button);
			parent.appendChild(tooltip);
			tooltip.style.opacity = "0";
			tooltip.style.position = "absolute";
			tooltip.style.padding = "5px";
			tooltip.style.borderRadius = "5px";
			tooltip.style.top = "-5px";
			tooltip.style.zIndex = "1";
			tooltip.style.transition = "opacity 0.3s ease-in-out";
			tooltip.style.color = "#fff";
			tooltip.style.background = "#2c2f33";
			tooltip.style.transitionDelay = "700ms";

			button.addEventListener("mouseover", function () {
				tooltip.style.opacity = "1";
				tooltip.style.top = `${button.offsetTop - tooltip.offsetHeight - 5}px`;
				tooltip.style.left = `${
					button.offsetLeft + button.offsetWidth / 2 - tooltip.offsetWidth / 2
				}px`;
				tooltip.style.transitionDelay = "50ms";
			});
			button.addEventListener("mouseleave", function () {
				tooltip.style.opacity = "0";
				setTimeout(() => {
					tooltip.style.transitionDelay = "700ms";
				});
			});
		} else {
			if (privacy) {
				perVideoPrivacy = !isHrefInArray(href, perVideoNonPrivacyArray);
				localStorage.setItem("pmdPrivacyEnabled", "true");
			} else {
				perVideoPrivacy = isHrefInArray(href, perVideoPrivacyArray);
				localStorage.setItem("pmdPrivacyEnabled", "false");
			}

			const svgEnabled = document.querySelector(
					"#pmdPrivacyEnabled"
				) as HTMLElement,
				svgDisabled = document.querySelector(
					"#pmdPrivacyDisabled"
				) as HTMLElement;
			if (perVideoPrivacy) {
				svgEnabled.style.display = "inline-block";
				svgDisabled.style.display = "none";
			} else {
				svgEnabled.style.display = "none";
				svgDisabled.style.display = "inline-block";
			}
		}
	} catch (e) {
		presence.error(
			`Something went wrong trying to place the privacy toggle button: ${e}`
		);
		return privacy;
	}

	return perVideoPrivacy;
}

const removeExpiredPrivacyOverwrites = (array: VPArray) => {
	return array.filter(entry => entry.ttl > Date.now());
};

localStorage.setItem(
	"pmdDisablePrivacy",
	JSON.stringify(
		removeExpiredPrivacyOverwrites(
			JSON.parse(localStorage.getItem("pmdDisablePrivacy"))
		)
	)
);
localStorage.setItem(
	"pmdEnablePrivacy",
	JSON.stringify(
		removeExpiredPrivacyOverwrites(
			JSON.parse(localStorage.getItem("pmdEnablePrivacy"))
		)
	)
);
