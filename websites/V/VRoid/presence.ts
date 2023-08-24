const presence = new Presence({
		clientId: "1144333935967473685",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let oldLang: string,
	strings: Awaited<ReturnType<typeof presence.getStrings>>;

const enum Assets {
	Logo = "https://i.imgur.com/RAxM8Tw.png",
}

function getImportantPath(): string[] {
	const pathList = document.location.pathname.split("/").filter(Boolean);
	if (pathList[0] === "en") pathList.shift();
	return pathList;
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	},
	lang = await presence.getSetting<string>("lang"),
	pathList = getImportantPath();

	if (lang !== oldLang) {
		oldLang = lang;
		strings = await presence.getStrings({
			browsing: "general.browsing",
			buttonViewPage: "general.buttonViewPage",
			buttonViewProfile: "general.buttonViewProfile",
			viewAProduct: "general.viewAProduct",
			viewAProfile: "general.viewAProfile",
			viewCategory: "general.viewCategory",
			viewHome: "general.viewHome",
			viewPage: "general.viewPage",
			viewing: "general.viewing",
		}, lang);
	}

	presence.setActivity(presenceData);
});
