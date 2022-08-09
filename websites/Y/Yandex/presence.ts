const presence = new Presence({
		clientId: "1006328788147245086",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	currentPath = window.location.pathname,
	textQuery = new URLSearchParams(window.location.search).get("text");
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "main",
		startTimestamp: browsingTimestamp,
	};

	if (currentPath === "/") presenceData.details = "Home Page";
	else if (currentPath.startsWith("/search") && currentPath !== "/")
		presenceData.details = `Searching for ${textQuery}`;
	else if (currentPath.startsWith("/images/search") && currentPath !== "/")
		presenceData.details = `Looking for Images of ${textQuery}`;
	else if (currentPath.startsWith("/video/search") && currentPath !== "/")
		presenceData.details = `Looking for Videos of ${textQuery}`;
	else if (currentPath.startsWith("/news") && currentPath !== "/")
		presenceData.details = `Looking for News on ${textQuery}`;
	else if (currentPath.startsWith("/maps") && currentPath !== "/")
		presenceData.details = "Using Maps";

	presence.setActivity(presenceData);
});
