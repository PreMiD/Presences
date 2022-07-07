const presence = new Presence({
	clientId: "993929577099448481",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "ig-mal",
			smallImageKey: "small",
			smallImageText: "Swooosh!",
		},
		date = Math.floor(Date.now() / 1000);

	if (document.location.pathname === "/") {
		presenceData.details = "Viewing the homepage";
		presenceData.startTimestamp = date;
	} else if (document.location.pathname.startsWith("/threads/")) {
		presenceData.details = "Browsing a thread...";
		presenceData.state =
			"Thread: " +
			document
				.querySelector("meta[property='og:title']")
				.getAttribute("content");
		presenceData.startTimestamp = date;
	} else if (document.location.pathname.startsWith("/forums/")) {
		presenceData.details = "Browsing a category...";
		presenceData.state = `Category: ${document
			.querySelector("meta[property='og:title']")
			.getAttribute("content")}`;
		presenceData.startTimestamp = date;
	} else if (document.location.pathname.startsWith("/members/")) {
		presenceData.details = "Viewing a profile...";
		presenceData.state = `Profile: ${document
			.querySelector("meta[property='og:title']")
			.getAttribute("content")}`;
		presenceData.startTimestamp = date;
	} else if (document.location.pathname.startsWith("/whats-new/")) {
		presenceData.details = "Browsing latest content...";
		presenceData.state = document
			.querySelector("meta[property='og:title']")
			.getAttribute("content");
		presenceData.startTimestamp = date;
	} else {
		switch (document.location.pathname) {
			case "/pages/premium/":
				presenceData.details = "Browsing premium packages";
				presenceData.startTimestamp = date;
				break;
			case "/account/account-details/":
				presenceData.details = "Editing my account details";
				presenceData.startTimestamp = date;
				break;
			case "/account/alerts":
				presenceData.details = "Viewing my alerts in full";
				presenceData.startTimestamp = date;
				break;
			case "/account/privacy":
				presenceData.details = "Editing my privacy settings";
				presenceData.startTimestamp = date;
				break;
		}
	}
	presence.setActivity(presenceData);
});
