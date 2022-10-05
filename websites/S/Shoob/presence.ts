const presence = new Presence({
		clientId: "719127768868061246",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/aI1Qn8s.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = window.location;

	if (pathname === "/" || pathname === "/home/")
		presenceData.details = "Viewing home page";
	else if (pathname.includes("/user"))
		presenceData.details = `Viewing ${document.title}`;
	else if (pathname.includes("/dashboard"))
		presenceData.details = "Viewing the Dashboard";
	else if (pathname.includes("/premium"))
		presenceData.details = "Viewing Premium";
	else if (pathname.includes("/giveaway"))
		presenceData.details = "Viewing Giveaways";
	else if (pathname.includes("/settings"))
		presenceData.details = "Viewing Settings";
	else if (pathname.includes("/market"))
		presenceData.details = "Viewing the Market";
	else if (pathname.includes("/notifications"))
		presenceData.details = "Viewing Notifications";
	else if (pathname.includes("/events"))
		presenceData.details = "Viewing Events";
	else if (pathname.includes("/anime")) presenceData.details = "Viewing Anime";
	else if (pathname.includes("/shop"))
		presenceData.details = "Viewing the Shop";
	else if (pathname.includes("/bank"))
		presenceData.details = "Viewing the Bank";
	else if (pathname.includes("/cards"))
		presenceData.details = "Viewing the Cards";
	else if (pathname.includes("/card-abilities"))
		presenceData.details = "Viewing Card Abilities";
	else if (pathname.includes("/card-events"))
		presenceData.details = "Viewing Card Events";
	else if (pathname.includes("/inventory"))
		presenceData.details = "Viewing Inventory";
	else if (pathname.includes("/fusion")) presenceData.details = "Fusing Cards";
	else if (pathname.includes("/auction"))
		presenceData.details = "Viewing the Auction";
	else if (pathname.includes("/trades"))
		presenceData.details = "Viewing Trades";
	/// Anime Soul games section ///
	else if (pathname.includes("/this-or-that"))
		presenceData.details = "Playing This or That";
	else if (pathname.includes("/mini-games"))
		presenceData.details = "Playing Mini Games";
	/// Anime Soul community section ///
	else if (pathname.includes("/creators"))
		presenceData.details = "Viewing Creators";
	else if (pathname.includes("/medals"))
		presenceData.details = "Viewing Medals";
	else if (pathname.includes("/friends"))
		presenceData.details = "Viewing Friends";
	else if (pathname.includes("/leaderboards"))
		presenceData.details = "Viewing Leaderboards";
	else if (pathname.includes("/cardmakers/leaderboard"))
		presenceData.details = "Viewing CardMaker Leaderboards";
	else if (pathname.includes("/servers"))
		presenceData.details = "Viewing Servers";
	else if (pathname.includes("/appeals"))
		presenceData.details = "Viewing Appeals";
	else if (pathname.includes("/updates"))
		presenceData.details = "Viewing Updates";
	else if (pathname.includes("/articles"))
		presenceData.details = "Viewing Guides";
	else if (pathname.includes("/rules"))
		presenceData.details = "Reading the Rules";
	else if (pathname.includes("/staff-list"))
		presenceData.details = "Viewing Staff List";
	else if (pathname.includes("/staff"))
		presenceData.details = "Viewing Staff Pages";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
