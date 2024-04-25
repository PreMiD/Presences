const presence = new Presence({
		clientId: "1232903356025143297",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/SPgKjjJ.png",
}

function hasPermissions(): boolean {
	return !document.querySelector(".permissions-errors");
}

const locationSpecificLogos: Record<string, string> = {
		ko: "https://i.imgur.com/Xox00yw.png",
		pt: "https://i.imgur.com/pliOKN8.png",
		uk: "https://i.imgur.com/fUOurR4.png",
	},
	/* eslint-disable camelcase */
	specialNamespaces: Record<string, string> = {
		Minecraft_Wiki: "Minecraft Wiki",
		Minecraft_Dungeons: "Minecraft Dungeons",
		MCD: "Minecraft Dungeons",
		Minecraft_Legends: "Minecraft Legends",
		MCL: "Minecraft Legends",
		Minecraft_Earth: "Minecraft Earth",
		MCE: "Minecraft Earth",
		Minecraft_Story_Mode: "Minecraft Story Mode",
		MCSM: "Minecraft Story Mode",
	};
/* eslint-enable camelcase */

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
		},
		{ href, hostname, pathname, search } = document.location,
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
		}),
		mainPath = pathname.split("/").filter(Boolean)[1] ?? "/",
		pageTitle = document.querySelector<HTMLMetaElement>(
			"meta[property='og:title']"
		)?.content;

	presenceData.largeImageKey =
		locationSpecificLogos[hostname.split(".")[0]] ?? Assets.Logo;

	if (mainPath === "/") presenceData.details = strings.viewHome;
	else if (
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
	} else if (mainPath.startsWith("User:")) {
		presenceData.details = strings.viewUser;
		presenceData.state = pageTitle.slice(5);
		presenceData.buttons = [{ label: strings.buttonViewProfile, url: href }];
	} else if (/^[^:]*talk:/i.test(mainPath)) {
		presenceData.details = strings.viewAThread;
		presenceData.state = document.querySelector<HTMLSpanElement>(
			".mw-page-title-main"
		);
	} else if (mainPath.startsWith("Special:")) {
		switch (mainPath.split(":").slice(1).join(":")) {
			case "MovePage": {
				presenceData.details = strings.moving;
				presenceData.state = pathname.split("/").pop();
				break;
			}
			case "Preferences": {
				presenceData.details = strings.advancedSettings;
				break;
			}
			case "RecentChangesLinked": {
				presenceData.details = strings.viewHistory;
				presenceData.state = document.querySelector<HTMLAnchorElement>(
					".mw-content-subtitle a"
				);
				break;
			}
			default: {
				presenceData.details = strings.viewAPage;
				presenceData.state = pageTitle;
			}
		}
	} else if (
		mainPath.split(":")[0] in specialNamespaces &&
		mainPath.includes(":")
	) {
		const namespace = mainPath.split(":")[0];
		presenceData.details = `${strings.readingAbout} ${specialNamespaces[namespace]}`;
		presenceData.state = pageTitle.slice(namespace.length + 1);
		presenceData.buttons = [{ label: strings.buttonViewPage, url: href }];
	} else {
		presenceData.details = strings.viewAPage;
		presenceData.state = pageTitle;
		presenceData.buttons = [{ label: strings.buttonViewPage, url: href }];
	}

	presence.setActivity(presenceData);
});
