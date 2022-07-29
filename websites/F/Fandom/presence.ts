const presence = new Presence({
		clientId: "644400074008297512",
	}),
	browsingStamp = Math.floor(Date.now() / 1000);
let currentURL = new URL(document.location.href),
	currentPath = currentURL.pathname.replace(/^\/|\/$/g, "").split("/"),
	presenceData: PresenceData = {
		details: "Viewing an unsupported page",
		largeImageKey: "lg",
		startTimestamp: browsingStamp,
	};
const updateCallback = {
		_function: () => void {} as () => void,
		get function(): () => void {
			return this._function;
		},
		set function(parameter) {
			this._function = parameter;
		},
	},
	/**
	 * Initialize/reset presenceData.
	 */
	resetData = (
		defaultData: PresenceData = {
			details: "Viewing an unsupported page",
			largeImageKey: "lg",
			startTimestamp: browsingStamp,
		}
	): void => {
		currentURL = new URL(document.location.href);
		currentPath = currentURL.pathname.replace(/^\/|\/$/g, "").split("/");
		presenceData = { ...defaultData };
	},
	/**
	 * Search for URL parameters.
	 * @param urlParam The parameter that you want to know about the value.
	 */
	getURLParam = (urlParam: string): string => {
		return currentURL.searchParams.get(urlParam);
	};

/**
 * An object obtained from on `mw.config.values`.
 * (Unused values on this type has been removed. Refer to the link for the full object.)
 * @link https://github.com/wikimedia-gadgets/types-mediawiki/blob/main/mw/config.d.ts
 */
type mwConfigValues = {
	wgContentLanguage: string;
	wgSiteName: string;
	wgAction: string;
	wgCanonicalNamespace: string;
	wgCurRevisionId: number;
	wgNamespaceNumber: number;
	wgPageName: string;
	wgRevisionId: number;
	wgIsMainPage: boolean;
	wgDiffOldId: number | false;
	wgDiffNewId: number;
};

const prepare = async (): Promise<void> => {
	presence.info("Running...");

	if (currentURL.host === "www.fandom.com") {
		/*

		Chapter 1.0
		This one is for the editorial part of Fandom.

		*/

		switch (currentPath[0]) {
			case "": {
				presenceData.details = "On the index page";

				break;
			}
			case "signin": {
				presenceData.details = "Signing in";

				break;
			}
			case "register": {
				presenceData.details = "Registering an account";

				break;
			}
			case "articles": {
				presenceData.details = "Reading an article";
				presenceData.state = document.querySelector(
					".article-header__title"
				).textContent;

				break;
			}
			case "topics": {
				presenceData.details = "Viewing a topic";
				presenceData.state = document.querySelector(
					".topic-header__title"
				).firstElementChild.innerHTML;

				break;
			}
			case "video": {
				presenceData.details = "Watching a video";
				delete presenceData.startTimestamp;
				updateCallback.function = (): void => {
					presenceData.state = document.querySelector(
						".video-page-featured-player__title"
					).textContent;
					try {
						if (
							document
								.querySelector(".jw-icon-playback")
								.getAttribute("aria-label") === "Pause"
						) {
							[, presenceData.endTimestamp] = presence.getTimestampsfromMedia(
								document.querySelector(".jw-video")
							);
						} else delete presenceData.endTimestamp;
					} catch (e) {
						delete presenceData.endTimestamp;
					}
				};

				break;
			}
			case "curated": {
				presenceData.details = "Viewing a curation";
				presenceData.state = document.querySelector(".card__title").textContent;

				break;
			}
			case "u": {
				presenceData.details = "Viewing a profile page";
				presenceData.state = `${
					document.querySelector(".profile-info-card__name").textContent
				} (${
					document.querySelector(".profile-info-card__username").textContent
				})`;

				break;
			}
			default: {
				presenceData.details = "Viewing a page";
				switch (currentPath[0]) {
					case "explore": {
						presenceData.state = "Explore";
						break;
					}
					case "about": {
						presenceData.state = "About";
						break;
					}
					case "carriers": {
						presenceData.state = "Carriers";
						break;
					}
					case "terms-of-use": {
						presenceData.state = "Terms of Use";
						break;
					}
					case "privacy-policy": {
						presenceData.state = "Privacy Policy";
						break;
					}
					case "mediakit": {
						presenceData.state = "Media Kit";
						break;
					}
					case "local-sitemap":
						{
							presenceData.state = "Local Sitemap";
							// No default
						}
						break;
				}
			}
		}
	} else if (currentURL.host === "auth.fandom.com") {
		/*

		Chapter 1.1
		This one is for the authentication part of Fandom.
		
		*/

		if (currentPath[0] === "signin") presenceData.details = "Signing in";
		else if (currentPath[0] === "register")
			presenceData.details = "Registering an account";
	} else if (currentPath.includes("wiki")) {
		/*

		Chapter 2
		This one is for the wiki part on the Fandom, which was Wikia a while ago.
		
		*/

		const mwConfig: mwConfigValues = await presence.getPageletiable(
				'mw"]["config"]["values'
			),
			action: string = mwConfig.wgAction,
			actionFromURL = (): string =>
				getURLParam("action") || getURLParam("veaction") || "view",
			titleFromConfig: string = decodeURIComponent(
				mwConfig.wgPageName.replaceAll("_", " ")
			),
			title =
				document.querySelector("h1")?.textContent.trim() || titleFromConfig,
			lang: string =
				mwConfig.wgContentLanguage || currentURL.hostname.split(".")[0],
			siteName =
				mwConfig.wgSiteName ||
				(
					document.querySelector(
						"meta[property='og:site_name']"
					) as HTMLMetaElement
				)?.content ||
				(
					document.querySelector(".wds-community-header__sitename") ||
					document.querySelector(".fandom-community-header__community-name") ||
					document.querySelector(".wds-community-bar__sitename")
				).textContent.trim(),
			/**
			 * Returns details based on the namespace.
			 * @link https://en.wikipedia.org/wiki/Wikipedia:Namespace
			 */
			namespaceDetails = (): string => {
				const details: { [index: string]: string } = {
					"-2": "Viewing a media",
					"-1": "Viewing a special page",
					0: "Reading an article",
					1: "Viewing a talk page",
					2: "Viewing a user page",
					3: "Viewing a user talk page",
					4: "Viewing a project page",
					5: "Viewing a project talk page",
					6: "Viewing a file",
					7: "Viewing a file talk page",
					8: "Viewing an interface page",
					9: "Viewing an interface talk page",
					10: "Viewing a template",
					11: "Viewing a template talk page",
					12: "Viewing a help page",
					13: "Viewing a help talk page",
					14: "Viewing a category",
					15: "Viewing a category talk page",
					100: "Viewing a portal",
					101: "Viewing a portal talk page",
					110: "Viewing a forum page",
					111: "Viewing a forum talk page",
					420: "Viewing a GeoJson page",
					421: "Viewing a GeoJson talk page",
					500: "Viewing a user blog", // handled again by function below
					501: "Viewing a user blog comment", // depercated, redirected
					502: "Viewing a blog",
					503: "Viewing a blog talk page",
					710: "Viewing a media's subtitles",
					711: "Viewing a media's subtitles talk page",
					828: "Viewing a module",
					829: "Viewing a module talk page",
					1200: "Viewing a message wall",
					1201: "Viewing a thread",
					1202: "Viewing a message wall greeting",
					2000: "Viewing a forum board", // depercated, redirected
					2001: "Viewing a forum board thread", // depercated, redirected
					2002: "Viewing a forum topic", // depercated, redirected
				};
				return (
					details[
						[...document.querySelector("body").classList]
							.find(v => /ns--?\d/.test(v))
							.slice(3)
					] || "Viewing a wiki page"
				);
			};

		if (mwConfig.wgIsMainPage && action === "view")
			presenceData.details = "On the home page";
		else if (document.querySelector(".unified-search__form")) {
			presenceData.details = "Searching for a page";
			presenceData.state = (
				document.querySelector(
					".unified-search__input__query"
				) as HTMLInputElement
			).value;
		} else if (action === "history") {
			presenceData.details = "Viewing revision history";
			presenceData.state = titleFromConfig;
		} else if (mwConfig.wgDiffOldId) {
			presenceData.details = "Viewing difference between revisions";
			presenceData.state = titleFromConfig;
		} else if (mwConfig.wgCurRevisionId !== mwConfig.wgRevisionId) {
			presenceData.details = "Viewing an old revision of a page";
			presenceData.state = titleFromConfig;
		} else if (namespaceDetails() === "Viewing a user blog") {
			if (title) {
				presenceData.details = "Reading a user blog post";
				presenceData.state = `${title} by ${
					document.querySelector(".page-header__blog-post-details")
						.firstElementChild.textContent
				}`;
			} else {
				presenceData.details = namespaceDetails();
				presenceData.state = titleFromConfig;
			}
		} else if (
			document.querySelector("#ca-ve-edit") ||
			getURLParam("veaction")
		) {
			presenceData.state =
				title +
				(title.toLowerCase() === titleFromConfig.toLowerCase()
					? ""
					: ` (${titleFromConfig})`);
			updateCallback.function = (): void => {
				if (actionFromURL().startsWith("edit"))
					presenceData.details = "Editing a page";
				else presenceData.details = namespaceDetails();
			};
		} else if (action === "edit") {
			presenceData.details = document.querySelector("#ca-edit")
				? "Editing a page"
				: "Viewing source";
			presenceData.state = titleFromConfig;
		} else {
			presenceData.details = namespaceDetails();
			presenceData.state =
				title +
				(title.toLowerCase() === titleFromConfig.toLowerCase()
					? ""
					: ` (${titleFromConfig})`);
		}

		if (presenceData.state) presenceData.state += ` | ${siteName}`;
		else presenceData.state = siteName;

		if (lang !== "en") {
			if (presenceData.state) presenceData.state += ` (${lang})`;
			else presenceData.details += ` (${lang})`;
		}
	} else if (currentPath[0] === "f") {
		/*
		
		Chapter 3
		This one is for the discussion parts on each wikis.
		
		*/

		const siteName =
			(
				document.querySelector(
					"meta[property='og:site_name']"
				) as HTMLMetaElement
			)?.content ||
			document.querySelector(".wds-community-header__siteName").textContent;

		updateCallback.function = (): void => {
			if (!currentPath[1]) {
				const category = document.querySelector(
					".category-filter__dropdown-toggle"
				).textContent;
				if (category === "Categories")
					presenceData.details = "Viewing the discussion page";
				else {
					presenceData.details = "Viewing a discussion category";
					presenceData.state = category;
				}
			} else if (currentPath[1] === "p") {
				presenceData.details = "Reading a discussion post";
				presenceData.state = `${
					document.querySelector(".post-info__title").textContent
				} | ${siteName}`;
			} else if (currentPath[1] === "u") {
				presenceData.details = "Viewing a discussion user page";
				presenceData.state = `${
					document.querySelector(".user-overview__username").textContent
				} | ${siteName}`;
			}

			if (presenceData.state) presenceData.state += ` | ${siteName}`;
			else presenceData.state = siteName;
		};
	}

	presenceData.buttons = [
		{
			label: "View Page",
			url: window.location.href,
		},
	];
};

(async (): Promise<void> => {
	await prepare();

	const defaultData = { ...presenceData };
	presence.on("UpdateData", async () => {
		resetData(defaultData);
		updateCallback.function();
		if (!(await presence.getSetting("time")))
			delete presenceData.startTimestamp;
		if (!(await presence.getSetting("buttons"))) delete presenceData.buttons;
		presence.setActivity(presenceData);
	});
})();
