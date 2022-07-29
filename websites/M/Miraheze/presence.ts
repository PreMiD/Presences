const presence = new Presence({
		clientId: "900002010156400670",
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
		get present(): boolean {
			return this._function !== null;
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

	if (
		currentURL.host === "miraheze.org" ||
		currentURL.host === "www.miraheze.org"
	) {
		if (currentPath[0] === "") presenceData.details = "On the index page";
	} else {
		switch (currentURL.hostname) {
			case "phabricator.miraheze.org": {
				presenceData.smallImageKey = "phabricator";
				presenceData.smallImageText = "Phabricator";

				if (currentPath[0] === "") presenceData.details = "On the home page";
				else if (
					document
						.querySelector(
							".phui-crumbs-view.phui-crumbs-border .phui-crumb-name"
						)
						.textContent.trim() === "Auth"
				)
					presenceData.details = "Logging in";
				else if (/^T\d+$/.test(currentPath[0])) {
					presenceData.details = "Viewing a task";
					presenceData.state = document.title.replace(/^[^\w\s\d]{1} /, "");
				} else {
					switch (currentPath[0]) {
						case "maniphest": {
							if (currentPath[1] === "task" && currentPath[2] === "edit")
								presenceData.details = "Creating a task";
							else {
								presenceData.details = "Viewing tasks (Maniphest)";
								presenceData.state = document.querySelector(
									"h1 .phui-header-header"
								).textContent;
							}

							break;
						}
						case "project": {
							if (!currentPath[1] || currentPath[1] === "query") {
								presenceData.details = "Viewing projects";
								presenceData.state = document.querySelector(
									"h1 .phui-header-header"
								).textContent;
							} else if (currentPath[1] === "view") {
								presenceData.details = "Viewing a project";
								presenceData.state = [
									...document.querySelectorAll(
										".phui-crumbs-view.phui-crumbs-border .phui-crumb-name"
									),
								]
									.slice(1)
									.map(element => element.textContent.trim())
									.join(" > ");
							} else {
								presenceData.details = "Viewing a project";
								const crumbs = [
									...document.querySelectorAll(
										".phui-crumbs-view.phui-crumbs-border .phui-crumb-name"
									),
								];
								presenceData.state = crumbs
									.slice(1, crumbs.length - 1)
									.map(element => element.textContent.trim())
									.join(" > ");
							}

							break;
						}
						case "diffusion": {
							presenceData.details = "Viewing repositories (Diffusion)";
							presenceData.state = document.querySelector(
								"h1 .phui-header-header"
							).textContent;

							break;
						}
						case "source": {
							presenceData.details = "Viewing a repository";
							presenceData.state = document.querySelector(
								".phui-crumbs-view.phui-crumbs-border .phui-crumb-name:nth-of-type(1)"
							).textContent;

							break;
						}
						case "phame": {
							if (!currentPath[1])
								presenceData.details = "Viewing recent posts (Phame)";
							else if (currentPath[1] === "post") {
								if (currentPath[2] === "view") {
									presenceData.details = "Viewing a post";
									presenceData.state = document.querySelector(
										".phame-header-title"
									).textContent;
								} else {
									presenceData.details = "Viewing posts";
									presenceData.state = document.querySelector(
										"h1 .phui-header-header"
									).textContent;
								}
							} else if (currentPath[1] === "blog") {
								if (currentPath[2] === "view") {
									presenceData.details = "Viewing a blog";
									presenceData.state = document.querySelector(
										".phame-header-title"
									).textContent;
								} else {
									presenceData.details = "Viewing blogs";
									presenceData.state = document.querySelector(
										"h1 .phui-header-header"
									).textContent;
								}
							}

							break;
						}
						default:
							if (/^P\d+$/.test(currentPath[0])) {
								presenceData.details = "Viewing a paste";
								presenceData.state = document.title.replace(
									/^[^\w\s\d]{1} /,
									""
								);
							} else if (currentPath[0] === "paste") {
								if (currentPath[1] === "task" && currentPath[2] === "edit")
									presenceData.details = "Creating a paste";
								else {
									presenceData.details = "Viewing pastes";
									presenceData.state = document.querySelector(
										"h1 .phui-header-header"
									).textContent;
								}
							} else if (/^M\d+$/.test(currentPath[0])) {
								presenceData.details = "Viewing a mock";
								presenceData.state = document.title.replace(
									/^[^\w\s\d]{1} /,
									""
								);
							} else if (currentPath[0] === "pholio") {
								if (currentPath[1] === "task" && currentPath[2] === "edit")
									presenceData.details = "Creating a mock";
								else {
									presenceData.details = "Viewing mocks (Pholio)";
									presenceData.state = document.querySelector(
										"h1 .phui-header-header"
									).textContent;
								}
							} else if (/^U\d+$/.test(currentPath[0])) {
								presenceData.details = "Viewing a short URL";
								presenceData.state = document.title.replace(
									/^[^\w\s\d]{1} /,
									""
								);
							} else if (currentPath[0] === "phurl") {
								if (currentPath[1] === "task" && currentPath[2] === "edit")
									presenceData.details = "Creating a short URL";
								else {
									presenceData.details = "Viewing short URLs (Phurl)";
									presenceData.state = document.querySelector(
										"h1 .phui-header-header"
									).textContent;
								}
							} else {
								presenceData.details = `Viewing ${document
									.querySelector(
										".phui-crumbs-view.phui-crumbs-border .phui-crumb-name"
									)
									.textContent.trim()}`;
								presenceData.state = [
									...document.querySelectorAll(
										".phui-crumbs-view.phui-crumbs-border .phui-crumb-name"
									),
								]
									.slice(1)
									.map(element => element.textContent.trim())
									.join(" > ");
							}
					}
				}

				break;
			}
			case "blog.miraheze.org": {
				presenceData.smallImageKey = "phabricator";
				presenceData.smallImageText = "Phabricator (blog)";

				if (!currentPath[1]) {
					presenceData.details = "Viewing a blog";
					presenceData.state = document.querySelector(
						".phame-header-title"
					).textContent;
				} else if (currentPath[0] === "post") {
					presenceData.details = "Viewing a post";
					presenceData.state = document.querySelector(
						".phame-header-title"
					).textContent;
				}

				break;
			}
			case "donate.miraheze.org": {
				presenceData.smallImageKey = "donate";
				presenceData.smallImageText = "Donation Gateway";

				presenceData.details = "Donating to Miraheze";

				break;
			}
			case "status.miraheze.wiki": {
				presenceData.details = "Viewing the status page";
				if (document.title !== "Status Page - Miraheze") {
					presenceData.state = document.title.replace(
						" - Status Page - Miraheze",
						""
					);
				}

				break;
			}
			default: {
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
					siteName = mwConfig.wgSiteName,
					/**
					 * Returns details based on the namespace.
					 * @link https://en.wikipedia.org/wiki/Wikipedia:Namespace
					 */
					namespaceDetails = (): string => {
						// Hardcoded IDs are used for namespaces that are usually consistent.
						// For others, use the canonical names as the keys. They will always be English.

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
								828: "Viewing a module",
								829: "Viewing a module talk page",
								2300: "Viewing a gadget",
								2301: "Viewing a gadget talk page",
								2302: "Viewing a gadget definition page",
								2303: "Viewing a gadget definition talk page",
								GeoJson: "Viewing a GeoJson page",
								"GeoJson talk": "Viewing a GeoJson talk page",
								TimedText: "Viewing a media's subtitles",
								"TimedText talk": "Viewing a media's subtitles talk page",
								CNBanners: "Viewing a CNBanners page",
								"CNBanners talk": "Viewing a CNBanners talk page",
								Schema: "Viewing a schema page",
								"Schema talk": "Viewing a schema talk page",
								Translations: "Viewing a translations page",
								"Translations talk": "Viewing a translations talk page",
							},
							canonicalNamespace = mwConfig.wgCanonicalNamespace.replaceAll(
								"_",
								" "
							);
						return (
							details[mwConfig.wgNamespaceNumber] ||
							details[canonicalNamespace] ||
							`Viewing a/an ${canonicalNamespace} page`
						);
					};

				if (mwConfig.wgIsMainPage && action === "view")
					presenceData.details = "On the main page";
				else if (document.querySelector("#wpLoginAttempt"))
					presenceData.details = "Logging in";
				else if (document.querySelector("#wpCreateaccount"))
					presenceData.details = "Creating an account";
				else if (document.querySelector(".searchresults")) {
					presenceData.details = "Searching for a page";
					presenceData.state = (
						document.querySelector("input[type=search]") as HTMLInputElement
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

				presence.info("123");

				if (presenceData.state) presenceData.state += ` | ${siteName}`;
				else presenceData.state = siteName;

				if (lang !== "en") {
					if (presenceData.state) presenceData.state += ` (${lang})`;
					else presenceData.details += ` (${lang})`;
				}
			}
		}
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

	if (updateCallback.present) {
		const defaultData = { ...presenceData };
		presence.on("UpdateData", async () => {
			resetData(defaultData);
			updateCallback.function();
			presence.setActivity(presenceData);
		});
	} else {
		presence.on("UpdateData", async () => {
			presence.setActivity(presenceData);
		});
	}
})();
