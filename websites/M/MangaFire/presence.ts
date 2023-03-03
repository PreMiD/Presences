const presence = new Presence({ clientId: "1080885668248559648" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Logo = "https://i.imgur.com/KXGOlbM.png",
	Searching = "https://i.imgur.com/OIgfjTG.png",
	Reading = "https://i.imgur.com/53N4eY6.png",
}

presence.on("UpdateData", async () => {
	const { pathname } = document.location,
		pathArr = pathname.split("/"),
		{ details, smallImageKey, largeImageKey, state } = getPageData(
			pathArr[1],
			pathArr[2],
			document.querySelector(".name")?.textContent,
			document.querySelector("span:nth-child(2)")?.textContent,
			document.querySelector<HTMLImageElement>("div>img")?.src,
			document.querySelector("span:nth-child(3)").textContent,
			document.querySelector(".number-current-type")?.textContent,
			document.querySelector(".number-current")?.textContent,
			document.querySelector("#hz-view-ctl-form > input[type=text]").getAttribute("placeholder"),
			document.querySelector("#hz-view-ctl-form > span > span").textContent
		),
		presenceData: PresenceData = {
			largeImageKey: largeImageKey || Assets.Logo,
			startTimestamp: browsingTimestamp,
			details,
		};

	if (smallImageKey) presenceData.smallImageKey = smallImageKey;

	if (state) presenceData.state = state;

	if (details) presence.setActivity(presenceData);
});
function getPageData(
	page: string,
	pageDetails: string,
	title: string,
	mangaType: string,
	cover: string,
	language: string,
	volumeOrChapter: string,
	currentNumber: string,
	currentPageNumber: string,
	totalPageNumber: string
) {
	switch (page) {
		case "home":
			return { details: "Viewing home..." };
		case "filter":
			return { details: "Filtering manga...", smallImageKey: Assets.Searching };
		case "type":
			return {
				details: `Browsing ${pageDetails}...`,
				smallImageKey: Assets.Searching,
			};
		case "genre":
			return {
				details: `Browsing ${pageDetails} genre...`,
				smallImageKey: Assets.Searching,
			};
		case "newest":
			return {
				details: "Browsing latest releases...",
				smallImageKey: Assets.Searching,
			};
		case "updated":
			return {
				details: "Browsing recently updated...",
				smallImageKey: Assets.Searching,
			};
		case "added":
			return {
				details: "Browsing recently added...",
				smallImageKey: Assets.Searching,
			};
		case "az-list":
			return {
				details: "Browsing AZ-list...",
				smallImageKey: Assets.Searching,
			};
		case "manga":
			return {
				details: `Viewing ${mangaType}...`,
				state: title,
				largeImageKey: cover,
			};
		case "read":
			return {
				details: `Reading ${title} (${language})`,
				state: `${volumeOrChapter} ${currentNumber} page (${currentPageNumber}/${totalPageNumber})`,
				smallImageKey: Assets.Reading,
			};
		case "user":
			return getProfileDetail(pageDetails);
		case "terms":
			return { details: "Reading terms and conditions..." };
		case "contact":
			return { details: "Filling up the contact form..." };
		default:
			return { details: "Browsing...", smallImageKey: Assets.Searching };
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
