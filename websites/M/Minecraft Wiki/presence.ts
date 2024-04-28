const presence = new Presence({
		clientId: "1232903356025143297",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
var veactionLast: string | null = null;

function hasPermissions(): boolean {
	return !document.querySelector(".permissions-errors");
}

async function prepare(): Promise<PresenceData> {
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
			btnViewThread: "apple.btnViewThread",
			viewWatchlist: "minecraft wiki.viewWatchlist",
		}),
		mwConfig = await presence.getPageletiable<{
			wgPageName: string;
			wgNamespaceNumber: number;
			wgTitle: string;
			wgCanonicalSpecialPageName: string | false;
			wgRelevantPageName: string;
			wgRelevantUserName: string | null;
			wgIsMainPage: boolean | null;
		}>('mw"]["config"]["values'),
		mainPath = pathname.split("/").filter(Boolean)[1] ?? "/",
		pageTitle = mwConfig.wgPageName.replace(/_/g, "");
	
	veactionLast = searchParams.get("veaction");

	presenceData.largeImageKey = getComputedStyle(
		document.querySelector<HTMLAnchorElement>(".mw-wiki-logo")
	).backgroundImage.match(/url\("(.+)"\)/)[1] ?? "https://cdn.rcd.gg/PreMiD/websites/M/Minecraft%20Wiki/assets/logo.png";

	if (
		searchParams.get("action") === "edit" ||
		searchParams.get("action") === "submit" ||
		searchParams.get("veaction") === "edit" ||
		searchParams.get("veaction") === "editsource"
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
	} else if (mwConfig.wgNamespaceNumber === 2) {
		// User namespace
		presenceData.details = strings.viewUser;
		presenceData.state = mwConfig.wgTitle;
		presenceData.buttons = [{ label: strings.buttonViewProfile, url: href }];
	} else if (mwConfig.wgNamespaceNumber % 2 === 1) {
		// All talk namespaces
		presenceData.details = strings.viewAThread;
		presenceData.state =
			mwConfig.wgNamespaceNumber === 1
				? mwConfig.wgTitle
				: pageTitle;
		presenceData.buttons = [{ label: strings.btnViewThread, url: href }];
	} else if (mwConfig.wgNamespaceNumber === -1) {
		// Special namespace
		switch (mwConfig.wgCanonicalSpecialPageName) {
			case "Preferences":
				// Preferences (Special:Preferences)
				presenceData.details = strings.advancedSettings;
				break;
			case "Watchlist":
				// Subscriptions (Special:Watchlist)
				presenceData.details = strings.viewWatchlist;
				break;
			case "Recentchangeslinked":
				// Related changes (Special:RecentChangesLinked)
				presenceData.state = mwConfig.wgRelevantPageName.replace(/_/g, '');
			case "Recentchanges":
				// Recent changes (Special:RecentChanges)
				presenceData.details = strings.viewRecentChanges;
				break;
		 	case "Movepage":
				// Moving a page (Special:MovePage)
				presenceData.details = strings.moving;
				presenceData.state = mwConfig.wgRelevantPageName.replace(/_/g, '');
				break;
			case "Userlogin":
			case "CreateAccount":
				// Logging in (Special:UserLogin, Special:CreateAccount)
				presenceData.details = strings.login;
				break;
			case "Upload":
				// Upload a file (Special:Upload)
				presenceData.details = strings.upload;
				presenceData.state = searchParams.get("wpDestFile");
				break;
		 	case "Contributions":
				// Contributions (Special:Contributions)
				presenceData.details = strings.viewContributionsOf;
				presenceData.state = mwConfig.wgRelevantUserName;
				break;
			default:
				presenceData.details = strings.viewAPage;
				presenceData.state = pageTitle;
		}
	} else if (mwConfig.wgNamespaceNumber) {
		// Not main namespace
		const namespace = pageTitle.split(':')[0];
		presenceData.details = `${strings.readingAbout} ${namespace}`;
		presenceData.state = mwConfig.wgTitle;
		presenceData.buttons = [{ label: strings.buttonViewPage, url: href }];
	} else if (
		mainPath === "/" ||
		mwConfig.wgIsMainPage
	) {
		// Main Page
		presenceData.details = strings.viewHome;
	} else {
		presenceData.details = strings.viewAPage;
		presenceData.state = pageTitle;
		presenceData.buttons = [{ label: strings.buttonViewPage, url: href }];
	}
	return presenceData;
}

(async (): Promise<void> => {
	var presenceData = await prepare();
	presence.on("UpdateData", async () => {
		const veaction = new URLSearchParams(document.location.search).get("veaction");
		if ( veactionLast !== veaction ) {
			presenceData = await prepare();
		}
		else presence.setActivity(presenceData);
	});
})();