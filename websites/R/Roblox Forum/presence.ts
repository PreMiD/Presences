const presence = new Presence({
	clientId: "993929577099448481",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/8mvM9Jh.png",
		smallImageKey: "small",
	};
	if (document.location.pathname === "/")
		presenceData.details = "Viewing the homepage";
	else if (document.location.pathname.startsWith("/threads/")) {
		presenceData.details = "Browsing a thread";
		presenceData.state = `Thread: ${document
			.querySelector("meta[property='og:title']")
			.getAttribute("content")}`;
		presenceData.buttons = [
			{
				label: "View Thread",
				url: document.location.href,
			},
		];
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
		presenceData.buttons = [
			{
				label: "View Profile",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.startsWith("/whats-new/"))
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
		presenceData.details = "Unknown page";
	}
	presence.setActivity(presenceData);
});
