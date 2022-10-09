const presence = new Presence({
		clientId: "672156210627084328",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	staticPages: Record<string, string> = {
		"": "Viewing home page",
		"staff-list": "Viewing Staff List",
		rules: "Viewing the rules",
		appeals: "Viewing Appeals",
		creators: "Viewing AS Creators",
		leaderboards: "Viewing Leaderboards",
		premium: "Viewing Premium",
	};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/fd4DHxK.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = window.location,
		path = pathname.split("/")[1] ?? "";

	if (staticPages[path]) presenceData.details = staticPages[path];

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
