const presence = new Presence({
		clientId: "1232903356025143297",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/SPgKjjJ.png",
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
			settings: "x.settings",
			advancedSettings: "gmail.advancedSettings",
			viewAPage: "general.viewAPage",
			buttonViewPage: "general.buttonViewPage",
			readingAbout: "general.readingAbout",
		}),
		mainPath = pathname.split("/").filter(Boolean)[1] ?? "/";

	presenceData.largeImageKey =
		locationSpecificLogos[hostname.split(".")[0]] ?? Assets.Logo;

	if (mainPath === "/") presenceData.details = strings.viewHome;
	else if (mainPath.startsWith("User:")) {
		presenceData.details = strings.viewUser;
		presenceData.state = document.querySelector<HTMLSpanElement>(
			".mw-page-title-main"
		);
		presenceData.buttons = [{ label: strings.buttonViewProfile, url: href }];
	} else if (/^[^:]*talk:/i.test(mainPath)) {
		presenceData.details = strings.viewAThread;
		presenceData.state =
			document.querySelector<HTMLHeadingElement>("#firstHeading");
	} else if (searchParams.get("action") === "edit") {
		presenceData.details = strings.editing;
		presenceData.state =
			document.querySelector<HTMLHeadingElement>("#firstHeadingTitle") ??
			document.querySelector<HTMLAnchorElement>("#mw-content-subtitle a");
	} else if (["history", "protect"].includes(searchParams.get("action"))) {
		presenceData.details = strings.settings;
		presenceData.state =
			document.querySelector<HTMLHeadingElement>("#firstHeading");
	} else if (mainPath.startsWith("Special:")) {
		presenceData.details = strings.advancedSettings;
		presenceData.state =
			document.querySelector<HTMLHeadingElement>("#firstHeading");
	} else if (
		mainPath.split(":")[0] in specialNamespaces &&
		mainPath.includes(":")
	) {
		presenceData.details = `${strings.readingAbout} ${
			specialNamespaces[mainPath.split(":")[0]]
		}`;
		presenceData.state =
			document.querySelector<HTMLHeadingElement>("#firstHeading");
		presenceData.buttons = [{ label: strings.buttonViewPage, url: href }];
	} else {
		presenceData.details = strings.viewAPage;
		presenceData.state =
			document.querySelector<HTMLHeadingElement>("#firstHeading");
		presenceData.buttons = [{ label: strings.buttonViewPage, url: href }];
	}

	presence.setActivity(presenceData);
});
