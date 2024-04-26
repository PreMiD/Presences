import { getUserNamespace, getTalkNamespace } from "./util";

const presence = new Presence({
		clientId: "1232903356025143297",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

function hasPermissions(): boolean {
	return !document.querySelector(".permissions-errors");
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
		},
		{ href, pathname, search } = document.location,
		searchParams = new URLSearchParams(search),
		strings = await presence.getStrings({
			viewHome: "general.viewHome",
			viewUser: "general.viewUser",
			viewAThread: "general.viewAThread",
			buttonViewProfile: "general.buttonViewProfile",
			editing: "general.editing",
			advancedSettings: "google classroom.settings",
			viewAPage: "general.viewAPage",
			buttonViewPage: "general.buttonViewPage",
			readingAbout: "general.readingAbout",
			moving: "minecraft wiki.moving",
			viewSourceOf: "minecraft wiki.viewSourceOf",
			viewHistory: "minecraft wiki.viewHistory",
			changeProtection: "minecraft wiki.changeProtection",
			viewProtection: "minecraft wiki.viewProtection",
			search: "general.search",
			upload: "youtube.upload",
			viewContributionsOf: "minecraft wiki.viewContributionsOf",
			viewRecentChanges: "minecraft wiki.viewRecentChanges",
			login: "kahoot.login",
			subscriptions: "amazon.subscriptions",
			btnViewThread: "apple.btnViewThread",
		}),
		mainPath = pathname.split("/").filter(Boolean)[1] ?? "/",
		pageTitle = document.querySelector<HTMLMetaElement>(
			"meta[property='og:title']"
		)?.content,
		specialNamespace = new URL(
			document.querySelector<HTMLAnchorElement>("#t-specialpages a").href
		).pathname
			.split("/")
			.filter(Boolean)[1]
			.match(/.*(?=:[^_])/)?.[0],
		userNamespace = await getUserNamespace(),
		talkNamespace = await getTalkNamespace(),
		currentNamespace = mainPath.match(/.*(?=:[^_])/)?.[0] ?? "";

	presenceData.largeImageKey = getComputedStyle(
		document.querySelector<HTMLAnchorElement>(".mw-wiki-logo")
	).backgroundImage.match(/url\("(.+)"\)/)[1];

	if (
		searchParams.get("action") === "edit" ||
		searchParams.get("veaction") === "edit"
	) {
		presenceData.details = hasPermissions()
			? strings.editing
			: strings.viewSourceOf;
		presenceData.state = pageTitle;
	} else if (searchParams.get("action") === "history") {
		presenceData.details = strings.viewHistory;
		presenceData.state = pageTitle;
	} else if (
		searchParams.get("action") === "protect" ||
		searchParams.get("action") === "unprotect"
	) {
		presenceData.details = hasPermissions()
			? strings.changeProtection
			: strings.viewProtection;
		presenceData.state = pageTitle;
	} else if (searchParams.get("search")) {
		presenceData.details = strings.search;
		presenceData.state = searchParams.get("search");
	} else if (mainPath === "/") presenceData.details = strings.viewHome;
	else if (currentNamespace === userNamespace) {
		presenceData.details = strings.viewUser;
		presenceData.state = pageTitle.slice(
			decodeURIComponent(userNamespace).length + 1
		);
		presenceData.buttons = [{ label: strings.buttonViewProfile, url: href }];
	} else if (
		currentNamespace.toLowerCase().includes(talkNamespace.toLowerCase())
	) {
		presenceData.details = strings.viewAThread;
		presenceData.state =
			currentNamespace === talkNamespace
				? document.querySelector<HTMLSpanElement>(".mw-page-title-main")
				: pageTitle;
		presenceData.buttons = [{ label: strings.btnViewThread, url: href }];
	} else if (currentNamespace === specialNamespace) {
		// Preferences (Special:Preferences)
		if (document.querySelector<HTMLFormElement>("#mw-prefs-form"))
			presenceData.details = strings.advancedSettings;
		else if (document.querySelector<HTMLFormElement>("#mw-watchlist-form"))
			// Subscriptions (Special:Watchlist)
			presenceData.details = strings.subscriptions;
		// Recent changes (Special:RecentChanges, Special:RecentChangesLinked)
		else if (document.querySelector<HTMLUListElement>(".mw-rcfilters-head")) {
			presenceData.details = strings.viewRecentChanges;
			presenceData.state = document.querySelector<HTMLAnchorElement>(
				"#mw-content-subtitle a"
			);
		} else if (document.querySelector<HTMLFormElement>("#movepage")) {
			// Moving a page (Special:MovePage)
			presenceData.details = strings.moving;
			presenceData.state = document.querySelector<HTMLAnchorElement>(
				"#mw-content-subtitle a"
			);
		} else if (document.querySelector<HTMLDivElement>("#userloginForm"))
			// Logging in (Special:UserLogin, Special:CreateAccount)
			presenceData.details = strings.login;
		// Upload a file (Special:Upload)
		else if (document.querySelector<HTMLFormElement>("#mw-upload-form"))
			presenceData.details = strings.upload;
		// Contributions (Special:Contributions)
		else if (
			document.querySelector<HTMLDivElement>(".mw-contributions-user-tools")
		) {
			presenceData.details = strings.viewContributionsOf;
			presenceData.state = pageTitle.split("/").slice(1).join("/");
		} else {
			presenceData.details = strings.viewAPage;
			presenceData.state = pageTitle;
		}
	} else if (currentNamespace) {
		const namespace = decodeURIComponent(currentNamespace);
		presenceData.details = `${strings.readingAbout} ${namespace}`;
		presenceData.state = pageTitle.slice(namespace.length + 1);
		presenceData.buttons = [{ label: strings.buttonViewPage, url: href }];
	} else {
		presenceData.details = strings.viewAPage;
		presenceData.state = pageTitle;
		presenceData.buttons = [{ label: strings.buttonViewPage, url: href }];
	}

	presence.setActivity(presenceData);
});
