const presence = new Presence({ clientId: "1237999667023708231" }),
browsingTimestamp = Math.floor(Date.now() / 1000);
	const enum Assets = {
		logo: "https://i.imgur.com/6jC2EYO.png",
	};

let startTime: number;

presence.on("UpdateData", async () => {
	const url = window.location.href,
		presenceData: PresenceData = {
			largeImageKey: assets.logo,
			startTimestamp: browsingTimestamp;
		};

	if (url.includes("/forums")) {
		presenceData.details = "Browsing the OG Network Forums";
		if (url.includes("rules.5/"))
			presenceData.details = "Viewing the Rule Category.";
		if (url.includes("news-and-announcements.2/"))
			presenceData.details = "Viewing the Servers News.";
	} else if (url.includes("/rules"))
		presenceData.details = "Viewing the Servers Rules.";
	else if (url.includes("/apply"))
		presenceData.details = "Applying for something.";
	else if (url.includes("/vote"))
		presenceData.details = "Voting for the server!";
	else if (url.includes("/cosmetics"))
		presenceData.details = "Learning about the cosmetics!";
	else if (url.includes("/account"))
		presenceData.details = "Editing their account details.";
	else if (url.includes("/modifications"))
		presenceData.details = "Viewing the Modifications Rules";
	else if (url.includes("/threads")) {
		const matches = /threads\/(.*?)(\.\d+)?\/?$/.exec(url);
		if (matches && matches[1])
			presenceData.details = `Viewing Thread: ${matches[1]
				.replace(/-/g, " ")
				.trim()}`;
		else presenceData.details = "Viewing Thread: Unknown";
	} else if (url.includes("/members")) {
		const matches = /members\/(.*?)\.\d+\/?$/.exec(url);
		if (matches && matches[1])
			presenceData.details = `Viewing ${matches[1].replace(
				/_/g,
				" "
			)}'s profile`;
		else presenceData.details = "Viewing Member's profile: Unknown";
	} else if (
		url.includes("og-network.net") ||
		url.includes("shop-og-network.net")
	) {
		// Check for OG Network and Shop URLs
		if (url.includes("/category")) {
			const matches = /\/category\/(.*?)(\.\d+)?\/?$/.exec(url);
			if (matches && matches[1])
				presenceData.details = `Browsing the ${matches[1]
					.replace(/-/g, " ")
					.trim()} category`;
			else presenceData.details = "Browsing OG Network Store";
		} else presenceData.details = "Browsing OG Network website";
	} else presenceData.details = "Browsing OG Network website";

	presenceData.buttons = [
		{
			label: "View",
			url,
		},
	];

	presence.setActivity(presenceData);

	if (!startTime) startTime = Date.now();
});
