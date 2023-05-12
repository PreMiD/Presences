const presence = new Presence({ clientId: "1080885668248559648" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

enum Assets {
	Logo = "https://i.imgur.com/356Spon.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
}

presence.on("UpdateData", async () => {
	const { pathname } = document.location,
		pathArr = pathname.split("/"),
		{ details, smallImageKey, largeImageKey, state } = getPageData(
			pathArr[1],
			pathArr[2],
			document.querySelector(".name")?.textContent
		),
		presenceData: PresenceData = {
			largeImageKey: largeImageKey || Assets.Logo,
			startTimestamp: browsingTimestamp,
			details,
		};
	if (smallImageKey) presenceData.smallImageKey = smallImageKey;
	if (state) presenceData.state = state;

	if (
		!(await presence.getSetting<boolean>("details")) &&
		(pathArr[1] === "manga" || pathArr[1] === "read")
	) {
		presenceData.largeImageKey = Assets.Logo;
		presenceData.details = "Reading manga...";
		presenceData.state = "";
	}

	if (details) presence.setActivity(presenceData);
});
function getPageData(page: string, pageDetails: string, title: string) {
	switch (page) {
		case "home":
			return { details: "Viewing home..." };
		case "filter":
			return { details: "Filtering manga...", smallImageKey: Assets.Search };
		case "type":
			return {
				details: `Browsing ${pageDetails}...`,
				smallImageKey: Assets.Search,
			};
		case "genre":
			return {
				details: `Browsing ${pageDetails} genre...`,
				smallImageKey: Assets.Search,
			};
		case "newest":
			return {
				details: "Browsing latest releases...",
				smallImageKey: Assets.Search,
			};
		case "updated":
			return {
				details: "Browsing recently updated...",
				smallImageKey: Assets.Search,
			};
		case "added":
			return {
				details: "Browsing recently added...",
				smallImageKey: Assets.Search,
			};
		case "az-list":
			return {
				details: "Browsing AZ-list...",
				smallImageKey: Assets.Search,
			};
		case "manga":
			return {
				details: `Viewing ${
					document.querySelector("span:nth-child(2)")?.textContent //manga type
				}...`,
				state: title,
				largeImageKey: document.querySelector<HTMLImageElement>("div>img")?.src, //manga cover
			};
		case "read":
			return {
				details: `Reading ${title} (${
					document.querySelector("span:nth-child(3)").textContent //language
				})`,
				state: `[${document
					.querySelector("#hz-view-ctl-form > input[type=text]")
					.getAttribute("placeholder")}/${
					//current page number
					document.querySelector("#hz-view-ctl-form > span > span").textContent //total page number
				}] ${document.querySelector("li > a.active").textContent}`, //Chapter or Volume content details
				smallImageKey: Assets.Reading,
			};
		case "user":
			return getProfileDetail(pageDetails);
		case "terms":
			return { details: "Reading terms and conditions..." };
		case "contact":
			return { details: "Filling up the contact form..." };
		default:
			return { details: "Browsing...", smallImageKey: Assets.Search };
	}
}
function getProfileDetail(pageDetails: string) {
	switch (pageDetails) {
		case "profile":
			return { details: "Viewing their profile settings..." };
		case "reading":
			return { details: "Viewing their list of continue watching..." };
		case "bookmark":
			return { details: "Viewing their bookmarks..." };
		case "notification":
			return { details: "Viewing their notifications..." };
		case "mal":
			return { details: "Importing their MyAnimeList..." };
		case "settings":
			return { details: "Viewing their general settings..." };
		default:
			return { details: "Changing settings..." };
	}
}
