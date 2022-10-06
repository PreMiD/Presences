const presence = new Presence({
		clientId: "719127768868061246",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/aI1Qn8s.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = window.location,
		pathSplit = pathname.split("/").slice(1),
		pageTitle = document.querySelector(
			"[itemprop='breadcrumb'] > li:last-child"
		)?.textContent;

	switch (pathSplit[0] ?? "") {
		case "":
		case "home":
			presenceData.details = "Viewing home page";
			break;
		case "appeals":
			presenceData.details = "Viewing Appeals";
			break;
		case "anime":
			presenceData.details = "Viewing Anime";
			break;
		case "articles":
			if (pathSplit[1]) {
				presenceData.details = "Reading an Article";
				presenceData.state = pageTitle;
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(".articleimg-img").src;
				presenceData.buttons = [{ label: "Read Article", url: href }];
			} else presenceData.details = "Viewing Articles";
			break;
		case "auction":
			if (pathSplit[1]) {
				presenceData.details = "Viewing an Auction";
				presenceData.state = pageTitle;
			} else presenceData.details = "Viewing the Auction HQ";
			break;
		case "bank":
			presenceData.details = "Viewing the Bank";
			break;
		case "card-abilities":
			presenceData.details = "Viewing Card Abilities";
			break;
		case "cards":
			if (pathSplit[1] === "info") {
				presenceData.details = "Viewing a Card";
				presenceData.state = pageTitle;
				presenceData.buttons = [{ label: "View Card", url: href }];
			} else presenceData.details = "Viewing the Cards";
			break;
		case "card-events":
			presenceData.details = "Viewing Card Events";
			if (pathSplit[1]) {
				if (pathSplit[2]) {
					presenceData.details = "Viewing an Event Card";
					presenceData.state = pageTitle;
					presenceData.buttons = [{ label: "View Card", url: href }];
				} else {
					presenceData.state = `${
						document.querySelector(
							"[itemprop='breadcrumb'] [href*='/card-events/']"
						).textContent
					} Cards`;
				}
			}
			break;
		case "cardmakers":
			if (pathSplit[1] === "leaderboard")
				presenceData.details = "Viewing CardMaker Leaderboards";
			break;
		case "creators":
			presenceData.details = "Viewing Creators";
			break;
		case "dashboard":
			presenceData.details = "Viewing the Dashboard";
			break;
		case "events":
			presenceData.details = "Viewing Events";
			break;
		case "friends":
			presenceData.details = "Viewing Friends";
			break;
		case "fusion":
			presenceData.details = "Fusing Cards";
			break;
		case "giveaway":
			presenceData.details = "Viewing Giveaways";
			break;
		case "inventory":
			presenceData.details = "Viewing Inventory";
			break;
		case "keysgiveaways":
			presenceData.details = "Viewing Key Giveaways";
			break;
		case "leaderboards":
			presenceData.details = "Viewing Leaderboards";
			break;
		case "market":
			presenceData.details = "Viewing the Market";
			break;
		case "medals":
			presenceData.details = "Viewing Medals";
			break;
		case "mini-games":
			presenceData.details = "Playing Mini Games";
			break;
		case "notifications":
			presenceData.details = "Viewing Notifications";
			break;
		case "premium":
			presenceData.details = "Viewing Premium";
			break;
		case "rules":
			presenceData.details = "Reading the Rules";
			break;
		case "servers":
			if (pathSplit[1]) {
				presenceData.details = "Viewing a Server";
				presenceData.state = pageTitle;
				presenceData.buttons = [{ label: "View Server", url: href }];
			} else presenceData.details = "Viewing Servers";
			break;
		case "settings":
			presenceData.details = "Managing Settings";
			break;
		case "shop":
			presenceData.details = "Viewing the Shop";
			break;
		case "stacks":
			presenceData.details = "Viewing Stacks";
			break;
		case "staff":
			presenceData.details = "Viewing Staff Pages";
			break;
		case "staff-list":
			presenceData.details = "Viewing Staff List";
			break;
		case "submit":
			presenceData.details = "Submitting a Card";
			break;
		case "tasks":
			presenceData.details = "Viewing Statistics & Tasks";
			break;
		case "this-or-that":
			presenceData.details = "Playing This or That";
			break;
		case "trades":
			presenceData.details = "Viewing Trades";
			break;
		case "updates":
			presenceData.details = "Viewing Updates";
			break;
		case "user":
			presenceData.details = "Viewing a profile";
			presenceData.state = pageTitle;
			presenceData.smallImageKey = document.querySelector<HTMLImageElement>(
				".profile-avatar-pic img"
			).src;
			break;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
