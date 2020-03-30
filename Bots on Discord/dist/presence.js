var presence = new Presence({
	clientId: "676821417823830017",
});

presence.on("UpdateData", () => {
	let presenceData = {
		largeImageKey: "logo",
	};

	const page = document.location.pathname;

	const browsingStamp = Math.floor(Date.now() / 1000);
	if (page.startsWith("/bots/")) {
		presenceData.details = "Viewing a bot:";
		presenceData.state = document.querySelector(
			"#content > div > div > div.column.is-three-quarters-desktop > div.bot-header > div.right > h1"
		).textContent;
		presenceData.startTimestamp = browsingStamp;
	} else if (page.startsWith("/tags/")) {
		presenceData.details = "Viewing a tag:";
		presenceData.state = document.querySelector(
			"#content > div > div.page-header > div.info > h1"
		).textContent;
		presenceData.startTimestamp = browsingStamp;
	} else if (page.includes("/search")) {
		presenceData.details = "Searching something...";
		presenceData.startTimestamp = browsingStamp;
	} else if (page.startsWith("/about")) {
		presenceData.details = "Viewing a page:";
		presenceData.state = "About";
		presenceData.startTimestamp = browsingStamp;
	} else if (page.startsWith("/info/")) {
		presenceData.details = "Viewing Informations";
		presenceData.startTimestamp = browsingStamp;
	} else if (page.startsWith("/users/")) {
		presenceData.details = "Viewing a user";
		presenceData.state = document.querySelector(
			"#content > div > div:nth-child(1) > div > div.right-container > p  "
		).textContent;
		presenceData.startTimestamp = browsingStamp;
	} else if (page.endsWith("/create")) {
		presenceData.details = "Creating a list";
		presenceData.startTimestamp = browsingStamp;
	} else if (page.startsWith("/lists")) {
		presenceData.details = "Viewing a list:";
		presenceData.state = document.querySelector(
			"#content > div > div:nth-child(1) > div > div.head > h1"
		).textContent;
		presenceData.startTimestamp = browsingStamp;
	} else if (page.startsWith("/me/")) {
		if (page.endsWith("/embeds")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Bot Embed Builder";
			presenceData.startTimestamp = browsingStamp;
		} else if (page.endsWith("/keys")) {
			presenceData.details = "Viewing API keys";
			presenceData.startTimestamp = browsingStamp;
		} else if (page.endsWith("/submit")) {
			presenceData.details = "Sumbitting a bot";
			presenceData.startTimestamp = browsingStamp;
		}
	}

	if (presenceData.details == null) {
		presence.setTrayTitle();
		presence.setActivity();
	} else {
		presence.setActivity(presenceData);
	}
});
