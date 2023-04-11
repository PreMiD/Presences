const presence = new Presence({ clientId: "1080885668248559648" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Logo = "https://i.imgur.com/356Spon.png",
	Searching = "https://i.imgur.com/OIgfjTG.png",
	Reading = "https://i.imgur.com/53N4eY6.png",
}

presence.on("UpdateData", async () => {
	const { pathname } = document.location,
		pathArr = pathname.split("/"),
		{ details, smallImageKey } = getPageData(
			pathArr[1],
		),
		presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
			details,
		};
	if (smallImageKey) presenceData.smallImageKey = smallImageKey;

	if ( // test
		!(await presence.getSetting<boolean>("details")) &&
		(pathArr[1] === "manga" || pathArr[1] === "read")
	) {
		presenceData.largeImageKey = Assets.Logo;
		presenceData.details = "Reading manga...";
		presenceData.state = "";
	}

	if (details) presence.setActivity(presenceData);
});

function getPageData(page: string) {
	switch (page) {
		case "dashboard":
			return { details: "Viewing dashboard..." };
		default:
			return { details: "Browsing...", smallImageKey: Assets.Searching };
	}
}