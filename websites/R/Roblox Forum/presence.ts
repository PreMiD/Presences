const presence = new Presence({
		clientId: "993929577099448481",
	}),
	date = Date.now();

presence.on("UpdateData", async () => {
	if (document.location.pathname === "/") {
		const presenceData: PresenceData = {
			details: "Viewing the homepage",
			smallImageKey: "small",
			smallImageText: "Swoosh",
			largeImageKey: "ig-mal",
			startTimestamp: date,
		};
		presence.setActivity(presenceData);
	} else if (document.location.pathname.startsWith("/members")) {
		const presenceData: PresenceData = {
			details: "Looking at a profile",
			state: `Profile: ${document
				.querySelector("meta[property='og:title']")
				.getAttribute("content")}`,
			smallImageKey: "small",
			smallImageText: "Profiles?!",
			largeImageKey: "ig-mal",
			startTimestamp: date,
		};
		presence.setActivity(presenceData);
	} else if (document.location.pathname.startsWith("/whats-new")) {
		const presenceData: PresenceData = {
			details: "Looking at the latest content",
			state: document
				.querySelector("meta[property='og:title']")
				.getAttribute("content"),
			smallImageKey: "small",
			smallImageText: "Profiles?!",
			largeImageKey: "ig-mal",
			startTimestamp: date,
		};
		presence.setActivity(presenceData);
	} else if (document.location.pathname.startsWith("/thread")) {
		const presenceData: PresenceData = {
			details: "Viewing a thread",
			state: `Thread: ${document
				.querySelector("meta[property='og:title']")
				.getAttribute("content")}`,
			smallImageKey: "small",
			smallImageText: "Threading...",
			largeImageKey: "ig-mal",
			startTimestamp: date,
		};
		presence.setActivity(presenceData);
	} else if (document.location.pathname.startsWith("/pages/premium")) {
		const presenceData: PresenceData = {
			details: "Looking at the premium packages",
			smallImageKey: "small",
			smallImageText: "Premium?!",
			largeImageKey: "ig-mal",
			startTimestamp: date,
		};
		presence.setActivity(presenceData);
	} else if (document.location.pathname.startsWith("/forums/")) {
		const presenceData: PresenceData = {
			details: "Viewing categories",
			state: `Category: ${document
				.querySelector("meta[property='og:title']")
				.getAttribute("content")}`,
			largeImageKey: "ig-mal",
			startTimestamp: date,
		};
		presence.setActivity(presenceData);
	} else {
		presence.setActivity({
			details: "Vibing on RobloxForum",
			largeImageKey: "ig-mal",
		});
	}
});
