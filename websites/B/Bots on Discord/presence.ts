const presence = new Presence({
		clientId: "676821417823830017",
	}),
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/5nbGMhE.png",
			startTimestamp: browsingTimestamp,
		},
		page = document.location.pathname;
	if (page.startsWith("/bots/")) {
		presenceData.details = "Viewing a bot:";
		presenceData.state = document.querySelector(
			"#content > div > div > div.column.is-three-quarters-desktop > div.bot-header > div.right > h1"
		).textContent;
	} else if (page.startsWith("/tags/")) {
		presenceData.details = "Viewing a tag:";
		presenceData.state = document.querySelector(
			"#content > div > div.page-header > div.info > h1"
		).textContent;
	} else if (page.includes("/search"))
		presenceData.details = "Searching something...";
	else if (page.startsWith("/about")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "About";
	} else if (page.startsWith("/info/"))
		presenceData.details = "Viewing Informations";
	else if (page.startsWith("/users/")) {
		presenceData.details = "Viewing a user";
		presenceData.state = document.querySelector(
			"#content > div > div:nth-child(1) > div > div.right-container > p  "
		).textContent;
	} else if (page.endsWith("/create")) presenceData.details = "Creating a list";
	else if (page.startsWith("/lists")) {
		presenceData.details = "Viewing a list:";
		presenceData.state = document.querySelector(
			"#content > div > div:nth-child(1) > div > div.head > h1"
		).textContent;
	} else if (page.startsWith("/me/")) {
		if (page.endsWith("/embeds")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Bot Embed Builder";
		} else if (page.endsWith("/keys"))
			presenceData.details = "Viewing API keys";
		else if (page.endsWith("/submit"))
			presenceData.details = "Sumbitting a bot";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
