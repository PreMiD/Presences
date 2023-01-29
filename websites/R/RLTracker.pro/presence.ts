const presence = new Presence({
		clientId: "636659890927960064",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let title: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/lhabxX8.png",
	};

	if (document.location.pathname === "/") {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing the home page";
	} else if (document.location.pathname.includes("/profiles/search")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Searching a profile";
		presenceData.smallImageKey = "search";
	} else if (document.location.pathname.includes("/profiles/")) {
		presenceData.startTimestamp = browsingTimestamp;
		title = document.querySelector(
			"#rip_col > div.fav_no_category.main_box.main_stats_box > h4"
		);
		presenceData.details = "Viewing stats of:";
		[presenceData.state] = title.textContent.split("Last update");
	} else if (document.location.pathname.includes("/trades")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing trades";
	} else if (document.location.pathname.includes("live_tracker")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing the live tracker";
	} else if (document.location.pathname.includes("/prices")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing the price changes";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
