const presence = new Presence({
	clientId: "989759189394030613"
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/KtDhLn7.png"
	};

	if (window.location.href.indexOf("my-games") > -1) {
		presenceData.details = "Viewing their games";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("help") > -1) {
		presenceData.details = "Viewing the help page";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("game") > -1) {
		presenceData.details = "Clicking cells";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("ranking") > -1) {
		presenceData.details = "Viewing the rankings";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("best-players") > -1) {
		presenceData.details = "Viewing the best players";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("season-leaders") > -1) {
		presenceData.details = "Viewing this season's leaders";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("quests") > -1) {
		presenceData.details = "Viewing their quests";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("arena") > -1) {
		presenceData.details = "In the arena";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("equipment") > -1) {
		presenceData.details = "Viewing their equipment";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("marketplace") > -1) {
		presenceData.details = "Viewing the marketplace";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("events") > -1) {
		presenceData.details = "Viewing the event";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("players-online") > -1) {
		presenceData.details = "Viewing players online";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("player") > -1) {
		presenceData.details = "Viewing their profile";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("news") > -1) {
		presenceData.details = "Viewing the news";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("statistics") > -1) {
		presenceData.details = "Viewing statistics";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("chat") > -1) {
		presenceData.details = "Chatting";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("premium") > -1) {
		presenceData.details = "Viewing the premium perks";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("shop") > -1) {
		presenceData.details = "Viewing the shop";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else if (window.location.href.indexOf("profile") > -1) {
		presenceData.details = "Managing their account details";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	} else {
		presenceData.details = "On the home page";
		presenceData.startTimestamp = Date.now();

		presence.setActivity(presenceData);
	}
});
