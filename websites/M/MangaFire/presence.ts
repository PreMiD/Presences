const presence = new Presence({ clientId: "1080885668248559648", }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Logo = "https://i.imgur.com/KXGOlbM.png",
	Searching = "https://i.imgur.com/OIgfjTG.png",
	Reading = "https://i.imgur.com/53N4eY6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	},
		{ pathname } = document.location,
		pathArr = pathname.split("/"),
		page = pathArr[1],
		pageDetails = pathArr[2],
		title = document.querySelector(".name")?.textContent;

	switch (page) {
		case "home": presenceData.details = "Viewing home";
			break;
		case "filter":
			presenceData.details = "Filtering manga...";
			presenceData.smallImageKey = Assets.Searching;
			break;
		case "type":
			presenceData.details = `Browsing ${pageDetails}...`;
			presenceData.smallImageKey = Assets.Searching;
			break;
		case "genre":
			presenceData.details = `Browsing ${pageDetails} genre...`;
			presenceData.smallImageKey = Assets.Searching;
			break;
		case "newest":
			presenceData.details = "Browsing latest releases...";
			presenceData.smallImageKey = Assets.Searching;
			break;
		case "updated":
			presenceData.details = "Browsing recently updated...";
			presenceData.smallImageKey = Assets.Searching;
			break;
		case "added":
			presenceData.details = "Browsing recently added...";
			presenceData.smallImageKey = Assets.Searching;
			break;
		case "az-list":
			presenceData.details = "Browsing AZ-list...";
			presenceData.smallImageKey = Assets.Searching;
			break;
		case "manga":
			presenceData.details = `Viewing ${document.querySelector("span:nth-child(2)").textContent}...`;
			presenceData.state = title;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>("div>img")?.src;
			break;
		case "read":
			presenceData.details = `Reading ${title} (${document.querySelector("span:nth-child(3)").textContent})`;
			presenceData.state = `${document.querySelector(".number-current-type").textContent} ${document.querySelector(".number-current").textContent}...`;
			presenceData.smallImageKey = Assets.Reading;
			break;
		case "user":
			switch (pageDetails) {
				case "profile": presenceData.details = "Viewing their profile settings...";
					break;
				case "reading": presenceData.details = "Viewing their list of continue watching...";
					break;
				case "bookmark": presenceData.details = "Viewing their bookmarks...";
					break;
				case "notification": presenceData.details = "Viewing their notification settings...";
					break;
				case "mal": presenceData.details = "Viewing their MyAnimeList settings...";
					break;
				case "settings": presenceData.details = "Viewing their general settings...";
					break;
			}
			break;
		case "terms": presenceData.details = "Reading terms and conditions...";
			break;
		case "contact": presenceData.details = "Filling up the contact form...";
			break;
		default:
			presenceData.details = "Browsing...";
			presenceData.smallImageKey = Assets.Searching;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	presence.setActivity(presenceData);
});