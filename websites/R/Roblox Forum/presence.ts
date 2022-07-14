const presence = new Presence({
	clientId: "993929577099448481",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "ig-mal",
		smallImageKey: "small",
		startTimestamp: Math.floor(Date.now() / 1000),
	};
	if (document.location.pathname === "/")
		presenceData.details = "Viewing the homepage";
	else if (document.location.pathname.startsWith("/threads/")) {
		presenceData.details = "Browsing a thread";
		presenceData.state = `Thread: ${document
			.querySelector("meta[property='og:title']")
			.getAttribute("content")}`;
	} else if (document.location.pathname.startsWith("/forums/")) {
		presenceData.details = "Browsing a category";
		presenceData.state = `Category: ${document
			.querySelector("meta[property='og:title']")
			.getAttribute("content")}`;
	} else if (document.location.pathname.startsWith("/members/")) {
		presenceData.details = "Viewing a profile";
		presenceData.state = `Profile: ${document
			.querySelector("meta[property='og:title']")
			.getAttribute("content")}`;
	} else if (document.location.pathname.startsWith("/admin.php"))
		presenceData.details = "Performing moderation actions";
	else if (document.location.pathname.startsWith("/approval-queue/"))
		presenceData.details = "Performing moderation actions";
	else if (document.location.pathname.startsWith("/reports/"))
		presenceData.details = "Performing moderation actions";
	else if (document.location.pathname.startsWith("/whats-new/"))
		presenceData.details = "Browsing the latest content";
	else {
		switch (document.location.pathname) {
			case "/pages/premium/":
				presenceData.details = "Browsing premium packages";
				break;
			case "/account/account-details/":
				presenceData.details = "Editing my account details";
				break;
			case "/account/alerts":
				presenceData.details = "Viewing my alerts in full";
				break;
			case "/account/privacy":
				presenceData.details = "Editing my privacy settings";
				break;
		}
	}
	presence.setActivity(presenceData);
});
